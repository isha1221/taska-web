import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import { Link, Routes } from "react-router-dom";
import Task from "../../pages/taskPage/Task";
import routes from "../../routes";

const Navbar: React.FC = () => {
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

 

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
 

  return (
    <div className="mainNav">
      <nav className='navbar'>
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
                </li> <li>
                  <Link to={routes.Login} onClick={toggleMenu}>
                    <a>Logout</a>
                  </Link>
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
