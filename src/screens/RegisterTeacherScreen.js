import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { registerTeacher } from "../features/user/userSlice";

function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const { error, loading, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, user, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        registerTeacher({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          is_teacher: true,
          is_student: false,
        })
      );
    }
  };

  return (
    <FormContainer>
      <h1>Register Teacher</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="first name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="last name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
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

        <Form.Group controlId="passwordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div className="py-3">
          <Button type="submit" variant="primary">
            Register
          </Button>
        </div>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign In
          </Link>
        </Col>
      </Row>

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
    </FormContainer>
  );
}

export default RegisterScreen;
