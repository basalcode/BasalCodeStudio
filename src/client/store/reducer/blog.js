/* constant */
import {
    PAGE
} from 'store/action/blog';

const initialState = {
    index: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PAGE:
            return {
                ...state,
                index: action.index
            }
        default: return { ...state }
    }
}