import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, resetAuthStatus } from "../../redux/auth/auth.actions";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.auth);

  useEffect(() => {
    if (userState.token) {
      navigate("/");
    }
  }, [userState.token, navigate]);

  useEffect(() => {
    return () => {
      dispatch(resetAuthStatus());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reqBody = {
        email,
        password,
      };
      await dispatch(login(reqBody));
    } catch (err) {
      console.log("err", err);
      // setError("Invalid credentials");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="w-100">
        <Col xs={12} md={5} className="text-center">
          <img
            src={require("../../assets/images/rb_5764.png")}
            alt="BeautyBook"
            className="img-fluid"
          />
        </Col>
        <Col xs={12} md={6} className="m-auto">
          <h2 className="text-center mb-4">Login</h2>
          {userState.error && <Alert variant="danger">{userState.error}</Alert>}
          <Form onSubmit={handleSubmit}>
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
            <Button variant="primary" type="submit" className="w-100 mb-2">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
