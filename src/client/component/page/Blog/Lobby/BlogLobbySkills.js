/* module */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

/* asset */
import itemData from 'asset/img/logo/itemData';

/* component */
import CircleDisplay from 'component/layout/CircleDisplay';
import ImageDisplay from 'component/layout/ImageDispaly';
import ProgressBar from 'component/common/ProgressBar/ProgressBar';

const BlogLobbySkills = (props) => {
    /* store */
    const pageIndex = useSelector(store => store.blog.index, []);

    /* state */
    const [itemSelected, setItemSelected] = useState(false);
    const [categoryIndex, setCategoryIndex] = useState(-1);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [percentage, setPercentage] = useState(0);

    const [itemContainerListStyle, setItemContainerListStyle] = useState({});
    const [itemSizeStyle, setItemSizeStyle] = useState({});

    /* constant */
    const location = 'BlogLobbySkills';
    const categories = Object.keys(itemData);
    const circleLayoutDiameter = 30;

    /* event handler */
    const onSelect = index => {
        if (index !== categoryIndex) {
            /* constant */
            const selectedCategoryData = Object.values(itemData)[index];
            const percentage = selectedCategoryData.proficiency;

            /* state */
            setItemSelected(true);
            setCategoryIndex(index);
            setSelectedCategory(selectedCategoryData);
            setPercentage(percentage);
            props.onSelect(true);

            /* style */ 
            setItemContainerListStyle({
                height: '0',
                overflow: 'hidden'
            });
        }
    };

    /* useEffect */
    // when escape from the page
    useEffect(() => {
        if (pageIndex !== props.index) {
            /* state */
            setItemSelected(false);
            setCategoryIndex(-1);
            setSelectedCategory(null);
            setPercentage(0);
            props.onSelect(false);

            /* style */
            setItemContainerListStyle({
                height: '0',
                overflow: 'hidden'
            });
        }
    }, [pageIndex]);

    // skills item animation
    useEffect(() => {
        if (pageIndex === props.index) {
            const categoryItems = selectedCategory.items;
            const itemsAmount = categoryItems.length;
            const itemHeight = 8;

            const interval = 1000;
            setTimeout(() => {
                setItemContainerListStyle({
                    height: (itemHeight * itemsAmount) + 'rem',
                    overflow: 'auto'
                });
                setItemSizeStyle({
                    height: itemHeight + 'rem'
                });
            }, interval);
        }
    }, [categoryIndex]);

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
                                    skillsPageOn={itemSelected}
                                    activated={itemSelected} />
                                <CircleDisplay
                                    diameter={circleLayoutDiameter}
                                    elements={categories}
                                    activated={itemSelected}
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
                                        <ProgressBar percentage={percentage} />
                                    </div>
                                </div>
                                <div className={`BlogLobbySkills__item-container-list ` +
                                    `${itemSelected ?
                                        "BlogLobbySkills__item-container-list--appear" :
                                        "BlogLobbySkills__item-container-list--disappear"}`}
                                    style={itemContainerListStyle}>
                                    {selectedCategory && selectedCategory.items.map((item, index) =>
                                        <div className="BlogLobbySkills__item-container"
                                            style={itemSizeStyle}
                                            key={index}>
                                            <div className="BlogLobbySkills__item-toggle">
                                                <div className="BlogLobbySkills__item">
                                                    <img className="BlogLobbySkills__item-image"
                                                        src={item.imagePath} />
                                                </div>
                                                <h2 className="BlogLobbySkills__item-title">
                                                    {item.title}
                                                </h2>
                                            </div>
                                            <p className="BlogLobbySkills__item-description">
                                                {item.description}
                                            </p>
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