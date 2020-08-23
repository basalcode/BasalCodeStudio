import React, { useState } from 'react';
import './Login.css'

function Login({ history }) {
    let [form, setForm] = useState({
        email: '',
        password: ''
    });
    let [errorMessage, setErrorMessage] = useState('');
    let [lock, setLock] = useState(false);

    const signin = () => {
        return new Promise((resolve, reject) => {
            setLock(true);
            const loginObject = {
                email: form.email,
                password: form.password
            }
            setForm(previous => {
                return {...previous, email: '', password: ''}
            });

            const page = 'login'
            fetch(`/request/user/read/account?page=${page}`, {
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

    const changeForm = (name, event) => {
        const targetValue = event.target.value;
        setForm(previous => {
            return { ...previous, [name]: targetValue }
        })
    }

    return (
        <div className="Login">
            <form onSubmit={async (event) => {
                event.preventDefault();
                if (!lock) {
                    await signin()
                    .then((resolve) => {
                        history.push('/blog/main');
                    }, (reject) => {
                        setForm(previous => {
                            return {...previous, email: ''}
                        });
                        setErrorMessage(reject);
                    })
                    setLock(false);
                }
            }}>
                <label>email: </label>
                <input className="Login__id"
                    type="text"
                    value={form.email}
                    onChange={(event) => { changeForm('email', event) }} />
                <label>pw: </label>
                <input className="Login__password"
                    type="password"
                    value={form.password}
                    onChange={(event) => { changeForm('password', event) }} />
                <input className="Login__submit--login" type="submit" value="Sign in" />
                <div className="Login__error">{errorMessage}</div>
            </form>
            <input className="Login__submit--signup"
                type="button"
                value="Sign up"
                onClick={() => { history.push('/signup') }}
            />
        </div>
    );
}

export default Login;