import React, { useState } from 'react';

import verifyInputValue from 'library/verifyInputValue';
import { hasNoSpecialCharacter } from 'library/verifyForm';

const UserName = (props) => {
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');
    const [verified, setVerified] = useState(false);

    const onChangeHandler = (event) => { setText(event.target.value); }

    const onBlurHandler = (event) => {
        const inputValue = event.target.value;
        const validMessage = 'Great!'
        const HAS_SPECIAL_CHARACTER = 'User name must not contain special character.';

        const [stateMessage, isConfirmed] = verifyInputValue(
            hasNoSpecialCharacter, 
            inputValue, 
            validMessage, 
            true, 
            HAS_SPECIAL_CHARACTER
        );

        setMessage(stateMessage);
        setVerified(isConfirmed);

        props.onInputBlur(text, isConfirmed);
    }

    return (
        <div className="UserName">
            <label>User Name</label>
            <input
                ref={props.forwardedRef}
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