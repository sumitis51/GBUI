import { PROPOSAL_FORM_HEALTH, INSURED_MEMBER_TAB_VALUE, PROPOSAL_FORM_HEALTH_MEMBER } from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case PROPOSAL_FORM_HEALTH:
            return {
                ...state,
                proposalFormHealthData: action.data,
            };
        case INSURED_MEMBER_TAB_VALUE:
            return {
                ...state,
                insuredMemberTabValue: action.value,
            };
        case PROPOSAL_FORM_HEALTH_MEMBER:
            return {
                ...state,
                insuredMembersDetail: action.value,
            };

        default:
            return {
                insuredMemberTabValue: 0,
                ...state,
                
            };

    }
}
