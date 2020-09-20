const scrollVariables = (() => {
    const PreventedKeys = {
        SPACE_BAR: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    };
    
    const wheelEvent = 'onWheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
    
    const eventOption = (() => {
        let passiveSupported = false;
        try {
            const options = {
                get passive() {
                    passiveSupported = true;
                    return false;
                }
            }
            // check passive.
            window.addEventListener('test', null, options);
            window.removeEventListener('test', null, options);
        } catch (error) {
            passiveSupported = false;
        }
    
        return passiveSupported ? { passive: false } : false;
    })();

    return {
        PreventedKeys: PreventedKeys,
        wheelEvent: wheelEvent,
        eventOption: eventOption
    }
})();

export default scrollVariables;