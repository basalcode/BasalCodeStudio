/* module */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* lib */
import scrollPage from 'lib/scroll/scrollPage'

/* store */
import { lobbyPage as lobbyPageAction } from 'store/action/blog';
import { nightMode as nightModeAction } from 'store/action/app';

const FloatingUIs = props => {
    /* store */
    const dispatch = useDispatch();
    const nightModeOn = useSelector(store => store.app.nightModeOn);
    const navigationOn = useSelector(store => store.blog.navigationOn);

    /* props */
    const fadeInOn = props.fadeInOn;

    /* event handler */
    // email button
    const scrollContactPage = event => {
        const CONTACT_PAGE_INDEX = 3;
        const pageScrolled = scrollPage.moveScroll(CONTACT_PAGE_INDEX);

        if (pageScrolled) {
            dispatch(lobbyPageAction(scrollPage, CONTACT_PAGE_INDEX, false));
        }
    }

    // go top button
    const scrollTop = event => {
        const TOP_PAGE_INDEX = 0;
        const pageScrolled = scrollPage.moveScroll(TOP_PAGE_INDEX);

        if (pageScrolled) {
            dispatch(lobbyPageAction(scrollPage, TOP_PAGE_INDEX, false));
        }
    }

    // night mode button
    const toogleNightMode = event => {
        dispatch(nightModeAction(!nightModeOn));
    }

    return (
        <aside className={
            `FloatingUIs ` +
            `${nightModeOn ? "FloatingUIs--night-mode" : ""} ` +
            `${navigationOn ? "FloatingUIs--navigation-on" : "" }`}>
            <section className={
                "FloatingUIs__ui-container " + 
                "FloatingUIs__left-container " +
                `${fadeInOn ?
                    "FloatingUIs__ui-container--fade-in-on" :
                    "FloatingUIs__ui-container--fade-in-off"} `}>
                <a className="
                    FloatingUIs__ui
                    FloatingUIs__ui-top
                    icon-github-1"
                    href="https://github.com/basalcode"
                    target="_blank" />
                <button className="
                    FloatingUIs__ui
                    FloatingUIs__ui-bottom
                    icon-mail-1"
                    onClick={scrollContactPage} />
            </section>
            <section className={
                "FloatingUIs__ui-container " +
                "FloatingUIs__right-container " +
                `${fadeInOn ?
                    "FloatingUIs__ui-container--fade-in-on" :
                    "FloatingUIs__ui-container--fade-in-off"} `}>
                <button
                    className="
                        FloatingUIs__ui
                        FloatingUIs__ui-top
                        icon-up-open"
                    onClick={scrollTop} />
                <button className={
                    `FloatingUIs__ui ` +
                    `FloatingUIs__ui-bottom ` +
                    `${nightModeOn ?
                        "FloatingUIs__night-mode-button--on " :
                        "FloatingUIs__night-mode-button--off "}` +
                    `${nightModeOn ?
                        "icon-moon" :
                        "icon-sun-1"
                    }`}
                    onClick={toogleNightMode} />
            </section>
        </aside>
    );
}

export default FloatingUIs;