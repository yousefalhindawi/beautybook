// import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
const AppointmentModal = ({
  showModal,
  setShowModal,
  appointment,
  setAppointment,
  //   service,
  //   setService,
  handleAddSubmit,
  handleUpdateSubmit,
  isAdding = true, // default to true
  isUpdating = false, // default to false
  errorMessage,
  resetStatus,
  resetSelectedItem,
  //   services,
  // setServices,
  //   staffs,
  // setStaffs
}) => {
  const staffs = useSelector((state) => state.staff.staffs);
  const services = useSelector((state) => state.service.services);
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
        <Modal.Title>Add Appointment</Modal.Title>
      </Modal.Header>
      {/* <Form onSubmit={isAdding ? handleAddSubmit : handleUpdateSubmit}>
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
      </Form> */}
      <Form onSubmit={isAdding ? handleAddSubmit : handleUpdateSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <DatePicker
              selected={new Date(appointment?.date || new Date())}
              onChange={(date) => setAppointment({ ...appointment, date })}
              className="form-control"
              showTimeSelect
              dateFormat="Pp"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Service</Form.Label>
            <Form.Control
              as="select"
              value={appointment?.serviceId}
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  serviceId: parseInt(e.target.value),
                })
              }
              required
            >
              <option value="">Select Service</option>
              {services?.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Staff</Form.Label>
            <Form.Control
              as="select"
              value={appointment?.staffId}
              onChange={(e) =>
                setAppointment({
                  ...appointment,
                  staffId: parseInt(e.target.value),
                })
              }
              required
            >
              <option value="">Select Staff</option>
              {staffs?.map((staffMember) => (
                <option key={staffMember.id} value={staffMember.id}>
                  {staffMember.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* <Form.Group>
            <Form.Label>User</Form.Label>
            <Form.Control
              as="select"
              value={appointment.userId}
              onChange={(e) =>
                setAppointment({ ...appointment, userId: parseInt(e.target.value) })
              }
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group> */}
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={appointment?.status || "pending"}
              onChange={(e) =>
                setAppointment({ ...appointment, status: e.target.value })
              }
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </Form.Control>
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

export default AppointmentModal;
