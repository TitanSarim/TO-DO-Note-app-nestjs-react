import React from 'react'

import {BsSearch} from 'react-icons/bs'


import './Search.css'

const Search = () => {
  return (
    <div className='search__container'>

        <div className='search__wrapper'>
            <input placeholder='Seach...'/>
            <button>
                    <BsSearch size={19}/>
            </button>
        </div>

    </div>
  )
}

export default Search