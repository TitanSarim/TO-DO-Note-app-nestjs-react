import { useState } from 'react'

import './App.css'
import Nav from './components/Nav'
import SideBar from './components/SideBar/SideBar'
import Body from './components/Body/Body'
import CreateModel from './components/Models/CreateModel'
import ShowModel from './components/Models/ShowModel'
import DeleteModel from './components/Models/DeleteModel'


function App() {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenTwo, setIsDialogOpenTwo] = useState(false);
  const [isDialogOpenThree, setIsDialogOpenThree] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  
  const openDialogOne = (color) => {
    setSelectedColor(color);
    setIsDialogOpen(true);
  };


  const openDialogTwo = (note) => {
    setSelectedNote(note);
    setIsDialogOpenTwo(true);
  };

  const openDialogThree = (note) => {
    setSelectedNote(note);
    setIsDialogOpenThree(true);
  };

  const closeDialogOne = () => {
    setIsDialogOpen(false);
  };

  const closeDialogTwo = () => {
    setIsDialogOpenTwo(false);
  };

  const closeDialogThree = () => {
    setIsDialogOpenThree(false);
  };

  return (
    <div className='app__container'>

      <div className='app__wrapper'>
        
        <div>
        {/*Nav is a  search  */}
            <Nav onSearch={setSearchQuery}/>
        </div>

        <div className='app__body'>
          <SideBar openDialog={openDialogOne}/>
          <div className={`body__opacity ${isDialogOpen === true || isDialogOpenTwo || isDialogOpenThree === true ? 'blur' : ''}`} >
            <Body openDialogTwo={openDialogTwo} openDialogThree={openDialogThree} searchQuery={searchQuery}/>
          </div>
        </div>

        <div className='models__container'>
          <CreateModel onClose={closeDialogOne} isOpen={isDialogOpen} color={selectedColor}/>
          <ShowModel onClose={closeDialogTwo} isOpen={isDialogOpenTwo} note={selectedNote} />
          <DeleteModel onClose={closeDialogThree} isOpen={isDialogOpenThree} note={selectedNote}/>
        </div>

      </div>

    </div>
  )
}

export default App
