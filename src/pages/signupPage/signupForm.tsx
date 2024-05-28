import { useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom"; // For redirection
import "./signupForm.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { setCookie } from "../utils/cookies";
import routes from "../../routes";

export function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    branch: "",
    bio: "",
  });

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // For redirection

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: emailRegex.test(value) ? "" : "Invalid email address.",
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordValid = (password: string) => {
    return (
      password.length >= 8 &&
      /[a-zA-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^\w\s]/.test(password) // Special characters
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (errors.email) {
      setErrorMessage("Invalid email address.");
      return;
    }

    if (!isPasswordValid(password)) {
      setErrorMessage(
        "Password must be at least 8 characters and contain alphanumeric and special characters."
      );
      return;
    }

    setErrorMessage("");

    try {
      // Send the signup data to the backend
      const response = await axios.post(
        "https://tr0sfbtq-6969.inc1.devtunnels.ms/user/signup",
        {
          username: formData.username,
          fullName: formData.name,
          email: formData.email,
          branch: formData.branch,
          password,
          bio: formData.bio,
        }
      );

      setCookie(response.data.id); //cookies set

      navigate(routes.Login); // Redirect to the profile page
    } catch (error: any) {
      if (error.response) {
        // Handle specific error messages from the backend
        setErrorMessage(error.response.data.error || "Signup failed");
      } else if (error.request) {
        // Handle network errors
        setErrorMessage("Network error: Please check your connection.");
      } else {
        setErrorMessage("An error occurred: " + error.message); // Other errors
      }
    }
  };

  return (
    <div className="container">
      <div className="signup-form-container">
        <h2 className="signup-form-title">Sign Up and enjoy!</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              onChange={handleChange}
            />
            <div className="input-bottom-gradient" />
          </div>

          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="John123"
              onChange={handleChange}
            />
            <div className="input-bottom-gradient" />
          </div>

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@example.com"
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
            <div className="input-bottom-gradient" />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage("");
              }}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="password-toggle-icon"
              onClick={togglePasswordVisibility}
            />
            {errorMessage && (
              <span className="error-message">{errorMessage}</span>
            )}
            <div className="input-bottom-gradient" />
          </div>

          <div className="input-field">
            <label htmlFor="branch">Branch</label>
            <select id="branch" name="branch" onChange={handleChange}>
              <option value="" hidden>
                Select your branch
              </option>
              <option value="computer-science">Computer Science</option>
              <option value="electrical-engineering">
                Electrical Engineering
              </option>
              <option value="mechanical-engineering">
                Mechanical Engineering
              </option>
              <option value="civil-engineering">Civil Engineering</option>
              <option value="business">Business</option>
            </select>
            <div className="input-bottom-gradient" />
          </div>

          <div className="input-field">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself..."
              rows={3}
              onChange={handleChange}
            />
            <div className="input-bottom-gradient" />
          </div>
          {errorMessage && (
            <span className="error-message">{errorMessage}</span>
          )}
          <button
            className="signup-form-button"
            type="submit"
            disabled={!!errors.email}
          >
            Sign Up
            <div className="button-bottom-gradient" />
          </button>
        </form>
      </div>
      <div className="blob"></div>
    </div>
  );
}
