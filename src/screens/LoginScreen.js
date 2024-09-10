import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { loginUser } from "../features/user/userSlice";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.user);
  const { error, loading, user } = userLogin;

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, user, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email: email, password: password }));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div className="py-3">
          <Button type="submit" variant="primary">
            Sign In
          </Button>
        </div>
      </Form>

      <Row className="py-3">
        <div className="text-center text-muted p-1">
          <i>If you are a student please register using this link</i>
        </div>
        <Col>
          New Student?{" "}
          <Link
            to={
              redirect
                ? `/register-student?redirect=${redirect}`
                : "/register-student"
            }
          >
            Register as Student
          </Link>
        </Col>
      </Row>
      <Row className="py-3">
        <div className="text-center text-muted p-1">
          <i>If you are a teacher please register using this link</i>
        </div>
        <Col>
          New Teacher?{" "}
          <Link
            to={
              redirect
                ? `/register-teacher?redirect=${redirect}`
                : "/register-teacher"
            }
          >
            Register as Teacher
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
