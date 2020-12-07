/* module */
import React, { useState } from 'react';

/* lib */
import { isPassword } from 'lib/verifyForm';

const SignupPassword = ({ onInputBlur, forwardedRef }) => {
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');

    const onChangeHandler = (event) => {
        const inputValue = event.target.value;
        setText(inputValue);
    }

    const onBlurHandler = (event) => {
        const inputValue = event.target.value;

        let stateMessage = '';
        let confirmed = false;
        if (inputValue.length === 0) {
            const EMPTY_VALUE = 'Please fill out this field.';
            stateMessage = EMPTY_VALUE;
        } else if (isPassword(inputValue)) {
            const CONFIRM_MESSAGE = 'Great!'
            stateMessage = CONFIRM_MESSAGE;
            confirmed = true;
        } else {
            const INVALID_PASSWORD = 'Password must contain 8 to 16 characters with a mix of letters, numbers and sepcial character.';
            stateMessage = INVALID_PASSWORD;
        }
        
        setMessage(stateMessage);
        onInputBlur(inputValue, confirmed);
    }

    return (
        <div className="Password">
            <label>Password</label>
            <input
                ref={forwardedRef}
                value={text}
                type="password"
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
            />
            <div>{message}</div>
        </div>
    );
}

export default SignupPassword;