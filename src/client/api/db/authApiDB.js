export const login = (action) => {
    return new Promise((resolve, reject) => {
        let loginObject = {
            email: action.userEmail,
            password: action.userPassword
        }
        const LOGIN_PAGE = 'login';
        fetch(`/request/user/read/account?page=${LOGIN_PAGE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginObject)
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