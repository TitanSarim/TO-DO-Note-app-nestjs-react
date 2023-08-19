import React,{useState} from 'react'

import {BsSearch} from 'react-icons/bs'


import './Search.css'

const Search = ({ onSearch }) => {
  
  const handleSearch = (event) => {
    const query = event.target.value;
    onSearch(query); // Call the provided onSearch function
  };
 

  return (
    <div className='search__container'>

        <div className='search__wrapper'>
            <input 
              placeholder='Seach...' onChange={handleSearch}
            />
            <button>
                    <BsSearch size={19}/>
            </button>
        </div>

    </div>
  )
}

export default Search