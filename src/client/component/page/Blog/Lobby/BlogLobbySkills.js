/* module */
import React, { useState, useEffect, useRef, useMemo } from 'react';
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
    const scroll = useSelector(store => store.blog.scroll, []); 
    const pageIndex = useSelector(store => store.blog.index, []);

    /* state */
    const [skillsPageOn, setSkillsPageOn] = useState(false);

    const [categoryIndex, setCategoryIndex] = useState(-1);
    const [itemSelected, setItemSelected] = useState(false);
    const [currentItems, setCurrentItems] = useState([]);

    const [targetPercentage, setTargetPercentage] = useState(-1);
    const [progressGaugeOn, setProgressGaugeOn] = useState(false);
    const [progressNumber, setProgressNumber] = useState(0);

    const [itemContainerListStyle, setItemContainerListStyle] = useState({});
    const [itemSizeStyle, setItemSizeStyle] = useState({});
    const [guageBarStyle, setGuageBarStyle] = useState({});
    const [guageBarBackgroundStyle, setGuageBarBackgroundStyle] = useState({});

    /* useRef */
    const progressBarRef = useRef(0);
    const progressGaugeRef = useRef(0);

    /* constant */
    const location = 'BlogLobbySkills';
    const itemDatas = {
        Basics: {
            proficiency: 100,
            items: [
                { imagePath: htmlLogo, title: "HTML" },
                { imagePath: cssLogo, title: "CSS" },
                { imagePath: javascriptLogo, title: "Javascript" }
            ],
            description: []
        },
        Host: {
            proficiency: 95,
            items: [
                { imagePath: awsLogo, title: "AWS" },
                { imagePath: awsEC2Logo, title: "AWS EC2" },
                { imagePath: awsRoute53Logo, title: "AWS Route53" }
            ],
            description: []
        },
        Front: {
            proficiency: 100,
            items: [
                { imagePath: sassLogo, title: "SASS" },
                { imagePath: reactLogo, title: "React" },
                { imagePath: reactRouterLogo, title: "React Router" },
                { imagePath: reduxLogo, title: "Redux" },
                { imagePath: reduxSagaLogo, title: "Redux Saga" }
            ],
            description: []
        },
        Back: {
            proficiency: 95,
            items: [
                { imagePath: nodejsLogo, title: "NodeJS" },
                { imagePath: nginxLogo, title: "NGINX" },
                { imagePath: expressLogo, title: "Express" },
                { imagePath: mysqlLogo, title: "mySQL" },
                { imagePath: pm2Logo, title: "PM2" }
            ],
            description: []
        },
        Others: {
            proficiency: 100,
            items: [
                { imagePath: npmLogo, title: "NPM" },
                { imagePath: gitLogo, title: "git" },
                { imagePath: puttyLogo, title: "PuTTY" },
                { imagePath: ubuntuLogo, title: "Ubuntu" },
                { imagePath: httpsLogo, title: "HTTPS" }
            ],
            description: []
        }
    };
    const categories = Object.keys(itemDatas);
    const circleLayoutDiameter = 30;

    /* event handler */
    const onSelect = useMemo(() => index => {
        if (index !== categoryIndex) {
            setItemContainerListStyle({
                height: '0',
                overflow: 'hidden'
            });

            const progressBar = progressBarRef.current;

            setGuageBarStyle({
                width: 0
            });

            // progress gauge animation
            const timeout = 2000;
            setTimeout(() => {
                const progressBarWidth = progressBar.offsetWidth;

                const categoryName = categories[index];
                const percentage = itemDatas[categoryName].proficiency;
                const borderSize = 4;
                const gaugeBarWidth = Math.floor(
                    (progressBarWidth - borderSize) / 100 * percentage
                );

                setGuageBarStyle({
                    width: gaugeBarWidth + 'px'
                });

                // gauge background animation
                setTargetPercentage(percentage);
            }, timeout);
            setProgressGaugeOn(true);

            // progress gauge background
            const diagonalDegree = '45deg';
            const diagonalLineWidth = 10;
            const diagonalLineColor = 'hsl(33, 53%, 88%)';
            const differentColor = 'white';

            setGuageBarBackgroundStyle({
                background: `repeating-linear-gradient(
                    ${diagonalDegree},
                    ${diagonalLineColor} 0px ${diagonalLineWidth}px,
                    ${differentColor} ${diagonalLineWidth}px ${diagonalLineWidth * 2}px
                )`
            });
        }

        setCategoryIndex(index);
        setItemSelected(true);
        setSkillsPageOn(true);
        props.onSelect(true);

        setProgressNumber(0);
    });

    /* useEffect */
    // gauge number
    useEffect(() => {
        console.log('[targetPercentage]', targetPercentage)
        console.log('[categoryIndex]', categoryIndex)
        console.log('[pageIndex]', pageIndex)
        console.log('[props.index]', props.index)

        if (targetPercentage >= 0 && 
            categoryIndex >= 0 &&
            pageIndex === props.index) {
            const categoryName = categories[categoryIndex];
            const targetPercentage = itemDatas[categoryName].proficiency;

            const resizeEvent = new ResizeObserver(elements => {
                elements.forEach(element => {
                    const contentBoxSize = element.contentBoxSize[0];
                    const porgressBarWidth = progressBarRef.current.offsetWidth;
                    const gaugeBarWidth = contentBoxSize.inlineSize;

                    const borderSize = 4;
                    const percentage = Math.ceil(
                        gaugeBarWidth / (porgressBarWidth - borderSize * 2) * 100
                    );
                    setProgressNumber(percentage);

                    // gauge bar finish callback
                    if (percentage === targetPercentage) {
                        setProgressGaugeOn(false);
                        setTargetPercentage(-1);
                        setGuageBarBackgroundStyle({});
                        resizeEvent.disconnect(progressGaugeRef.current);
                    }
                });
            });
            resizeEvent.observe(progressGaugeRef.current);
        }
        // setProgressGaugeOn(false);
        setTargetPercentage(-1);
        setProgressNumber(0);
        // setGuageBarBackgroundStyle({});
    }, [targetPercentage]);

    // skills page
    useEffect(() => {
        if (pageIndex !== props.index) {
            setItemContainerListStyle({
                height: '0',
                overflow: 'hidden'
            });
            setGuageBarStyle({
                width: 0
            });
            setCategoryIndex(-1);
            setItemSelected(false);
            setSkillsPageOn(false);
            props.onSelect(false);
            
            setProgressNumber(0);
        }
    }, [pageIndex]);

    // display category items
    useEffect(() => {
        if (pageIndex === props.index) {
            const interval = 1000;

            const categoryName = categories[categoryIndex];
            const categoryItems = itemDatas[categoryName].items;
            const itemsAmount = categoryItems.length;
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
                setCurrentItems(categoryItems);
            }, interval);
        }
    }, [itemSelected, categoryIndex]);

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
                                <ImageDisplay
                                    location={location}
                                    skillsPageOn={skillsPageOn}
                                    activated={skillsPageOn} />
                                <CircleDisplay
                                    diameter={circleLayoutDiameter}
                                    elements={categories}
                                    activated={skillsPageOn}
                                    onSelect={onSelect} />
                            </div>
                        </section>
                        <section className={"BlogLobbySkills__item-section"}>
                            <article className={`BlogLobbySkills__items-container ` +
                                `${itemSelected ?
                                    "BlogLobbySkills__items-container--on" :
                                    "BlogLobbySkills__items-container--off"}`}>
                                <div className={
                                    `BlogLobbySkills__title-container ` +
                                    `${pageIndex === props.index ?
                                        "BlogLobbySkills__title-container--appear" :
                                        ""}`}>

                                    <h1 className="BlogLobbySkills__main-title">
                                        Skills
                                    </h1>
                                    <div className={
                                        `BlogLobbySkills__selected-category ` +
                                        `${itemSelected &&
                                        "BlogLobbySkills__selected-category--selected "}`}>
                                        <h2 className="BlogLobbySkills__sub-title">
                                            {`- ${categories[categoryIndex]}`}
                                        </h2>
                                        <div className="BlogLobbySkills__progress-bar-container">
                                            <div className="BlogLobbySkills__progress-number">
                                                {`${progressNumber} %`}
                                            </div>
                                            <div ref={progressBarRef}
                                                className="BlogLobbySkills__progress-bar">
                                                <div className={
                                                    `BlogLobbySkills__progress-gauge ` +
                                                    `${itemSelected &&
                                                    `BlogLobbySkills__progress-gauge--activated `
                                                    }`}
                                                    ref={progressGaugeRef}
                                                    style={guageBarStyle}>
                                                    <div className={
                                                        `BlogLobbySkills__progress-gauge-background ` +
                                                        `${progressGaugeOn ?
                                                            'BlogLobbySkills__progress-gauge-background--on ' :
                                                            'BlogLobbySkills__progress-gauge-background--off '}`}
                                                        style={guageBarBackgroundStyle}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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