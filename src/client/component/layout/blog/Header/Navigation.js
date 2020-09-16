import React, { useState } from 'react';

import NavigationButton from './NavigationButton';
import Auth from './Auth/Auth';
import CategoryList from 'component/Blog/CategoryList/CategoryList';

import './Navigation.scss';

function Navigation() {
    const [containerToggle, setContainerToggle] = useState("Navigation__container--off");
    const [clicked, setClicked] = useState(false);

    const onClickHandler = () => {
        if (clicked) {
            setContainerToggle("Navigation__container--off");

            setClicked(false);
        } else {
            setContainerToggle("Navigation__container--on");

            setClicked(true);
        }
        console.log('clicked', clicked);
    }
    console.log('containerToggle', containerToggle)

    return (
        <div className="Navigation">
            <div className="Navigation__button-container">
                <div className="Navigation__button" onClick={onClickHandler}>
                    <NavigationButton clicked={clicked}></NavigationButton>
                </div>
            </div>
            <div className={containerToggle}>
                <div className="Navigation__container--header">
                    <Auth></Auth>
                </div>
                <div className="Navigation__container--body">
                    <CategoryList link={true}></CategoryList>
                </div>
                <div className="Navigation__container--footer"></div>
            </div>
        </div>
    );
}

export default Navigation;