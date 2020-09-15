import React from 'react';

import './BlogLobbySkills.scss'

import htmlLogo from 'asset/logo/html.svg';
import cssLogo from 'asset/logo/css.svg';
import javascriptLogo from 'asset/logo/javascript.svg';

import awsLogo from 'asset/logo/aws.svg';
import ubuntuLogo from 'asset/logo/ubuntu.svg';
import letsEncryptLogo from 'asset/logo/letsEncrypt.svg';

import sassLogo from 'asset/logo/sass.svg';
import reactLogo from 'asset/logo/react.svg';
import reactRouterLogo from 'asset/logo/reactRouter.svg';
import reduxLogo from 'asset/logo/redux.svg';
import reduxSagaLogo from 'asset/logo/reduxSaga.svg';

import nodejsLogo from 'asset/logo/nodejs.svg';
import nginxLogo from 'asset/logo/nginx.svg';
import expressLogo from 'asset/logo/express.svg';
import mysqlLogo from 'asset/logo/mysql.svg';
import pm2Logo from 'asset/logo/pm2.svg';

import npmLogo from 'asset/logo/npm.svg';
// import puttyLogo from 'asset/logo/putty.png';
import gitLogo from 'asset/logo/git.svg';



const BlogLobbySkills = () => {
    const skillsObjects = [
        {
            subtitle: 'basics',
            elements: [
                { imagePath: htmlLogo, text: 'HTML' },
                { imagePath: cssLogo, text: 'CSS' },
                { imagePath: javascriptLogo, text: 'Javascript' },
            ]
        },
        {
            subtitle: 'hosting',
            elements: [
                { imagePath: awsLogo, text: 'AWS' },
                { imagePath: ubuntuLogo, text: 'Ubuntu' },
                { imagePath: letsEncryptLogo, text: 'HTTPS' },
            ]
        },
        {
            subtitle: 'front-end',
            elements: [
                { imagePath: sassLogo, text: 'SASS' },
                { imagePath: reactLogo, text: 'React' },
                { imagePath: reactRouterLogo, text: 'React Router' },
                { imagePath: reduxLogo, text: 'Redux' },
                { imagePath: reduxSagaLogo, text: 'Redux Saga' },
            ]
        },
        {
            subtitle: 'back-end',
            elements: [
                { imagePath: nodejsLogo, text: 'NodeJS' },
                { imagePath: nginxLogo, text: 'NGINX' },
                { imagePath: expressLogo, text: 'Express' },
                { imagePath: mysqlLogo, text: 'mySQL' },
                { imagePath: pm2Logo, text: 'PM2' }
            ]
        }
    ];

    return (
        <section className="BlogLobbySkills">
            <h1 className="BlogLobbySkills__title">Used Skills</h1>
            <div className="BlogLobbySkills__content-container">
                {skillsObjects.map(skillsObject =>
                    <div className="BlogLobbySkills__content">
                        <h2 className="BlogLobbySkills__subtitle">{skillsObject.subtitle}</h2>
                        <div className="BlogLobbySkills__description-container">
                        {skillsObject.elements.map(element => 
                            <div className="BlogLobbySkills__description">
                                <span className="BlogLobbySkills__description-text">{element.text}</span>
                                <img className="BlogLobbySkills__description-image" src={element.imagePath} />
                            </div>
                        )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default BlogLobbySkills;