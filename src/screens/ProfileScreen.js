import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../features/user/userSlice";

function ProfileScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, user } = useSelector((store) => store.user);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getUserDetails(user.id));
    }
  }, [dispatch, navigate, user]);

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <p>{user.email}</p>
      </Col>

      <Col md={9}>
        <h2>My Details</h2>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
