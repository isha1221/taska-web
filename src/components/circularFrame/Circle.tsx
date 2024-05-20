import React from 'react';
import './circle.css';
import profile_img from '../../assets/penguin.png';

const Circle: React.FC = () => {
  return (
    // <div className="rotating-border">  {/* Rotating outer border */}
    //   <div className="fixed-content">  {/* Fixed inner content */}
    //     <img src={profile_img} alt="Profile" />
    //   </div>
    // </div>

    <div className="inner">
 <img src={profile_img} alt="Profile" className='profile_img'/>
  </div>
  );
};

export default Circle;
