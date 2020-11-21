/* module */
import React, { setState } from 'react';
import { useSelector } from 'react-redux';

/* lib */
import scrollPage from 'lib/scroll/scrollPage'

const ScrollButtons = () => {
    /* store */
    const pageIndex = useSelector(store => store.blog.index, []);
    const navigationOn = useSelector(store => store.blog.navigationOn);

    /* event handler */
    const topButtonHandler = event => {
        const previousPageIndex = pageIndex - 1;

        scrollPage.moveScroll(previousPageIndex);
    }

    const bottomButtonHandler = event => {
        const nextPageIndex = pageIndex + 1;

        scrollPage.moveScroll(nextPageIndex);
    }

    return (
        <div className={"ScrollButtons " + 
            `${navigationOn ? "ScrollButtons--navigation-on" : ""} `}>
            <div className="
                ScrollButtons__button 
                ScrollButtons__button-up"
                type="button"
                onClick={topButtonHandler}>
                <div className="
                    ScrollButtons__button-icon
                    ScrollButtons__button-icon-up
                    icon-up-open-1"></div>
            </div>
            <div className="
                ScrollButtons__button 
                ScrollButtons__button-down"
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