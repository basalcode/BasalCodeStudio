/* module */
import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

/* lib */
import scrollPage from 'lib/scroll/scrollPage'

/* store */
import { lobbyPage as lobbyPageAction } from 'store/action/blog';

/* component */
import Prologue from 'component/page/Prologue/Prologue';
import Blog from 'component/page/Blog/Blog';
import Auth from 'component/page/Auth/Auth';
import NotFound from 'component/page/NotFound/NotFound';

const App = () => {
    /* router */
    const history = useHistory();
    
    /* Ref */
    const appRef = useRef(null);

    /* store */
    const dispatch = useDispatch();
    const pageIndex = useSelector(store => store.blog.index, []);
    const nightModeOn = useSelector(store => store.app.nightModeOn);

    /* state */
    const [scrollAvailable, setScrollAvailable] = useState(false);

    const [size, setSize] = useState({
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth
    });

    /* useEffect */
    // prevent scroll on specific route
    useEffect(() => {
        if (history.location.pathname === '/') {
            setScrollAvailable(false);
        } else {
            setScrollAvailable(true);
        }

        /* on route change */
        return history.listen((location) => {
            scrollPage.historyUpdate(appRef.current);

            if (location.pathname === '/') {
                setScrollAvailable(false);
            } else {
                setScrollAvailable(true);
            }
        })
    }, [history]);

    // set page scroll in height unit
    useEffect(() => {
        scrollPage.addEvent(
            appRef.current, 
            {
                scrollStart: (pageIndex, scrollLock) => {
                    dispatch(lobbyPageAction(scrollPage, pageIndex, scrollLock));
                },
                scrollFinish: (pageIndex, scrollLock) => {
                    dispatch(lobbyPageAction(scrollPage, pageIndex, scrollLock));
                }
            }
        );
        
        dispatch(lobbyPageAction(scrollPage, 0, false));
    }, []);

    // auto fcous on App
    useEffect(() => {
        appRef.current.focus();
    }, []);

    // viewport size change
    useEffect(() => {
        window.addEventListener('resize', event => {
            scrollPage.moveScroll(pageIndex);
        });
    });

    return (
        <section className={
            `App ` +
            `${scrollAvailable ?
                'App__scroll--on ' :
                'App__scroll--off '}` +
            `${nightModeOn ? 'App--night-mode ' : ' '}`}
            ref={appRef}
            >
            <Switch>
                <Route exact path='/' component={Prologue} />
                <Route path='/blog' component={Blog} />
                <Route path='/auth' component={Auth} />
                <Route component={NotFound} />
            </Switch>
        </section>
    )
}

export default App;