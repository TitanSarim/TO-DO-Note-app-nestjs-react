import {useState, useEffect} from 'react'
import {RxCross2} from 'react-icons/rx'
import {useSelector, useDispatch} from 'react-redux';
import {getNotes, clearErrors} from '../../action/notesAction'
import {useAlert} from 'react-alert'
import Loader from './Loader'

import './Body.css'





// eslint-disable-next-line react/prop-types
const Body = ({ openDialogTwo, openDialogThree, searchQuery }) => {

  const dispatch = useDispatch();
  const alert = useAlert(); 
  
  const [buttonColors, setButtonColors] = useState([
    { color: '#fc6f03', label: 'Urgent' },
    { color: '#fcf403', label: 'Personal' },
    { color: '#03ecfc', label: 'Meeting' },
    { color: '#fc03f0', label: 'Work' },
  ]);

  const {allNotes, error, loading} = useSelector(state=>state.allNotes)

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors());
    }
    dispatch(getNotes());
  }, [alert, dispatch, error])


  function truncateWords(text, wordLimit) {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    const truncatedWords = words.slice(0, wordLimit);
    return `${truncatedWords.join(' ')} ...`;
  }

  function getBackgroundColor(category) {
    const foundCategory = buttonColors.find(button => button.label === category);
    return foundCategory ? foundCategory.color : 'transparent';
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${daysOfWeek[date.getDay()]} - ${month}`;
  }

  function compareNotesByDate(noteA, noteB) {
    const dateA = new Date(noteA.createdAt);
    const dateB = new Date(noteB.createdAt);
    return dateB - dateA; 
  }

  const filteredNotes = allNotes.filter((note) => {
    const searchRegex = new RegExp(searchQuery, 'i');
    return searchRegex.test(note.title) || searchRegex.test(note.content) || searchRegex.test(note.category);
  }).sort(compareNotesByDate);


  return (
    <>
      {loading ? 
        
        <div className='loader_container'>
          <Loader/>
        </div>
      
       : (
      
        <div className='notes__container'>


          {filteredNotes.length === 0 ? (
          
              <div>
                <p className='no_notes'>No Notes</p>
              </div>
            ):(
              <div className='notes__wrapper'>   
                {filteredNotes.map((note) => (

                  <div key={note._id} className='notes__body'>

                    <div className='notes__content' onClick={() => openDialogTwo(note)}>

                      <div className='notes__header'>
                        <div className='notes__title'>
                          <p>{note.category}</p>
                          <div></div>
                        </div>
                        <span style={{ backgroundColor: getBackgroundColor(note.category) }}></span>
                      </div>

                      <div className='notes__desc'>
                        <p>{truncateWords(note.title, 2)}</p>
                        <span>{truncateWords(note.content, 12)}</span>
                      </div>

                      <div className='note_date'>
                        <p>{formatDate(note.createdAt)}</p>
                      </div>


                    </div>

                    <div className='delete__note' onClick={() => openDialogThree(note)}>
                      <span ><RxCross2 size={20}/></span>
                    </div>


                  </div>
                ))}
              </div>
            )}
        

        </div>
      )}
    </>
  )
}

export default Body

