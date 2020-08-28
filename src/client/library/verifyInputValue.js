 const verifyInputValue = (verifier, value, validMessage, isSucceed, invalidMessage) => {
    let stateMessage = '';
    let confirmed = false;
    if (value.length === 0) {
        const EMPTY_VALUE = 'Please fill out this field.';
        stateMessage = EMPTY_VALUE;
    } else if (verifier(value)) {
        stateMessage = validMessage;
        confirmed = isSucceed;
    } else {
        stateMessage = invalidMessage;
    }
    return [stateMessage, confirmed]
}

export default verifyInputValue;