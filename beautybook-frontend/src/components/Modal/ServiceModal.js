import React from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";

const ServiceModal = ({
  showModal,
  setShowModal,
  service,
  setService,
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
        <Modal.Title>Add Service</Modal.Title>
      </Modal.Header>
      <Form onSubmit={isAdding ? handleAddSubmit : handleUpdateSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={service?.name}
              onChange={(e) => setService({ ...service, name: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={service?.description}
              onChange={(e) =>
                setService({ ...service, description: e.target.value })
              }
              //   required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price(JOD)</Form.Label>
            <Form.Control
              type="number"
              min="1"
              step="0.01"
              value={service?.price}
              onChange={(e) =>
                setService({ ...service, price: Number(e.target.value) })
              }
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDuration">
            <Form.Label>Duration(minutes)</Form.Label>
            <Form.Control
              type="number"
              min="15"
              step="1"
              value={service?.duration}
              onChange={(e) =>
                setService({ ...service, duration: Number(e.target.value) })
              }
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

export default ServiceModal;
