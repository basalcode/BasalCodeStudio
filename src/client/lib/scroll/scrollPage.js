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
    let callBackOption = {
        wheel: null,
        scroll: null,
        wheelButton: null,
        keyboard: null
    }
    let formFocused = false;
    let formPageIndex = [];
    let fousedFormElement = null;

    /* function */
    const moveScroll = (direction, edge = false) => {
        let pageScrolled = false;

        if (edge) {
            if (direction > 0) {
                const endPageIndex = target.page.count - 1;
                const endPagePosition = target.page.startPosition(endPageIndex);

                if (currentPageIndex === endPageIndex) { return pageScrolled; }

                currentPageIndex = endPageIndex;
                destination = endPagePosition;
                pageScrolled = true;
            }
            if (direction < 0) {
                const START_NUMBER = 0;
                if (currentPageIndex === START_NUMBER) { return pageScrolled; }

                currentPageIndex = START_NUMBER;
                destination = START_NUMBER;
                pageScrolled = true;
            }
        } else {
            if (direction > 0) {
                const nextPageIndex = currentPageIndex + 1;
                const nextPageStart = target.page.startPosition(nextPageIndex);
                const pageCount = target.page.count;

                if (currentPageIndex >= pageCount - 1) {
                    scrollLock = false;
                    return pageScrolled;
                }
                currentPageIndex = nextPageIndex;
                destination = nextPageStart;
                pageScrolled = true;
            }
            if (direction < 0) {
                const previousPageIndex = currentPageIndex - 1;
                const previousPageStart = target.page.startPosition(previousPageIndex);

                if (previousPageIndex < 0) {
                    scrollLock = false;
                    return pageScrolled;
                }
                currentPageIndex = previousPageIndex;
                destination = previousPageStart;
                pageScrolled = true;
            }
        }

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

            const direction = event.deltaY;
            const pageScrolled = moveScroll(direction);

            if (pageScrolled) {
                /* call back option */
                if (callBackOption.wheel) {
                    callBackOption.wheel(currentPageIndex, destination);
                }
            }
        }
    }

    // scroll
    const scrollPositionWatcher = event => {
        const target = event.currentTarget;
        const scrollY = target.scrollTop;

        if (scrollY === destination) {
            if (callBackOption.scroll) {
                callBackOption.scroll();
            }
            scrollLock = false;
        }
    }

    // wheel button
    const preventMiddleClick = event => {
        const MIDDLE_CLICK = 1;
        if (event.button === MIDDLE_CLICK) {
            event.preventDefault();
            if (callBackOption.wheelButton) {
                callBackOption.wheelButton();
            }
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

                    const NEXT_PAGE = 1;
                    const pageScrolled = moveScroll(NEXT_PAGE);

                    if (pageScrolled) {
                        /* call back option */
                        if (callBackOption.keyboard) {
                            callBackOption.keyboard(currentPageIndex, destination);
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

                    const PREVIOUS_PAGE = -1;
                    const pageScrolled = moveScroll(PREVIOUS_PAGE);

                    if (pageScrolled) {
                        /* call back option */
                        if (callBackOption.keyboard) {
                            callBackOption.keyboard(currentPageIndex, destination);
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

                const HOME_DIRECTION = -1;
                const IS_EDGE_KEY = true;
                const pageScrolled = moveScroll(HOME_DIRECTION, IS_EDGE_KEY);

                if (pageScrolled) {
                    /* call back option */
                    if (callBackOption.keyboard) {
                        const HOME_PAGE = 0;
                        const DESTINATION = 0;
                        callBackOption.keyboard(HOME_PAGE, DESTINATION);
                    }
                }

                keyMatched = true;
                return;
            }

            const endPage = scrollKeys.END_PAGE;
            if (keyInput === endPage) {
                event.preventDefault();

                const END_DIRECTION = 1;
                const IS_EDGE_KEY = true;
                const pageScrolled = moveScroll(END_DIRECTION, IS_EDGE_KEY);

                if (pageScrolled) {
                    /* call back option */
                    if (callBackOption.keyboard) {
                        const END_PAGE = target.page.count - 1;
                        const DESTINATION = target.page.startPosition(END_PAGE);

                        callBackOption.keyboard(END_PAGE, DESTINATION);
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

    const addEvent = (targetRef, option = {}) => {
        target = {
            ...target,
            element: targetRef,
            height: targetRef.offsetHeight,
            page: {
                ...target.page,
                count: Math.floor(targetRef.scrollHeight / window.innerHeight)
            }
        }

        callBackOption = {
            ...callBackOption,
            wheel: option.wheel,
            scroll: option.scroll,
            wheelButton: option.wheelButton,
            keyboard: option.keyboard
        };

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
        addEvent: addEvent
    };
})();

export default scrollPage;