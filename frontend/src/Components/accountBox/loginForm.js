import React, { useState } from "react";
import { useNavigate} from 'react-router-dom'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import styles from "./styles.module.css";
import './AuthForm.css';
import { useAuth } from "../../context/AuthContext";
const SignInForm = () => {

  const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await login(data.email, data.password);
      navigate("/");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

  return (
    <form onSubmit={handleSubmit} className="sign-in-form2">
      <h2 className="title">Sign in</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input onChange={handleChange} name="email" type="email" placeholder="Email" />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input onChange={handleChange} name="password" type="password" placeholder="Password" />
      </div>
      {error && <div className={styles.error_msg}>{error}</div>}
      <button type="submit" className="btn solid" >Login</button>
      <p className="social-text">Or</p>
      <GoogleOAuthProvider 
       clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={async res => {
          try {
            await loginWithGoogle(res.credential);
            navigate("/");
          } catch (err) {
            setError("Google login failed.");
          }
        }}
        onError={() => {
          console.log('Login Failed');
          setError("Google login failed.");
        }}
        useOneTap
      />
      </GoogleOAuthProvider>
    </form>
  );
};
export default SignInForm;