import React, { useState, useRef } from 'react';

import verifyInputValue from 'library/verifyInputValue';
import { isSamePassword } from 'library/verifyForm';

const ConfirmPassword = (props) => {
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');
    const [verified, setVerified] = useState(false);

    const onChangeHandler = (event) => { setText(event.target.value); }

    const onBlurHandler = (event) => {
        const inputValue = [event.target.value, props.originalPassword];
        const RESULT_MESSAGE = 'Great!'
        const DIFFERENT_PASSWORD = 'Both passwords do not match.';

        const [stateMessage, isConfirmed] = verifyInputValue(
            isSamePassword, 
            inputValue, 
            RESULT_MESSAGE, 
            true, 
            DIFFERENT_PASSWORD
        );

        setMessage(stateMessage);
        setVerified(isConfirmed);

        props.onInputBlur(text, isConfirmed);
    }

    return (
        <div className="ConfirmPassword">
            <label>Password Confirm</label>
            <input 
                ref={props.forwardedRef}
                value={text}
                type="password"
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
            />
            <div className="Signup__password-confirm--check">{message}</div>
        </div>
    );
}

export default ConfirmPassword;