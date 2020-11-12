/* module */
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

/* asset */
import links from 'asset/img/links/blogLobby';

/* lib */
import shuffle from 'lib/array/shuffle';

const ImageDispaly = (props) => {
    /* store */
    const pageIndex = useSelector(store => store.blog.index, []);

    /* props */
    const activated = props.activated;
    const location = props.location;

    /* state */
    const [imageDisplayTimeout, setImageDisplayTimeout] = useState(null);
    const [imageIndex, setImageIndex] = useState({
        previous: 0,
        current: 1,
        next: 2
    });
    
    /* useMemo */
    const pictures = useMemo(() => shuffle(Object.values(links)), [links]);

    /* constant */
    const pagePosition = [
        "intro",
        "about",
        "skills",
        "contact"
    ];

    /* useEffect */
    // image slide
    useEffect(() => {
        console.log('[location]', location);
        if (activated) {
            console.log('[image display activated]');
            const changeInterval = 7000;
            let target = setTimeout(() => {
                const pictureCount = pictures.length;
                setImageIndex({
                    previous: (imageIndex.previous + 1) % pictureCount,
                    current: (imageIndex.current + 1) % pictureCount,
                    next: (imageIndex.next + 1) % pictureCount
                });
                console.log('[pictureCount]', pictureCount);
            }, changeInterval);

            setImageDisplayTimeout(target);
        } else {
            console.log('[image display clear]');
            clearTimeout(imageDisplayTimeout);
        }

        console.log('image display event');
        console.log('activated', activated);
        console.log('imageIndex', imageIndex);
    }, [activated, imageIndex]);

    return (
        <div className={
            `ImageDisplay ` +
            // lobby
            `${location === "BlogLobby" ? 
                "ImageDisplay__blog-lobby" : ""} ` +
            `${location === "BlogLobby" ? activated ?
                `ImageDisplay__blog-lobby--${pagePosition[pageIndex]}` : 
                "ImageDisplay__blog-lobby--off" : 
                "" } ` +
            // skills
            `${location === "BlogLobbySkills" ? 
                "ImageDisplay__blog-lobby-skills" : ""} ` +
            `${location === "BlogLobbySkills" && activated ?
                "ImageDisplay__blog-lobby-skills--on" : 
                ""} `}>
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

