const Type = {
    UNDEFINED: 'undefined',
    BOOLEAN: 'boolean',
    NUMBER: 'number',
    STRING: 'string',
    SYMBOL: 'symbol',
    FUNCTION: 'function',
    OBJECT: 'object',
    NULL: 'null',
    ARRAY: 'array'
}

const getTypeOf = value => {
    if (typeof value === Type.OBJECT) {
        if (value === null) {
            return Type.NULL;
        }
        if (value.constructor.name === 'Array') {
            return Type.ARRAY;
        }
        return Type.OBJECT;
    } else {
        let typeValue = null;
        Object.values(Type).forEach(type => {
            if (typeof value === type) {
                typeValue = type;
                return;
            }
        })
        return typeValue;
    }
};

const isUndefined = value => {
    return getTypeOf(value) === Type.UNDEFINED;
}

const isBoolean = value => {
    return getTypeOf(value) === Type.BOOLEAN;
}

const isNumber = value => {
    return getTypeOf(value) === Type.NUMBER;
}

const isString = value => {
    return getTypeOf(value) === Type.STRING;
}

const isSymbol = value => {
    return getTypeOf(value) === Type.SYMBOL;
}

const isFunction = value => {
    return getTypeOf(value) === Type.FUNCTION;
}

const isObject = value => {
    return getTypeOf(value) === Type.OBJECT;
}

const isNull = value => {
    return getTypeOf(value) === Type.NULL;
}

const isArray = value => {
    return getTypeOf(value) === Type.ARRAY;
}

module.exports = {
    getTypeOf: getTypeOf,
    isUndefined: isUndefined,
    isBoolean: isBoolean,
    isNumber: isNumber,
    isString: isString,
    isSymbol: isSymbol,
    isFunction: isFunction,
    isObject: isObject,
    isNull: isNull,
    isArray: isArray
}