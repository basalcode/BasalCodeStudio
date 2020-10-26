/* module */
import React, { useState } from 'react';

/* component */
import ImageDisplay from 'component/common/ImageDispaly';
import BlogLobbyIntro from './BlogLobbyIntro';
import BlogLobbyAbout from './BlogLobbyAbout';
import BlogLobbySkills from './BlogLobbySkills';
import BlogLobbyContact from './BlogLobbyContact';

const BlogLobby = () => {
    /* state */
    const [skillsPageOn, setSkillsPageOn] = useState(false);

    /* constant */
    const location = 'BlogLobby';

    /* variable */
    let indexCounter = 0;

    /* event hadler */
    const onSelect = isSelected => {
        setSkillsPageOn(isSelected);
    }

    return (
        <section className="BlogLobby">
            <ImageDisplay 
                location={location} 
                skillsPageOn={skillsPageOn} 
                activated={!skillsPageOn} />
            <BlogLobbyIntro index={indexCounter++} />
            <BlogLobbyAbout index={indexCounter++} />
            <BlogLobbySkills index={indexCounter++} onSelect={onSelect} />
            <BlogLobbyContact index={indexCounter++} />
        </section>
    );
}

export default BlogLobby;