import React from 'react';

import GoTop from 'component/common/ui/floatButton/GoTop';
import NightMode from 'component/common/ui/floatButton/NightMode';
import GitHubLink from 'component/common/ui/floatButton/GitHubLink';
import EmailLink from 'component/common/ui/floatButton/EmailLink';

import './BlogLobby.scss';

const BlogLobby = () => {
    return (
        <div className="BlogLobby">
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

            
        </div>
    );
}

export default BlogLobby;