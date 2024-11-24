import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "../../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/auth.actions";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.auth);

  useEffect(() => {
    if (userState.user) {
      navigate("/login");
    }
  }, [userState.user, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reqBody = { email, password, name, phone, address, role };
      console.log(reqBody);
      await dispatch(register(reqBody));
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center p-4"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100">
        <Col xs={12} md={5} className="text-center m-auto">
          <img
            src={require("../../assets/images/rb_5764.png")}
            alt="BeautyBook"
            className="img-fluid"
          />
        </Col>
        <Col xs={12} md={6} className="m-auto">
          <h2 className="text-center mb-4">Register</h2>
          {/* {error && <Alert variant="danger">{error}</Alert>} */}

          <Form
            onSubmit={handleSubmit}
            className="p-4 border rounded shadow bg-light"
          >
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group> */}
            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
            {userState.error && (
              <Alert variant="danger">{userState.error}</Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
