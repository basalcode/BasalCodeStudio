/* module */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* lib */
import scrollPage from 'lib/scroll/scrollPage'

/* store */
import { lobbyPage as lobbyPageAction } from 'store/action/blog';

const ScrollButtons = () => {
    /* store */
    const dispatch = useDispatch();
    const pageIndex = useSelector(store => store.blog.index, []);
    const nightModeOn = useSelector(store => store.app.nightModeOn);

    /* event handler */
    const topButtonHandler = event => {
        const previousPageIndex = pageIndex - 1;
        const pageScrolled = scrollPage.moveScroll(previousPageIndex);

        if (pageScrolled) {
            dispatch(lobbyPageAction(scrollPage, previousPageIndex, false));
        }
    }

    const bottomButtonHandler = event => {
        const nextPageIndex = pageIndex + 1;
        const pageScrolled = scrollPage.moveScroll(nextPageIndex);

        if (pageScrolled) {
            dispatch(lobbyPageAction(scrollPage, nextPageIndex, false));
        }
    }

    return (
        <div className="ScrollButtons">
            <div className={
                "ScrollButtons__button " +
                "ScrollButtons__button-up " + 
                `${nightModeOn ? "ScrollButtons__button-up--night-mode-on" : ""} `}
                type="button"
                onClick={topButtonHandler}>
                <div className="
                    ScrollButtons__button-icon
                    ScrollButtons__button-icon-up
                    icon-up-open-1"></div>
            </div>
            <div className={
                "ScrollButtons__button " +
                "ScrollButtons__button-down " + 
                `${nightModeOn ? "ScrollButtons__button-down--night-mode-on" : ""} `}
                type="button"
                onClick={bottomButtonHandler}>
                <div className="
                    ScrollButtons__button-icon
                    ScrollButtons__button-icon-down 
                    icon-down-open-1"></div>
            </div>
        </div>
    );
}

export default ScrollButtons;