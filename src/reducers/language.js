import {MAIN_HEADER_LANGUAGE,FOOTER_LANGUAGE,HEADER_LANGUAGE,CurrentLanguage, FetchLanguage, CurrentComponent } from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case CurrentLanguage:
            return {
                ...state,
                current_language:action.currentlanguage,
            };
        case CurrentComponent:
            return {
                ...state,
                current_component: action.fileName,
            };
        case FetchLanguage:
        return {
            ...state,
            lang_data: action.language,
        };
        case HEADER_LANGUAGE:
        return {
            ...state,
            header_lang_data:action.headerlanguage,
        };
        case FOOTER_LANGUAGE:
        return {
            ...state,
            footer_lang_data:action.footerlanguage,
        };
        case MAIN_HEADER_LANGUAGE:
        return {
            ...state,
            mainHeader_lang_data:action.mainHeaderlanguage,
        };
        default:
            return {
                ...state,
            };

    }
}
