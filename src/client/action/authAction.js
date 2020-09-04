export const LOG_IN = 'LOG_IN';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const CHECK_LOG_IN = 'CHECK_LOG_IN';
export const CHECK_LOG_IN_SUCCESS = 'CHECK_LOG_IN_SUCCESS';
export const CHECK_LOG_IN_FAILURE = 'CHECK_LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';

export const login = (userEmail, userPassword, history, emailRef, passwordRef, messageRef) => {
    return {
        type: LOG_IN,
        userEmail: userEmail,
        userPassword: userPassword,
        history: history,
        emailRef: emailRef,
        passwordRef: passwordRef,
        messageRef: messageRef
    }
}
export const loginSuccess = (email, user_name) => {
    return {
        type: LOG_IN_SUCCESS,
        userEmail: email,
        userName: user_name
    }
}
export const loginFailure = () => ({ type: LOG_IN_FAILURE })

export const checkLogin = () => {
    return {
        type: CHECK_LOG_IN
    }
}
export const checkLoginSuccess = (login) => {
    return { 
        type: CHECK_LOG_IN_SUCCESS,
        login: login
    }
}
export const checkLoginFailure = () => {
    return { type: CHECK_LOG_IN_FAILURE }
}

export const logout = () => {
    return {
        type: LOG_OUT
    }
}