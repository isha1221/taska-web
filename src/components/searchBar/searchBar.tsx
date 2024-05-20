import React from 'react';
import './searcBar.css';

interface SearchBarProps {
  onChange: (term: string) => void;
  value: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange, value }) => {
  return (
    <>
    <input
      type="text"
      placeholder="Search friends..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    className='searchBar'
    />
    <div className='input-bottom-gradient'></div>
    </>
  );
};

export default SearchBar;
