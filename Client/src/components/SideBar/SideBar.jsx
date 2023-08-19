// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';


import './SideBar.css'

// eslint-disable-next-line react/prop-types
const SideBar = ({openDialog}) => {


  const [buttonColors, setButtonColors] = useState([
    { color: '#fc6f03', label: 'Urgent' },
    { color: '#fcf403', label: 'Personal' },
    { color: '#03ecfc', label: 'Meeting' },
    { color: '#fc03f0', label: 'Work' },
  ]);



  return (

    <div className='sidebar__container'>
      <div className='sidebar__wrapper'>

        <div className='sidebar__header'>
          <p>Note</p>
        </div>

        <div className='sidebar__newnotes'>
          {buttonColors.map((button, index) => (
            <button
              key={index}
              className='sidebar__button'
              style={{ backgroundColor: button?.color }}
              onClick={() => openDialog(button?.color)}
            >
              <span>{button.label}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

export default SideBar