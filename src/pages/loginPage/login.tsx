import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@mui/material";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom"; // For redirection

import "./login.styles.css";
import { setCookie } from "../utils/cookies";
import { Base_Url } from "../../config/api.config";
import useUserStore, { UserState } from "../../stores/useUserStore"; // Import the Zustand store

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState(""); // Store email input
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // For redirection

  const setUser = useUserStore((state) => state.setUser);
  const setLoading = useUserStore((state) => state.setLoading);
  const setError = useUserStore((state) => state.setError);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send login request with axios
      const response = await axios.post(
        `${Base_Url}/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true, // Include this to ensure cookies are sent and received
        }
      );
      const userData: UserState = response.data;

      setCookie(userData.id);
      setUser(userData); // Set user data in the Zustand store
      setLoading(false);

      // Redirect to a different page upon successful login
      navigate("/app/profile");
    } catch (error: any) {
      setLoading(false);
      // Check if the error is from the server or network-related
      if (error.response) {
        setErrorMessage(error.response.data.error || "Login failed"); // Server error
        setError(error.response.data.error || "Login failed");
      } else if (error.request) {
        setErrorMessage("Network error: Please check your connection."); // Network error
        setError("Network error: Please check your connection.");
      } else {
        setErrorMessage("An error occurred: " + error.message); // Other errors
        setError("An error occurred: " + error.message);
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
                setErrorMessage(""); // Reset error message when email changes
              }}
            />
            <div className="input-bottom-gradient" />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? "password" : "text"}
              placeholder="********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage("");
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
            <Grid
              item
              xs={12}
              className="text"
              display={"flex"}
              justifyContent={"center"}
            >
              <h3>Don't have an account? Sign Up</h3>
            </Grid>
          </Grid>
        </form>
      </div>
      <div className="blob"></div>
    </div>
  );
}
