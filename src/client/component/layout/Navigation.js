/* module */
import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';

/* store */
import { navigation as navigationAction } from 'store/action/blog';

/* component */
import UserMenu from 'component/common/UserMenu/UserMenu';
// import CategoryList from 'component/page/Blog/CategoryList/CategoryList';
import Construction from 'component/common/Construction';

const Navigation = () => {
    /* store */
    const dispatch = useDispatch();
    const navigationOn = useSelector(store => store.blog.navigationOn);

    /* useEffect */
    useEffect(() => {

        /* unmount */
        return () => {
            dispatch(navigationAction(false));
        }  
    }, []);

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