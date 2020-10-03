const scrollVariables = (() => {
    const scrollableKeys = {
        NextPage: {
            SPACE_BAR: 32,
            PAGE_DOWN: 34,
            RIGHT: 39,
            DOWN: 40
        },
        PreviousPage: {
            PAGE_UP: 33,
            LEFT: 37,
            UP: 38
        },
        HOME_PAGE: 36,
        END_PAGE: 35,
        TAB: 9
    }

    const formElements = {
        form: () => {
            return document.querySelectorAll('form');
        },
        input: () => {
            return document.querySelectorAll('input');
        },
        textarea: () => {
            return document.querySelectorAll('textarea');
        }
    }

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
        scrollableKeys: scrollableKeys,
        formElements: formElements,
        wheelEvent: wheelEvent,
        eventOption: eventOption
    }
})();

export default scrollVariables;