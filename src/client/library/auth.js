module.exports = {
    isLoggedIn: (async () => {
        return await fetch('/auth/read/login')
            .then(response => response.json())
            .then(result => {
                return result.value;
            })
    })()
}
