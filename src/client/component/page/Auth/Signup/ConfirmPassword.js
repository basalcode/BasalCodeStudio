/* module */
import React, { useEffect, useState } from 'react';

const ConfirmPassword = ({ onInputBlur, passwordText, forwardedRef }) => {
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');
    const [confirm, setConfirm] = useState('false');

    const onChangeHandler = (event) => { setText(event.target.value); }

    const onBlurHandler = (event) => {
        const inputValue = event.target.value;

        let stateMessage = '';
        let confirmed = false;
        if (inputValue.length === 0) {
            const EMPTY_VALUE = 'Please fill out this field.';
            stateMessage = EMPTY_VALUE;
        } else if (inputValue === passwordText) {
            const CONFIRM_MESSAGE = 'Great!'
            stateMessage = CONFIRM_MESSAGE;
            confirmed = true;
        } else {
            const DIFFERENT_PASSWORD = 'Both passwords do not match.';
            stateMessage = DIFFERENT_PASSWORD;
        }

        setMessage(stateMessage);
        setConfirm(confirmed);
        onInputBlur(inputValue, confirmed);
    }

    useEffect(() => {
        if (confirm && text !== passwordText) {
            const DIFFERENT_PASSWORD = 'Both passwords do not match.';
            setMessage(DIFFERENT_PASSWORD);
            setConfirm(false);

            onInputBlur(text, false);
        }
        if (!confirm && text === passwordText) {
            const CONFIRM_MESSAGE = 'Great!';
            setMessage(CONFIRM_MESSAGE);
            setConfirm(true);

            onInputBlur(text, true);
        }
    }, [passwordText])


    return (
        <div className="ConfirmPassword">
            <label>Password Confirm</label>
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

export default ConfirmPassword;