/* module */
import React, { useState, useEffect } from 'react';

const BlogLobbyIntro = () => {
    const [blogLobbyClassName, setBlogLobbyClassName] = useState('BlogLobbyIntro__animation--before');
    const [animationFinished, setAnimationFinished] = useState(false);

    const [titleContent, setTitleContent] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [titleCaret, setTitleCaret] = useState(true);
    const [clearCaret, setClearCaret] = useState(false);
    const [titleClassName, setTitleClassName] = useState('BlogLobbyIntro__title--before');

    const [greetingClassName, setGreetingClassName] = useState('BlogLobbyIntro__greeting--before');

    const [downArrowClassName, setDownArrowClassName] = useState('BlogLobbyIntro__down-arrow--before');

    const title = 'Basal Code Studio';

    // console.log('component reactivate');

    useEffect(() => {
        const interval = 1500;
        setTimeout(() => {
            setBlogLobbyClassName('BlogLobbyIntro__animation--after');
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
                    setTitleClassName("BlogLobbyIntro__title--after");
                    setGreetingClassName("BlogLobbyIntro__greeting--after");
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
            setDownArrowClassName('BlogLobbyIntro__down-arrow--after');
        }
    }, [clearCaret]);

    return (
        <section className="BlogLobbyIntro">
            <div className={"BlogLobbyIntro__background " + blogLobbyClassName}></div>
            <div className="BlogLobbyIntro__title">
                <span className={titleClassName}>{titleContent}</span>
                <span className={titleClassName}>{titleCaret ? <span>_</span> : <span>&nbsp;</span>}</span>
            </div>
            <div className="BlogLobbyIntro__greeting">
                <span className={greetingClassName}>{greetingText}</span>
            </div>
            <div className="BlogLobbyIntro__down-arrow">
                <span className={downArrowClassName + " icon-down-open-big"}></span>
            </div>
        </section>
    );
}

export default BlogLobbyIntro;