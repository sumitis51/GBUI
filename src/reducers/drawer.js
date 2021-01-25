import { Drawer_visible} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case Drawer_visible:
      return {
        ...state,
        drawer_visible:action.drawer,
      };
    default:
      return state;
  }
};
