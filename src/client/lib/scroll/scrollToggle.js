import variables from './scrollVariables';

const scrollToggle = (() => {
    const PreventedKeys = variables.PreventedKeys;
    const wheelEvent = variables.wheelEvent;
    const eventOption = variables.eventOption;

    let wheelCallBack = null;
    const preventDefault = event => {
        event.preventDefault();
        
        if (wheelCallBack) { wheelCallBack(event); }
    }

    const preventMiddleClick = event => {
        const MIDDLE_CLICK = 1
        if (event.button === MIDDLE_CLICK) {
            event.preventDefault();
        }
    }

    const preventScrollKeys = event => {
        Object.values(PreventedKeys).forEach(element => {
            if (element === event.keyCode) {
                event.preventDefault();
                return false;
            }
        });
    }

    const disableScroll = (target) => {
        target.addEventListener('DOMMouseScroll', preventDefault, false); // FireFox
        target.addEventListener(wheelEvent, preventDefault, eventOption); // Modern desktop
        target.addEventListener('touchmove', preventDefault, eventOption); // Mobile
        window.addEventListener('mousedown', preventMiddleClick, false); // Mouse Wheel Click
        window.addEventListener('keydown', preventScrollKeys, false); // Keyboard
    }

    const enableScroll = (target) => {
        target.removeEventListener('DOMMouseScroll', preventDefault, false);
        target.removeEventListener(wheelEvent, preventDefault, eventOption);
        target.removeEventListener('touchmove', preventDefault, eventOption);
        window.removeEventListener('mousedown', preventMiddleClick, false);
        window.removeEventListener('keydown', preventScrollKeys, false);
    }

    return {
        disableScroll: disableScroll,
        enableScroll: enableScroll,
        set wheelCallBack(callBack) {
            wheelCallBack = callBack;
        }
    }
})();

export default scrollToggle;