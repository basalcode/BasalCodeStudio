export const isLoggedIn = () => {
    return new Promise((resolve, reject) => {
        fetch('/auth/read/login')
            .then(response => response.json())
            .then(result => {
                const isSuccess = result.validity;
                if (isSuccess) {
                    resolve(result.value);
                } else {
                    reject(result.value);
                }
            })
    })
}

export const login = () => {
    return new Promise((resolve, reject) => {
        fetch('/auth/update/login?session=true')
        .then(response => response.json())
        .then(result => {
            const isSuccess = result.validity;
            if (isSuccess) {
                resolve(result.value);
            } else {
                reject(result.value);
            }
        })
    })
}

export const logout = () => {
    return new Promise((resolve, reject) => {
        fetch('/auth/update/login?session=false')
        .then(response => response.json())
        .then(result => {
            const isSuccess = result.validity;
            if (isSuccess) {
                resolve(result.value);
            } else {
                reject(result.value);
            }
        })
    })
}

