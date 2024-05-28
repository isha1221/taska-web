import React from "react";
import "./circle.css";
import profile_img from "../../assets/img3.png";

const Circle: React.FC = () => {
  return (
    <div className="inner">
      <img src={profile_img} alt="Profile" className="profile_img" />
    </div>
  );
};

export default Circle;
