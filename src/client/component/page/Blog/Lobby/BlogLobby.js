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

    const [skillsPageOn, setSkillsPageOn] = useState(false);

    /* constant */
    const pagePosition = [
        "-intro",
        "-about",
        "-skills",
        "-contact"
    ];

    /* variable */
    let indexCounter = 0;

    /* event hadler */
    const onSelect = isSelected => {
        setSkillsPageOn(isSelected);
    }

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
        const changeInterval = 20000;
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
                `${skillsPageOn ? 
                    "BlogLobby__picture-container--on " :
                    ""}` +
                `BlogLobby__page${pagePosition[pageIndex]} ` + 
                `${skillsPageOn ? 
                    "BlogLobby__page-skills--on " :
                    ""}`}>
                {pictures.map((picture, index) => 
                    <img className={
                        `BlogLobby__picture ` +
                        `${imageIndex.previous === index ? 
                            "BlogLobby__image--disappear " : " "}` + 
                        `${imageIndex.current === index ? 
                            "BlogLobby__image--remain " : " "}` + 
                        `${imageIndex.next === index ? 
                            "BlogLobby__image--appear " : " "}`}
                        key={index}
                        src={picture} />
                )}
            </div>
            <BlogLobbyIntro index={indexCounter++} />
            <BlogLobbyAbout index={indexCounter++} />
            <BlogLobbySkills index={indexCounter++} onSelect={onSelect}/>
            <BlogLobbyContact index={indexCounter++} />
        </section>
    );
}

export default BlogLobby;