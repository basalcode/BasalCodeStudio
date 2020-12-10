import axios from 'axios';

// login
export const login = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'PUT',
            url: '/api/session/login'
        }).then(response => {
            const isSuccess = response.validity;
            if (isSuccess) {
                const loginSuccess = response.value;
                resolve(loginSuccess);
            } else {
                const loginFailedMessage = response.value;
                reject(loginFailedMessage);
            }
        })
        .catch(error => console.log(error));
    })
}

export const checkLogin = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: '/api/session/login'
        }).then(response => {
                const isSuccess = response.validity;
                if (isSuccess) {
                    const loginObject = response.value;
                    resolve(loginObject);
                } else {
                    const noSessionValueMessage = response.value;
                    reject(noSessionValueMessage);
                }
            })
            .catch(error => console.log(error));
    })
}

export const logout = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'DELETE',
            url: '/api/session/login'
        }).then(response => {
                const isSuccess = response.validity;
                if (isSuccess) {
                    const logoutSuccessMessage = response.value;
                    resolve(logoutSuccessMessage);
                } else {
                    const logoutFailedMessage = response.value;
                    reject(logoutFailedMessage);
                }
            })
            .catch(error => console.log(error));
    })
}

