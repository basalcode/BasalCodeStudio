/* module */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

/* asset */
import htmlLogo from 'asset/img/logo/html.svg';
import cssLogo from 'asset/img/logo/css.svg';
import javascriptLogo from 'asset/img/logo/javascript.svg';

import awsLogo from 'asset/img/logo/aws.svg';
import awsRoute53Logo from 'asset/img/logo/aws-route53.svg';
import awsEC2Logo from 'asset/img/logo/aws-ec2.svg';
import ubuntuLogo from 'asset/img/logo/ubuntu.svg';
import httpsLogo from 'asset/img/logo/lets-encrypt.svg';

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
import gitLogo from 'asset/img/logo/putty.png';
import puttyLogo from 'asset/img/logo/git.svg';

/* component */
import CircleLayout from 'component/layout/CircleLayout';

const BlogLobbySkills = (props) => {
    /* store */
    const pageIndex = useSelector(store => store.blog.index, []);
    const scrollOn = useSelector(store => store.blog.scrollOn);

    /* state */
    const [categoryIndex, setCategoryIndex] = useState(0); // will change to props
    const [currentItems, setCurrentItems] = useState([]);

    const [itemSelected, setItemSelected] = useState(false);

    /* constant */
    const itemDatas = {
        basics: {
            items: [
                { imagePath: htmlLogo, title: "HTML" },
                { imagePath: cssLogo, title: "CSS" },
                { imagePath: javascriptLogo, title: "Javascript" }
            ],
            description: []
        },
        host: {
            items: [
                { imagePath: awsLogo, title: "AWS" },
                { imagePath: awsEC2Logo, title: "AWS EC2" },
                { imagePath: awsRoute53Logo, title: "AWS Route53" },
                { imagePath: ubuntuLogo, title: "Ubuntu" },
                { imagePath: httpsLogo, title: "HTTPS" }],
            description: []
        },
        frontEnd: {
            items: [
                { imagePath: sassLogo, title: "SASS" },
                { imagePath: reactLogo, title: "React" },
                { imagePath: reactRouterLogo, title: "React Router" },
                { imagePath: reduxLogo, title: "Redux" },
                { imagePath: reduxSagaLogo, title: "Redux Saga" }
            ], description: []
        },
        backEnd: {
            items: [
                { imagePath: nodejsLogo, title: "NodeJS" },
                { imagePath: nginxLogo, title: "NGINX" },
                { imagePath: expressLogo, title: "Express" },
                { imagePath: mysqlLogo, title: "mySQL" },
                { imagePath: pm2Logo, title: "PM2" }],
            description: []
        },
        others: {
            items: [
                { imagePath: npmLogo, title: "NPM" },
                { imagePath: gitLogo, title: "git" },
                { imagePath: puttyLogo, title: "PuTTY" }
            ],
            description: []
        }
    };
    const categories = Object.keys(itemDatas);
    const circleLayoutDiameter = 30;

    /* event handler */
    const onSelect = index => {
        

        setCategoryIndex(index);
        setItemSelected(true);
        props.onSelect(true);
    }

    /* useEffect */
    // display category items
    useEffect(() => {
        const selectedCategoryName = categories[categoryIndex];
        const selectedCategoryItems = itemDatas[selectedCategoryName].items;

        setCurrentItems(selectedCategoryItems);
    }, [categoryIndex]);

    // deactivate page layout
    useEffect(() => {
        if (scrollOn) {
            setItemSelected(false);
            props.onSelect(false);
        }
    }, [scrollOn]);

    return (
        <section className="BlogLobbySkills">
            <div className="BlogLobbySkills__container">
                <div className="BlogLobbySkills__content-container">
                    <section className={
                        `BlogLobbySkills__category-section ` +
                        `${pageIndex === props.index ?
                            "BlogLobbySkills__category-section--appear " :
                            "BlogLobbySkills__category-section--disappear "}` +
                        `${itemSelected ?
                            "BlogLobbySkills__category-section--select-on " :
                            " "}`}>
                        <div className="BlogLobbySkills__circle-layout-container">
                            <CircleLayout
                                diameter={circleLayoutDiameter}
                                elements={categories}
                                onSelect={onSelect} />
                        </div>
                    </section>
                    <section className="BlogLobbySkills__item-section">
                        <h1 className="BlogLobbySkills__title">Skills</h1>
                        <div className="BlogLobbySkills__item-container-list">
                            {currentItems.map((item, index) =>
                                <div className="BlogLobbySkills__item-container"
                                    key={index}>
                                    <img className="BlogLobbySkills__item"
                                        src={item.imagePath} />
                                    <div className="BlogLobbySkills__item-title">
                                        {item.title}
                                    </div>
                                    <div className="BlogLobbySkills__item-description">
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
}

export default BlogLobbySkills;