import React, { useState } from 'react';

import verifyInputValue from '/library/verifyInputValue';
import { isPassword } from '/library/verifyForm';

const Password = () => {
    const [text, setText] = useState(value);
    const [message, setMessage] = useState(value);
    const [verified, setVerified] = useState(value);

    const onChangeHandler = (event) => { setText(event.target.value); }

    const onBlurHandler = (event) => {
        const inputValue = envet.target.value;
        const validMessage = 'Great!'
        const INVALID_PASSWORD = 'Password must contain 8 to 16 characters with a mix of letters, numbers and sepcial character.';

        verifyInputValue(isPassword, inputValue, [validMessage, true], INVALID_PASSWORD);

        setMessage(stateMessage);
        setVerified(confirmed);
    }

    return (
        <div className="Password">
            <label>Password</label>
            <input
                ref={passwordRef}
                value={text}
                type="password"
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
            />
            <div className="Signup__password--check">{message}</div>
        </div>
    );
}

export default Password;