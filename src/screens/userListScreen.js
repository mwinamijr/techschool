import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers } from "../features/user/userSlice";

function UserListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, users, user } = useSelector((store) => store.user);

  useEffect(() => {
    if (user && user.is_admin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, user]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      //dispatch(deleteUser(id));
    }
  };

  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>FULL NAME</th>
              <th>EMAIL</th>
              <th>AD</th>
              <th>TE</th>
              <th>ST</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.email}</td>
                <td>
                  {user.is_admin ? (
                    <i
                      className="bi bi-check-lg"
                      style={{ color: "green" }}
                    ></i>
                  ) : (
                    <i className="bi bi-check-lg" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {user.is_teacher ? (
                    <i
                      className="bi bi-check-lg"
                      style={{ color: "green" }}
                    ></i>
                  ) : (
                    <i className="bi bi-check-lg" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {user.is_student ? (
                    <i
                      className="bi bi-check-lg"
                      style={{ color: "green" }}
                    ></i>
                  ) : (
                    <i className="bi bi-check-lg" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/user/${user.id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i
                        className="bi bi-pencil-square"
                        style={{ color: "#00aaff" }}
                      ></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="light"
                    className="btn-sm"
                    onClick={() => deleteHandler(user.id)}
                  >
                    <i className="bi bi-trash" style={{ color: "red" }}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default UserListScreen;
