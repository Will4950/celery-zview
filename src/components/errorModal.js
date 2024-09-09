import { Button, Modal } from "react-bootstrap";

export default function ErrorModal({ modal, handleClose }) {
  return (
    <Modal show={modal} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header className="bg-danger text-white">
        <Modal.Title>Problem!</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modal}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
