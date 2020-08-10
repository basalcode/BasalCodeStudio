window.onload = function () {
    console.log(`[Open] 'login.js' has been opend.`);

    loadLogIn();
}

function loadLogIn() {
    let submit = document.querySelector('#submit');

    let email = document.querySelector('#email');
    let password = document.querySelector('#password');

    let lock = false;
    submit.addEventListener('click', function (event) {
        if (!lock) {
            lock = true;

            let loginObject = {
                email: email.value,
                password: password.value
            }

            fetch('/request/user/read/account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginObject)
            }).then(function (response) {
                return response.json()
            }).then(function (parsed) {
                console.log(parsed);
                window.location.href = '/source/blog/blogMain.html'
            });

            lock = false;
        }
    });
}