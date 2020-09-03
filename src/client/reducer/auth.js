import { LOG_IN, LOG_IN_FAILURE, LOG_IN_SUCCESS, LOG_OUT } from '../action/auth'

const initialState = {
    isLoggedIn: false,
    userEmail: null,
    userName: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            console.log('[reducer] login start');
            return { ...state };
        case LOG_IN_SUCCESS:
            console.log('[reducer] loginSuccess start');
            alert('login success!!')
            return {
                ...state,
                isLoggedIn: true,
                userEmail: action.userEmail,
                userName: action.userName,
            };
        case LOG_IN_FAILURE:
            return { ...state };
        case LOG_OUT: {
            return { ...state }
        }
        default: {
            return { ...state };
        }
    }
}