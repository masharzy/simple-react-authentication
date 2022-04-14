import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { app } from "../../firebase.init";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Register = () => {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [name, setName] = useState("");

  const oneSpecialCharacter = /(?=.*?[#?!@$%^&*-])/;
  const minimumLength = /.{6,}/;

  const handleNameBlur = (e) => {
    setName(e.target.value);
  };
  const handleEmailBlur = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("gmail", "yahoo")) {
      setEmailError("Email address extension must be gmail or yahoo");
    } else {
      setEmailError("");
    }
    if (!oneSpecialCharacter.test(password)) {
      setError("Password must contain at least one special character");
    } else if (!minimumLength.test(password)) {
      setError("Password must be at least 6 characters long");
    } else {
      setError("");
    }

    if (
      email.includes("@gmail.com", "@yahoo.com") &&
      oneSpecialCharacter.test(password) &&
      minimumLength.test(password)
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setEmail("");
          setPassword("");
          setUserName();
          verifyEmail();
        })
        .catch((error) => {
          const errorMessage = error.message;
          const newErrorMessage = errorMessage
            .split("Firebase: Error (auth/")
            .join("")
            .split("-")
            .join(" ")
            .split(").")
            .join("");
          console.error(errorMessage.split("Firebase: Error (auth/").join(""));
          setFirebaseError(newErrorMessage);
        });
    }
  };

  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("Name updated");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setFirebaseError(errorMessage);
      });
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      setFirebaseError("");
      setSuccessMessage("Verification Email Sent");
    });
  };

  return (
    <div className="container">
      <div className="row w-50 mx-auto mt-3">
        <Form onSubmit={handleFormSubmit}>
          <h2 className="text-center text-primary my-3">Register</h2>
          <h4
            style={{ textTransform: "capitalize" }}
            className="text-danger text-center mb-3"
          >
            {firebaseError}
          </h4>
          <h3 className="text-success text-center mb-3">{successMessage}</h3>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onBlur={handleNameBlur}
              type="text"
              placeholder="Your Name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmailBlur}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-danger" style={{ fontSize: "16px" }}>
              {emailError}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePasswordBlur}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Text className="text-danger" style={{ fontSize: "16px" }}>
              {error}
            </Form.Text>
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex justify-content-between align-items-center"
            controlId="formBasicCheckbox"
          >
            <Link to="/login" variant="link">
              Already Registered?
            </Link>
            <Link to="/forgetPassword" variant="link">
              Forget Password?
            </Link>
          </Form.Group>
          <Button className="w-100" variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
