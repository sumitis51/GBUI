import { SELF_SPOUSE_FG_ALERT } from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case SELF_SPOUSE_FG_ALERT:
            return {
                ...state,
                selfSpouseFGAlert: action.data,
            };

        default:
            return {
                ...state,
            };

    }
}
