import { AddFamilyMemberForm_SHOW,AddFamilyMemberForm_HIDE,} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case AddFamilyMemberForm_SHOW:
      return {
        ...state,
        add_family_member_form_open: true,
      };
      case AddFamilyMemberForm_HIDE:
      return {
        ...state,
        add_family_member_form_open: false,
      };
    default:
      return state;
  }
};
