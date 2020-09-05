export const login = () => {
    return new Promise((resolve, reject) => {
        fetch('/auth/update/login?session=true')
        .then(response => response.json())
        .then(result => {
            const isSuccess = result.validity;
            if (isSuccess) {
                const loginSuccess = result.value;
                resolve(loginSuccess);
            } else {
                const loginFailedMessage = result.value;
                reject(loginFailedMessage);
            }
        })
    })
}

export const checkLogin = () => {
    return new Promise((resolve, reject) => {
        fetch('/auth/read/login')
            .then(response => response.json())
            .then(result => {
                const isSuccess = result.validity;
                if (isSuccess) {
                    const loginObject = result.value;
                    resolve(loginObject);
                } else {
                    const noSessionValueMessage = result.value;
                    reject(noSessionValueMessage);
                }
            })
    })
}

export const logout = () => {
    return new Promise((resolve, reject) => {
        fetch('/auth/delete/login')
        .then(response => response.json())
        .then(result => {
            const isSuccess = result.validity;
            if (isSuccess) {
                const logoutSuccessMessage = result.value;
                resolve(logoutSuccessMessage);
            } else {
                const logoutFailedMessage = result.value;
                reject(logoutFailedMessage);
            }
        })
    })
}

