const expiredPage = (function () {
    const submitted = '/source/common/expiredPage.html';

    function redirectionEvent(expiredWarning) {
        window.addEventListener("pageshow", function (event) {
            if (expiredWarning.constructor.name === 'String') {
                alert(expiredWarning);
            } else {
                alert('This is an expired page.');
            }
            history.forward();
        });
    }

    function expirePage() {
        history.replaceState({}, '', submitted);
    }
    return {
        redirect: redirectionEvent,
        start: expirePage
    }
})();

window.onload = expiredPage.redirect;

export let expire = expiredPage.start;