/* module */
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/* store */
import { login as loginAction } from 'store/action/auth';

/* component */
import Email from './Email';
import Password from './Password'

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const messageRef = useRef(null);

    const canSubmit = () => {
        let permission = false;
        if (emailText.length === 0) {
            emailRef.current.focus();
            const EMAIL_EORROR_MESSAGE = 'Please fill out the form email.';
            setErrorMessage(EMAIL_EORROR_MESSAGE);
        } else if (passwordText.length === 0) {
            passwordRef.current.focus();
            const PASSWORD_EORROR_MESSAGE = 'Please fill out the form password.';
            setErrorMessage(PASSWORD_EORROR_MESSAGE);
        } else {
            permission = true;
        }
        return permission;
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (canSubmit()) {
            dispatch(loginAction(
                emailText,
                passwordText,
                history,
                emailRef,
                passwordRef,
                messageRef
            ));
        }
    }

    return (
        <div className="Login">
            <form onSubmit={onSubmitHandler}>
                <Email
                    onTextChange={(inputValue) => {
                        setEmailText(inputValue);
                    }}
                    forwardedRef={emailRef}
                ></Email>
                <Password
                    onTextChange={(inputValue) => {
                        setPasswordText(inputValue);
                    }}
                    forwardedRef={passwordRef}
                ></Password>
                <div ref={messageRef}>{errorMessage}</div>
                <input type="submit" value="Sign in" />
            </form>
            <input
                type="button"
                value="Sign up"
                onClick={() => { history.push('/auth/signup') }}
            />
        </div>
    );
}

export default Login;