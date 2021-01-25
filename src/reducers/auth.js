import {
  AUTH_START,
  AUTH_FAIL,
  AUTH_SUCCESS,
  SET_TOKEN,
  SET_USER
} from '../constants/actionTypes'


export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_START:
      return{
        ...state,
        error: null,
        loading: true,
        token: null
      }
    case AUTH_FAIL: 
      return{
        ...state,
        loading: false,
        token: null,
        error: action.error
      }
    case AUTH_SUCCESS: 
      return{
        ...state,
        token: action.data,
        loading: false,
        error: null
      }

    case SET_TOKEN:
      return{
        ...state,
        token: action.token
      }
      case SET_USER:
      return{
        ...state,
        user: action.username
      }
    default:
      return {
        ...state
      }
  }
}