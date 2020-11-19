/* module */
import React, { useEffect } from 'react';

/* component */
import UserMenu from 'component/common/UserMenu/UserMenu';
// import CategoryList from 'component/page/Blog/CategoryList/CategoryList';
import Construction from 'component/common/Construction';

const Navigation = (props) => {
    /* props */
    const activated = props.activated;

    return (
        <div className={"Navigation " +
            `${activated ? "Navigation--on" : "Navigation--off"}`}>
            <div className="Navigation__header">
                <UserMenu />
            </div>
            <div className="Navigation__body">
                <Construction />

                {/* <CategoryList link={true} /> */}
            </div>
            <div className="Navigation__footer"></div>
        </div>
    );
}

export default Navigation;