/* module */
import React from 'react';
import { useSelector } from 'react-redux';

/* text */
import text from '~/../../.private/text/page/blog/blogLobbyAbout';

const BlogLobbyAbout = (props) => {
    /* store */
    const pageIndex = useSelector(store => store.blog.index, []);
    
    /* constant */
    const textArray = text.textArray;

    return (
        <section className="BlogLobbyAbout">
            <div className="BlogLobbyAbout__container">
                <div className="
                    BlogLobbyAbout__frame
                    BlogLobbyAbout__content-frame">
                    <article className= {
                            `BlogLobbyAbout__about ` + 
                            (pageIndex === props.index ?
                            `BlogLobbyAbout__about--appear` :
                            `BlogLobbyAbout__about--disappear`)
                            }>
                        <h1 className="BlogLobbyAbout__about-title">ABOUT</h1>
                        <div className="BlogLobbyAbout__about-paragraph">
                            {textArray.map((text, index) => (
                                <p className="BlogLobbyAbout__about-text"
                                    key={index}>
                                    {text}
                                </p>
                            ))}
                        </div>
                    </article>
                </div>
                <section className="
                    BlogLobbyAbout__frame
                    BlogLobbyAbout__image-display
                "></section>
            </div>
        </section>
    );
}

export default BlogLobbyAbout;