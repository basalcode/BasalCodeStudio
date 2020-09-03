export const LOG_IN = 'LOG_IN';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';

export const login = (userEmail, userPassword, history) => {
    console.log('[Action] login start');
    return {
        type: LOG_IN,
        userEmail: userEmail,
        userPassword: userPassword,
        history: history
    }
}

export const loginSuccess = (email, user_name) => {
    console.log('[Action] loginSuccess start');

    return {
        type: LOG_IN_SUCCESS,
        userEmail: email,
        userName: user_name
    }
}

export const loginFailure = (errorMessage) => {
    console.log('[Action] loginFailure start');


    return {
        type: LOG_IN_FAILURE
    }
}

export const logout = () => {
    return {
        type: LOG_OUT
    }
}