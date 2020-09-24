/* module */
import React, { useState, useEffect, useMemo } from 'react';

/* asset */
import links from 'asset/img/links/blogLobby';

/* lib */
import shuffle from 'lib/array/shuffle';

const BlogLobbyIntro = () => {
    const [pictureLink, setPictureLink] = useState('');
    const [textAnimation, setTextAnimation] = useState({
        display: [],
        charIndex: 0,
        animationIndex: 0,
        isCleared: false
    })
    const [caretOn, setCaretOn] = useState('_');

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
        const maxRepeat = 10;
        return {
            titleText: titleText,
            animationChars: animationChars,
            shuffledChars: shuffledChars,
            maxRepeat: maxRepeat
        };
    }, [textAnimation]);

    useEffect(() => {
        const changeInterval = 10000;

        const pictureLinks = Object.values(links);
        let shuffledLinks = shuffle(pictureLinks);

        let linkIndex = 0;

        setPictureLink(shuffledLinks[linkIndex]);
        linkIndex++;

        window.setInterval(() => {
            setPictureLink(shuffledLinks[linkIndex]);
            linkIndex++;

            if (linkIndex >= pictureLinks.length) {
                shuffledLinks = shuffle(pictureLinks);
                linkIndex = 0;
            }
        }, changeInterval);
    }, []);

    useEffect(() => {
        const animationInterval = 100;

        const isCleared = textAnimation.isCleared;
        if (!isCleared) {
            window.setTimeout(() => {
                const display = textAnimation.display;
                const charIndex = textAnimation.charIndex;
                const animationIndex = textAnimation.animationIndex;
                const titleText = textData.titleText;
                const shuffledChars = textData.shuffledChars;
                const maxRepeat = textData.maxRepeat;

                if (/* titleText[charIndex] === shuffledChars[animationIndex] || */
                    animationIndex >= maxRepeat) {
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
                    animationIndex: animationIndex + 1,
                }));
            }, animationInterval);
        }
    }, [textAnimation]);

    useEffect(() => {
        const caretInterval = 500;
        window.setTimeout(() => {
            caretOn === '_' ? setCaretOn('') : setCaretOn('_');
        }, caretInterval)
    }, [caretOn]);

    return (
        <section className="BlogLobbyIntro">
            <section className="BlogLobbyIntro__picture-frame-container">
                <div className="BlogLobbyIntro__picture-frame">
                    <img className="BlogLobbyIntro__picture"
                        src={pictureLink}></img>
                </div>
            </section>
            <section className="BlogLobbyIntro__content-container">
                <div className="BlogLobbyIntro__greeting">
                    <div className="BlogLobbyIntro__greeting-text">
                        {textAnimation.display.map(element =>
                            <span class="BlogLobbyIntro__greeting-character">
                                {element}
                            </span>
                        )}
                        <span className="BlogLobbyIntro__greeting-caret">
                            {caretOn}
                        </span>
                    </div>
                </div>
            </section>
        </section>
    );
}

export default BlogLobbyIntro;