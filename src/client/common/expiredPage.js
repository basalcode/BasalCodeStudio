export default (function () {
    function registerAsDefaultPage(alertMessage) {
        window.addEventListener("pageshow", function (event) {
            let message = 'This is an expired page.';
            if (alertMessage) {
                message = alertMessage;
            }
            alert(message);
            window.history.forward();
        });
    }

    function isExpired() {
        window.addEventListener('pageshow', function(event) {
            if (event.persisted || 
               (window.performance && window.performance.navigation.type === 2)) {
                window.location.reload();
            }
        });
    }

    function expire(redirection) {
        history.replaceState(null, '', redirection);
    }

    return {
        registerAsDefaultPage: registerAsDefaultPage,
        isExpired: isExpired,
        expire: expire
    }
})();





