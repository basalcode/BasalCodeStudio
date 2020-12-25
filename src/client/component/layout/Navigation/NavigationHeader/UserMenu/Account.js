/* component */
import React from 'react';
import { useDispatch } from 'react-redux';

/* store */
import { action as authAction } from 'store/action/auth/auth';

const Account = () => {
    const dispatch = useDispatch();

    const onClickHandler = (event) => {
        dispatch(authAction.delete());
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