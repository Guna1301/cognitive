import React, { useState } from 'react';
import './AuthForm.css';
import SignInForm from './loginForm';
import SignUpForm from './signupForm';

const AuthForm = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const toggleMode = () => {
    setIsSignUpMode((prevMode) => !prevMode);
  };

  return (
    <div className={`container2 ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container2">
        <div className="signin-signup">
          <SignInForm />
          <SignUpForm />
        </div>
      </div>

      <div className="panels-container2">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>
              Start your personalized cognitive training journey today. Fun games, insightful progress, and a better learning experience await you!
            </p>
            <button className="btn transparent" onClick={toggleMode} id="sign-up-btn">
              Get Started
            </button>
          </div>
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>Already on your journey?</h3>
            <p>
              Welcome back! Let’s pick up where you left off and continue boosting those brain skills with activities made just for you.
            </p>
            <button className="btn transparent" onClick={toggleMode} id="sign-in-btn">
              SIGN IN
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthForm;
