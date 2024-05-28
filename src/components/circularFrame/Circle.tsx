import React from "react";
import "./circle.css";

const Circle: React.FC<{ imageUrl: string | null; alt?: string }> = ({
  imageUrl,
  alt,
}) => {
  return (
    <div className="inner">
      <img
        src={imageUrl || "/profile.png"}
        alt={alt || "Profile"}
        className="profile_img"
      />
    </div>
  );
};

export default Circle;
