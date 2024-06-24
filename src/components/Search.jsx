// import React from 'react';
import './Search.css';
import { SearchIcon } from 'lucide-react';

const Search = () => {
  return (
    <div className='Search-container'>
      <div className='Tags'>
        <h4>Tags</h4>
        <button><SearchIcon style={{ width: "20px", height: "20px" }} /></button>
      </div>
      <div className='Color'>
        <h4>Color</h4>
        <button>Enter hex or select</button>
      </div>
    </div>
  );
};

export default Search;
