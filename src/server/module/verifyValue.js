module.exports = (function() {
    const Type = {
        OBJECT: 'Object',
        FUNCTION: 'Function',
        ARRAY: 'Array',
        STRING: 'String',
        NUMBER: 'Number',
        BOOLEAN: 'Boolean',
        REGEXP: 'RegExp',
        SYMBOL: 'Symbol',
        UNDEFINED: undefined,
        NULL: null
    }

    function isObject(value) {
        if (value.constructor.name === Type.OBJECT) { return true; }
        return false;
    }
    function isFunction(value) {
        if (value.constructor.name === Type.FUNCTION) { return true; }
        return false;
    }
    function isArray(value) {
        if (value.constructor.name === Type.ARRAY) { return true; }
        return false;
    }
    function isString(value) {
        if (value.constructor.name === Type.STRING) { return true; }
        return false;
    }
    function isNumber(value) {
        if (value.constructor.name === Type.NUMBER) { return true; }
        return false;
    }
    function isBoolean(value) {
        if (value.constructor.name === Type.BOOLEAN) { return true; }
        return false;
    }
    function isRegExp(value) {
        if (value.constructor.name === Type.REGEXP) { return true; }
        return false;
    }
    function isSymbol(value) {
        if (value.constructor.name === Type.SYMBOL) { return true; }
        return false;
    }
    function isUndefined(value) {
        if (value === Type.UNDEFINED) { return true; }
        return false;
    }
    function isNull(value) {
        if (value === Type.NULL) { return true; }
        return false;
    }

    return {
        isObject: isObject,
        isFunction: isFunction,
        isArray: isArray,
        isString: isString,
        isNumber: isNumber,
        isBoolean: isBoolean,
        isRegExp: isRegExp,
        isSymbol: isSymbol,
        isUndefined: isUndefined,
        isNull: isNull
    }
})();