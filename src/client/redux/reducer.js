export default function (state = '/', action) {
    if (action.type === 'LINK') {
        return action.path;
    } else {
        return state;
    }
}