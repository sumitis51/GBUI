import {
    POPUP_STEPPER_SHOW, POPUP_STEPPER_HIDE, POPUP_POLICY_SHOW, POPUP_POLICY_HIDE, POPUP_TEXT_SHOW,
    POPUP_TEXT_HIDE, POPUP_FORGOT_SHOW, POPUP_FORGOT_HIDE, POPUP_MOBILE_VALUE_INCREASE,
    POPUP_MOBILE_VALUE_DECREASE, POPUP_MOB_SEARCH_CAR_HIDE, POPUP_MOB_SEARCH_CAR_SHOW,
    BOUGHT_NEW_CAR_POPUP, COMMERCIAL_VEHICLE, MEMBER_DETAIL_VISIBLE, WORK_FLOW_VISIBLE,
    SELECT_PATHLAB, EDIT_POS_DETAILS, FORM_CV_UPLOAD,PATHLAB_VIEW_MODAL,PREMIUM_BREAKUP_MODAL,
    RATING_POPUP

} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case POPUP_STEPPER_SHOW:
            return {
                ...state,
                show_stepper_popup: true,
            };
        case POPUP_STEPPER_HIDE:
            return {
                ...state,
                show_stepper_popup: false,
            };
        case POPUP_POLICY_SHOW:
            return {
                ...state,
                popup_policy_show: true,
            }
        case POPUP_POLICY_HIDE:
            return {
                ...state,
                popup_policy_show: false,
            }
        case POPUP_TEXT_SHOW:
            return {
                ...state,
                popup_text: true,
            }
        case POPUP_TEXT_HIDE:
            return {
                ...state,
                popup_text: false,
            }
        case POPUP_FORGOT_SHOW:
            return {
                ...state,
                popup_forgot_show: true,
            }
        case POPUP_FORGOT_HIDE:
            return {
                ...state,
                popup_forgot_show: false,
            }
        case POPUP_MOBILE_VALUE_INCREASE:
            return {
                ...state,
                popup_mobile_value_1: action.value,
            }
        case POPUP_MOBILE_VALUE_DECREASE:
            return {
                ...state,
                popup_mobile_value_1: action.value,
            }
        case POPUP_MOB_SEARCH_CAR_HIDE:
            return {
                ...state,
                popup_mob_search: false,
            }
        case POPUP_MOB_SEARCH_CAR_SHOW:
            return {
                ...state,
                popup_mob_search: true,
            }
        case BOUGHT_NEW_CAR_POPUP:
            return {
                ...state,
                popup_bought_new_car: action.bought_car
            }
        case COMMERCIAL_VEHICLE:
            return {
                ...state,
                popup_commercial_vehicle: action.commercial
            }
        case MEMBER_DETAIL_VISIBLE:
            return {
                ...state,
                member_detail_visible: action.member,
            };
        case WORK_FLOW_VISIBLE:
            return {
                ...state,
                work_flow_visible: action.workflow,
            };
        case SELECT_PATHLAB:
            return {
                ...state,
                select_pathlab: action.pathlab,
            };
        case PATHLAB_VIEW_MODAL:
            return {
                ...state,
                pathlab_view_modal: action.pathlabsview,
            };
        case PREMIUM_BREAKUP_MODAL:
        return {
            ...state,
            premium_breakup_modal: action.premium,
            model_id:action.model_id
        };
        case EDIT_POS_DETAILS:
            return {
                ...state,
                edit_pos_details: action.details,
            };
        case FORM_CV_UPLOAD:
            return {
                ...state,
                form_cv_upload: action.value,
            };
        case RATING_POPUP:
        return {
            ...state,
            rating_popup: action.rating,
        };    
        default:{
            return state;
        }
    }
};
