/* module */
import React, { useState } from 'react';

/* lib */
import { isEmail } from 'lib/verifyForm';

const SignupEmail = ({ onInputBlur, forwardedRef }) => {
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');

    const onChangeHandler = (event) => { setText(event.target.value); }

    const verifyEmail = () => {
        return new Promise((resolve, reject) => {
            const page = 'signup';
            const email = text;
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
        });
    }
    const doesEmailNotExist = async () => {
        return await verifyEmail()
            .then((resolve) => {
                return [resolve, true];
            }, (reject) => {
                return [reject, false];
            });
    }
    const onBlurHandler = async (event) => {
        const inputValue = event.target.value;

        let stateMessage = '';
        let confirmed = false;
        if (inputValue.length === 0) {
            const EMPTY_VALUE = 'Please fill out this field.';
            stateMessage = EMPTY_VALUE;
        } else if (isEmail(inputValue)) {
            [stateMessage, confirmed] = await doesEmailNotExist();
        } else {
            const INVALID_EMAIL_ADDRESS = 'It is an invalid email address'
            stateMessage = INVALID_EMAIL_ADDRESS;
        }
        
        setMessage(stateMessage);
        onInputBlur(text, confirmed);
    }

    return (
        <div className="Email">
            <label>Email Address</label>
            <input
                ref={forwardedRef}
                type="email"
                value={text}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
            />
            <div className="Signup__email--check">{message}</div>
        </div>
    );
}

export default SignupEmail;