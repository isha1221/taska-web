import React from "react";
import { motion } from "framer-motion";
import githubIcon from "../../image/icons8-github-24.png";
import linkedinIcon from "../../image/linkedin.svg";
import callIcon from "../../image/icons8-phone-50.png";
import mailIcon from "../../image/icons8-mail-24.png";
import { Grid } from "@mui/material";
import "./foooter.css";

const Footer: React.FC = () => {
  return (
    <Grid container className="footer-container">
      <footer className="footer">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className="icon-container"
        >
          <motion.a
            href="https://github.com/isha1221"
            className="icon-wrapper"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.img
              src={githubIcon}
              alt="GitHub"
              className="icon"
              whileHover={{ rotate: 360 }}
            />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/isha-pathak-40aa91215"
            className="icon-wrapper"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.img
              src={linkedinIcon}
              alt="LinkedIn"
              className="icon"
              whileHover={{ rotate: 360 }}
            />
          </motion.a>
          <motion.a
            href="mailto:ishapathak515@gmail.com"
            className="icon-wrapper"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.img
              src={mailIcon}
              alt="Mail"
              className="icon"
              whileHover={{ rotate: 360 }}
            />
          </motion.a>
          <motion.a
            href="tel:+9322890365"
            className="icon-wrapper"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.img
              src={callIcon}
              alt="Call"
              className="icon"
              whileHover={{ rotate: 360 }}
            />
          </motion.a>
        </Grid>
      </footer>
    </Grid>
  );
};

export default Footer;
