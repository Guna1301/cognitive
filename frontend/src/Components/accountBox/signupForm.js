import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import styles from "./styles.module.css";
import { useAuth } from "../../context/AuthContext";

const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api";

const SignUpForm = () => {

  const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(data.password)) {
      setError("Password must contain at least one capital letter and be at least 8 characters long.");
      return;
    }
    if (data.password !== data.cpassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`${backendUrl}/loginusers`, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      await login(data.email, data.password);
      navigate("/Successpage");
    } catch (error) {
      setError(error.response?.data?.message || "Unable to create your account.");
    }
	};


  return (
    <form onSubmit={handleSubmit} className="sign-up-form2">
      <h2 className="title">Sign up</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input onChange={handleChange} type="text" placeholder="Name" name="name" required />
      </div>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input onChange={handleChange} type="email" placeholder="Email" name="email" required />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input onChange={handleChange} type="password" placeholder="Password" name="password" required />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input onChange={handleChange} type="password" placeholder="Confirm Password" name="cpassword" required />
      </div>
      {error && <div className={styles.error_msg}>{error}</div>}
      <button type="submit" className="btn">Sign Up</button>

      <p className="social-text">Or</p>

      <GoogleOAuthProvider
       clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={async res => {
          try {
            await loginWithGoogle(res.credential);
            navigate("/");
          } catch (err) {
            setError("Google sign up failed.");
          }
        }}
        onError={() => {
          setError("Google sign up failed.");
        }}
        useOneTap
      />
      </GoogleOAuthProvider>
    </form>
  );
};

export default SignUpForm;