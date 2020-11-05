/* module */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

/* asset */
import links from 'asset/img/links/blogLobby';

/* lib */
import shuffle from 'lib/array/shuffle';

const ImageDispaly = (props) => {
    /* store */
    const pageIndex = useSelector(store => store.blog.index, []);

    /* props */
    const skillsPageOn = props.skillsPageOn;
    const location = props.location;

    /* state */
    const [pictures, setPictures] = useState([]);
    const [imageIndex, setImageIndex] = useState({
        previous: 0,
        current: 0,
        next: 0,
    });

    /* constant */
    const pagePosition = [
        "-intro",
        "-about",
        "-skills",
        "-contact"
    ];

    /* useEffect */
    // init
    useEffect(() => {
        const pictureLinks = Object.values(links);
        const shuffledLinks = shuffle(pictureLinks);

        setPictures(shuffledLinks);
        setImageIndex({
            previous: 0,
            current: 1,
            next: 2
        });
    }, []);

    // image slide
    useEffect(() => {
        let target;
        if (props.activated) {
            const changeInterval = 7000;
            target = window.setTimeout(() => {
                const pictureCount = pictures.length;
                setImageIndex({
                    previous: (imageIndex.previous + 1) % pictureCount,
                    current: (imageIndex.current + 1) % pictureCount,
                    next: (imageIndex.next + 1) % pictureCount
                });
            }, changeInterval);
        } else {
            clearTimeout(target);
        }
    }, [props.activated, imageIndex]);

    return (
        <div className={
            `ImageDisplay ` +
            `${location === 'BlogLobby' ?
                (`ImageDisplay__page${pagePosition[pageIndex]} ` +
                    "ImageDisplay__blog-lobby ") :
                ""}` +
            `${location === 'BlogLobby' && skillsPageOn ?
                ("ImageDisplay__blog-lobby--skills-page-on " +
                    "ImageDisplay__page-skills--on ") : ""}` +
            `${location === 'BlogLobbySkills' ? "ImageDisplay__blog-lobby-skills " : ""} ` +
            `${location === 'BlogLobbySkills' && skillsPageOn ?
                "ImageDisplay__blog-lobby-skills--skills-page-on " : ""} `}>
            {pictures.map((picture, index) =>
                <img className={
                    `ImageDisplay__picture ` +
                    `${imageIndex.previous === index ?
                        "ImageDisplay__image--disappear " : ""}` +
                    `${imageIndex.current === index ?
                        "ImageDisplay__image--remain " : ""}` +
                    `${imageIndex.next === index ?
                        "ImageDisplay__image--appear " : ""}`}
                    key={index}
                    src={picture} />
            )}
        </div>
    );
}

export default ImageDispaly;

