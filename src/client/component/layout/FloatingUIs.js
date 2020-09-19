/* module */
import React, { useState } from 'react';

const FloatingUIs = ({ fadeInOn }) => {
    const [nightModeOn, setNightModeOn] = useState(false);
    
    const scrollTop = event => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

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
                FloatingUIs__link-container">
                <a className="
                    FloatingUIs__ui
                    FloatingUIs__ui-top
                    icon-github-1" 
                    href="https://github.com/basalcode"/>
                <a className="
                    FloatingUIs__ui
                    FloatingUIs__ui-bottom
                    icon-mail-1" 
                    href="#"/>
            </section>
            <section className="
                FloatingUIs__ui-container
                FloatingUIs__button-container">
                <button 
                    className="
                        FloatingUIs__ui
                        FloatingUIs__ui-top
                        icon-up-small" 
                    onClick={scrollTop}/>
                <button className={
                    `FloatingUIs__ui ` +
                    `FloatingUIs__ui-bottom ` +
                    `${nightModeOn ? 
                        "FloatingUIs__night-mode-button--on " : 
                        "FloatingUIs__night-mode-button--off " }` +
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