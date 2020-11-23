/* module */
import React, { useState, useEffect } from 'react';

/* component */
import ImageDisplay from 'component/common/ImageDispaly';
import BlogLobbyIntro from './BlogLobbyIntro';
import BlogLobbyAbout from './BlogLobbyAbout';
import BlogLobbySkills from './BlogLobbySkills';
import BlogLobbyContact from './BlogLobbyContact';

const BlogLobby = () => {
    /* state */
    const [skillsPageSelected, setSkillsPageSelected] = useState(false);

    /* constant */
    const location = 'BlogLobby';

    /* variable */
    let indexCounter = 0;

    /* event hadler */
    const onSelect = isSelected => {
        setSkillsPageSelected(isSelected);
    }

    return (
        <section className="BlogLobby">
            <ImageDisplay 
                location={location} 
                activated={!skillsPageSelected} />
            <BlogLobbyIntro index={indexCounter++} />
            <BlogLobbyAbout index={indexCounter++} />
            <BlogLobbySkills index={indexCounter++} onSelect={onSelect} />
            <BlogLobbyContact index={indexCounter++} />
        </section>
    );
}

export default BlogLobby;