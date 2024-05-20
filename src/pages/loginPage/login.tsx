import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Grid } from '@mui/material';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // For redirection

import './login.styles.css';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(''); // Store email input
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // For redirection

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Send login request with axios
      const response = await axios.post('https://tr0sfbtq-6969.inc1.devtunnels.ms/user/login', {
        email,
        password,
      });

      const { token } = response.data; // Extract the JWT token from the response
      localStorage.setItem('authToken', token); // Store the JWT token

      // Redirect to a different page upon successful login
      navigate('/profile');
    } catch (error: any) {
      // Check if the error is from the server or network-related
      if (error.response) {
        setErrorMessage(error.response.data.error || 'Login failed'); // Server error
      } else if (error.request) {
        setErrorMessage('Network error: Please check your connection.'); // Network error
      } else {
        setErrorMessage('An error occurred: ' + error.message); // Other errors
      }
    }
  };

  return (
    <div className="container">
      <div className="loginPageContainer">
        <h2 className="loginPage-title">Let's get started!</h2>

        <form className="loginPage" onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage(''); // Reset error message when email changes
              }}
            />
            <div className="input-bottom-gradient" />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage('');
              }}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
              className="password-toggle-icon"
            />
            <div className="input-bottom-gradient" />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button className="loginPage-button" type="submit">
            Login
            <div className="button-bottom-gradient" />
          </button>

          <Grid container>
            <Grid item xs={12} className="text" display={'flex'} justifyContent={'center'}>
              <h3>Don't have an account? Sign Up</h3>
            </Grid>
          </Grid>
        </form>
      </div>
 <div className='blob'></div>
    </div>
  );
}
