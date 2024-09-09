import Image from "next/image";
import { Button, Col, Container, Row } from "react-bootstrap";
import celery from "./celery.png";
import Link from "next/link";

export default function SessionForm({ toggleForm, setSession }) {
  return (
    <Container
      className={
        "text-center bg-light shadow-lg rounded border border-dark border-2 rounded-4"
      }
      style={{ maxWidth: "400px", marginTop: "200px" }}
    >
      <Row>
        <Col>
          <Row
            className="mt-4 bg-warning rounded-circle pt-3 pb-3 shadow"
            style={{
              marginLeft: "7.6rem",
              marginRight: "7.6rem",
            }}
          >
            <Image
              src={celery.src}
              alt="celery"
              width={75}
              height={75}
              style={{ objectFit: "contain" }}
            ></Image>
          </Row>
          <Row className="mt-3">
            <h2>
              <span className="text-success">Celery </span>
              <span className="text-primary">ZView</span>
            </h2>
          </Row>
          <Row>
            <p>Enter the ID of the session you wish to join.</p>
          </Row>
          <Row className="mx-2 mb-3">
            <input
              type="text"
              placeholder="🔢  Session ID"
              onChange={(e) => {
                setSession(e.currentTarget.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") toggleForm();
              }}
            />
          </Row>
          <Row className="mx-2 mb-2">
            <Button variant="success" onClick={toggleForm}>
              Join
            </Button>
          </Row>
          <Row className="mb-0">
            <small>
              <p>
                Powered by the{" "}
                <Link
                  href="https://developers.zoom.us/docs/meeting-sdk/web/component-view/"
                  target="_blank"
                >
                  Zoom Meeting SDK
                </Link>
              </p>
            </small>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
