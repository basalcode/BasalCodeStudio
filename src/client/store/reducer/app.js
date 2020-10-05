/* constant */
import {
    NIGHT_MODE
} from 'store/action/app';

const initialState = {
    nightModeOn: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case NIGHT_MODE:
            return {
                ...state,
                nightModeOn: action.nightModeOn
            }
        default: return { ...state }
    }
}