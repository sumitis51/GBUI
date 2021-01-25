import {
  PREMIUM_DETAILS
  } from '../constants/actionTypes'
  
  
  export default (state = {}, action) => {
    switch (action.type) {
      case PREMIUM_DETAILS:
        return{
          ...state,
          details: action.data
        }
      default:
        return {
          ...state
        }
    }
  }