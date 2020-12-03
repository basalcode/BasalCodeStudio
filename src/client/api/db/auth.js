import axios from 'axios';

export const login = (action) => {
    return new Promise((resolve, reject) => {
        let loginObject = {
            email: action.userEmail,
            password: action.userPassword
        }
        const LOGIN_PAGE = 'login';
        axios.get(`/api/db/account?page=${LOGIN_PAGE}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(loginObject)
        }).then(response => {
            console.log(response);
        })
        .then(response => response.json())
        .then(result => {
            const isSuccess = result.validity;
            if (isSuccess) {
                const loginSuccess = result.value;
                resolve(loginSuccess);
            } else {
                const loginFailed = result.value;
                reject(loginFailed);
            }
        });
    });
}