const match = (value, regExp) => {
    let result = value.toString().match(regExp);
    return result !== null ? true : false;
}

export const isEmail = (value) => {
    if (value === undefined) { value = '' }
    const regExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

    return match(value, regExp);
}

export const isPassword = (value) => {
    if (value === undefined) { value = '' }
    const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+])[A-Za-z\d!@#$%^&*()\-_=+]{8,16}$/;

    return match(value, regExp);
}

export const hasNoSpecialCharacter = (value) => {
    if (value === undefined) { value = '' }
    const regExp = /^[^`~!@#$%^&*()_+={}\[\]|\\:;“’<,>.?๐฿]*$/;

    return match(value, regExp);
}

export const isPhoneNumber = (value) => {
    if (value === undefined) { value = '' }
    let regExp = /^\d{3}-\d{3,4}\d{4}$/;

    return match(value, regExp);
}