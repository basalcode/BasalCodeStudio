window.onload = function () {
    console.log(`[Open] 'login.js' has been opend.`);

    loadLogIn();
}

function loadLogIn() {
    let submit = document.querySelector('#submit');

    let email = document.querySelector('#id');
    let password = document.querySelector('#password');

    let lock = false;
    submit.addEventListener('click', function (event) {
        if (!lock) {
            lock = true;

            let loginObject = {
                id: email.value,
                password: password.value
            }

            fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginObject)
            }).then(function (response) {
                return response.json()
            }).then(function (parsed) {
                console.log(parsed);
            });

            lock = false;
        }
    });
}