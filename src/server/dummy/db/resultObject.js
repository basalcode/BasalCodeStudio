 const verifyValue = require('../module/verifyValue');
 const isBoolean = verifyValue.isBoolean;
 const isUndefined = verifyValue.isUndefined;
 const isNull = verifyValue.isNull;
 
module.exports = function (validity, value) {
    if (!isBoolean(validity)) {
        throw new Error('[Error] resultObject.js: A parameter \'validity\' is not a \'Boolean\'.');
    }
    if (isUndefined(value) || isNull(value)) {
        throw new Error('[Error] resultObject.js: A parameter \'result\' is \'Undefined\' or \'Null\'.');
    }

    return {
        validity: validity,
        value: value
    }
}

