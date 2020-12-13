let logs = [];

const line = (() => {
    const setLine = (title, type, length) => {
        const textLength = title ? title.length : 0;
        const marginLength = textLength === 0 ? 0 : 2;
        const lineLength = length - (textLength + marginLength);
        const lineStyle = type === 'double' ? '=': '-';

        const frontLine = lineStyle.repeat(lineLength / 2);
        const titleText = textLength === 0 ? '' : ` ${title} `;
        const backLine = lineLength % 2 === 1 ? (frontLine + lineStyle) : frontLine;
        
        logs.push(frontLine + titleText + backLine);
    }

    const single = (title = '', length = 70) =>{
        const SINGLE = 'single';
        setLine(title, SINGLE, length);
    };

    const double = (title = '', length = 70) => {
        const DOUBLE = 'double';
        setLine(title, DOUBLE, length);
    };

    return {
        single: single,
        double: double
    }
})();

const message = (object = {key: 'value'}) => {
    const type = Object.keys(object)[0];
    const message = Object.values(object)[0];

    space();
    logs.push(`[${type}] ` + message);
    space();
}

const space = () => {
    logs.push(' ');
}

const print = () => {
    logs.forEach(log => {
        console.log(log);
    });
}

/* usage example */
// log.line.double('moduleName');
// log.line.single('stateName');
// log.message({ key: value });
// log.line.single();
// log.line.double();
// log.pirnt();


module.exports = {
    line: line,
    message: message,
    space: space,
    print: print
}