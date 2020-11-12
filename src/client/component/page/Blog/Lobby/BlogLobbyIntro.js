/* module */
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

/* lib */
import shuffle from 'lib/array/shuffle';

const BlogLobbyIntro = (props) => {
    /* store */
    const pageIndex = useSelector(store => store.blog.index, []);
    
    /* state */
    const [textAnimation, setTextAnimation] = useState({
        display: [],
        charIndex: 0,
        animationIndex: 0,
        isCleared: false
    });
    const [caretOn, setCaretOn] = useState('_');

    /* useMemo */
    const textData = useMemo(() => {
        const titleText = 'BasalCodeStudio';
        const animationChars = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '=',
            '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'
        ];
        const shuffledChars = shuffle(animationChars);
        const animationInterval = 120;
        const repeatMin = 3;
        const repeatMax = 10;
        const randomRepeat = Math.floor(((Math.random() * repeatMax) + repeatMin) % repeatMax);
        return {
            titleText: titleText,
            animationChars: animationChars,
            shuffledChars: shuffledChars,
            animationInterval: animationInterval,
            randomRepeat: randomRepeat
        };
    }, [textAnimation]);

    /* useEffect */
    // random text animation
    useEffect(() => {
        const animationInterval = textData.animationInterval;

        const isCleared = textAnimation.isCleared;
        if (!isCleared) {
            window.setTimeout(() => {
                const display = textAnimation.display;
                const charIndex = textAnimation.charIndex;
                const animationIndex = textAnimation.animationIndex;
                const titleText = textData.titleText;
                const shuffledChars = textData.shuffledChars;
                const randomRepeat = textData.randomRepeat;

                if (animationIndex >= randomRepeat) {
                    const tempArray = display.slice();
                    tempArray[charIndex] = titleText[charIndex];

                    setTextAnimation(previous => ({
                        ...previous,
                        display: tempArray,
                        charIndex: charIndex + 1,
                        animationIndex: 0,
                        isCleared: charIndex + 1 >= titleText.length ?
                            true : false
                    }));
                    return;
                }

                const tempArray = display.slice();
                tempArray[charIndex] = shuffledChars[animationIndex];
                setTextAnimation(previous => ({
                    ...previous,
                    display: tempArray,
                    animationIndex: animationIndex + 1
                }));
            }, animationInterval);
        }
    }, [textAnimation]);

    // caret animation
    useEffect(() => {
        const caretInterval = 500;
        window.setTimeout(() => {
            caretOn === '_' ? setCaretOn('') : setCaretOn('_');
        }, caretInterval);
    }, [caretOn]);

    return (
        <section className="BlogLobbyIntro">
            <div className="BlogLobbyIntro__container">
                <div className="BlogLobbyIntro__frame BlogLobbyIntro__image-display"></div>
                <div className="BlogLobbyIntro__frame">
                    <section className={
                        `BlogLobbyIntro__greeting ` +
                        (pageIndex === props.index ?
                            `BlogLobbyIntro__greeting--appear` :
                            `BlogLobbyIntro__greeting--disappear`)}>
                        <div className="
                            BlogLobbyIntro__greeting-content
                            BlogLobbyIntro__greeting-welcom">
                            Welcom To
                        </div>
                        <div className="
                            BlogLobbyIntro__greeting-content
                            BlogLobbyIntro__greeting-display">
                            {textAnimation.display.map((element, index) =>
                                <span className="BlogLobbyIntro__greeting-character"
                                    key={index}>
                                    {element}
                                </span>
                            )}
                            <span className="BlogLobbyIntro__greeting-caret">
                                {caretOn}
                            </span>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
}

export default BlogLobbyIntro;