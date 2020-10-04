/* module */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* lib */
import scrollPage from 'lib/scroll/scrollPage'

/* store */
import { page as pageAction } from 'store/action/blog';

const FloatingUIs = ({ fadeInOn }) => {
    /* store */
    const dispatch = useDispatch();
    const pageIndex = useSelector(store => store.blog.index);

    /* constant */
    const [nightModeOn, setNightModeOn] = useState(false);

    /* event handler */
    // email button
    const scrollContactPage = event => {
        const CONTACT_PAGE_INDEX = 3;
        const pageScrolled = scrollPage.moveScroll(CONTACT_PAGE_INDEX);

        if (pageScrolled) {
            dispatch(pageAction(CONTACT_PAGE_INDEX));
        }
    }

    // go top button
    const scrollTop = event => {
        const TOP_PAGE_INDEX = 0;
        const pageScrolled = scrollPage.moveScroll(TOP_PAGE_INDEX);

        if (pageScrolled) {
            dispatch(pageAction(TOP_PAGE_INDEX));
        }
    }

    // night mode button
    const toogleNightMode = event => {
        setNightModeOn(nightModeOn ? false : true);
    }

    return (
        <aside className={
            `FloatingUIs ` +
            `${fadeInOn ?
                "FloatingUIs--fade-in-on" :
                "FloatingUIs--fade-in-off"
            }`}>
            <section className="
                FloatingUIs__ui-container
                FloatingUIs__left-container">
                <a className="
                    FloatingUIs__ui
                    FloatingUIs__ui-top
                    icon-github-1"
                    href="https://github.com/basalcode"
                    target="_blank" />
                <a className="
                    FloatingUIs__ui
                    FloatingUIs__ui-bottom
                    icon-mail-1"
                    onClick={scrollContactPage} />
            </section>
            <section className="
                FloatingUIs__ui-container
                FloatingUIs__right-container">
                <button
                    className="
                        FloatingUIs__ui
                        FloatingUIs__ui-top
                        icon-up-small"
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