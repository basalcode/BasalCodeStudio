/* module */
import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';

/* store */
import { navigation as navigationAction } from 'store/action/blog';

/* component */
import NavigationHeader from 'component/layout/Navigation/NavigationHeader/NavigationHeader';
import NavigationBody from 'component/layout/Navigation/NavigationBody/NavigationBody';
import NavigationFooter from 'component/layout/Navigation/NavigationFooter/NavigationFooter';

const Navigation = () => {
    /* store */
    const dispatch = useDispatch();
    const navigationOn = useSelector(store => store.blog.navigationOn);
    const nightModeOn = useSelector(store => store.app.nightModeOn);

    /* useEffect */
    useEffect(() => {
        /* unmount */
        return () => {
            dispatch(navigationAction(false));
        }  
    }, []);

    return (
        <div className={"Navigation " +
            `${navigationOn ? "Navigation--on" : "Navigation--off"} ` +
            `${nightModeOn ? "Navigation--night-mode-on" : ""}`}>
            <NavigationHeader />
            <NavigationBody />
            <NavigationFooter />
        </div>
    );
}

export default Navigation;