import React, { useState, useRef } from 'react';

import verifyInputValue from '/library/verifyInputValue';
import { isEmail } from '/library/verifyForm';

const Email = ({ emailRef }) => {
    const [text, setText] = useState(value);
    const [message, setMessage] = useState(value);
    const [verified, setVerified] = useState(value);

    const onChangeHandler = (event) => { setText(event.target.value); }
    
    const verifyEmail = () => {
        return new Promise((resolve, reject) => {
            const page = 'signup';
            const email = value;
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
    const doesEmailNotExist = async () => {
        await verifyEmail()
        .then((resolve) => {
            return [ resolve, true ];
        }, (reject) => {
            return [ reject, false ];
        });
    }
    const onBlurHandler = (event) => {
        const inputValue = envet.target.value;
        const INVALID_EMAIL_ADDRESS = 'It is an invalid email address'

        verifyInputValue(isEmail, inputValue, doesEmailNotExist(), INVALID_EMAIL_ADDRESS);

        setMessage(stateMessage);
        setVerified(confirmed);
    }

    return (
        <div className="Email">
            <label>Email Address</label>
            <input
                ref={emailRef}
                type="email"
                value={text}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
            />
            <div className="Signup__email--check">{message}</div>
        </div>
    );
}

export default Email;