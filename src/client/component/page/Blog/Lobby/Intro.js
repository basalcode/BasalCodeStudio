import React, { useState, useEffect } from 'react';

const Intro = () => {
    const [blogLobbyClassName, setBlogLobbyClassName] = useState('BlogLobbyMain__animation--before');
    const [animationFinished, setAnimationFinished] = useState(false);

    const [titleContent, setTitleContent] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [titleCaret, setTitleCaret] = useState(true);
    const [clearCaret, setClearCaret] = useState(false);
    const [titleClassName, setTitleClassName] = useState('BlogLobbyMain__title--before');

    const [greetingClassName, setGreetingClassName] = useState('BlogLobbyMain__greeting--before');

    const [downArrowClassName, setDownArrowClassName] = useState('BlogLobbyMain__down-arrow--before');

    const title = 'Basal Code Studio';

    console.log('component reactivate');

    useEffect(() => {
        const interval = 1500;
        setTimeout(() => {
            setBlogLobbyClassName('BlogLobbyMain__animation--after');
            setAnimationFinished(true);
        }, interval);
    }, []);

    useEffect(() => {
        if (animationFinished) {
            setTextIndex(textIndex + 1);
            if (textIndex === title.length) {
                const animationFinishInterval = 1500;

                setTimeout(() => {
                    setClearCaret(true);
                    setTitleClassName("BlogLobbyMain__title--after");
                    setGreetingClassName("BlogLobbyMain__greeting--after");
                }, animationFinishInterval);
            }
            const longInterval = 500;
            const shortInterval = 100;
            let interval = (title[textIndex] === ' ') ? longInterval : shortInterval;
            if (textIndex === 0) { interval = 1500; }

            setTimeout(() => {
                const newText = titleContent + title.charAt(textIndex);
                setTitleContent(newText);
            }, interval);
        }
    }, [animationFinished, titleContent]);

    useEffect(() => {
        if (!clearCaret) {
            const caretInterval = 500;
            setTimeout(() => {
                titleCaret ? setTitleCaret(false) : setTitleCaret(true);
            }, caretInterval);
        }
    }, [titleCaret]);

    const greetingText = 'Welcome! :)';

    useEffect(() => {
        if (clearCaret) {
            setDownArrowClassName('BlogLobbyMain__down-arrow--after');
        }
    }, [clearCaret]);

    return (
        <section className="BlogLobbyMain">
            <div className={"BlogLobbyMain__background " + blogLobbyClassName}></div>
            <div className="BlogLobbyMain__title">
                <span className={titleClassName}>{titleContent}</span>
                <span className={titleClassName}>{titleCaret ? <span>_</span> : <span>&nbsp;</span>}</span>
            </div>
            <div className="BlogLobbyMain__greeting">
                <span className={greetingClassName}>{greetingText}</span>
            </div>
            <div className="BlogLobbyMain__down-arrow">
                <span className={downArrowClassName + " icon-down-open-big"}></span>
            </div>
        </section>
    );
}

export default Intro;