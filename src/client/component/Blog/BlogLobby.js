import React, { Component } from 'react';
import './BlogLobby.css';

import Logo from '../common/ui/Logo';
import Navigation from '../common/ui/Navigation/Navigation';
import GoTop from '../common/ui/floatButton/GoTop';
import NightMode from '../common/ui/floatButton/NightMode';
import GitHubLink from '../common/ui/floatButton/GitHubLink'
import EmailLink from '../common/ui/floatButton/EmailLink'

import Footer from '../common/Footer';

function BlogLobby() {
    return (
        <div className="BlogLobby">
            <Logo></Logo>
            <Navigation></Navigation>
            <GoTop></GoTop>
            <NightMode></NightMode>
            <GitHubLink></GitHubLink>
            <EmailLink></EmailLink>

            <div className="BlogMain">
                BasalCodeStudio에 오신 것을 환영합니다.
                </div>
            <div className="BlogIntro">
                BlogIntro
                </div>
            <div className="BlogSkill">
                Skill
                </div>

            <Footer></Footer>
        </div>
    );
}

export default BlogLobby;