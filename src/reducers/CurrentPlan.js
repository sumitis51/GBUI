import {
    CURRENT_PLAN
    } from '../constants/actionTypes'
    
    
    export default (state = {}, action) => {
      switch (action.type) {
        case CURRENT_PLAN:
          return{
            ...state,
            details: action.plan
          }
        default:
          return {
            ...state
          }
      }
    }