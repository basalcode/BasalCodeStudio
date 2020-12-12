const line = (title = '', option = {}) => {
    const Style = {
        SINGLE: 'single',
        DOUBLE: 'double',
    };

    let lineOption = { 
        style: option.style || Style.SINGLE,
        length: option.length || 70 
    };

    const textLength = title ? title.length : 0;
    const marginLength = textLength === 0 ? 0 : 2;
    const lineLength = lineOption.length - (textLength + marginLength);
    const lineStyle = lineOption.style === 'double' ? '=' : '-';

    const frontLine = lineStyle.repeat(lineLength / 2);
    const titleText = textLength === 0 ? '' : ` ${title} `;
    const backLine = lineLength % 2 === 1 ? (frontLine + lineStyle) : frontLine;

    empty();
    console.log(frontLine + titleText + backLine);
    empty();
}

const message = (object = {key: 'value'}) => {
    const type = Object.keys(object)[0];
    const message = Object.values(object)[0];
    console.log(`[${type}]`, message);
}

const empty = () => {
    console.log(' ');
}

const container = ({title = '', messages = [], option = {}}) => {
    line(title, { style: option.style, length: option.length});

    if (messages.length === 0) {
        message({Empty: 'There is no content'});
    }

    messages.forEach(messageObject => {
        message(messageObject);
    })

    line('', { style: option.style, length: option.length});
}

/* usage example */
// container({
//     title: 'title',
//     messages: [
//         {message: 'message'}
//     ],
//     option: {style: 'double}
// })

module.exports = {
    line: line,
    message: message,
    empty: empty,
    container: container
}