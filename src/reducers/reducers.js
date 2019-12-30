import {
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE
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
      console.log("success")
      return {
        ...state,
        [action.dataName]: action.payload,
        parson: action.person,
        error: (""),
        isLoading: false
      }

    case FETCH_DATA_FAILURE:
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