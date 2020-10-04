/* lib */
import variables from './scrollVariables';

const scrollPage = (() => {
    /* constant */
    const wheelEvent = variables.wheelEvent;
    const eventOption = variables.eventOption;

    /* variable */
    let scrollLock = false;
    let currentPageIndex = 0;
    let destination;

    let target = {
        element: null,
        height: null,
        page: {
            height: () => { return window.innerHeight; },
            startPosition: (pageIndex) => { return pageIndex * window.innerHeight; },
            count: null
        }
    }
    let callBackOption = null;
    let formFocused = false;
    let formPageIndex = [];
    let fousedFormElement = null;

    /* function */
    const moveScroll = (pageIndex) => {
        let pageScrolled = false;
        scrollLock = true;
        
        const validIndex = pageIndex >= 0 && pageIndex < target.page.count;
        if (!validIndex) { 
            scrollLock = false;
            return pageScrolled; 
        }
        
        currentPageIndex = pageIndex;
        destination = target.page.startPosition(pageIndex);
        pageScrolled = true;

        const formExistOnPage = formPageIndex.indexOf(currentPageIndex) >= 0;
        if (!formExistOnPage && fousedFormElement) {
            fousedFormElement.blur();
        }

        target.element.scrollTo(0, destination);
        return pageScrolled;
    }

    /* event handler */
    // wheel
    const pageScrollHandler = event => {
        event.preventDefault();

        if (!scrollLock) {
            scrollLock = true;

            let pageIndex = currentPageIndex;
            if (event.deltaY > 0) { pageIndex++; }
            if (event.deltaY < 0) { pageIndex--; }
            
            const pageScrolled = moveScroll(pageIndex);

            if (pageScrolled) {
                /* call back option */
                if (callBackOption) {
                    callBackOption(currentPageIndex);
                }
            }
        }
    }

    // scroll
    const scrollPositionWatcher = event => {
        const target = event.currentTarget;
        const scrollY = target.scrollTop;

        if (scrollY === destination) {
            scrollLock = false;
        }
    }

    // wheel button
    const preventMiddleClick = event => {
        const MIDDLE_CLICK = 1;
        if (event.button === MIDDLE_CLICK) {
            event.preventDefault();
        }
    }

    // keyboard
    const preventScrollKeys = event => {
        if (!scrollLock) {
            scrollLock = true;

            const keyInput = event.keyCode;
            const scrollKeys = variables.scrollableKeys;

            let keyMatched = false;

            const tabKey = variables.scrollableKeys.TAB;
            if (keyInput === tabKey) {
                const formExistOnPage = formPageIndex.indexOf(currentPageIndex) >= 0;
                if (!formExistOnPage) {
                    event.preventDefault();

                    const scroll = true;

                    scrollLock = false;
                    return !scroll;
                }
            }

            if (formFocused) {
                const pageUpKey = scrollKeys.PreviousPage.PAGE_UP;
                const pageDownKey = scrollKeys.NextPage.PAGE_DOWN;

                if (keyInput === pageUpKey || keyInput === pageDownKey) {
                    event.preventDefault();

                    const scroll = true;

                    scrollLock = false;
                    return !scroll;
                }

                keyMatched = true;
                scrollLock = false;
                return;
            }

            const nextPages = scrollKeys.NextPage;
            Object.values(nextPages).forEach(nextPage => {
                if (keyInput === nextPage) {
                    event.preventDefault();

                    const nextPage = currentPageIndex + 1;
                    const pageScrolled = moveScroll(nextPage);

                    if (pageScrolled) {
                        /* call back option */
                        if (callBackOption) {
                            callBackOption(currentPageIndex);
                        }
                    }

                    keyMatched = true;
                    return;
                }
            })
            if (keyMatched) { return; }

            const previousPages = scrollKeys.PreviousPage;
            Object.values(previousPages).forEach(previousPage => {
                if (keyInput === previousPage) {
                    event.preventDefault();

                    const previousPage = currentPageIndex - 1;
                    const pageScrolled = moveScroll(previousPage);

                    if (pageScrolled) {
                        /* call back option */
                        if (callBackOption) {
                            callBackOption(currentPageIndex);
                        }
                    }

                    keyMatched = true;
                    return;
                }
            })
            if (keyMatched) { return; }

            const homePage = scrollKeys.HOME_PAGE;
            if (keyInput === homePage) {
                event.preventDefault();

                const HOME_PAGE_INDEX = 0;
                const pageScrolled = moveScroll(HOME_PAGE_INDEX);

                if (pageScrolled) {
                    /* call back option */
                    if (callBackOption) {
                        callBackOption(HOME_PAGE_INDEX);
                    }
                }

                keyMatched = true;
                return;
            }

            const endPage = scrollKeys.END_PAGE;
            if (keyInput === endPage) {
                event.preventDefault();

                const endPageIndex = target.page.count - 1;
                const pageScrolled = moveScroll(endPageIndex);

                if (pageScrolled) {
                    /* call back option */
                    if (callBackOption) {
                        callBackOption(endPageIndex);
                    }
                }

                keyMatched = true;
                return;
            }

            if (!keyMatched) {
                scrollLock = false;
            }
        } else {
            event.preventDefault();
            return false;
        }
    }

    // form
    const formFocusWatcher = event => {
        formFocused = true;
        fousedFormElement = event.target;
    }

    const formBlurWatcher = event => {
        formFocused = false;
        fousedFormElement = null;
    }

    const addEvent = (targetRef, callBackFunction) => {
        /* init variable */
        target = {
            ...target,
            element: targetRef,
            height: targetRef.offsetHeight,
            page: {
                ...target.page,
                count: Math.floor(targetRef.scrollHeight / window.innerHeight)
            }
        }
        callBackOption = callBackFunction;

        /* add event */
        // wheel
        targetRef.addEventListener('DOMMouseScroll', pageScrollHandler, false); // FireFox
        targetRef.addEventListener(wheelEvent, pageScrollHandler, eventOption); // Modern desktop
        targetRef.addEventListener('touchmove', pageScrollHandler, eventOption); // Mobile

        // scroll
        targetRef.addEventListener('scroll', scrollPositionWatcher, false);

        // wheel button 
        window.addEventListener('mousedown', preventMiddleClick, false);

        // keyboard
        window.addEventListener('keydown', preventScrollKeys, false);

        // form
        const forms = variables.formElements.form();
        forms.forEach(form => {
            const formHeightPosition = form.getBoundingClientRect().y;
            const formIndex = Math.floor(formHeightPosition / target.height);

            const NOT_EXIST = -1;
            if (formPageIndex.indexOf(formIndex) === NOT_EXIST) {
                formPageIndex.push(formIndex);
            }
        });

        const inputs = variables.formElements.input();
        const textareas = variables.formElements.textarea();

        inputs.forEach(input => {
            input.addEventListener('focus', formFocusWatcher, false);
            input.addEventListener('blur', formBlurWatcher, false);
        });
        textareas.forEach(textarea => {
            textarea.addEventListener('focus', formFocusWatcher, false);
            textarea.addEventListener('blur', formBlurWatcher, false);
        });
    }
    return {
        addEvent: addEvent,
        moveScroll: moveScroll
    };
})();

export default scrollPage;