import React, { useState, useRef } from 'react';
import './Signup.css';

import Email from './Email';
import Password from './Password';
import ConfirmPassword from './ConfirmPassword';
import UserName from './UserName';

function Signup({ history }) {
    const canSubmit = () => {
        let permission = false;
        if (emailConfirmed !== true) {
            emailRef.current.focus();
        }
        else if (passwordConfirmed !== true) {
            passwordRef.current.focus();
        }
        else if (confirmPasswordConfirmed !== true) {
            confirmPasswordRef.current.focus();
        }
        else if (userNameConfirmed !== true) {
            userNameRef.current.focus();
        } else {
            permission = true;
        }
        return permission;
    }

    const signup = () => {
        return new Promise((resolve, reject) => {
            const accountObject = {
                email: form.email,
                password: form.password,
                userName: form.userName
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
        // event.preventDefault();
        if (canSubmit()) {
            await signup()
                .then((resolve) => {
                    /* event.target.reset();
                    alert(resolve);*/
                    history.push('/blog/lobby');
                }, (reject) => {
                    /* event.target.reset();
                    alert(reject);*/
                    history.replace('/signup');
                });
        }
    }

    

    return (
        <div className="Signup">
            <form className="Signup"
                onSubmit={onSubmitHandler}>
                <Email
                    value={emailValue}
                    message={emailMessage}
                ></Email>
                <Password

                ></Password>
                <ConfirmPassword></ConfirmPassword>
                <UserName></UserName>
                <input className="Signup__sign-up" type="submit" value="Sign up" />
            </form>
        </div>
    );
}

export default Signup;