module.exports = (function () {
    function match(value, regExp) {
        let result = value.toString().match(regExp);
        return result !== null ? true : false;
    }

    function isEmail(value) {
        let regExp = /^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$/i;
        return match(value, regExp);
    }

    function isPassword(value) {
        let regExp = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        return match(value, regExp);
    }

    function isPhoneNumber(value) {
        let regExp = /^\d{3}-\d{3,4}\d{4}$/;
        return match(value, regExp);
    }

    return {
        isEmail: isEmail,
        isPassword: isPassword,
        isPhoneNumber, isPhoneNumber
    }
})();