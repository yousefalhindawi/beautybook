import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { logout } from "../../redux/auth/auth.actions";
import { jwtDecode } from "jwt-decode";
// import { logout } from "../../redux/actions/authActions";

const AppNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token") || null;
  const isAuthenticated = !!user || !!token;
  const decodedToken = token ? jwtDecode(token) : {};

  console.log(decodedToken);
  const userName = user?.name || decodedToken.name;

  const handleLogout = () => {
    dispatch(logout());
    // navigate("/login");
  };

  return (
    <Navbar bg="primary" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand>
          <NavLink to="/" className="nav-link text-light">
            BeautyBook
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <>
                {/* <Nav.Link> */}
                <NavLink to="/appointments" className="nav-link text-light">
                  Appointments
                </NavLink>
                {/* </Nav.Link> */}
                {/* <Nav.Link> */}
                <NavLink to="/services" className="nav-link text-light">
                  Services
                </NavLink>
                {/* </Nav.Link> */}
                {/* <Nav.Link> */}
                <NavLink to="/staffs" className="nav-link text-light">
                  Staff
                </NavLink>
                {/* </Nav.Link> */}
              </>
            )}
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <>
                <NavDropdown title={userName} id="user-dropdown" align="end">
                  <NavDropdown.Item onClick={handleLogout}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  className="me-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="outline-light"
                  className="me-2"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
