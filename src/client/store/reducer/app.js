/* constant */
import {
    NIGHT_MODE,
    APP_ELEMENT
} from 'store/action/app';

let initialState; 
export default (state = initialState, action) => {
    switch (action.type) {
        case NIGHT_MODE:
            initialState = { nightModeOn: false };

            return {
                ...state,
                nightModeOn: action.nightModeOn
            }
        case APP_ELEMENT:
            initialState = { appElement: null };

            return {
                ...state,
                appElement: action.appElement
            }
        default: return { ...state }
    }
}