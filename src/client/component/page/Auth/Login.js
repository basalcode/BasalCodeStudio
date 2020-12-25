/* module */
import React, { useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/* api */
import authAPI from 'api/auth/auth';

/* lib */
import responseHandler from 'lib/responseHandler';

/* store */
import { action as authAction } from 'store/action/auth/auth';

/* shared */
import {
    isEmail,
    isPassword
} from '~/../../shared/formValidation';

const Login = () => {
    /* store */
    const dispatch = useDispatch();
    const history = useHistory();

    /* state */
    const [emailData, setEmailData] = useState({
        input: '',
        ref: useRef(null)
    });
    const [passwordData, setPasswordData] = useState({
        input: '',
        ref: useRef(null)
    });
    const [message, setMessage] = useState('');

    /* event handler */
    // email
    const onEmailChangeHandler = event => {
        setEmailData({
            ...emailData,
            input: event.target.value
        });
    }

    // password
    const onPasswordChangeHandler = event => {
        setPasswordData({
            ...passwordData,
            input: event.target.value
        });
    }

    // submit
    const onSubmitHandler = async event => {
        event.preventDefault();

        let message = '';
        let isValid = false;
        if (emailData.input.length === 0) {
            message = '이메일을 입력해주세요.';
            isValid = false;
        } else if (isEmail(emailData.input)) {
            message = '올바른 이메일 주소입니다.';
            isValid = true;
        } else {
            message = '이메일 주소가 아닙니다.';
            isValid = false;
        }

        if (!isValid) {
            setMessage(message);
            emailData.ref.current.focus();
            return;
        }

        if (passwordData.input.length === 0) {
            message = '비밀번호를 입력해주세요.';
            isValid = false;
        } else if (isPassword(passwordData.input, 8)) {
            message = '사용 가능한 비밀번호 입니다.';
            isValid = true;
        } else {
            message = '8자리 이상의 문자, 숫자, 특수 기호를 조합해주세요.';
            isValid = false;
        }

        if (!isValid) {
            setMessage(message);
            passwordData.ref.current.focus();
            return;
        }

        const formData = {
            email: emailData.input,
            password: passwordData.input
        };

        const response = await authAPI.post(formData);

        const isLoggedIn = response.payload.isLoggedIn;
        responseHandler(response, () => {
            if (isLoggedIn) {
                const email = response.payload.email;
                const userName = response.payload.userName;

                alert(`${userName}님, 반갑습니다.`);

                dispatch(authAction.post(email, userName));

                history.push('/blog/lobby');
            } else {
                alert('이메일 또는 비밀번호가 잘못되었습니다.');
            }
        }, () => {
            history.go(0);
        });
    }

    return (
        <section className="Login">
            <div className="Login__container">
                <h1 className="Login__title">Log in</h1>
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
                                ref={emailData.ref}
                                type="email"
                                value={emailData.input}
                                onChange={onEmailChangeHandler} />
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
                                ref={passwordData.ref}
                                type="password"
                                value={passwordData.input}
                                onChange={onPasswordChangeHandler} />
                        </div>
                    </div>
                    <div className={
                        "Login__message"}>
                        {message}
                    </div>
                    <input className={"Login__submit"}
                        type="submit"
                        value="Sign in" />
                    <Link className="Login__signup"
                        to="/auth/signup">Sign up</Link>
                </form>
            </div>
        </section>
    );
}

export default Login;