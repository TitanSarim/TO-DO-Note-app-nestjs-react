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
    UPDATE_NOTE_RESET,
    UPDATE_NOTE_FAIL,
    DELETE_NOTE_REQUEST,
    DELETE_NOTE_SUCCESS,
    DELETE_NOTE_RESET,
    DELETE_NOTE_FAIL,
    CLEAR_ERRORS,
} from '../constants/notesConstants'


export const getNotesReducer = (state = {allNotes: [] }, action) => {

    switch(action.type){

        case ALL_NOTES_REQUEST:
            return{
                loading: true,
                allNotes: []
            }
        
        case ALL_NOTES_SUCCESS:
            return{
                loading: false,
                allNotes: action.payload
            }
        
        case ALL_NOTES_FAIL:
            return{
                loading: false,
                error: action.payload
            }

        case  CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }

        default:
            return state

    }

} 


export const createNoteReducer = (state = { note: [] }, action) => {
    
    switch (action.type) {
      case CREATE_NOTE_REQUEST:
        return {
          loading: true,
          note: null,
        };
  
      case CREATE_NOTE_SUCCESS:
        return {
          loading: false,
          note: action.payload,
        };
  
      case CREATE_NOTE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
};


export const updateNoteReducer = (state = {} , action) => {
    
  switch (action.type) {
    case UPDATE_NOTE_REQUEST:
      return {
        loading: true,
        ...state
      };

    case UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_NOTE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_NOTE_RESET:
      return{
        ...state,
        isUpdated: false
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};


export const deleteNoteReducer = (state = {}, action) => {
    
  switch (action.type) {
    case DELETE_NOTE_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };


    case DELETE_NOTE_FAIL:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_NOTE_RESET:
      return{
        ...state,
        isDeleted: false
      }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
