/* module */
import React, { useState, useRef } from 'react';

/* api */
import { get as getEmail } from 'api/user/email/email';

/* lib */
import { isEmail } from 'lib/verifyForm';

const Signup = () => {
    /* state */
    const [emailData, setEmailData] = useState({
        input: '',
        message: '',
        verified: false,
        ref: useRef(null)
    });
    const [userNameData, setUserNameData] = useState({
        input: '',
        message: '',
        verified: false,
        ref: useRef(null)
    });
    const [passwordData, setPasswordData] = useState({
        input: '',
        message: '',
        verified: false,
        ref: useRef(null)
    });
    const [confirmPasswordData, setConfirmPasswordData] = useState({
        input: '',
        message: '',
        verified: false,
        ref: useRef(null)
    });

    // const canSubmit = () => {
    //     let permission = false;
    //     if (emailData.verified !== true) {
    //         emailData.ref.current.focus();
    //     }
    //     else if (userNameData.verified !== true) {
    //         passwordData.ref.current.focus();
    //     }
    //     else if (passwordData.verified !== true) {
    //         confirmPasswordData.ref.current.focus();
    //     }
    //     else if (confirmPasswordData.verified !== true) {
    //         userNameData.ref.current.focus();
    //     } else {
    //         permission = true;
    //     }
    //     return permission;
    // }
    // const signup = () => {
    //     return new Promise((resolve, reject) => {
    //         let accountObject = {
    //             email: emailText,
    //             password: passwordText,
    //             confirmPassword: confirmPasswordText,
    //             userName: userNameText
    //         }
    //         fetch(`/request/user/create/account`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(accountObject)
    //         })
    //             .then(response => response.json())
    //             .then(result => {
    //                 const isSuccess = result.validity;
    //                 if (isSuccess) {
    //                     const CREATE_ACCOUNT_SUCCESS = result.value;
    //                     resolve(CREATE_ACCOUNT_SUCCESS);
    //                 } else {
    //                     const CREATE_ACCOUNT_ERROR = result.value;
    //                     reject(CREATE_ACCOUNT_ERROR);
    //                 }
    //             })
    //     })
    // }
    // const onSubmitHandler = async (event) => {
    //     const eventTarget = event.target;
    //     event.preventDefault();
    //     if (canSubmit()) {
    //         await signup()
    //             .then((resolve) => {
    //                 eventTarget.reset();
    //                 alert(resolve);
    //                 history.push('/blog/lobby');
    //             }, (reject) => {
    //                 eventTarget.reset();
    //                 alert(reject);
    //                 history.replace('/signup');
    //             });
    //     }
    // }


    /* event handler */
    // email
    const onEmailChangeHandler = event => {
        setEmailData({
            ...emailData,
            input: event.target.value
        });
    }

    const onEmailBlurHandler = async event => {
        const inputValue = event.target.value;

        let message = '';
        let verified = false;
        if (inputValue.length === 0) {
            const EMPTY_VALUE = '이메일을 입력해주세요.';
            message = EMPTY_VALUE;
            verified = false;
        } else if (isEmail(inputValue)) {
            console.log('test');
            await getEmail(inputValue);
        } else {
            const INVALID_EMAIL_ADDRESS = '유효하지 않은 이메일 주소입니다.';
            message = INVALID_EMAIL_ADDRESS;
            verified = false;
        }

        setEmailData({
            ...emailData,
            message: message
        });
        // onInputBlur(text, confirmed);
    }

    // userName
    const onUserNameChangeHandler = event => {
        setUserNameData({
            ...userNameData,
            input: event.target.value
        });
    }

    const onUserNameBlurHandler = event => {
        const inputValue = event.target.value;

        let message = '';
        let verified = false;
        if (inputValue.length === 0) {
            const EMPTY_VALUE = 'Please fill out this field.';
            message = EMPTY_VALUE;
        } else if (1/* hasNoSpecialCharacter(inputValue) */) {
            const CONFIRM_MESSAGE = 'Great!'
            message = CONFIRM_MESSAGE;
            verified = true;
        } else {
            const HAS_SPECIAL_CHARACTER = 'User name must not contain special character.';
            message = HAS_SPECIAL_CHARACTER;
        }

        setUserNameData({
            ...userNameData,
            message: message
        });
        // onInputBlur(text, verified);
    }

    // password
    const onPasswordChangeHandler = event => {
        setPasswordData({
            ...passwordData,
            input: event.target.value
        });
    }

    const onPasswordBlurHandler = event => {
        const inputValue = event.target.value;

        let message = '';
        let verified = false;
        if (inputValue.length === 0) {
            const EMPTY_VALUE = 'Please fill out this field.';
            message = EMPTY_VALUE;
        } else if (1/* isPassword(inputValue) */) {
            const CONFIRM_MESSAGE = 'Great!'
            message = CONFIRM_MESSAGE;
            verified = true;
        } else {
            const INVALID_PASSWORD = 'Password must contain 8 to 16 characters with a mix of letters, numbers and sepcial character.';
            message = INVALID_PASSWORD;
        }

        setPasswordData({
            ...passwordData,
            message: message
        });
        // setMessage(stateMessage);
        // onInputBlur(inputValue, verified);
    }

    // confirmPassword
    const onConfirmPasswordChangeHandler = event => {
        setConfirmPasswordData({
            ...confirmPasswordData,
            input: event.target.value
        });
    }

    const onConfirmPasswordBlurHandler = (event) => {
        const inputValue = event.target.value;

        let message = '';
        let confirmed = false;
        if (inputValue.length === 0) {
            const EMPTY_VALUE = 'Please fill out this field.';
            message = EMPTY_VALUE;
        } else if (1/* inputValue === passwordText */) {
            const CONFIRM_MESSAGE = 'Great!'
            message = CONFIRM_MESSAGE;
            confirmed = true;
        } else {
            const DIFFERENT_PASSWORD = 'Both passwords do not match.';
            message = DIFFERENT_PASSWORD;
        }

        setConfirmPasswordData({
            ...confirmPasswordData,
            message: message
        });

        // setMessage(stateMessage);
        // setConfirm(confirmed);
        // onInputBlur(inputValue, confirmed);
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