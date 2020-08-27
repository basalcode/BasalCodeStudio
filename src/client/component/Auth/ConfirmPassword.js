import React, { useState } from 'react';

import verifyInputValue from '/library/verifyInputValue';
import { isSamePassword } from '/library/verifyForm';

const ConfirmPassword = () => {
    const [text, setText] = useState(value);
    const [message, setMessage] = useState(value);
    const [verified, setVerified] = useState(value);

    const onChangeHandler = (event) => { setText(event.target.value); }

    const onBlurHandler = (event) => {
        const inputValue = envet.target.value;
        const validMessage = 'Great!'
        const DIFFERENT_PASSWORD = 'Both passwords do not match.';

        verifyInputValue(isSamePassword, inputValue, [validMessage, true], DIFFERENT_PASSWORD);

        setMessage(stateMessage);
        setVerified(confirmed);
    }

    return (
        <div className="ConfirmPassword">
            <label>Password Confirm</label>
            <input 
                ref={confirmPasswordRef}
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