import {
  FETCH_HOURS_START,
  FETCH_HOURS_SUCCESS,
  FETCH_HOURS_FAILURE,
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  RESET_START,
  RESET_SUCCESS,
  RESET_FAILURE,
  ADD_HOUR_START,
  ADD_HOUR_SUCCESS,
  ADD_HOUR_FAILURE,
  ADD_CATEGORY_START,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  CURRENT_JOURNAL_EDIT,
  DELETE_CATEGORY_START,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE
} from "../actions/actions"

const initialState = {
  person: {},
  hours: [],
  categories: [],
  currentJournal: "",
  isLoading: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {

    case FETCH_HOURS_START:
      return {
        ...state,
        error: (""),
        isLoading: true
      }

    case FETCH_HOURS_SUCCESS:
      return {
        ...state,
        hours: action.payload,
        person: action.person,
        isLoading: false
      }

    case FETCH_HOURS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }

      case FETCH_CATEGORIES_START:
        return {
          ...state,
          error: (""),
          isLoading: true
        }
  
      case FETCH_CATEGORIES_SUCCESS:
        return {
          ...state,
          categories: action.payload,
          person: action.person,
          isLoading: false
        }
  
      case FETCH_CATEGORIES_FAILURE:
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

    case ADD_CATEGORY_START: 
    console.log("start")
    return {
      ...state,
      isLoading: true
    }

    case ADD_CATEGORY_SUCCESS: 
    console.log("suc")
    return {
      ...state,
      isLoading: false,
      categories: action.payload
    }

    case ADD_CATEGORY_FAILURE: 
    console.log("fail")
    return {
      ...state,
      isLoading: false,
      error: action.payload
    }
    
    case CURRENT_JOURNAL_EDIT:
      return {
        ...state,
        currentJournal: action.payload
      }

    case DELETE_CATEGORY_START: 
    return {
      ...state,
      isLoading: true
    }

    case DELETE_CATEGORY_SUCCESS:
    return {
      ...state,
      categories: action.payload,
      error: "",
      isLoading: false
    }

    case DELETE_CATEGORY_FAILURE:
    return {
      ...state,
      error: action.payload,
      isLoading: false
    }

    default: 
      return state
  }
}

export default reducer