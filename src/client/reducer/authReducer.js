import { 
    LOG_IN,
    LOG_IN_FAILURE,
    LOG_IN_SUCCESS,
    CHECK_LOG_IN,
    CHECK_LOG_IN_SUCCESS,
    CHECK_LOG_IN_FAILURE,
    LOG_OUT 
} from '../action/authAction'

const initialState = {
    login: false,
    userEmail: null,
    userName: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: return { ...state };
        case LOG_IN_SUCCESS:
            return {
                ...state,
                login: true,
                userEmail: action.userEmail,
                userName: action.userName,
            };
        case LOG_IN_FAILURE: return { ...state };

        case CHECK_LOG_IN: return { ...state };
        case CHECK_LOG_IN_SUCCESS: 
            return { 
                ...state, 
                login: action.login.isLoggedIn,
                userEmail: action.login.email,
                userName: action.login.user_name
            };
        case CHECK_LOG_IN_FAILURE: return { ...state };

        case LOG_OUT: return { ...state };
        default: return { ...state };
    }
}