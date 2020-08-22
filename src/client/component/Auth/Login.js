import React, { useState } from 'react';
import './Login.css'

function Login({ history}) {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [errorMessage, setErrorMessage] = useState('')
    let [lock, setLock] = useState(false);

    const signin = (loginObject) => {
        return new Promise((resolve, reject) => {
            fetch('/request/user/read/account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginObject)
            }).then(function (response) {
                return response.json()
            }).then(function (result) {
                if (result.validity) {
                    const loginSuccess = result.value;
                    resolve(loginSuccess);
                } else {
                    const loginFailed = result.value;
                    reject(loginFailed);
                }
            });
        });
    }

    return (
        <div className="Login">
            <label>email: </label>
            <input className="Login__id" 
                type="text"
                value={email} 
                onChange={(event) => { setEmail(event.target.value) }} />
            <label>pw: </label>
            <input className="Login__password" 
                type="password"
                value={password} 
                onChange={(event) => { setPassword(event.target.value) }} />

            <input className="submit"
                type="submit"
                value="Sign in"
                onClick={ async () => {
                    if (!lock) {
                        setLock(true);
                        const loginObject = {
                            email: email,
                            password: password
                        }
                        setEmail('');
                        setPassword('');
                        await signin(loginObject)
                        .then((resolve) => {
                            console.log(resolve);
                            history.push('/blog/main');
                        }, (reject) => {
                            setEmail(email);
                            setErrorMessage(reject);
                        })
                        setLock(false);
                    }}} />
            <div className="Login__error">{errorMessage}</div>
            <input className="submit" type="submit" value="Sign up" />
        </div>
    );
}

export default Login;