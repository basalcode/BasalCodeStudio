/* module */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

/* asset */
import itemData from 'asset/img/logo/itemData';

/* component */
import CircleDisplay from 'component/common/CircleDisplay';
import ImageDisplay from 'component/common/ImageDispaly';
import ProgressBar from 'component/common/ProgressBar';
import ItemDisplay from 'component/common/ItemDisplay';

const BlogLobbySkills = (props) => {
    /* store */
    const pageIndex = useSelector(store => store.blog.index, []);
    const nightModeOn = useSelector(store => store.app.nightModeOn, []);

    /* state */
    const [itemSelected, setItemSelected] = useState(false);
    const [categoryIndex, setCategoryIndex] = useState(-1);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // progreess bar
    const [percentage, setPercentage] = useState(0);
    const [progressBarActivated, setProgressBarActivated] = useState(false);

    // item display
    const [itemDisplayActivated, setItemDisplayActivated] = useState(false);

    /* constant */
    const location = 'BlogLobbySkills';
    const categories = Object.keys(itemData);

    /* event handler */
    const onSelect = index => {
        if (index !== categoryIndex &&
            !progressBarActivated) {
            /* constant */
            const selectedCategoryData = Object.values(itemData)[index];
            const percentage = selectedCategoryData.proficiency;

            /* state */
            setItemSelected(true);
            setCategoryIndex(index);

            // progress bar
            setProgressBarActivated(true);
            setPercentage(percentage);

            // item display
            setItemDisplayActivated(false);

            props.onSelect(true);
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

            // progress bar
            setProgressBarActivated(false);
            setPercentage(0);
            
            // item display
            setItemDisplayActivated(false);
        }
        props.onSelect(false);
    }, [pageIndex]);

    // skills item container animation
    useEffect(() => {
        const interval = 1000;
        if (pageIndex === props.index) {
            setTimeout(() => {
                const selectedCategoryData = Object.values(itemData)[categoryIndex];

                /* state */
                setSelectedCategory(selectedCategoryData);
                
                // item display
                setItemDisplayActivated(true);
            }, interval);
        }
        return () => {
            setTimeout(() => {
                setSelectedCategory(null);
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
                                    "BlogLobbySkills__circle-layout-container--off"} ` +
                                `${nightModeOn ?
                                    "BlogLobbySkills__circle-layout-container--night-mode" : ""}`}>
                                <ImageDisplay
                                    activated={itemSelected}
                                    skillsPageOn={itemSelected}
                                    location={location} />
                                <CircleDisplay
                                    activated={!progressBarActivated}
                                    reset={!itemSelected}
                                    elements={categories}
                                    onSelect={onSelect} />
                            </div>
                        </section>
                        <section className="BlogLobbySkills__item-section">
                            <article className={`BlogLobbySkills__items-container ` +
                                `${itemSelected ?
                                    "BlogLobbySkills__items-container--on" :
                                    "BlogLobbySkills__items-container--off"}`}>
                                <div className={
                                    `BlogLobbySkills__title-container ` +
                                    `${pageIndex === props.index ?
                                        "BlogLobbySkills__title-container--appear" :
                                        ""}`}>

                                    <h1 className={"BlogLobbySkills__main-title " +
                                        `${!itemSelected ?
                                            "BlogLobbySkills__main-title--unselected " : ""}`}>
                                        Skills
                                    </h1>
                                    <h2 className={"BlogLobbySkills__sub-title " +
                                        `${itemSelected ?
                                            "BlogLobbySkills__sub-title--selected " : ""}`}>
                                            {`- ${categories[categoryIndex]}`}
                                    </h2>
                                    <div className={
                                        "BlogLobbySkills__progress-bar-container " +
                                        `${itemSelected ?
                                        "BlogLobbySkills__progress-bar-container--selected " : ""}`}>
                                        <ProgressBar
                                            activated={progressBarActivated}
                                            percentage={percentage}
                                            onFinished={() => setProgressBarActivated(false)} />
                                    </div>
                                </div>
                                <ItemDisplay
                                    activated={itemDisplayActivated}
                                    itemSelected={itemSelected}
                                    selectedCategory={selectedCategory} />
                            </article>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogLobbySkills;