import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  const userInfo = { name: "mwinami" };
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Navbar.Brand as={Link} to="/" className="ms-3">
        Tech School
      </Navbar.Brand>

      <Navbar id="basic-navbar-nav" className="justify-content-end me-3">
        {userInfo ? (
          <NavDropdown title={userInfo.name} id="username">
            <LinkContainer
              to="/profile"
              style={{ backgroundColor: "transparent", color: "#212529" }}
            >
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>

            <NavDropdown.Item>Logout</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Nav>
            <Nav.Link as={Link} to="/login">
              <i className="fas fa-user"></i>Login
            </Nav.Link>
          </Nav>
        )}
      </Navbar>
    </Navbar>
  );
}

export default Header;
