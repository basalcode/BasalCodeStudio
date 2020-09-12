import React, { useState, useEffect } from 'react';

import BlogLobbyMain from './BlogLobbyMain';
import BlogLobbyIntro from './BlogLobbyIntro';
import BlogLobbySkills from './BlogLobbySkills';

import './BlogLobby.scss';

const BlogLobby = () => {
    return (
        <div className="BlogLobby">
            <BlogLobbyMain></BlogLobbyMain>
            <BlogLobbyIntro></BlogLobbyIntro>
            <BlogLobbySkills></BlogLobbySkills>
        </div>
    );
}

export default BlogLobby;