import React, { useState, useRef } from 'react';

import Email from './Email';
import Password from './Password';
import ConfirmPassword from './ConfirmPassword';
import UserName from './UserName';

const Signup = ({ history }) => {
    const [emailVerified, setEmailVerified] = useState(false);
    const [passwordVerified, setPasswordVerified] = useState(false);
    const [confirmPasswordVerified, setConfirmPasswordVerified] = useState(false);
    const [userNameVerified, setUserNameVerified] = useState(false);

    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [confirmPasswordText, setConfirmPasswordText] = useState('');
    const [userNameText, setUserNameText] = useState('');

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const userNameRef = useRef(null);

    const canSubmit = () => {
        let permission = false;
        if (emailVerified !== true) {
            emailRef.current.focus();
        }
        else if (passwordVerified !== true) {
            passwordRef.current.focus();
        }
        else if (confirmPasswordVerified !== true) {
            confirmPasswordRef.current.focus();
        }
        else if (userNameVerified !== true) {
            userNameRef.current.focus();
        } else {
            permission = true;
        }
        return permission;
    }
    const signup = () => {
        return new Promise((resolve, reject) => {
            let accountObject = {
                email: emailText,
                password: passwordText,
                confirmPassword: confirmPasswordText,
                userName: userNameText
            }
            fetch(`/request/user/create/account`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(accountObject)
            })
            .then(response => response.json())
            .then(result => {
                const isSuccess = result.validity;
                if (isSuccess) {
                    const CREATE_ACCOUNT_SUCCESS = result.value;
                    resolve(CREATE_ACCOUNT_SUCCESS);
                } else {
                    const CREATE_ACCOUNT_ERROR = result.value;
                    reject(CREATE_ACCOUNT_ERROR);
                }
            })
        })
    }
    const onSubmitHandler = async (event) => {
        const eventTarget = event.target;
        event.preventDefault();
        if (canSubmit()) {
            await signup()
            .then((resolve) => {
                eventTarget.reset();
                alert(resolve);
                history.push('/blog/lobby');
            }, (reject) => {
                eventTarget.reset();
                alert(reject);
                history.replace('/signup');
            });
        }
    }

    return (
        <div className="Signup">
            <form className="Signup"
                onSubmit={onSubmitHandler}>
                <Email
                    forwardedRef={emailRef}
                    onInputBlur={(text, verified) => {
                        setEmailText(text);
                        setEmailVerified(verified);
                    }}
                ></Email>
                <Password
                    forwardedRef={passwordRef}
                    confrimPasswordVerified={confirmPasswordVerified}
                    onInputBlur={(text, verified) => {
                        setPasswordText(text);
                        setPasswordVerified(verified);
                    }}
                ></Password>
                <ConfirmPassword
                    forwardedRef={confirmPasswordRef}
                    passwordText={passwordText}
                    onInputBlur={(text, verified) => {
                        setConfirmPasswordText(text);
                        setConfirmPasswordVerified(verified);
                    }}
                ></ConfirmPassword>
                <UserName
                    forwardedRef={userNameRef}
                    onInputBlur={(text, verified) => {
                        setUserNameText(text);
                        setUserNameVerified(verified);
                    }}
                ></UserName>
                <input className="Signup__sign-up" type="submit" value="Sign up" />
            </form>
        </div>
    );
}

export default Signup;