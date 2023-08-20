import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

import {getNotesReducer, createNoteReducer, updateNoteReducer, deleteNoteReducer} from './reducer/notesReducer'


const reducer = combineReducers({


    allNotes: getNotesReducer,
    createNote: createNoteReducer,
    updateNote: updateNoteReducer,
    deleteNote: deleteNoteReducer,

})


const middleware = [thunk]

const store =configureStore({
    reducer,
    middleware,
    // eslint-disable-next-line no-undef
    devTools: process.env.NODE_ENV !== 'production'
})

export default store