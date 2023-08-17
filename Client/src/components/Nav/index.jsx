import React from 'react'

import Search from './Search'
import Avatar from './Avatar'


import './Nav.css'

const Nav = () => {
  return (
    <div className='nav__container'>

        <div>
            <Search/>
        </div>

        <div>
            <Avatar/>
        </div>


    </div>
  )
}

export default Nav