/* module */
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

/* api */
import getEmail from 'api/user/email/email';
import postUser from 'api/user/user';

/* lib */
import responseHandler from 'lib/responseHandler';

/* shared */
import {
    isEmail,
    isEngKorNumber,
    isPassword
} from '~/../../shared/formValidation';

const Signup = () => {
    /* history */
    const history = useHistory();

    /* state */
    const [emailData, setEmailData] = useState({
        input: '',
        message: '',
        isValid: false,
        ref: useRef(null)
    });
    const [userNameData, setUserNameData] = useState({
        input: '',
        message: '',
        isValid: false,
        ref: useRef(null)
    });
    const [passwordData, setPasswordData] = useState({
        input: '',
        message: '',
        isValid: false,
        ref: useRef(null)
    });
    const [confirmPasswordData, setConfirmPasswordData] = useState({
        input: '',
        message: '',
        isValid: false,
        ref: useRef(null)
    });

    /* event handler */
    // email
    const onEmailChangeHandler = event => {
        const inputValue = event.target.value;
        
        let message = '';
        let isValid = false;
        if (inputValue.length === 0) {
            message = '이메일을 입력해주세요.';
            isValid = false;
        } else if (isEmail(inputValue)) { 
            message = '올바른 이메일 주소입니다.';
            isValid = true;
        } else {
            message = '이메일 주소가 아닙니다.';
            isValid = false;
        }

        setEmailData({
            ...emailData,
            input: inputValue,
            message: message,
            isValid: isValid,
        });
    }

    const onEmailBlurHandler = async event => {
        const inputValue = event.target.value;

        let message = '';
        let isValid = false;
        if (isEmail(inputValue)) {
            const response = await getEmail(inputValue);
            const availability = response.payload.availability;

            if (availability) {
                message = '사용 가능한 이메일입니다.';
                isValid = true;
            } else {
                message = '이미 존재하는 이메일입니다.';
                isValid = false;
            }
        }

        setEmailData({
            ...emailData,
            message: message,
            isValid: isValid,
        });
    }

    // userName
    const onUserNameChangeHandler = event => {
        const inputValue = event.target.value;

        let message = '';
        let isValid = false;
        if (inputValue.length === 0) {
            message = '사용자명을 입력해주세요.';
            isValid = false;
        } else if (inputValue.length > 20) {
            message = '사용자명은 20자 이내로 작성해주세요.';
            isValid = false;
        } else if (isEngKorNumber(inputValue)) {
            message = '사용 가능한 사용자명입니다.';
            isValid = true;
        } else {
            message = '한글, 영어, 숫자만 사용할 수 있습니다.';
            isValid = false;
        }

        setUserNameData({
            ...userNameData,
            input: inputValue,
            message: message,
            isValid: isValid,
        });
    }

    // password
    const onPasswordChangeHandler = event => {
        const inputValue = event.target.value;

        let message = '';
        let isValid = false;
        if (inputValue.length === 0) {
            message = '비밀번호를 입력해주세요.';
            isValid = false;
        } else if (isPassword(inputValue, 8)) {
            message = '사용 가능한 비밀번호 입니다.';
            isValid = true;
        } else {
            message = '8자리 이상의 문자, 숫자, 특수 기호를 조합해주세요.';
            isValid = false;
        }

        setPasswordData({
            ...passwordData,
            input: inputValue,
            message: message,
            isValid: isValid,
        });

        if (confirmPasswordData.input.length === 0) return;
        if (confirmPasswordData.isValid) {
            setConfirmPasswordData({
                ...confirmPasswordData,
                message: '비밀번호가 일치하지 않습니다.',
                isValid: false
            });
        } else if (event.target.value === confirmPasswordData.input) {
            setConfirmPasswordData({
                ...confirmPasswordData,
                message: '비밀번호가 일치합니다!',
                isValid: true
            });
        }
    }

    // confirmPassword
    const onConfirmPasswordChangeHandler = event => {
        const inputValue = event.target.value;

        let message = '';
        let isValid = false;
        if (inputValue.length === 0) {
            message = '비밀번호를 다시 입력해주세요.';
            isValid = false;
        } else if (!passwordData.isValid) {
            message = '비밀번호 형식을 확인해주세요.';
            isValid = false;
        } else if (inputValue === passwordData.input) {
            message = '비밀번호가 일치합니다!';
            isValid = true;
        } else {
            message = '비밀번호가 일치하지 않습니다.';
            isValid = false;
        }

        setConfirmPasswordData({
            ...confirmPasswordData,
            input: event.target.value,
            message: message,
            isValid: isValid,
        });
    }

    // onSubmit
    const onSubmitHandler = async event => {
        event.preventDefault();

        if (!emailData.isValid) {
            alert(emailData.message.length === 0 ?
                '이메일을 입력해주세요.' :
                emailData.message);
            emailData.ref.current.focus();
            return;
        }
        if (!userNameData.isValid) {
            alert(userNameData.message.length === 0 ?
                '사용자명을 입력해주세요.' :
                userNameData.message);
            userNameData.ref.current.focus();
            return;
        }
        if (!passwordData.isValid) {
            alert(passwordData.message.length === 0 ?
                '비밀번호를 입력해주세요.' :
                passwordData.message);
            passwordData.ref.current.focus();
            return;
        }
        if (!confirmPasswordData.isValid) {
            alert(confirmPasswordData.message.length === 0 ?
                '비밀번호를 확인해주세요.' :
                confirmPasswordData.message);
            confirmPasswordData.ref.current.focus();
            return;
        }
        
        setEmailData({
            ...emailData,
            input: '',
            isValid: false,
        });
        setUserNameData({
            ...userNameData,
            input: '',
            isValid: false,
        });
        setPasswordData({
            ...passwordData,
            input: '',
            isValid: false,
        });
        setConfirmPasswordData({
            ...confirmPasswordData,
            input: '',
            isValid: false,
        });

        const formData = {
            email: emailData.input,
            userName: userNameData.input,
            password: passwordData.input,
        }

        const response = await postUser(formData);

        responseHandler(response,
            () => {
                const isEnrolled = response.payload.isEnrolled;

                if (isEnrolled) {
                    alert('계정을 성공적으로 생성했습니다!');
                } else {
                    alert('계정을 생성하는 도중 문제가 생겼습니다. 다시 시도해주세요.');
                }
                history.push('/auth/login');
            }, () => {
                history.go(0);
            }
        );
    }

    return (
        <section className="Signup">
            <div className="Signup__container">
                <h1 className="Signup__title">Sign up</h1>
                <form className="Signup__form"
                    onSubmit={onSubmitHandler}>
                    <div className={
                        "Signup__item " +
                        "Signup__email"}>
                        <div className="Signup__label-container">
                            <label className="Signup__label">Email</label>
                        </div>
                        <div className="Signup__input-container">
                            <input className={
                                "Signup__input " +
                                "Signup__email-input"}
                                type="email"
                                value={emailData.input}
                                ref={emailData.ref}
                                onChange={onEmailChangeHandler}
                                onBlur={onEmailBlurHandler} />
                        </div>
                        <div className="Signup__message">
                            {emailData.message}
                        </div>
                    </div>
                    <div className={
                        "Signup__item " +
                        "UserName"}>
                        <div className="Signup__label-container">
                            <label>User Name</label>
                        </div>
                        <div className="Signup__input-container">
                            <input className={
                                "Signup__input " +
                                "Signup__email-input"}
                                type="text"
                                value={userNameData.input}
                                ref={userNameData.ref}
                                onChange={onUserNameChangeHandler} />
                        </div>
                        <div className="Signup__message">
                            {userNameData.message}
                        </div>
                    </div>
                    <div className={
                        "Signup__item " +
                        "Password"}>
                        <div className="Signup__label-container">
                            <label>Password</label>
                        </div>
                        <div className="Signup__input-container">
                            <input className={
                                "Signup__input " +
                                "Signup__email-input"}
                                type="password"
                                value={passwordData.input}
                                ref={passwordData.ref}
                                onChange={onPasswordChangeHandler} />
                        </div>
                        <div className="Signup__message">
                            {passwordData.message}
                        </div>
                    </div>
                    <div className={
                        "Signup__item " +
                        "ConfirmPassword"}>
                        <div className="Signup__label-container">
                            <label>Password Confirmation</label>
                        </div>
                        <div className="Signup__input-container">
                            <input className={
                                "Signup__input " +
                                "Signup__email-input"}
                                type="password"
                                value={confirmPasswordData.input}
                                ref={confirmPasswordData.ref}
                                onChange={onConfirmPasswordChangeHandler} />
                        </div>
                        <div className="Signup__message">
                            {confirmPasswordData.message}
                        </div>
                    </div>
                    <input className="Signup__submit"
                        type="submit"
                        value="Sign up" />
                </form>
            </div>
        </section>
    );
}

export default Signup;