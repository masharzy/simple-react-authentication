import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../../firebase.init";

const ForgetPassword = () => {
  const [firebaseError, setFirebaseError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleEmailBlur = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccessMessage("Password reset email sent!");
      })
      .catch((error) => {
        const errorMessage = error.message;
        const newErrorMessage = (errorMessage.split("Firebase: Error (auth/").join("").split("-").join(" ").split(").").join(""));
        console.error(errorMessage.split("Firebase: Error (auth/").join(""));
        setFirebaseError(newErrorMessage);
      });
  };

  return (
    <div className="container">
      <div className="row w-50 mx-auto mt-3">
        <h2 className="text-center text-primary my-3">Reset Password</h2>

        <h4 style={{textTransform:"capitalize"}} className="text-danger text-center mb-3">{firebaseError}</h4>
        <h3 className="text-success text-center mb-3">{successMessage}</h3>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmailBlur}
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group
            className="mb-3 d-flex justify-content-between align-items-center"
            controlId="formBasicCheckbox"
          >
            <Link to="/login" variant="link">
              Go to Login
            </Link>
          </Form.Group>
          <Button className="w-100" variant="primary" type="submit">
            Send Email
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
