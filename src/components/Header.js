import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import { logout } from "../features/user/userSlice";

function Header() {
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Navbar.Brand as={Link} to="/" className="ms-3">
        Tech School
      </Navbar.Brand>

      <Navbar id="basic-navbar-nav" className="justify-content-end me-3">
        {user && user.is_admin && (
          <NavDropdown title="Admin" id="adminmenue">
            <LinkContainer to="/admin/user-list">
              <NavDropdown.Item>Users</NavDropdown.Item>
            </LinkContainer>

            <LinkContainer to="/admin/productlist">
              <NavDropdown.Item>Products</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
        )}
        {user ? (
          <div className="container">
            <NavDropdown
              title={user.first_name !== null ? user.first_name : user.email}
              id="username"
            >
              <LinkContainer to="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>

              <NavDropdown.Item
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            <Nav>
              <Nav.Link></Nav.Link>
            </Nav>
          </div>
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
