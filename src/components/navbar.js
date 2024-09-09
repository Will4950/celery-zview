"use client";
import Image from "next/image";
import { Container, Navbar } from "react-bootstrap";
import celery from "./celery.png";

export default function Nav() {
  return (
    <Navbar bg="light" fixed="top">
      <Container>
        <Navbar.Brand>
          <Image
            src={celery.src}
            alt="celery"
            width={30}
            height={30}
            style={{ objectFit: "contain" }}
          ></Image>
          <span className="ms-3 text-success fw-bold">Celery </span>
          <span className="text-primary fw-bold">ZView</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
