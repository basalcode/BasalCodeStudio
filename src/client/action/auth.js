export const LOGIN = 'LOG_IN';
export const LOGIN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOGIN_FAILURE = 'LOG_IN_FAILURE';
export const LOGOUT = 'LOG_OUT';


export const login = (userEmail, userName) => {
    return {
        type: LOGIN,
        userEmail: userEmail,
        userName: userName
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}