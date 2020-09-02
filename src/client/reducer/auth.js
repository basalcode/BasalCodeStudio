import { LOG_IN, LOG_OUT } from '../action/auth'

const initialState = {
    isLoggedIn: false,
    userEmail: null,
    userName: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                isLoggedIn: true,
                userEmail: action.userEmail,
                userName: action.userName,
            };
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                userEmail: null,
                userName: null,
            }
        }
        default: {
            return { ...state };
        }
    }
}