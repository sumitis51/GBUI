import {LOGIN_BY_OTP} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_BY_OTP:
      return {
        ...state,
        login_by_otp: action.value ? action.value: false,
      };
    default:
      return state;
  }
};
