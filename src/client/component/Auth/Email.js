import React, { useState } from 'react';

import verifyInputValue from 'library/verifyInputValue';
import { isEmail } from 'library/verifyForm';

const Email = (props) => {
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');
    const [verified, setVerified] = useState(false);

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
            return [ resolve, true ];
        }, (reject) => {
            return [ reject, false ];
        });
    }
    const onBlurHandler = async (event) => {
        const inputValue = event.target.value;
        const INVALID_EMAIL_ADDRESS = 'It is an invalid email address'
        const [RESULT_MESSAGE, isSucceed] = await doesEmailNotExist();

        const [stateMessage, isConfirmed] = verifyInputValue(
            isEmail, 
            inputValue, 
            RESULT_MESSAGE, 
            isSucceed, 
            INVALID_EMAIL_ADDRESS
        );

        setMessage(stateMessage);
        setVerified(isConfirmed);
        props.onInputBlur(text, isConfirmed);
    }

    return (
        <div className="Email">
            <label>Email Address</label>
            <input
                ref={props.forwardedRef}
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