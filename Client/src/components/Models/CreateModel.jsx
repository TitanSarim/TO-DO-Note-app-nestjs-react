// eslint-disable-next-line no-unused-vars
import React,{useState, useEffect} from 'react'



import './CreateModel.css'



// eslint-disable-next-line react/prop-types
const CreateModel = ({isOpen, onClose, color}) => {

    const [characterCount, setCharacterCount] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [showError, setShowError] = useState(false);
    const [displayText, setDisplayText] = useState('');




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

    const colorTextMapping = {
        '#fc6f03': 'Urgent',
        '#fcf403': 'Personal',
        '#03ecfc': 'Meeting',
        '#fc03f0': 'Work',
    };

    useEffect(() => {
        if (colorTextMapping[color]) {
          setDisplayText(colorTextMapping[color]);
        } else {
          setDisplayText('');
        }
    }, [color]);

    if(!isOpen) return null



  return (

    <div className='create__model__container'>

        <div className='create__model__wrapper'>

            <div className='form__container'>
                
                <div className='form__header'>
                    <p>{displayText}</p>
                    <span style={{ backgroundColor: color }}></span>
                </div> 

            
                <form className='form__body' onSubmit={handleSubmit}>

                    <div className='form__input'>
                        <div className="inputGroup">
                            <input type="text" required placeholder='Title' autoComplete="off"/>
                        </div>

                        <div className="inputGroup">
                            <textarea 
                                type="text" 
                                required 
                                placeholder='Description'  
                                autoComplete="off"
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
                        <button onClick={onClose} className='close__btn'>Cancel</button>
                        <input type='submit' className='create__btn'/>
                    </div>

                </form>
            
            </div>

            
    

        </div>
        

    </div>

  )
}

export default CreateModel