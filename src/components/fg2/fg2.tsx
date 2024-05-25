import React from 'react';
import Flame from '../flame/flame';
import profile_img from '../../assets/penguin.png';
import './fg2.css'; // Create and import a CSS file for styles

const Foreground2 = () => {
  return (
    <div className='foreground-container'>
      <Flame />
      <div className="image-container">
        <img src={profile_img} alt="Profile" className='profile-img' />
      </div>
    </div>
  );
};

export default Foreground2;
