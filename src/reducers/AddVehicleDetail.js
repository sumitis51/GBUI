import { AddVehicleDetailForm_SHOW,AddVehicleDetailForm_HIDE,MAKEPAYMENT_SHOW,MAKEPAYMENT_HIDE} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case AddVehicleDetailForm_SHOW:
      return {
        ...state,
        add_vehicle_detail_form_open: true,
      };
      case AddVehicleDetailForm_HIDE:
      return {
        ...state,
        add_vehicle_detail_form_open: false,
      };
      case MAKEPAYMENT_SHOW:
      return {
        ...state,
        make_payment_show:true,
      };
      case MAKEPAYMENT_HIDE:
      return {
        ...state,
        make_payment_show:false,
      };
    default:
      return state;
  }
};
