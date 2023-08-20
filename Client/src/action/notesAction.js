import {
    ALL_NOTES_REQUEST,
    ALL_NOTES_SUCCESS,
    ALL_NOTES_FAIL,
    // SINGLE_NOTE_REQUEST,
    // SINGLE_NOTE_SUCCESS,
    // SINGLE_NOTE_FAIL,
    CREATE_NOTE_REQUEST,
    CREATE_NOTE_SUCCESS,
    CREATE_NOTE_FAIL,
    UPDATE_NOTE_REQUEST,
    UPDATE_NOTE_SUCCESS,
    UPDATE_NOTE_FAIL,
    DELETE_NOTE_REQUEST,
    DELETE_NOTE_SUCCESS,
    DELETE_NOTE_FAIL,
    CLEAR_ERRORS,
} from '../constants/notesConstants'
import axios from 'axios'


export const getNotes = () => async(dispatch) => {

    try{
        
        dispatch({type: ALL_NOTES_REQUEST})

        let link = `/api/v1/notes`;

        const {data} = await axios.get(link);
        dispatch({
            type: ALL_NOTES_SUCCESS,
            payload: data,
        })

        console.log("data", data);

    }catch(error){
        dispatch({
            type: ALL_NOTES_FAIL,
            payload: error.response.data.message
        })
    }

}


export const createNote = (myForm) => async (dispatch) => {

    try {
        
        dispatch({type: CREATE_NOTE_REQUEST})

        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.post(`/api/v1/notes`,
            myForm,
            config
        )

        dispatch({type: CREATE_NOTE_SUCCESS, payload: data.note})

    } catch (error) {
        dispatch({type: CREATE_NOTE_FAIL, payload: error.response.data.message});

    }


}


export const updateNote = (id, myForm) => async (dispatch) => {

    try {
        
        dispatch({type: UPDATE_NOTE_REQUEST})

        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.put(`/api/v1/notes/${id}`,
            myForm,
            config
        )

        dispatch({type: UPDATE_NOTE_SUCCESS, payload: data.note})

    } catch (error) {
        dispatch({type: UPDATE_NOTE_FAIL, payload: error.response.data.message});

    }


}


export const deleteNote = (id) => async(dispatch) => {

    try {
        
        dispatch({type: DELETE_NOTE_REQUEST})

        const {data} = await axios.delete(`/api/v1/notes/${id}`);

        dispatch({
            type: DELETE_NOTE_SUCCESS,
            payload: data.success
        })
        


    } catch (error) {
        dispatch({
            type: DELETE_NOTE_FAIL,
            payload: error.response.data.message
        })
    }

}


export const clearErrors = () => async (dispatch) => {

    dispatch({type: CLEAR_ERRORS})

}