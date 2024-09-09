"use server";
import jwt from "jsonwebtoken";
import _ from "underscore";

async function genSignature(meetingNumber, host) {
  try {
    let iat = Math.round((new Date().getTime() - 30000) / 1000);
    let exp = iat + 60 * 60 * 2;
    let signature = jwt.sign(
      {
        appKey: process.env.ZOOM_CLIENT_ID,
        sdkKey: process.env.ZOOM_CLIENT_ID,
        mn: meetingNumber,
        role: host,
        iat: iat,
        exp: exp,
        tokenExp: iat + 60 * 60 * 2,
      },
      process.env.ZOOM_CLIENT_SECRET
    );
    return signature;
  } catch (e) {
    console.warn(`sig | ${e}`);
  }
}

export async function getJoinConfig(session) {
  const data = JSON.parse(
    Buffer.from(process.env.DATA, "base64").toString("utf8")
  );

  data.room = _.where(data.rooms, { name: session });
  if (data.room.length === 0) {
    data.room = _.where(data.rooms, { name: "default" });
  }

  await sendRoomCommand(data.room[0].zr, "zoomroom.meeting_join");

  return {
    userName: "Celery ZView",
    meetingNumber: data.room[0].mid,
    password: data.room[0].pw,
    signature: await genSignature(data.room[0].mid, 0),
    sdkKey: process.env.ZOOM_CLIENT_ID,
  };
}

async function getAccessToken() {
  const headers = new Headers({
    Authorization: `Basic ${Buffer.from(
      `${process.env.ZOOM_S2S_ID}:${process.env.ZOOM_S2S_SECRET}`
    ).toString("base64")}`,
  });

  const request = new Request(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${process.env.ZOOM_ACCOUNT_ID}`,
    {
      method: "POST",
    }
  );

  const response = await fetch(request, { headers });
  const res = await response.json();
  return res.access_token;
}

async function sendRoomCommand(roomId, method, params = {}) {
  const access_token = await getAccessToken();

  const headers = new Headers({
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  });

  const request = new Request(`https://api.zoom.us/v2/rooms/${roomId}/events`, {
    method: "PATCH",
  });

  const body = JSON.stringify({
    method,
    params,
  });

  await fetch(request, { headers, body });
}
