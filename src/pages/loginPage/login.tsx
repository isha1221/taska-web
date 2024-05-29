import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Grid, CircularProgress } from "@mui/material"; // Import CircularProgress
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.styles.css";
import { setCookie } from "../../utils/cookies";
import { Base_Url } from "../../config/api.config";
import useUserStore, { UserState } from "../../stores/useUserStore";
import routes from "../../routes";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();
  const sendTo = () => navigate(routes.SignUp);

  const setUser = useUserStore((state) => state.setUser);
  const setError = useUserStore((state) => state.setError);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${Base_Url}/getAuth`, {
          withCredentials: true,
        });
        const userData: UserState = response.data;
        setUser(userData);
        navigate("/app/profile");
      } catch (error) {
        toast.error("Please login to continue.");
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [navigate, setUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true on form submission

    try {
      const response = await axios.post(
        `${Base_Url}/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const userData: UserState = response.data;

      setCookie(userData.id);
      setUser(userData);
      setLoading(false); // Set loading state to false after successful login
      navigate("/app/task");
    } catch (error: any) {
      setLoading(false); // Set loading state to false if login fails
      if (error.response) {
        setErrorMessage(error.response.data.error || "Login failed");
        setError(error.response.data.error || "Login failed");
      } else if (error.request) {
        setErrorMessage("Network error: Please check your connection.");
        setError("Network error: Please check your connection.");
      } else {
        setErrorMessage("An error occurred: " + error.message);
        setError("An error occurred: " + error.message);
      }
    }
  };

  return (
    <div className="container">
      <ToastContainer />
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
                setErrorMessage("");
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

          {loading ? ( // Conditionally render CircularProgress while loading
            <CircularProgress />
          ) : (
            <>
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
                  <h3 onClick={sendTo}>Don't have an account? Sign Up</h3>
                </Grid>
              </Grid>
            </>
          )}
        </form>
      </div>
      <div className="blob"></div>
    </div>
  );
}
