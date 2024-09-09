import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import loading from "./loading.gif";

export default function Loading() {
  return (
    <Container
      className={
        "text-center bg-light shadow-lg rounded border border-dark border-2 rounded-4"
      }
      style={{ maxWidth: "400px", marginTop: "200px" }}
    >
      <Row>
        <Col>
          <Row className="my-4">
            <Image
              src={loading.src}
              alt="loading"
              width={250}
              height={250}
              style={{ objectFit: "contain" }}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
