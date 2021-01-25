import { MARITAL_STATUS_CODES } from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case MARITAL_STATUS_CODES:
            return {
                ...state,
                maritalStatusCodes: action.data,
            };

        default:
            return {
                ...state,
            };

    }
}
