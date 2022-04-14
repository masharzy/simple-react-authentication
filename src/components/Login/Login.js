import {
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { app } from "../../firebase.init";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import GoogleLogo from "../../images/Google.svg";
import GithubLogo from "../../images/GitHub.svg";
import FacebookLogo from "../../images/Facebook.svg";

const Login = () => {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [userDetail, setUserDetail] = useState({});


  const handleEmailBlur = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
      setError("");
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setEmail("");
          setPassword("");
          setFirebaseError("");
          setUserDetail(user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const newErrorMessage = (errorMessage.split("Firebase: Error (auth/").join("").split("-").join(" ").split(").").join(""));
          console.error(errorMessage.split("Firebase: Error (auth/").join(""));
          setFirebaseError(newErrorMessage);
        });
  };

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();


  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUserDetail(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const newErrorMessage = (errorMessage.split("Firebase: Error (auth/").join("").split("-").join(" ").split(").").join(""));
        console.error(errorMessage.split("Firebase: Error (auth/").join(""));
        setFirebaseError(newErrorMessage);
      });
  };
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUserDetail(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const newErrorMessage = (errorMessage.split("Firebase: Error (auth/").join("").split("-").join(" ").split(").").join(""));
        console.error(errorMessage.split("Firebase: Error (auth/").join(""));
        setFirebaseError(newErrorMessage);
      });
  };
  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        setUserDetail(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const newErrorMessage = (errorMessage.split("Firebase: Error (auth/").join("").split("-").join(" ").split(").").join(""));
        console.error(errorMessage.split("Firebase: Error (auth/").join(""));
        setFirebaseError(newErrorMessage);
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserDetail({});
      })
      .catch((error) => {
        console.log("An error happened.");
        const errorMessage = error.message;
        const newErrorMessage = (errorMessage.split("Firebase: Error (auth/").join("").split("-").join(" ").split(").").join(""));
        console.error(errorMessage.split("Firebase: Error (auth/").join(""));
        setFirebaseError(newErrorMessage);
      });
  };

  return (
    <div className="container">
      <div className="row w-50 mx-auto mt-3">
        <div className={!userDetail.uid ? "d-none" : "d-block"} id="loggedIn">
          <h1 className="text-center">{userDetail.displayName}</h1>
          <img className="rounded-circle mx-auto d-block" src={userDetail.photoURL} alt="" />
          <Button
            onClick={handleSignOut}
            className="d-block text-center w-25 mx-auto mt-3 mx-auto"
            variant="danger"
            type="submit"
          >
            Sign out
          </Button>
        </div>
        <Form
          onSubmit={handleFormSubmit}
          className={userDetail.uid ? "d-none" : "d-block"}
        >
          <h2 className="text-center text-primary my-3">Login</h2>
          <h4 className="text-danger text-center mb-3" style={{textTransform:"capitalize"}}>{firebaseError}</h4>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmailBlur}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
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
            <Form.Text className="text-danger">{error}</Form.Text>
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex justify-content-between align-items-center"
            controlId="formBasicCheckbox"
          >
            <Link to="/register" variant="link">
              Not Registered?
            </Link>
            <Link to="/forgetPassword" variant="link">
              Forget Password?
            </Link>
          </Form.Group>
          <Button className="w-100" variant="primary" type="submit">
            Login
          </Button>

          <h4 className="text-center my-3">Or Login With</h4>

          <div className="d-flex justify-content-center">
            <img
              style={{ cursor: "pointer" }}
              onClick={handleGoogleSignIn}
              className="mt-2 border p-3 me-1"
              src={GoogleLogo}
              alt=""
            />
            <img
              style={{ cursor: "pointer" }}
              onClick={handleFacebookSignIn}
              className="mt-2 border p-3 me-1"
              src={FacebookLogo}
              alt=""
            />
            <img
              style={{ cursor: "pointer" }}
              onClick={handleGithubSignIn}
              className="mt-2 border p-3"
              src={GithubLogo}
              alt=""
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
