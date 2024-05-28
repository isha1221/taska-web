import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../routes";
import axios from "axios";
import { Base_Url } from "../../config/api.config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const logoutresp = await axios.post(
        `${Base_Url}/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (logoutresp.status === 200) {
        toast.success("Logout successful!");
        setTimeout(() => {
          navigate(routes.Login);
        }, 1500); // 1500ms delay before navigating to the login page
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      toast.error("An error occurred during logout");
    } finally {
      toggleMenu();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="mainNav">
      <ToastContainer />
      <nav className="navbar">
        <ul className="navbar-links">
          <li>
            <Link to={routes.Dashboard}>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link to={routes.Task}>
              <a>Task</a>
            </Link>
          </li>
          <li>
            <Link to={routes.Friends}>
              <a>Friendlist</a>
            </Link>
          </li>
        </ul>
        <div className="hamburger-menu" ref={menuRef}>
          <button onClick={toggleMenu} className="hamburger-button">
            ☰
          </button>
          {isMenuOpen && (
            <div className="dropdown-menu">
              <ul>
                <li>
                  <Link to={routes.Profile} onClick={toggleMenu}>
                    <a>Profile</a>
                  </Link>
                </li>
                <li>
                  <Link to={routes.LeaderBoard} onClick={toggleMenu}>
                    <a>Leader Board</a>
                  </Link>
                </li>
                <li>
                  <button onClick={logoutHandler}>
                    <a>Logout</a>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
