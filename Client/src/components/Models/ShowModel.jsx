/* eslint-disable react/prop-types */
import React,{useState, useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {updateNote, clearErrors} from '../../action/notesAction'
import { UPDATE_NOTE_RESET } from '../../constants/notesConstants';
import {useAlert} from 'react-alert';

// eslint-disable-next-line react/prop-types
const ShowModel = ({ isOpen, onClose, note }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {loading, error: updateError, isUpdated} = useSelector(state=>state.updateNote)

    const [characterCount, setCharacterCount] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [showError, setShowError] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const [buttonColors, setButtonColors] = useState([
        { color: '#fc6f03', label: 'Urgent' },
        { color: '#fcf403', label: 'Personal' },
        { color: '#03ecfc', label: 'Meeting' },
        { color: '#fc03f0', label: 'Work' },
      ]);
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    
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
        if(updateError){
            alert.error(updateError)
            dispatch(clearErrors())
        }

        if(isUpdated){
            dispatch({type: UPDATE_NOTE_RESET})
        }

    }, [alert, dispatch, isUpdated, updateError])


    function getBackgroundColor(category) {
        const foundCategory = buttonColors.find(button => button.label === category);
        return foundCategory ? foundCategory.color : 'transparent';
    }

        
    const handleTextareaChange = (event) => {

        const inputText = event.target.value;

        if (inputText.length <= 299) {
          setCharacterCount(inputText.length);
        } else {
          const truncatedText = inputText.slice(0, 299);
          event.target.value = truncatedText;
          setCharacterCount(299);
        }

        if (inputText.length >= 20) {
          setCharacterCount(inputText.length);
        }

        setSubmitted(false);
        setContent(inputText);
    }    

    useEffect(() => {
        if (isOpen) {
            setCharacterCount(note?.content.length);
        }
    }, [isOpen, note?.content])
   
    
    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (characterCount < 20) {
            setShowError(true);
          } else if(characterCount > 20) {
            setShowError(false);

            const myForm = {
                title: title || note.title,
                content :content || note.content,
                category: note.category
            }

            dispatch(updateNote(note._id, myForm))
            setTimeout(() => {
              alert.success("Noted Updated Successfully")
              window.location.reload();
            }, 2000);
          }else{
            setSubmitted(true);
          }
         
        
    };

    if(!isOpen) return null
    
    

  return (

   <div className={`create__model__container ${isOpen ? 'visible' : ''}`}>

        <div className='create__model__wrapper' onClick={(e) => e.stopPropagation()} ref={modelRef}>

            <div className='form__container'>

            
                <form className='form__body' encType='multipart/form-data' onSubmit={handleSubmit}>

                    <div className='form__header'>
                        <input type='text' value={note.category}/>
                        <span style={{ backgroundColor: getBackgroundColor(note.category) }}></span>
                    </div> 

                    <div className='form__input'>
                        <div className="inputGroup">
                            <input type="text" name='title' placeholder='Title' onChange={(e)=> setTitle(e.target.value)} defaultValue={note.title}/>
                        </div>

                        <div className="inputGroup">
                            <textarea 
                                type="text" 
                                name='content'
                                required 
                                placeholder='Description'  
                                onChange={handleTextareaChange}
                                defaultValue={note.content}
                                
                            />
                            <div className='char_limit'>
                                <span>Min 20 Max 300</span>
                                <p>{characterCount}/300</p>
                                
                            </div>
                            <div className='char_error'>
                                {showError === true && characterCount < 20 && (
                                    <p className='error_message'>Description must have at least 30 characters</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='model__footer'>
                        <button onClick={onClose} className='close__btn'>Close</button>
                        <input type='submit' value="Update" className={`create__btn ${showError === true && characterCount < 20 ? 'disabled' : 'enabled'}`} />
                    </div>

                </form>
            
            </div>

            
    

        </div>
        

    </div>
  )
}

export default ShowModel