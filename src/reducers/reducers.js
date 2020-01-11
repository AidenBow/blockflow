import {
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  RESET_START,
  RESET_SUCCESS,
  RESET_FAILURE,
  ADD_HOUR_START,
  ADD_HOUR_SUCCESS,
  ADD_HOUR_FAILURE
} from "../actions/actions"

const initialState = {
  person: {},
  hours: [],
  categories: [],
  isLoading: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {

    case FETCH_DATA_START:
      return {
        ...state,
        error: (""),
        isLoading: true
      }

    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        [action.dataName]: action.payload,
        person: action.person,
        isLoading: false
      }

    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }

    case RESET_START:
      return {
        ...state,
        isLoading: true,
        error: ("")
      }
    
    case RESET_SUCCESS:
      return {
        ...state,
        hours: [],
        isLoading: false,
      }
    
    case RESET_FAILURE: 
    return {
      ...state,
      error: action.payload
    }

    case ADD_HOUR_START: 
    console.log("start")
    return {
      ...state,
      isLoading: true
    }

    case ADD_HOUR_SUCCESS: 
    console.log("suc")
    return {
      ...state,
      isLoading: false,
      hours: action.payload
    }

    case ADD_HOUR_FAILURE: 
    console.log("fail")
    return {
      ...state,
      isLoading: false,
      error: action.payload
    }
    
    default: 
      return state
  }
}

export default reducer