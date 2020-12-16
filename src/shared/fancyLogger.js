let logs = [];

const line = (() => {
    const setLine = (title, type, length) => {
        const textLength = title ? title.length : 0;
        const marginLength = textLength === 0 ? 0 : 2;
        const lineLength = length - (textLength + marginLength);

        let lineStyle;
        switch(type) {
            case 'single':
                lineStyle = '-';
                break;
            case 'double':
                lineStyle = '=';
                break;
            case 'star':
                lineStyle = '*';
                break;
            default:
                lineStyle = '-';
                break;
        }

        const frontLine = lineStyle.repeat(lineLength / 2);
        const titleText = textLength === 0 ? '' : ` ${title} `;
        const backLine = lineLength % 2 === 1 ? (frontLine + lineStyle) : frontLine;
        
        logs.push(frontLine + titleText + backLine);
    }

    const single = (title = '', length = 50) => {
        const SINGLE = 'single';
        setLine(title, SINGLE, length);
    };

    const double = (title = '', length = 50) => {
        const DOUBLE = 'double';
        setLine(title, DOUBLE, length);
    };

    const star = (title = '', length = 50) => {
        const STAR = 'star';
        setLine(title, STAR, length);
    };

    return {
        single: single,
        double: double,
        star: star
    }
})();

const container = (() => {
    const setContainer = (title, type, length) => {
        const textLength = title ? title.length : 0;
        const marginLength = textLength === 0 ? 0 : 2;
        const minLength = textLength + marginLength;
        const lineLength = minLength > length ? minLength : length;

        let marginLeft = (lineLength - minLength) / 2;

        let lineStyle;
        switch(type) {
            case 'single':
                lineStyle = '-';
                break;
            case 'double':
                lineStyle = '=';
                break;
            case 'star':
                lineStyle = '*';
                break;
            default:
                lineStyle = '-';
                break;
        }

        const borderLine = lineStyle.repeat(lineLength);
        const indentation = ' '.repeat(marginLeft);

        logs.push(borderLine);
        logs.push(indentation + title);
        logs.push(borderLine);
    }
    
    const single = (title='', length = 20) => {
        const SINGLE = 'single';
        setContainer(title, SINGLE, length);
    };

    const double = (title='', length = 20) => {
        const DOUBLE = 'double';
        setContainer(title, DOUBLE, length);
    };

    const star = (title='', length = 20) => {
        const STAR = 'star';
        setContainer(title, STAR, length);
    };

    return {
        single: single,
        double: double,
        star: star
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
    let log;
    while (log = logs.shift()) {
        console.log(log);
    }
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
    container: container,
    message: message,
    space: space,
    print: print
}