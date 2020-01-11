import {
  Person,
} from 'blockstack'

export const FETCH_DATA_START = "FETCH_DATA_START"
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS"
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE"

export const RESET_START = "RESET_START"
export const RESET_SUCCESS = "RESET_SUCCESS"
export const RESET_FAILURE = "RESET_FAILURE"

export const ADD_HOUR_START = "ADD_HOUR_START"
export const ADD_HOUR_SUCCESS = "ADD_HOUR_SUCCESS"
export const ADD_HOUR_FAILURE = "ADD_HOUR_FAILURE"

export const fetchData = (userSession) => dispatch => {
  dispatch({type: FETCH_DATA_START})
  const options = { decrypt: false }
  userSession.getFile('hours.json', options)
    .then((file) => {
      var hours = JSON.parse(file || '[]')
      dispatch({
        type: FETCH_DATA_SUCCESS,
        person: new Person(userSession.loadUserData().profile),
        payload: hours,
      })
      console.log(hours, "hours")
    })
    .catch(err => {
      console.log(err)
      dispatch({type: FETCH_DATA_FAILURE, payload: err.response})
    })
    userSession.getFile('categories.json', options)
    .then((file) => {
      var categories = JSON.parse(file || '[]')
      dispatch({
        type: FETCH_DATA_SUCCESS,
        person: new Person(userSession.loadUserData().profile),
        categories: categories
      })
      console.log(categories, "categories")
    })
    .catch(err => {
      console.log(err)
      dispatch({type: FETCH_DATA_FAILURE, payload: err.response})
    })
}

export const reset = (userSession) => dispatch => {
  dispatch({type: RESET_START})
  userSession.putFile('hours.json', JSON.stringify([]), { encrypt: false })
    .then(() => {
      dispatch({type: RESET_SUCCESS})
    })
    .catch(err => {
      console.log(err)
      dispatch({type: RESET_FAILURE, payload: err.response})
    })
}

export const addHour = (userSession) => dispatch => {
  dispatch({type: ADD_HOUR_START})
}