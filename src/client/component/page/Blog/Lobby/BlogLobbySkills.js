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
import gitLogo from 'asset/img/logo/git.svg';
import puttyLogo from 'asset/img/logo/putty.png';

/* component */
import CircleLayout from 'component/layout/CircleLayout';

const BlogLobbySkills = (props) => {
    /* store */
    const pageIndex = useSelector(store => store.blog.index, []);
    const scrollOn = useSelector(store => store.blog.scrollOn);

    /* state */
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [itemSelected, setItemSelected] = useState(false);
    const [currentItems, setCurrentItems] = useState([]);

    const [itemContainerListStyle, setItemContainerListStyle] = useState({});
    const [itemSizeStyle, setItemSizeStyle] = useState({});

    /* constant */
    const itemDatas = {
        Basics: {
            items: [
                { imagePath: htmlLogo, title: "HTML" },
                { imagePath: cssLogo, title: "CSS" },
                { imagePath: javascriptLogo, title: "Javascript" }
            ],
            description: []
        },
        Host: {
            items: [
                { imagePath: awsLogo, title: "AWS" },
                { imagePath: awsEC2Logo, title: "AWS EC2" },
                { imagePath: awsRoute53Logo, title: "AWS Route53" },
                { imagePath: ubuntuLogo, title: "Ubuntu" },
                { imagePath: httpsLogo, title: "HTTPS" }],
            description: []
        },
        Front: {
            items: [
                { imagePath: sassLogo, title: "SASS" },
                { imagePath: reactLogo, title: "React" },
                { imagePath: reactRouterLogo, title: "React Router" },
                { imagePath: reduxLogo, title: "Redux" },
                { imagePath: reduxSagaLogo, title: "Redux Saga" }
            ], description: []
        },
        Back: {
            items: [
                { imagePath: nodejsLogo, title: "NodeJS" },
                { imagePath: nginxLogo, title: "NGINX" },
                { imagePath: expressLogo, title: "Express" },
                { imagePath: mysqlLogo, title: "mySQL" },
                { imagePath: pm2Logo, title: "PM2" }],
            description: []
        },
        Others: {
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
        if (index !== categoryIndex) {
            setItemContainerListStyle({
                height: '0',
                overflow: 'hidden'
            });
        }

        setCategoryIndex(index);
        setItemSelected(true);

        props.onSelect(true);
    }

    /* useEffect */
    // display category items
    useEffect(() => {
        if (pageIndex === props.index) {
            const interval = 1000;

            const selectedCategoryName = categories[categoryIndex];
            const selectedCategoryItems = itemDatas[selectedCategoryName].items;
            const itemsAmount = selectedCategoryItems.length;
            const itemHeight = 8;
            const itemPadding = 0.2;
            setTimeout(() => {
                setItemContainerListStyle({
                    height: (itemHeight * itemsAmount) + 'rem',
                    overflow: 'auto'
                });
                setItemSizeStyle({
                    height: itemHeight + 'rem',
                    padding: `${itemPadding / 2}rem 1rem`
                });
                setCurrentItems(selectedCategoryItems);
            }, interval);
        }
    }, [itemSelected, categoryIndex]);

    // deactivate page layout
    useEffect(() => {
        if (scrollOn) {
            setItemContainerListStyle({
                height: '0',
                overflow: 'hidden'
            });
            props.onSelect(false);
            setItemSelected(false);
        }
    }, [scrollOn]);

    return (
        <section className="BlogLobbySkills">
            <div className="BlogLobbySkills__container">
                <div className="BlogLobbySkills__content-container">
                    <h1 className={"BlogLobbySkills__title"}>Skills</h1>
                    <div className="BlogLobbySkills__section-container">
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
                        <section className={
                            `BlogLobbySkills__item-section ` +
                            `${itemSelected ?
                                "BlogLobbySkills__item-section--appear" :
                                "BlogLobbySkills__item-section--disappear"}`}>
                            <article className={"BlogLobbySkills__items-container"}>
                                <div className={"BlogLobbySkills__item-container-list"}
                                    style={itemContainerListStyle}>
                                    {currentItems.map((item, index) =>
                                        <div className="BlogLobbySkills__item-container"
                                            style={itemSizeStyle}
                                            key={index}>
                                            <div className="BlogLobbySkills__item-toggle">
                                                <div className="BlogLobbySkills__item">
                                                    <img className="BlogLobbySkills__item-image"
                                                        src={item.imagePath} />
                                                </div>
                                                <div className="BlogLobbySkills__item-title">
                                                    {item.title}
                                                </div>
                                            </div>
                                            <div className="BlogLobbySkills__item-description">
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </article>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogLobbySkills;