import React from 'react';
import { FaPlus } from 'react-icons/fa'; // FontAwesome Plus icon
import './floatingActionButton.styles.css';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button className="fab" onClick={onClick}>
      <FaPlus />
    </button>
  );
};

export default FloatingActionButton;
