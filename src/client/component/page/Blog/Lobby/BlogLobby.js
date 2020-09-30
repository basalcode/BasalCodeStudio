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
    const [pictureLink, setPictureLink] = useState('');
    // const [] = useState('');

    /* constant */
    const picturePosition = [
        "BlogLobby__picture--intro",
        "BlogLobby__picture--about",
        "BlogLobby__picture--skills",
        "BlogLobby__picture--contact"
    ];

    /* useEffect */
    // image slide
    useEffect(() => {
        const changeInterval = 20000;

        const pictureLinks = Object.values(links);
        let shuffledLinks = shuffle(pictureLinks);  

        let imageLinkIndex = 0;

        setPictureLink(shuffledLinks[imageLinkIndex]);
        imageLinkIndex++;

        window.setInterval(() => {
            setPictureLink(shuffledLinks[imageLinkIndex]);
            imageLinkIndex++;

            if (imageLinkIndex >= pictureLinks.length) {
                shuffledLinks = shuffle(pictureLinks);
                imageLinkIndex = 0;
            }
        }, changeInterval);
    }, []);

    return (
        <section className="BlogLobby">
            <img className={
                `BlogLobby__picture ` +
                `${picturePosition[pageIndex]}`
                }
                src={pictureLink} />
            <BlogLobbyIntro></BlogLobbyIntro>
            <BlogLobbyAbout></BlogLobbyAbout>
            <BlogLobbySkills></BlogLobbySkills>
            <BlogLobbyContact></BlogLobbyContact>
        </section>
    );
}

export default BlogLobby;