import React from 'react';

import './Account.css'

const Account = () => {
    const onClickHandler = (event) => {
        const LOG_OUT = false;
        fetch(`/auth/update/login?session=${LOG_OUT}`)
        .then(response => response.json())
        .then(result => {
            const isSuccess = result.validity;
            if (isSuccess) {
                alert('You have logged out successfully!');
            } else {
                const LOGOUT_FAILD = result.value;
                alert(LOGOUT_FAILD);
            }
        })
    }

    return (
        <div className="Account">
            <p>Login Success !</p>
            <input 
                type="button" 
                value="logout"
                onClick={onClickHandler}
            ></input>
        </div>
    );
}

export default Account;