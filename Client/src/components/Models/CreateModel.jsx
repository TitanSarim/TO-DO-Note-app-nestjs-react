// eslint-disable-next-line no-unused-vars
import React,{useState, useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {createNote} from '../../action/notesAction'


import './CreateModel.css'



// eslint-disable-next-line react/prop-types
const CreateModel = ({isOpen, onClose, color}) => {

    const dispatch = useDispatch();

    const [characterCount, setCharacterCount] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [showError, setShowError] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const [note, setNote] = useState({
      title: "",
      content: "",
      category: ""
    })

    const {title, content} = note


    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (characterCount < 20) {
            setShowError(true);
          } else if(characterCount > 20) {
            setShowError(false);
          }else{
            setSubmitted(true);
          }
        
        const myForm = {
          title: title,
          content :content,
          category: displayText
        }

        console.log(myForm);

        dispatch(createNote(myForm))
        onClose()
        window.location.reload();
    };

    // color crosponds to note type
    const colorTextMapping = {
        '#fc6f03': 'Urgent',
        '#fcf403': 'Personal',
        '#03ecfc': 'Meeting',
        '#fc03f0': 'Work',
    };

    // color crosponds to note type
    useEffect(() => {
        if (colorTextMapping[color]) {
          setDisplayText(colorTextMapping[color]);
        } else {
          setDisplayText('');
        }
    }, [color]);

    // model close
    if(!isOpen) return null


    const inputChange = (e) => {
      const {name, value} = e.target;

      setNote((prevState) => ({
        ...prevState,
        [name]: value
      }))

    }

    const handleTextareaChange = (event) => {
        const inputText = event.target.value;
        const {name, value} = event.target;

        setNote((prevState) => ({
          ...prevState,
          [name]: value
        }))


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


  return (

    <div className='create__model__container'>

        <div className='create__model__wrapper'>

            <div className='form__container'>
                
            
                <form className='form__body' encType='multipart/form-data' onSubmit={handleSubmit}>

                    <div className='form__header'>
                        <input type='text' name='category' value={displayText}  onChange={(e) => setDisplayText(e.target.value)}/>
                        <span style={{ backgroundColor: color }}></span>
                    </div> 

                    <div className='form__input'>
                        <div className="inputGroup">
                            <input type="text" name="title" required placeholder='Title' autoComplete="off" onChange={inputChange}/>
                        </div>

                        <div className="inputGroup">
                            <textarea 
                                type="text" 
                                name="content"
                                required 
                                placeholder='Description'  
                                autoComplete="off"
                                onChange={handleTextareaChange}
                            />
                            <div className='char_limit'>
                                <span>Min 20 Max 300</span>
                                <p>{characterCount}/300</p>
                                
                            </div>
                            <div className='char_error'>
                                {showError === true && characterCount < 20 && (
                                    <p className='error_message'>Description must have at least 20 characters</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='model__footer'>
                        <button onClick={onClose} className='close__btn'>Cancel</button>
                        <input type='submit' value='Create' className={`create__btn ${showError === true && characterCount < 20 ? 'disabled' : 'enabled'}`}/>
                    </div>

                </form>
            
            </div>

            
    

        </div>
        

    </div>

  )
}

export default CreateModel