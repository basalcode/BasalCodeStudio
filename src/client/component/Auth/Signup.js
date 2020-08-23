import React, { useState } from 'react';
import './Signup.css';

function Signup() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        userName: ''
    });

    const [formVerifier, setFormVerifier] = useState({
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const [lock, setLock] = useState(false);

    const checkDuplication = () => {
        return new Promise((resolve, reject) => {
            const page = 'signup';
            const email = form.email;
            fetch(`/request/user/read/account?page=${page}&email=${email}`)
            .then(response => response.json())
            .then(result => {
                const isSuccess = result.validity;
                if (isSuccess) {
                    const WELCOME_MESSAGE = result.value;
                    resolve(WELCOME_MESSAGE);
                } else {
                    const EMAIL_INVALID_MESSAGE = result.value;
                    reject(EMAIL_INVALID_MESSAGE);
                }
            });
        })
    }

    const signup = () => {
        return new Promise((resolve, reject) => {
            fetch(``)
            .then(response => response.json())
            .then(result => {
                
            })
        })
    }

    const changeState = (stateName, keyName, value) => {
        [stateName](previous => {
            return { ...previous, [keyName]: value }
        })
    }

    const isEmail = (value) => {
        let regExp = /^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$/i;
        let result = value.toString().match(regExp);
        return result !== null ? true : false;
    }

    const StateType = {
        SET_FORM: 'setForm',
        SET_FORM_VERIFIER: 'setFormVerifier'
    }
    const FormType = {
        EMAIL: 'email',
        PASSWORD: 'password',
        PASSWORD_CONFIRM: 'passwordConfirm',
        USER_NAME: 'userName'
    }

    return (
        <div className="Signup">
            <form className="Signup"
                onSubmit={async () => {
                    await signup();
                }}>
                <label>Email Address</label>
                <input className="Signup__email"
                    type="email"
                    value={form.email}
                    onChange={(event) => changeState(
                        StateType.SET_FORM, 
                        FormType.EMAIL, 
                        event.target.value
                        )
                    }
                    onBlur={async (event) => {
                        if (isEmail(form.email)) {
                            await checkDuplication()
                            .then((resolve) => changeState(
                                StateType.SET_FORM_VERIFIER, 
                                FormType.EMAIL, 
                                resolve
                            ), (reject) => changeState(
                                StateType.SET_FORM_VERIFIER, 
                                FormType.EMAIL, 
                                reject
                                )
                            )
                            return;
                        }
                        if (form.email.length === 0) {
                            const NOT_EMAIL_ADDRESS = 'Please fill out this field';
                            changeState(
                                StateType.SET_FORM_VERIFIER, 
                                FormType.EMAIL, 
                                NOT_EMAIL_ADDRESS
                            )
                        } else {
                            const NOT_EMAIL_ADDRESS = 'It is not valid email address';
                            changeState(
                                StateType.SET_FORM_VERIFIER, 
                                FormType.EMAIL, 
                                NOT_EMAIL_ADDRESS
                            )
                        }
                    }}
                />
                <div className="Signup__email--check">{formVerifier.email}</div>

                <label>Password</label>
                <input className="Signup__password"
                    value={form.password}
                    type="password"
                    onChange={(event) => changeState(
                        StateType.SET_FORM,
                        FormType.PASSWORD, 
                        event.target.value
                        )
                    }
                />
                <div className="Signup__password--check">{formVerifier.password}</div>

                <label>Password Confirm</label>
                <input className="Signup__password-confirm"
                    value={form.passwordConfirm}
                    type="password"
                    onChange={(event) => changeState(
                        StateType.SET_FORM,
                        FormType.PASSWORD_CONFIRM, 
                        event.target.value
                        )
                    }
                />
                <div className="Signup__password-confirm--check">{formVerifier.passwordConfirm}</div>

                <label>User Name</label>
                <input className="Signup__user-name"
                    type="text"
                    value={form.userName}
                    onChange={(event) => changeState(
                        StateType.SET_FORM, 
                        FormType.USER_NAME, 
                        event.target.value
                    )}
                />

                <input className="Signup__sign-up" type="submit" value="Sign up" />
            </form>
        </div>
    );
}

export default Signup;