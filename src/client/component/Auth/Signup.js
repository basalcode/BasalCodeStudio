import React, { useState, useRef } from 'react';
import verifyForm from '../../../server/module/verifyForm';
import './Signup.css';

function Signup() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        userName: ''
    });

    const [formVerifier, setFormVerifier] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        userName: ''
    })

    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [passwordConfirmed, setPasswordConfirmed] = useState(false)
    const [confirmPasswordConfirmed, setConfirmPasswordConfirmed] = useState(false)
    const [userNameConfirmed, setUserNameConfirmed] = useState(false)

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const userNameRef = useRef();

    const [lock, setLock] = useState(false);

    const SetStateType = {
        SET_FORM: 'setForm',
        SET_FORM_VERIFIER: 'setFormVerifier',
    }
    const FormType = {
        EMAIL: 'email',
        PASSWORD: 'password',
        CONFIRM_PASSWORD: 'confirmPassword',
        USER_NAME: 'userName',
    }

    const changeState = (stateName, keyName, value) => {
        const setState = {
            [SetStateType.SET_FORM]: setForm,
            [SetStateType.SET_FORM_VERIFIER]: setFormVerifier,
        }
        setState[stateName](previous => { return { ...previous, [keyName]: value } });
    }

    const verifyEmail = () => {
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

    const isEmail = (value) => {
        if (value === undefined) { value = '' }
        const regExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
        const result = value.toString().match(regExp);
        return result !== null ? true : false;
    }

    const isPassword = (value) => {
        if (value === undefined) { value = '' }
        const regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        const result = value.toString().match(regExp);

        return result !== null ? true : false;
    }

    const isSamePassword = () => {
        if (form.password === form.confirmPassword) { return true; }
        return false;
    }

    const hasNoSpecialCharacter = (value) => {
        if (value === undefined) { value = '' }
        const regExp = /^[^`~!@#$%^&*()_+={}\[\]|\\:;“’<,>.?๐฿]*$/;
        const result = value.toString().match(regExp);
        return result !== null ? true : false;
    }

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

    return (
        <div className="Signup">
            <form className="Signup"
                onSubmit={async (event) => {
                    event.preventDefault();
                    canSubmit();
                    // canSubmit();
                    // if (1) {
                    //     await signup();
                    // }
                }}>
                <label>Email Address</label>
                <input className="Signup__email"
                    ref={emailRef}
                    type="email"
                    value={form.email}
                    onChange={(event) => changeState(
                        SetStateType.SET_FORM,
                        FormType.EMAIL,
                        event.target.value
                    )}
                    onBlur={async (event) => {
                        let value = '';
                        let confirmedValue = false;
                        if (form.email.length === 0) {
                            const EMPTY_EMAIL_ADDRESS = 'Please fill out this field.';
                            value = EMPTY_EMAIL_ADDRESS;
                        } else if (isEmail(form.email)) {
                            await verifyEmail()
                                .then((resolve) => {
                                    value = resolve;
                                    confirmedValue = true;
                                }, (reject) => {
                                    value = reject;
                                })
                        } else {
                            const INVALID_EMAIL_ADDRESS = 'It is an invalid email address';
                            value = INVALID_EMAIL_ADDRESS;
                        }
                        changeState(
                            SetStateType.SET_FORM_VERIFIER,
                            FormType.EMAIL,
                            value
                        )
                        setEmailConfirmed(confirmedValue);
                    }}
                />
                <div className="Signup__email--check">{formVerifier.email}</div>

                <label>Password</label>
                <input className="Signup__password"
                    ref={passwordRef}
                    value={form.password}
                    type="password"
                    onChange={(event) => changeState(
                        SetStateType.SET_FORM,
                        FormType.PASSWORD,
                        event.target.value
                    )}
                    onBlur={(event) => {
                        let value = '';
                        let confirmedValue = false;
                        if (form.password.length === 0) {
                            const EMPTY_PASSWORD = 'Please fill out this field';
                            value = EMPTY_PASSWORD;
                        } else if (isPassword(event.target.value)) {
                            const INVALID_PASSWORD = 'Great!';
                            value = INVALID_PASSWORD;
                            confirmedValue = true;
                        } else {
                            const INVALID_PASSWORD = 'Password must contain 8 to 16 characters with a mix of letters, numbers and sepcial character.';
                            value = INVALID_PASSWORD;
                        }
                        changeState(
                            SetStateType.SET_FORM_VERIFIER,
                            FormType.PASSWORD,
                            value
                        )
                        setPasswordConfirmed(confirmedValue);
                    }}
                />
                <div className="Signup__password--check">{formVerifier.password}</div>

                <label>Password Confirm</label>
                <input className="Signup__password-confirm"
                    ref={confirmPasswordRef}
                    value={form.confirmPassword}
                    type="password"
                    onChange={(event) => changeState(
                        SetStateType.SET_FORM,
                        FormType.CONFIRM_PASSWORD,
                        event.target.value
                    )}
                    onBlur={(event) => {
                        let value = '';
                        let confirmedValue = false;
                        if (form.confirmPassword.length === 0) {
                            const EMPTY_CONFIRM_PASSWORD = 'Please fill out this field';
                            value = EMPTY_CONFIRM_PASSWORD;
                        } else if (isSamePassword()) {
                            const SAME_PASSWORD = 'Great!';
                            value = SAME_PASSWORD;
                            confirmedValue = true;
                        } else {
                            const DIFFERENT_CONFIRM_PASSWORD = 'Both passwords do not match.';
                            value = DIFFERENT_CONFIRM_PASSWORD;
                        }
                        changeState(
                            SetStateType.SET_FORM_VERIFIER,
                            FormType.CONFIRM_PASSWORD,
                            value
                        )
                        setConfirmPasswordConfirmed(confirmedValue);
                    }}
                />
                <div className="Signup__password-confirm--check">{formVerifier.confirmPassword}</div>

                <label>User Name</label>
                <input className="Signup__user-name"
                    ref={userNameRef}
                    type="text"
                    value={form.userName}
                    onChange={(event) => changeState(
                        SetStateType.SET_FORM,
                        FormType.USER_NAME,
                        event.target.value
                    )}
                    onBlur={(event) => {
                        let value = '';
                        let confirmedValue = false;
                        if (form.userName.length === 0) {
                            const EMPTY_USER_NAME = 'Please fill out this field.';
                            value = EMPTY_USER_NAME;
                        } else if (hasNoSpecialCharacter(form.userName)) {
                            const NO_SPECIAL_CHARACTER = 'Great!';
                            value = NO_SPECIAL_CHARACTER;
                            confirmedValue = true;
                        } else {
                            const HAS_SPECIAL_CHARACTER = 'User name must not contain special character.'
                            value = HAS_SPECIAL_CHARACTER;
                        }
                        changeState(
                            SetStateType.SET_FORM_VERIFIER,
                            FormType.USER_NAME,
                            value
                        )
                        setUserNameConfirmed(confirmedValue);
                    }}
                />
                <div className="Signup__user-name--check">{formVerifier.userName}</div>

                <input className="Signup__sign-up" type="submit" value="Sign up" />
            </form>
        </div>
    );
}

export default Signup;