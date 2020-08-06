const ilog = require('../module/improvedConsoleLog');

module.exports = (function () {
    let object = {
        queryList: [],
        valuesList: [],
        errerMessageList: [],
        length: 0
    }

    function push(query, values, errorMessage) {
        ilog.middle('QUERY');
        ilog.all({ query: query });
        ilog.all({ values: values });
        ilog.middle('');

        object.queryList.push(query);
        object.valuesList.push(values);
        object.errerMessageList.push(errorMessage);
        object.length++;
    }

    function shift() {
        let query;
        let values;
        let errorMessage;

        query = object.queryList.shift();
        values = object.valuesList.shift();
        errorMessage = object.errerMessageList.shift();
        return { query, values, errorMessage };
    }

    function getLength(isLog) {
        return object.length;
    }

    return {
        object: object,
        push: push,
        shift: shift,
        getLength: getLength
    }
})();