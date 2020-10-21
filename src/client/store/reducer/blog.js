/* constant */
import {
    LOBBY_PAGE
} from 'store/action/blog';

const initialState = {
    scroll: {},
    index: 0,
    scrollOn: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOBBY_PAGE:
            return {
                ...state,
                scroll: action.scroll,
                index: action.index,
                scrollOn: action.scrollOn
            }
        default: return { ...state }
    }
}