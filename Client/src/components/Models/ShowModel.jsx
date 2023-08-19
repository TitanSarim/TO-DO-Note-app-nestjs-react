/* eslint-disable react/prop-types */
import React,{useState} from 'react'

// eslint-disable-next-line react/prop-types
const ShowModel = ({ isOpen, onClose, note }) => {

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
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (characterCount < 20) {
            setShowError(true);
          } else if(characterCount > 20) {
            setShowError(false);
          }else{
            setSubmitted(true);
          }
            
        
    };

    if(!isOpen) return null

  return (

   <div className={`create__model__container ${isOpen ? 'visible' : ''}`}>

        <div className='create__model__wrapper' onClick={(e) => e.stopPropagation()}>

            <div className='form__container'>
                
                <div className='form__header'>
                    <p>{note.category}</p>
                    <span style={{ backgroundColor: getBackgroundColor(note.category) }}></span>
                </div> 

            
                <form className='form__body' onSubmit={handleSubmit}>

                    <div className='form__input'>
                        <div className="inputGroup">
                            <input type="text" placeholder='Title' />
                        </div>

                        <div className="inputGroup">
                            <textarea 
                                type="text" 
                                required 
                                placeholder='Description'  
                                onChange={handleTextareaChange}
                                
                            />
                            <div className='char_limit'>
                                <span>Min 30 Max 300</span>
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
                        <input type='submit' className='create__btn' value="Update"/>
                    </div>

                </form>
            
            </div>

            
    

        </div>
        

    </div>
  )
}

export default ShowModel