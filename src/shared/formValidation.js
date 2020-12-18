const formValidation = (() => {
    const match = (value, regExp) => {
        const isMatched = value.toString().match(regExp) === null ? false : true;
        return isMatched;
    }
    
    const isEmail = (value = '') => {
        const regExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
    
        return match(value, regExp);
    }
    
    const isPassword = (value = '', min = 8) => {
        const regExp = new RegExp(`^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*()\\-_=+])[A-Za-z\\d!@#$%^&*()\\-_=+]{${min},}$`);
        
        return match(value, regExp);
    }
    
    const isPhoneNumber = (value = '') => {
        let regExp = /^\d{3}-\d{3,4}\d{4}$/;
    
        return match(value, regExp);
    }
    
    const isEngKorNumber = (value = '', min = 1, max = 20) => {
        const regExp = new RegExp(`^[a-zA-Z가-힣0-9]{${min},${max}}$`);
    
        return match(value, regExp);
    }

    return {
        isEmail: isEmail,
        isPassword: isPassword,
        isPhoneNumber: isPhoneNumber,
        isEngKorNumber: isEngKorNumber
    }
})();

module.exports = formValidation;