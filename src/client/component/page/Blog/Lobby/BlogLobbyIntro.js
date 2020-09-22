/* module */
import React, { useState, useEffect } from 'react';

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
        const changeInterval = 5000;

        const pictureLinkArray = Object.values(links);
        let shuffledLinkArray = shuffle(pictureLinkArray);

        let linkIndex = 0;
        
        setPictureLink(shuffledLinkArray[linkIndex]);
        linkIndex++;

        window.setInterval(() => {
            setPictureLink(shuffledLinkArray[linkIndex]);
            linkIndex++;

            if (linkIndex >= pictureLinkArray.length) {
                shuffledLinkArray = shuffle(pictureLinkArray);
                linkIndex = 0;
            }
        }, changeInterval)
    }, []);

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
                    <div className="BlogLobbyIntro__greeting-text"></div>
                    <span className="BlogLobbyIntro__greeting-caret"></span>
                </div>
            </section>
        </section>
    );
}

export default BlogLobbyIntro;