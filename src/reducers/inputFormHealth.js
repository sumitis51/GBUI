import {INPUT_FORM_HEALTH } from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case INPUT_FORM_HEALTH:
            return {
                ...state,
                inputFormHealthData: action.data,
            };
        
        default:
            return {
                ...state,
            };

    }
}
