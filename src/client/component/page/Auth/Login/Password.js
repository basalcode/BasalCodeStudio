/* module */
import React, { useState } from 'react';

const Password = ({ onTextChange, forwardedRef }) => {
    const [text, setText] = useState('');
    const onChangeHandler = (event) => {
        setText(event.target.value);
    }

    const onBlurHandler = (event) => {
        const inputValue = event.target.value;
        onTextChange(inputValue);
    }

    return (
        <div>
            <label>pw: </label>
            <input 
                ref={forwardedRef}
                type="password"
                value={text}
                onChange={onChangeHandler} 
                onBlur={onBlurHandler}
            />
        </div>
    );
}

export default Password;