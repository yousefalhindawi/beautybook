import React from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";

const StaffModal = ({
  showModal,
  setShowModal,
  staff,
  setStaff,
  handleAddSubmit,
  handleUpdateSubmit,
  isAdding = true, // default to true
  isUpdating = false, // default to false
  errorMessage,
  resetStatus,
  resetSelectedItem,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        resetStatus();
        resetSelectedItem();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Staff</Modal.Title>
      </Modal.Header>
      <Form onSubmit={isAdding ? handleAddSubmit : handleUpdateSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={staff?.name}
              onChange={(e) => setStaff({ ...staff, name: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={staff?.email}
              onChange={(e) => setStaff({ ...staff, email: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={staff?.phone}
              onChange={(e) => setStaff({ ...staff, phone: e.target.value })}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
              resetStatus();
              resetSelectedItem();
            }}
          >
            Close
          </Button>
          <Button variant="primary" type="submit">
            {isAdding ? "Add" : "Update"}
          </Button>
        </Modal.Footer>
      </Form>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </Modal>
  );
};

export default StaffModal;
