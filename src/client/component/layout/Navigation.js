/* module */
import React, { useState } from 'react';

/* component */
import UserMenu from 'component/common/UserMenu/UserMenu';
import CategoryList from 'component/Blog/CategoryList/CategoryList';

const Navigation = () => {
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
            <div className={containerToggle}>
                <div className="Navigation__container--header">
                    <UserMenu></UserMenu>
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