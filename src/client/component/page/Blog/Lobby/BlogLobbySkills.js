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
import CircleDisplay from 'component/layout/CircleDisplay';
import ImageDisplay from 'component/layout/ImageDispaly';

const BlogLobbySkills = (props) => {
    /* store */
    const pageIndex = useSelector(store => store.blog.index, []);
    const scrollOn = useSelector(store => store.blog.scrollOn);

    /* state */
    const [skillsPageOn, setSkillsPageOn] = useState(false);

    const [categoryIndex, setCategoryIndex] = useState(0);
    const [itemSelected, setItemSelected] = useState(false);
    const [currentItems, setCurrentItems] = useState([]);

    const [itemContainerListStyle, setItemContainerListStyle] = useState({});
    const [itemSizeStyle, setItemSizeStyle] = useState({});

    /* constant */
    const location = 'BlogLobbySkills';
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
        setSkillsPageOn(true);
        props.onSelect(true);
    }

    /* useEffect */
    // skills page
    useEffect(() => {
        const SkillsPageIndex = 2;
        if (pageIndex !== SkillsPageIndex) {
            setSkillsPageOn(false);
        }
    }, [pageIndex]);

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
                    <div className="BlogLobbySkills__section-container">
                        <section className={
                            `BlogLobbySkills__category-section ` +
                            `${pageIndex === props.index ?
                                "BlogLobbySkills__category-section--appear " :
                                "BlogLobbySkills__category-section--disappear "}`}>
                            <div className={`BlogLobbySkills__circle-layout-container ` +
                            `${itemSelected ?
                                "BlogLobbySkills__circle-layout-container--on" :
                                "BlogLobbySkills__circle-layout-container--off"}`}>
                                <ImageDisplay location={location} skillsPageOn={skillsPageOn} />
                                <CircleDisplay
                                    diameter={circleLayoutDiameter}
                                    elements={categories}
                                    onSelect={onSelect} />
                            </div>
                        </section>
                        <section className={"BlogLobbySkills__item-section"}>
                            <article className={`BlogLobbySkills__items-container ` + 
                                    `${itemSelected ?
                                        "BlogLobbySkills__items-container--on" :
                                        "BlogLobbySkills__items-container--off"}`}>
                                <h1 className={`BlogLobbySkills__title ` + 
                                    `${pageIndex === props.index ?
                                        "BlogLobbySkills__title--appear" :
                                        ""}`}>Skills</h1>
                                <div className={`BlogLobbySkills__item-container-list ` +
                                    `${itemSelected ?
                                        "BlogLobbySkills__item-container-list--appear" :
                                        "BlogLobbySkills__item-container-list--disappear"}`}
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