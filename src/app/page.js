"use client";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { getJoinConfig } from "./utils.js";

import Loading from "@/components/loading";
import Nav from "@/components/navbar.js";
import SessionForm from "@/components/sessionForm";
import ErrorModal from "@/components/errorModal";

async function initZoomApp(set) {
  const ZoomMtgEmbedded = await (
    await import("@zoom/meetingsdk/embedded")
  ).default;
  const client = ZoomMtgEmbedded.createClient();
  const sysTest = client.checkSystemRequirements();
  console.log("zoom client ready", sysTest);
  set(client);
}

export default function Home() {
  const [isVisible, setVisible] = useState(false);
  const [client, setClient] = useState(false);
  const [init, setInit] = useState(false);
  const [modal, setModal] = useState(false);
  const [session, setSession] = useState(false);

  const handleClose = () => {
    window.location.reload();
  };

  const toggleForm = () => {
    setVisible(!isVisible);
    setTimeout(() => {
      startMeeting();
    }, 500);
  };

  const checkMeetingStatus = () => {
    const MeetingInfo = client.getCurrentMeetingInfo();
    if (!MeetingInfo.isInMeeting && MeetingInfo.participantId === 0)
      endMeeting();
  };

  const endMeeting = () => {
    client.endMeeting().catch((e) => {
      console.log(e);
    });
    client.leaveMeeting().catch((e) => {
      console.log(e);
    });
    window.location.reload();
  };

  const startMeeting = async () => {
    if (!init) {
      setInit(true);
      client.init({
        debug: true,
        zoomAppRoot: zoomAppRoot,
        language: "en-US",
        customize: {
          video: {
            isResizable: false,
            popper: {
              disableDraggable: true,
              anchorElement: zoomAppRoot,
            },
            viewSizes: {
              default: {
                width: 1366,
                height: 768,
              },
            },
            defaultViewType: "active",
          },
          toolbar: {
            buttons: [
              {
                text: "Extra custom option",
                className: "CustomButton",
                onClick: () => {
                  setModal("Thank you for clicking the button.");
                },
              },
            ],
          },
        },
      });
    }

    client
      .join(await getJoinConfig(session))
      .then(() => {
        setInterval(() => {
          checkMeetingStatus();
        }, 8000);
      })
      .catch((e) => {
        console.log(e);
        setModal(e.message);
        setVisible(false);
      });
  };

  useEffect(() => {
    if (!client) initZoomApp(setClient);
  }, [client]);

  return (
    <>
      {client ? (
        isVisible ? (
          <Container>
            <div id="zoomAppRoot" style={{ marginTop: "75px" }}></div>
            <Nav />
          </Container>
        ) : (
          <SessionForm toggleForm={toggleForm} setSession={setSession} />
        )
      ) : (
        <Container>
          <Loading />
        </Container>
      )}

      <ErrorModal modal={modal} handleClose={handleClose} />
    </>
  );
}
