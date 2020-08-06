module.exports = (function () {
    const Type = {
        ALL: 'all',
        MIDDLE: 'middle',
        NONE: 'none'
    }

    const lineLength = 50;
    const middleLine = '=';
    const frontBracket = '[';
    const backBracket = ']';

    let improvedConsoleLog = {
        [Type.ALL](log) {
            verifyValue(log);
            if (log.constructor.name === 'Object') {
                let logName = Object.keys(log).pop();
                let logValue = Object.values(log).pop();
                console.log(`${frontBracket} ${logName} ${backBracket}`, logValue);
            } else {
                console.log(log);
            }
        },
        [Type.MIDDLE](log) {
            verifyValue(log);
            let logLength = log.length;

            let middleLineLength = lineLength - logLength;
            if (middleLineLength < 0) { middleLineLength = 0; }

            let lineFront = middleLine.repeat(middleLineLength / 2 - 1);
            let lineBack = middleLine.repeat(middleLineLength / 2 - 1);
            console.log(`${lineFront} ${log} ${lineBack}`);
            return;
        },
        [Type.NONE](log) {
            verifyValue(log);
            console.log(log);
            return;
        }
    }

    function verifyValue(log) {
        if (log === undefined || log === null) {
            throw Error('[Error] imporvedConsole.js: Not exist \'logName\' && \'log\' parameter.');
        }
    }

    return improvedConsoleLog;
})();