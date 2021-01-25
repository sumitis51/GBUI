import { GROUP_HEALTH_TABS } from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case GROUP_HEALTH_TABS:
            return {
                ...state,
                value: action.tab,
            };
        default:
            return {
                ...state,
            }
    }
};
