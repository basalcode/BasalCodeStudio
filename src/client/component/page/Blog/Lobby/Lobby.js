import React from 'react';

import Intro from './Intro';
import About from './About';
import Skills from './Skills';

const BlogLobby = () => {
    return (
        <div className="BlogLobby">
            <Intro></Intro>
            <About></About>
            <Skills></Skills>
        </div>
    );
}

export default BlogLobby;