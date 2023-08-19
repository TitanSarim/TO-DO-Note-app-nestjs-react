import React from 'react'

import Search from './Search'


import './Nav.css'

// eslint-disable-next-line react/prop-types
const Nav = ({onSearch}) => {
  return (
    <div className='nav__container'>

        <div>
            <Search onSearch={onSearch}/>
        </div>


    </div>
  )
}

export default Nav