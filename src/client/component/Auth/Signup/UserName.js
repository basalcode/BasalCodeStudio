import React, { useState } from 'react';

import { hasNoSpecialCharacter } from 'library/verifyForm';

const UserName = ({ onInputBlur, forwardedRef }) => {
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');

    const onChangeHandler = (event) => { setText(event.target.value); }

    const onBlurHandler = (event) => {
        const inputValue = event.target.value;

        let stateMessage = '';
        let confirmed = false;
        if (inputValue.length === 0) {
            const EMPTY_VALUE = 'Please fill out this field.';
            stateMessage = EMPTY_VALUE;
        } else if (hasNoSpecialCharacter(inputValue)) {
            const CONFIRM_MESSAGE = 'Great!'
            stateMessage = CONFIRM_MESSAGE;
            confirmed = true;
        } else {
            const HAS_SPECIAL_CHARACTER = 'User name must not contain special character.';
            stateMessage = HAS_SPECIAL_CHARACTER;
        }

        setMessage(stateMessage);
        onInputBlur(text, confirmed);
    }

    return (
        <div className="UserName">
            <label>User Name</label>
            <input
                ref={forwardedRef}
                type="text"
                value={text}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
            />
            <div className="Signup__user-name--check">{message}</div>
        </div>
    );
}

export default UserName;