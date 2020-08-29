import React, { useState } from 'react';

import verifyInputValue from 'library/verifyInputValue';
import { isPassword } from 'library/verifyForm';

const Password = (props) => {
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');
    const [verified, setVerified] = useState(false);

    const onChangeHandler = (event) => { setText(event.target.value); }

    const onBlurHandler = (event) => {
        const inputValue = event.target.value;
        const RESULT_MESSAGE = 'Great!'
        const INVALID_PASSWORD = 'Password must contain 8 to 16 characters with a mix of letters, numbers and sepcial character.';

        const [stateMessage, isConfirmed] = verifyInputValue(
            isPassword, 
            inputValue, 
            RESULT_MESSAGE, 
            true, 
            INVALID_PASSWORD
        );

        setMessage(stateMessage);
        setVerified(isConfirmed);

        props.onInputBlur(text, isConfirmed);
    }

    return (
        <div className="Password">
            <label>Password</label>
            <input
                ref={props.forwardedRef}
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