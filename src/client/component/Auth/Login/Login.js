import React, { useState, useRef } from 'react';
import './Login.css'

import Email from './Email';
import Password from './Password'

const Login = ({ history }) => {
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const signin = () => {
        return new Promise((resolve, reject) => {
            let loginObject = {
                email: emailText.toString(),
                password: passwordText.toString()
            }
            const LOGIN_PAGE = 'login'
            fetch(`/request/user/read/account?page=${LOGIN_PAGE}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginObject)
            })
            .then(response => response.json())
            .then(result => {
                const isSuccess = result.validity;
                if (isSuccess) {
                    const loginSuccess = result.value;
                    resolve(loginSuccess);
                } else {
                    const loginFailed = result.value;
                    reject(loginFailed);
                }
            });
        });
    }

    const canSubmit = () => {
        let permission = false;
        if (emailText.length === 0) {
            emailRef.current.focus();
            const EMAIL_EORROR_MESSAGE = 'Please fill out the form email.'
            setErrorMessage(EMAIL_EORROR_MESSAGE);
        } else if (passwordText.length === 0) {
            passwordRef.current.focus();
            const PASSWORD_EORROR_MESSAGE = 'Please fill out the form password.'
            setErrorMessage(PASSWORD_EORROR_MESSAGE);
        } else {
            permission = true;
        }
        return permission;
    }

    const onSubmitHandler = (event) => {
        const eventTarget = event.target;
        event.preventDefault();
        let lock = false;
        if (!lock && canSubmit()) {
            lock = true;
            eventTarget.reset();
            (async () => {
                await signin()
                    .then((resolve) => {
                        alert(resolve);
                        lock = false;
                        history.push('/blog/lobby');
                    }, (reject) => {
                        emailRef.current.value = emailText;
                        setErrorMessage(reject);
                        lock = false;
                    })
            })();
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
                <div>{errorMessage}</div>
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