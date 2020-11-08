/* module */
import React, { useState, useEffect } from 'react';

const TypingDisplay = (props) => {
    /* props */
    const fullText = props.fullText;

    /* state */
    const [animationOn, setAnimationOn] = useState(true);

    const [typingText, setTypingText] = useState('');
    const [typingIndex, setTypingIndex] = useState(0);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const [caret, setCaret] = useState('_');
    const [caretTimeout, setCaretTimeout] = useState(null);

    /* useEffect */
    // typing animation
    useEffect(() => {
        const textLength = fullText.length;

        if (typingIndex < textLength) {
            const timer = fullText[typingIndex] === ' ' ?
                Math.floor(Math.random() * 50) + 50 : 50;
            const timeout = setTimeout(() => {
                const newText = typingText + fullText[typingIndex];

                setTypingText(newText);
            }, timer);

            const newIndex = typingIndex + 1;
            setTypingIndex(newIndex);

            setTypingTimeout(timeout);
            setAnimationOn(true);
            props.onActivated(true);
        } else {
            clearTimeout(typingTimeout);
            setAnimationOn(false);
            props.onActivated(false);
        }
    }, [typingText]);

    // caret animation
    useEffect(() => {
        if (animationOn) {
            const timer = 500;
            const timeout = setTimeout(() => {
                const newCaret = (caret === '_') ? ' ' : '_';
                setCaret(newCaret);
            }, timer);
            setCaretTimeout(timeout);
        } else {
            clearTimeout(caretTimeout);
            setCaret(' ');
        }
    }, [caret]);

    return (
        <div className="TypingDisplay">
            <span className="TypingDisplay__text">{typingText}</span>
            <span className="TypingDisplay__caret">{caret}</span>
        </div>
    );
}

export default TypingDisplay;