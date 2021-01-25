import { SELECT_ADDRESS_SHOW, SELECT_ADDRESS_HIDE, SELECT_DATE_TIME_SHOW, SELECT_DATE_TIME_HIDE, AddAddressForm_SHOW, AddAddressForm_HIDE } from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case SELECT_ADDRESS_SHOW:
            return {
                ...state,
                select_address_show: true,
            };

        case SELECT_ADDRESS_HIDE:
            return {
                ...state,
                select_address_show: false,
            };
        case SELECT_DATE_TIME_SHOW:
            return {
                ...state,
                select_date_time_show: true,
            };
        case SELECT_DATE_TIME_HIDE:
            return {
                ...state,
                select_date_time_show: false,
            };
        case AddAddressForm_SHOW:
            return {
                ...state,
                add_address_form_open: true,
            };
        case AddAddressForm_HIDE:
            return {
                ...state,
                add_address_form_open: false,
            };
        default:
            return {
                ...state
            };
    }
}