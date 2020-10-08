/* module */
import React from 'react';

/* asset */
import htmlLogo from 'asset/img/logo/html.svg';
import cssLogo from 'asset/img/logo/css.svg';
import javascriptLogo from 'asset/img/logo/javascript.svg';

import awsLogo from 'asset/img/logo/aws.svg';
import awsRoute53 from 'asset/img/logo/aws-route53.svg';
import awsEC2 from 'asset/img/logo/aws-ec2.svg';
import ubuntuLogo from 'asset/img/logo/ubuntu.svg';
import letsEncryptLogo from 'asset/img/logo/lets-encrypt.svg';

import sassLogo from 'asset/img/logo/sass.svg';
import reactLogo from 'asset/img/logo/react.svg';
import reactRouterLogo from 'asset/img/logo/react-router.svg';
import reduxLogo from 'asset/img/logo/redux.svg';
import reduxSagaLogo from 'asset/img/logo/redux-saga.svg';

import nodejsLogo from 'asset/img/logo/nodejs.svg';
import nginxLogo from 'asset/img/logo/nginx.svg';
import expressLogo from 'asset/img/logo/express.svg';
import mysqlLogo from 'asset/img/logo/mysql.svg';
import pm2Logo from 'asset/img/logo/pm2.svg';

import npmLogo from 'asset/img/logo/npm.svg';
import puttyLogo from 'asset/img/logo/putty.png';
import gitLogo from 'asset/img/logo/git.svg';

const BlogLobbySkills = () => {
    const skillsObjects = {
        basics: [
            { imagePath: htmlLogo, text: 'HTML' },
            { imagePath: cssLogo, text: 'CSS' },
            { imagePath: javascriptLogo, text: 'Javascript' }
        ],
        host: [
            { imagePath: awsLogo, text: 'AWS' },
            { imagePath: awsRoute53, text: 'AWS EC2' },
            { imagePath: awsEC2, text: 'AWS Route53' },
            { imagePath: ubuntuLogo, text: 'Ubuntu' },
            { imagePath: letsEncryptLogo, text: 'HTTPS' }
        ],
        frontEnd: [
            { imagePath: sassLogo, text: 'SASS' },
            { imagePath: reactLogo, text: 'React' },
            { imagePath: reactRouterLogo, text: 'React Router' },
            { imagePath: reduxLogo, text: 'Redux' },
            { imagePath: reduxSagaLogo, text: 'Redux Saga' }
        ],
        backEnd: [
            { imagePath: nodejsLogo, text: 'NodeJS' },
            { imagePath: nginxLogo, text: 'NGINX' },
            { imagePath: expressLogo, text: 'Express' },
            { imagePath: mysqlLogo, text: 'mySQL' },
            { imagePath: pm2Logo, text: 'PM2' }
        ],
        others: [
            { imagePath: npmLogo, text: 'NPM' },
            { imagePath: gitLogo, text: 'git' },
            { imagePath: puttyLogo, text: 'PuTTY' },
        ]
    };

    return (
        <section className="BlogLobbySkills">
            <div className="BlogLobbySkills__container">
                <h1 className="BlogLobbySkills__title">Skills</h1>
                <div className="BlogLobbySkills__content-container">
                    {Object.keys(skillsObjects).map((title, index) =>
                        <div className="BlogLobbySkills__content"
                            key={index}>
                            <h2 className="BlogLobbySkills__content-title">
                                {title}
                            </h2>
                            <div className="BlogLobbySkills__content-body-container">
                                {skillsObjects[title].map((content, index) =>
                                    <div className="BlogLobbySkills__content-body"
                                        key={index}>
                                        <img className="BlogLobbySkills__logo"
                                            src={content.imagePath} />
                                        <div className="BlogLobbySkills__text">
                                            {content.text}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default BlogLobbySkills;