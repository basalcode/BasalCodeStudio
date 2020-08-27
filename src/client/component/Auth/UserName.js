import React, { useState } from 'react';

import verifyInputValue from '/library/verifyInputValue';
import { hasNoSpecialCharacter } from '/library/verifyForm';

const UserName = () => {
    const [text, setText] = useState(value);
    const [message, setMessage] = useState(value);
    const [verified, setVerified] = useState(value);

    const onChangeHandler = (event) => { setText(event.target.value); }

    const onBlurHandler = (event) => {
        const inputValue = envet.target.value;
        const validMessage = 'Great!'
        const HAS_SPECIAL_CHARACTER = 'User name must not contain special character.';

        const [stateMessage, confirmed] =verifyInputValue(hasNoSpecialCharacter, inputValue, [validMessage, true], HAS_SPECIAL_CHARACTER);

        setMessage(stateMessage);
        setVerified(confirmed);
    }
    
    return (
        <div className="UserName">
            <label>User Name</label>
            <input 
                ref={userNameRef}
                type="text"
                value={text}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
            />
            <div className="Signup__user-name--check">{message}</div>
        </div>
    );

export default UserName;