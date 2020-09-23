/* module */
import React, { useState, useEffect, useMemo } from 'react';

/* asset */
import links from 'asset/img/links/blogLobby';

/* lib */
import shuffle from 'lib/array/shuffle';

const BlogLobbyIntro = () => {
    /* const [blogLobbyClassName, setBlogLobbyClassName] = useState('BlogLobbyIntro__animation--before');
    const [animationFinished, setAnimationFinished] = useState(false);

    const [titleContent, setTitleContent] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [titleCaret, setTitleCaret] = useState(true);
    const [clearCaret, setClearCaret] = useState(false);
    const [titleClassName, setTitleClassName] = useState('BlogLobbyIntro__title--before');

    const [greetingClassName, setGreetingClassName] = useState('BlogLobbyIntro__greeting--before');

    const [downArrowClassName, setDownArrowClassName] = useState('BlogLobbyIntro__down-arrow--before');

    const title = 'Basal Code Studio';

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
    }, [clearCaret]); */

    const [pictureLink, setPictureLink] = useState('');

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

    const [textAnimation, setTextAnimation] = useState({
        display: [],
        charIndex: 0,
        animationIndex: 0,
        isCleared: false
    })

    const titleText = 'BasalCodeStudio';

    const maxRepeat = 10;
    const animationChars = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '=',
        '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'
    ];
    const shuffledChars = useMemo(() => shuffle(animationChars).slice(0, maxRepeat), []);
    
    useEffect(() => {
        const animationInterval = 100;
        if (!textAnimation.isCleared) {
            setTimeout(() => {
                if (titleText[textAnimation.charIndex] === shuffledChars[textAnimation.animationIndex] ||
                    textAnimation.animationIndex >= maxRepeat) {
                    const tempArray = textAnimation.display.slice();
                    tempArray[textAnimation.charIndex] = titleText[textAnimation.charIndex];

                    setTextAnimation(previous => ({
                        ...previous, 
                        display: tempArray,
                        charIndex: textAnimation.charIndex + 1,
                        animationIndex: 0,
                        isCleared: textAnimation.charIndex + 1 >= titleText.length ?
                            true : false
                    }));
                    console.log(textAnimation);
                    return;
                }

                const tempArray = textAnimation.display.slice();
                tempArray[textAnimation.charIndex] = shuffledChars[textAnimation.animationIndex];
                setTextAnimation(previous => ({
                    ...previous, 
                    display: tempArray,
                    animationIndex: textAnimation.animationIndex + 1,
                }));
                console.log(textAnimation);
            }, animationInterval);
        }
    }, [textAnimation]);

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

                    </div>
                    <span className="BlogLobbyIntro__greeting-caret"></span>
                </div>
            </section>
        </section>
    );
}

export default BlogLobbyIntro;