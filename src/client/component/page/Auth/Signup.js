/* module */
import React, { useState, useRef } from 'react';

/* api */
import { get as getEmail } from 'api/user/email/email';

/* lib */
import { 
    isEmail,
    isEngKorNumber,
    isPassword
} from '~/../../shared/formValidation';

const Signup = () => {
    /* state */
    const [emailData, setEmailData] = useState({
        input: '',
        message: '',
        isValid: false,
        isChanged: false,
        ref: useRef(null)
    });
    const [userNameData, setUserNameData] = useState({
        input: '',
        message: '',
        isValid: false,
        isChanged: false,
        ref: useRef(null)
    });
    const [passwordData, setPasswordData] = useState({
        input: '',
        message: '',
        isValid: false,
        isChanged: false,
        ref: useRef(null)
    });
    const [confirmPasswordData, setConfirmPasswordData] = useState({
        input: '',
        message: '',
        isValid: false,
        isChanged: false,
        ref: useRef(null)
    });

    /* event handler */
    // email
    const onEmailChangeHandler = event => {
        setEmailData({
            ...emailData,
            input: event.target.value,
            isChanged: true
        });
    }

    const onEmailBlurHandler = async event => {
        if (!emailData.isChanged) return;

        const inputValue = event.target.value;

        let message = '';
        let isValid = false;
        if (inputValue.length === 0) {
            message = '이메일을 입력해주세요.';
            isValid = false;
        } else if (isEmail(inputValue)) {
            const response = await getEmail(inputValue);
            const availability = response.payload.availability;

            if (availability) {
                message = '사용 가능한 이메일입니다.';
                isValid = true;
            } else {
                message = '이미 존재하는 이메일입니다.';
                isValid = false;
            }
        } else {
            message = '유효하지 않은 이메일 주소입니다.';
            isValid = false;
        }

        setEmailData({
            ...emailData,
            message: message,
            isValid: isValid,
            isChanged: false
        });
    }

    // userName
    const onUserNameChangeHandler = event => {
        setUserNameData({
            ...userNameData,
            input: event.target.value,
            isChanged: true
        });
    }

    const onUserNameBlurHandler = event => {
        if (!userNameData.isChanged) return;

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
            message = '성공!';
            isValid = true;
        } else {
            message = '한글, 영어, 숫자만 사용할 수 있습니다.';
            isValid = false;
        }

        setUserNameData({
            ...userNameData,
            message: message,
            idValid: isValid,
            isChanged: true
        });
    }

    // password
    const onPasswordChangeHandler = event => {
        setPasswordData({
            ...passwordData,
            input: event.target.value,
            isChanged: true
        });

        if (confirmPasswordData.isValid) {
            setConfirmPasswordData({
                ...confirmPasswordData,
                message: '비밀번호가 일치하지 않습니다.',
                isValid: false
            });
        } else if (confirmPasswordData.isChanged &&
            event.target.value === confirmPasswordData.input) {
            setConfirmPasswordData({
                ...confirmPasswordData,
                message: '비밀번호가 일치합니다!',
                isValid: true
            });
        }
    }

    const onPasswordBlurHandler = event => {
        if (!passwordData.isChanged) return;

        const inputValue = event.target.value;

        let message = '';
        let isValid = false;
        if (inputValue.length === 0) {
            message = '비밀번호를 입력해주세요.';
            isValid = false;
        } else if (isPassword(inputValue, 8)) {
            message = '좋습니다!';
            isValid = true;
        } else {
            message = '8자리 이상의 문자, 숫자, 특수 기호를 조합해주세요.';
            isValid = false;
        }

        setPasswordData({
            ...passwordData,
            message: message,
            isValid: isValid,
            isChanged: true
        });
    }

    // confirmPassword
    const onConfirmPasswordChangeHandler = event => {
        setConfirmPasswordData({
            ...confirmPasswordData,
            input: event.target.value,
            isChanged: true
        });
    }

    const onConfirmPasswordBlurHandler = (event) => {
        if (!confirmPasswordData.isChanged) return;

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
            message: message,
            isValid: isValid,
            isChanged: true
        });
    }

    // onSubmit
    const onSubmitHandler = () => {

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
                                onChange={onUserNameChangeHandler}
                                onBlur={onUserNameBlurHandler} />
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
                                onChange={onPasswordChangeHandler}
                                onBlur={onPasswordBlurHandler} />
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
                                onChange={onConfirmPasswordChangeHandler}
                                onBlur={onConfirmPasswordBlurHandler}
                            />
                        </div>
                        <div className="Signup__message">
                            {confirmPasswordData.message}
                        </div>
                    </div>
                    <div className="Signup__submit-container">
                        <input className="Signup__submit"
                            type="submit"
                            value="Sign up" />
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Signup;