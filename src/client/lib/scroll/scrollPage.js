import variables from './scrollVariables';

const scrollPage = (() => {
    const PreventedKeys = variables.PreventedKeys;
    const wheelEvent = variables.wheelEvent;
    const eventOption = variables.eventOption;

    let lock = false;
    let pageIndex = 0;
    let destination;

    const pageScrollHandler = event => {
        event.preventDefault();

        if (!lock) {
            lock = true;

            const target = event.currentTarget;
            const scrollHeight = target.scrollHeight
            const pageHeight = target.offsetHeight;
            const direction = event.deltaY;

            if (direction > 0) { 
                const nextPageIndex = pageIndex + 1;
                const nextPageStart = nextPageIndex * pageHeight;
                const nextPageEnd = nextPageIndex * pageHeight + pageHeight;

                if (nextPageEnd > scrollHeight) {
                    lock = false;
                    return;
                }

                pageIndex = nextPageIndex;
                destination = nextPageStart;
            }
            if (direction < 0) { 
                const previousPageIndex = pageIndex - 1;
                const previousPageStart = previousPageIndex * pageHeight;
                
                if (previousPageIndex < 0) {
                    lock = false;
                    return;    
                }

                pageIndex = previousPageIndex;
                destination = previousPageStart;
            }
            target.scrollTo(0, destination);
        }
    }

    const scrollPositionWatcher = event => {
        const target = event.currentTarget;
        const scrollY = target.scrollTop;
        if (scrollY === destination) {
            lock = false;
        }
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

    const addEvent = target => {
        target.addEventListener('DOMMouseScroll', pageScrollHandler, false); // FireFox
        target.addEventListener(wheelEvent, pageScrollHandler, eventOption); // Modern desktop
        target.addEventListener('touchmove', pageScrollHandler, eventOption); // Mobile
        
        target.addEventListener('scroll', scrollPositionWatcher, false);
        
        window.addEventListener('mousedown', preventMiddleClick, false); // Mouse Wheel Click
        window.addEventListener('keydown', preventScrollKeys, false); // Keyboard
    }
    return {
        addEvent: addEvent
    };
})();

export default scrollPage;