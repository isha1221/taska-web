import React from 'react';
import './flame.css'; // Create and import a CSS file for styles
import { Paper } from '@mui/material';
import profile_img from '../../assets/penguin.png';

const Flame = () => {
  return (
   
    <>
<div className="flame">
   
</div>

<svg>
    <filter id='wave'>
    <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="2">
        <animate attributeName='baseFrequency' dur="15" values='0.01; 0.02; 0.01;' repeatCount="indefinite" />

    </feTurbulence>
    <feDisplacementMap in="SourceGraphic" scale="30"></feDisplacementMap>
    </filter>
</svg>

</>
  );
};

export default Flame;
