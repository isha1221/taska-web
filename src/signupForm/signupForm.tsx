import React from 'react';
import './signupForm.styles.css';
import blob2 from '../blob.svg';
import Foregound1 from '../screen/foregound1';



export function SignupForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
   
    
		<div className="container">
     <div className='main'>
    <div className="signup-form-container">
      <h2 className="signup-form-title">Sign Up for Our Service</h2>
      <p className="signup-form-subtitle">
        Fill out the form below to create your account.
      </p>

      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="firstname">First Name</label>
          <input id="firstname" type="text" placeholder="John" />
          <div className="input-bottom-gradient" />
        </div>

        <div className="input-field">
          <label htmlFor="lastname">Last Name</label>
          <input id="lastname" type="text" placeholder="Doe" />
          <div className="input-bottom-gradient" />
        </div>

        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="example@example.com" />
          <div className="input-bottom-gradient" />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="********" />
          <div className="input-bottom-gradient" />
        </div>

        <div className="input-field">
          <label htmlFor="branch">Branch</label>
          <input id="branch" type="text" placeholder="Computer Science" />
          <div className="input-bottom-gradient" />
        </div>

        <div className="input-field">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            placeholder="Tell us about yourself..."
            rows={3}
          />
          <div className="input-bottom-gradient" />
        </div>

        <button className="signup-form-button" type="submit">
          Sign Up
          <div className="button-bottom-gradient" />
        </button>
      </form>
    </div>
    
    </div>
    <div className="blob"></div>
  </div>
  );
}


