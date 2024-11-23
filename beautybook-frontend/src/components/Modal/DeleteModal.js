import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
  handleDeleteConfirm,
  deletedItemName,
}) => {
  return (
    <Modal
      show={showDeleteModal}
      onHide={() => setShowDeleteModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the {deletedItemName}
        {/* <strong>{selectedAppointment?.name}</strong>? */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
