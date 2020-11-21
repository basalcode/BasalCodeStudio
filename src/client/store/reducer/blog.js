/* constant */
import {
    LOBBY_PAGE,
    NAVIGATION
} from 'store/action/blog';

let initialState;

export default (state = initialState, action) => {
    switch (action.type) {
        case LOBBY_PAGE:
            initialState = {
                scroll: {},
                index: 0,
                scrollOn: false
            }

            return {
                ...state,
                scroll: action.scroll,
                index: action.index,
                scrollOn: action.scrollOn
            }

        case NAVIGATION:
            initialState = {
                navigationOn: false
            }

            return {
                ...state,
                navigationOn: action.navigationOn
            }
        default: return { ...state }
    }
}