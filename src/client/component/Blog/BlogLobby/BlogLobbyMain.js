import React, { useState, useEffect } from 'react';

import './BlogLobbyMain.scss'

const BlogLobbyMain = () => {
    const [titleContent, setTitleContent] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [titleCaret, setTitleCaret] = useState(true);
    const [clearCaret, setClearCaret] = useState(false);
    const [titleClassName, setTitleClassName] = useState('BlogLobbyMain__title--before');

    const [greetingClassName, setGreetingClassName] = useState("BlogLobbyMain__greeting--before");

    const title = 'Basal Code Studio';
    useEffect(() => {
        setTextIndex(textIndex + 1);
        if (textIndex === title.length) {
            const animationFinishInterval = 4000;

            setTimeout(() => {
                setClearCaret(true);
                setTitleClassName("BlogLobbyMain__title--after");
                setGreetingClassName("BlogLobbyMain__greeting--after");
            }, animationFinishInterval);
        }
        const longInterval = 1000;
        const shortInterval = 200;
        const interval = (title[textIndex] === ' ') ? longInterval : shortInterval;

        setTimeout(() => {
            const newText = titleContent + title.charAt(textIndex);
            setTitleContent(newText);
        }, interval);
    }, [titleContent]);

    useEffect(() => {
        if (!clearCaret) {
            const caretInterval = 500;
            setTimeout(() => {
                titleCaret ? setTitleCaret(false) : setTitleCaret(true);
            }, caretInterval);
        }
    }, [titleCaret]);

    const greetingText = 'Welcome! :)';

    return (
        <div className="BlogLobbyMain">
            <div className="BlogLobbyMain__title">
                <span className={titleClassName}>{titleContent}</span>
                <span className={titleClassName}>{titleCaret ? <span>_</span> : <span>&nbsp;</span>}</span>
            </div>
            <div className="BlogLobbyMain__greeting">
                <span className={greetingClassName}>{greetingText}</span>
            </div>
        </div>
    );
}

export default BlogLobbyMain;