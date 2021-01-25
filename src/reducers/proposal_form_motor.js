import {SET_STEP} from '../constants/actionTypes'

export default (state = {}, action) => {
    switch(action.type) {
        case SET_STEP:
            return {
                ...state,
                step: action.step
            }
        case 'SET_STEP_H':
            return {
                ...state,
                stepH: action.step
            }
        default:
            return state
    }
}