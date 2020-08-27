export default verifyInputValue = (verifier, value, validMessage, invalidMessage) => {
    let stateMessage = '';
    let confirmed = false;
    if (value.length === 0) {
        const EMPTY_VALUE = 'Please fill out this field.';
        stateMessage = EMPTY_VALUE;
    } else if (verifier(value)) {
        [stateMessage, confirmed] = validMessage;
    } else {
        stateMessage = invalidMessage;
    }
    return [stateMessage, confirmed]
}