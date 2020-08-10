window.onload = function() {
    console.log(`[Open] 'signup.js' has been opend.`);

    loadSignUp()
}

function loadSignUp() {
    let signUp = document.querySelector('#sign-up');

    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let checkPassword = document.querySelector('#password-confirm');
    let userName = document.querySelector('#user-name');

    let lock = false;
    signUp.addEventListener('click', function (event) {
        if (!lock) {
            lock = true;

            let signupObject = {
                email: email.value,
                password: password.value,
                checkPassword: checkPassword.value,
                userName: userName.value
            }
    
            fetch('/request/user/create/account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupObject)
            }).then(function (response) {
                return response.json()
            }).then(function (parsed) {
                console.log(parsed);
            });

            lock = false;
        }
    });
}