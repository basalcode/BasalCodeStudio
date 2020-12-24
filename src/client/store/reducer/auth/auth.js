/* constant */
import {
    POST,
    PUT,
    DELETE
} from 'store/action/auth/auth';

/* reducer */
const initialState = {
    email: '',
    userName: ''
}

export default (state = initialState, action) => {
    switch(action.type) {
        case POST:
            return {
                ...state,
                email: action.payload.email,
                userName: action.payload.userName
            }
        case PUT:
            return { ...state }
        case DELETE:
            return { ...state }
        default:
            return { ...state }
    }
}