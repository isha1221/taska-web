import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";
import { Link, Routes } from "react-router-dom";
import Task from "../../pages/taskPage/Task";
import routes from "../../routes";

const Navbar: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const offset = 50;
    if (window.scrollY > offset) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="mainNav">
      <nav className={`navbar ${isSticky ? "sticky" : ""}`}>
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
