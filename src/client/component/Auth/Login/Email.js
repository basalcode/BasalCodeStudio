import React, { useState } from 'react';

const Email = ({ onTextChange, forwardedRef }) => {
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
            <label>email: </label>
            <input 
                ref={forwardedRef}
                type="email"
                value={text}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
            />
        </div>
    )
}

export default Email;