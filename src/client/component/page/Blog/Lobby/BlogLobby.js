/* module */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

/* asset */
import links from 'asset/img/links/blogLobby';

/* lib */
import shuffle from 'lib/array/shuffle';

/* component */
import BlogLobbyIntro from './BlogLobbyIntro';
import BlogLobbyAbout from './BlogLobbyAbout';
import BlogLobbySkills from './BlogLobbySkills';
import BlogLobbyContact from './BlogLobbyContact';

const BlogLobby = () => {
    /* store */
    const pageIndex = useSelector(store => store.blog.index, []);

    /* state */
    const [pictures, setPictures] = useState([]);
    const [imageIndex, setImageIndex] = useState({
        previous: 0,
        current: 0,
        next: 0,
    });

    /* constant */
    const pagePosition = [
        "BlogLobby__page--intro",
        "BlogLobby__page--about",
        "BlogLobby__page--skills",
        "BlogLobby__page--contact"
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
        const changeInterval = 2000;
        window.setTimeout(() => {
            const pictureCount = pictures.length;
            setImageIndex({
                previous: (imageIndex.previous + 1) % pictureCount,
                current: (imageIndex.current + 1) % pictureCount,
                next: (imageIndex.next + 1) % pictureCount
            });
        }, changeInterval);
    }, [imageIndex]);

    return (
        <section className="BlogLobby">
            <div className={
                `BlogLobby__picture-container ` + 
                `${pagePosition[pageIndex]}`}>
                {pictures.map((picture, index) => 
                    <img className={
                        `BlogLobby__picture ` +
                        `${imageIndex.previous === index ? "BlogLobby__image--disappear " : " "}` + 
                        `${imageIndex.current === index ? "BlogLobby__image--remain " : " "}` + 
                        `${imageIndex.next === index ? "BlogLobby__image--appear " : " "}`}
                        key={index}
                        src={picture} />
                )}
            </div>
            <BlogLobbyIntro></BlogLobbyIntro>
            <BlogLobbyAbout></BlogLobbyAbout>
            <BlogLobbySkills></BlogLobbySkills>
            <BlogLobbyContact></BlogLobbyContact>
        </section>
    );
}

export default BlogLobby;