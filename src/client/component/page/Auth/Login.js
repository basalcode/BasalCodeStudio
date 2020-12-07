/* module */
import React, { useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/* store */
import { login as loginAction } from 'store/action/auth';

const Login = () => {
    /* store */
    const dispatch = useDispatch();
    const history = useHistory();

    /* state */
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    /* useRef */
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const messageRef = useRef(null);

    /* function */
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

    /* event handler */
    // email
    const onEmailChangeHandler = (event) => {
        setEmailText(event.target.value);
    }

    const onEmailBlurHandler = (event) => {
        setPasswordText(event.target.value);
    }

    // password
    const onPasswordChangeHandler = (event) => {
        setPasswordText(event.target.value);
    }

    const onPasswordBlurHandler = (event) => {
        setPasswordText(event.target.value);
    }

    // submit
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
        <section className="Login">
            <div className="Login__container">
                <h1 className="Login__title">Login</h1>
                <form className="Login__form"
                    onSubmit={onSubmitHandler}>
                    <div className={
                        "Login__item " +
                        "Login__email"}>
                        <div className={
                            "Login__label-container"}>
                            <label className={
                                "Login__label " +
                                "Login__email-label"}>
                                email:</label>
                        </div>
                        <div className={
                            "Login__input-container"}>
                            <input className={
                                "Login__input " +
                                "Login__email-input"}
                                type="email"
                                value={emailText}
                                onChange={onEmailChangeHandler}
                                onBlur={onEmailBlurHandler} />
                        </div>
                    </div>
                    <div className={
                        "Login__item " +
                        "Login__password"}>
                        <div className={
                            "Login__label-container"}>
                            <label className={
                                "Login__label " +
                                "Login__password-label"}>
                                pw:</label>
                        </div>
                        <div className={
                            "Login__input-container"}>
                            <input className={
                                "Login__input " +
                                "Login__password-input"}
                                type="password"
                                value={passwordText}
                                onChange={onPasswordChangeHandler}
                                onBlur={onPasswordBlurHandler} />
                        </div>
                    </div>
                    <div className={
                        "Login__item " +
                        "Login__message"}
                        ref={messageRef}>
                        {errorMessage}
                    </div>
                    <div className={
                        "Login__item " +
                        "Login__submit-container"}>
                        <input className={"Login__submit"}
                            type="submit"
                            value="Sign in" />
                    </div>
                    <Link className="Login__signup"
                        to="/auth/signup">Sign up</Link>
                </form>
            </div>
        </section>
    );
}

export default Login;