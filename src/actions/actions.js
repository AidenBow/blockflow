import {
  Person
} from 'blockstack'
// import Profile from '../Profile'

const moment = require("moment")

export const FETCH_HOURS_START = "FETCH_HOURS_START"
export const FETCH_HOURS_SUCCESS = "FETCH_HOURS_SUCCESS"
export const FETCH_HOURS_FAILURE = "FETCH_HOURS_FAILURE"

export const FETCH_CATEGORIES_START = "FETCH_CATEGORIES_START"
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS"
export const FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE"

export const RESET_START = "RESET_START"
export const RESET_SUCCESS = "RESET_SUCCESS"
export const RESET_FAILURE = "RESET_FAILURE"

export const ADD_HOUR_START = "ADD_HOUR_START"
export const ADD_HOUR_SUCCESS = "ADD_HOUR_SUCCESS"
export const ADD_HOUR_FAILURE = "ADD_HOUR_FAILURE"

export const ADD_CATEGORY_START = "ADD_CATEGORY_START"
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS"
export const ADD_CATEGORY_FAILURE = "ADD_CATEGORY_FAILURE"

export const DELETE_CATEGORY_START = "DELETE_CATEGORY_START"
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS"
export const DELETE_CATEGORY_FAILURE = "DELETE_CATEGORY_FAILURE"

export const CURRENT_JOURNAL_EDIT = "CURRENT_JOURNAL_EDIT"

export const SELECTED_CATEGORY = "SELECTED_CATEGORY"

export const fetchHours = (userSession) => dispatch => {
  dispatch({type: FETCH_HOURS_START})
  const options = { decrypt: false }
  userSession.getFile('hours.json', options)
    .then((file) => {
      var hours = JSON.parse(file || '[]')
      dispatch({
        type: FETCH_HOURS_SUCCESS,
        person: new Person(userSession.loadUserData().profile),
        payload: hours,
      })
      console.log(hours, "hours")
    })
    .catch(err => {
      console.log(err)
      dispatch({type: FETCH_HOURS_FAILURE, payload: err.response})
    })
  }

export const fetchCategories = (userSession) => dispatch => {
    dispatch({type: FETCH_CATEGORIES_START})
    const options = { decrypt: false }
    userSession.getFile('categories.json', options)
    .then((file) => {
      var categories = JSON.parse(file || '[]')
      dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        person: new Person(userSession.loadUserData().profile),
        payload: categories
      })
      console.log(categories, "categories")
    })
    .catch(err => {
      console.log(err)
      dispatch({type: FETCH_CATEGORIES_FAILURE, payload: err.response})
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

export const addHour = (e, userSession, hours, newHour, category, date) => dispatch => {
  e.preventDefault()
  dispatch({type: ADD_HOUR_START})
    let hourToBeAdded = {
      id: Date.now(),
      hours: parseInt(newHour),
      category: category,
      date: date
    }

    hours.push(hourToBeAdded)
    console.log(hours)
    const options = { encrypt: false }
    userSession.putFile('hours.json', JSON.stringify(hours), options)
      .then(() => {
        
        dispatch({type: ADD_HOUR_SUCCESS, payload: hours})
      })
      .catch(err => {
        console.log(err)
        dispatch({type: RESET_FAILURE, payload: err.response})
      })
}

export const addCategory = (e, userSession, categories, newCategory, color) => dispatch => {
  e.preventDefault()
  dispatch({type: ADD_CATEGORY_START})
  let newCategoryObject = {
    id: Date.now(),
    category: newCategory,
    color: color
  }

  categories.push(newCategoryObject)

  const options = { encrypt: false }
  userSession.putFile('categories.json', JSON.stringify(categories), options)
    .then(() => {
      console.log(categories)
      dispatch({type: ADD_CATEGORY_SUCCESS, payload: categories})
    })
    .catch(err => {
      console.log(err)
      dispatch({type: RESET_FAILURE, payload: err.response})
    })
}

export const handleJournalChanges = (changes) => dispatch => {
  dispatch({type : CURRENT_JOURNAL_EDIT, payload : changes})
}

export const deleteCategory = (id, categories, userSession) => dispatch => {
  dispatch({type : DELETE_CATEGORY_START})
  let newCats = categories.filter(category => {
    return category.id !== id
  })

  userSession.putFile('categories.json', JSON.stringify(newCats), { encrypt: false })
  .then(() => {
    dispatch({type: DELETE_CATEGORY_SUCCESS, payload: newCats})
    console.log(newCats)
  })
  .catch(err => {
    console.log(err)
    dispatch({type: DELETE_CATEGORY_FAILURE, payload: err.response})
  })
  
}

export const selectCategory = (catagory) => dispatch => {
  dispatch({type: SELECTED_CATEGORY, payload: catagory})
}