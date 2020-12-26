/* constant */
import {
    POST,
    GET,
    PUT,
    DELETE
} from 'store/action/auth/auth';

/* reducer */
const initialState = {
    isLoggedIn: false,
    email: '',
    userName: ''
}

export default (state = initialState, action) => {
    switch(action.type) {
        case POST:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                email: action.payload.email,
                userName: action.payload.userName
            }
        case GET:
            return { ...state }
        case PUT:
            return { 
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                email: action.payload.email,
                userName: action.payload.userName
            }
        case DELETE:
            return { 
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                email: action.payload.email,
                userName: action.payload.userName
            }
        default:
            return { ...state }
    }
}