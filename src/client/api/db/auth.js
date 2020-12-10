import axios from 'axios';

// signup
export const doesEmailExist = () => {
    axios({
        method: 'GET',
        url: '/api/db/user',
        data: ''
    }).then(response => {

    }).catch(error => {

    });
}

// login
export const login = action => {
    return new Promise((resolve, reject) => {
        let loginObject = {
            email: action.userEmail,
            password: action.userPassword
        }
        const LOGIN_PAGE = 'login';
        axios({
            method: 'GET',
            url: `/api/db/account?page=${LOGIN_PAGE}`,
            data: loginObject
        }).then(response => {
            const isSuccess = response.validity;
            if (isSuccess) {
                const loginSuccess = response.value;
                resolve(loginSuccess);
            } else {
                const loginFailed = response.value;
                reject(loginFailed);
            }
        }).catch(error => {

        });
    });
}