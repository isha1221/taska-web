import "./arrowButton.css";
import { useNavigate } from "react-router-dom";
import routes from "../../routes";

const ArrowButton = () => {
  const navigate = useNavigate();
  const sendTo = () => {
    navigate(routes.SignUp);
  };
  return (
    <button className="arrow-button" onClick={sendTo}>
      Get Started
      <svg
        className="arrow-icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h14M12 5l7 7-7 7"
        />
      </svg>
    </button>
  );
};

export default ArrowButton;
