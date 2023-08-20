import React, { useEffect, useRef } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {deleteNote, clearErrors} from '../../action/notesAction'
import { useAlert } from 'react-alert';
import { DELETE_NOTE_RESET } from '../../constants/notesConstants';


// eslint-disable-next-line react/prop-types
const DeleteModel = ({isOpen, onClose, note}) => {

    const dispatch = useDispatch()
    const alert = useAlert();

    const {error: deleteError, isDeleted} = useSelector(state=>state.deleteNote);

    
    const modelRef = useRef(null);

    const handleCloseOutsideClick = (event) => {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    useEffect(() => {
        if (isOpen) {
          document.addEventListener('mousedown', handleCloseOutsideClick);
        } else {
          document.removeEventListener('mousedown', handleCloseOutsideClick);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleCloseOutsideClick);
        };
      }, [isOpen]);

    useEffect(() => {
        if(deleteError){
            // eslint-disable-next-line no-undef
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            dispatch({type: DELETE_NOTE_RESET})
        }
    }, [dispatch, alert, deleteError, isDeleted, onClose])

    const deleteNoteHandler = (id) => {
        dispatch(deleteNote(id))
        alert.success("Note Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
      }, 2000);
    }

    if(!isOpen) return null

    const noteID = note._id

  return (
    <div className={`create__model__container ${isOpen ? 'visible' : ''}`}>

        <div className='create__model__wrapper' onClick={(e) => e.stopPropagation()} ref={modelRef}>

            <div className='form__container'>

                <p className='delete_confirmation'>Did you want to delete the selected note?</p>

            <div className='model__footer'>
                <button onClick={onClose} className='close__btn'>Cancel</button>
                <input type='submit' value='Delete' onClick={() => deleteNoteHandler(noteID)}/>
            </div>

            </div>

        </div>
    </div>
  )
}

export default DeleteModel