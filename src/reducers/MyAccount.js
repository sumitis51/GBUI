import {MY_ACCOUNT_CHANGE_POPUP_SHOW,MY_ACCOUNT_CHANGE_POPUP_HIDE,CHANGE_PASSWORD_SHOW,CHANGE_PASSWORD_HIDE} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case MY_ACCOUNT_CHANGE_POPUP_SHOW:
      return {
        ...state,
        my_account_change_popup: true,
      };
      case MY_ACCOUNT_CHANGE_POPUP_HIDE:
      return {
        ...state,
        my_account_change_popup: false,
      };
    case CHANGE_PASSWORD_SHOW:
      return {
        ...state,
        change_password_open: true,
      };
      case CHANGE_PASSWORD_HIDE:
      return {
        ...state,
        change_password_open: false,
      };
    default:
      return state;
  }
};
