import { useState } from 'react'

import './App.css'
import Nav from './components/Nav'
import SideBar from './components/SideBar/SideBar'
import Body from './components/Body/Body'

function App() {


  return (
    <div className='app__container'>

      <div className='app__wrapper'>
        
        <div>
            <Nav/>
        </div>

        <div className='app__body'>
          <SideBar/>
          <Body/>
        </div>

      </div>

    </div>
  )
}

export default App
