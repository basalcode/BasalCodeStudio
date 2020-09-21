/* module */
import React, { useState } from 'react';

/* component */
import BlogLobbyIntro from './BlogLobbyIntro';
import BlogLobbyAbout from './BlogLobbyAbout';
import BlogLobbySkills from './BlogLobbySkills';

const BlogLobby = () => {
    return (
        <section className="BlogLobby">
            <BlogLobbyIntro></BlogLobbyIntro>
            <BlogLobbyAbout></BlogLobbyAbout>
            <BlogLobbySkills></BlogLobbySkills>
        </section>
    );
}

export default BlogLobby;