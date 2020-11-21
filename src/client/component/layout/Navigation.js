/* module */
import React from 'react';
import { useSelector } from 'react-redux';

/* component */
import UserMenu from 'component/common/UserMenu/UserMenu';
// import CategoryList from 'component/page/Blog/CategoryList/CategoryList';
import Construction from 'component/common/Construction';

const Navigation = () => {
    const navigationOn = useSelector(store => store.blog.navigationOn);

    return (
        <div className={"Navigation " +
            `${navigationOn ? "Navigation--on" : "Navigation--off"}`}>
            
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