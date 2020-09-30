/* module */
import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/* component */
import Prologue from 'component/page/Prologue/Prologue';
import Blog from 'component/page/Blog/Blog';
import Auth from 'component/page/Auth/Auth';
import NotFound from 'component/page/NotFound/NotFound';

/* lib */
import scrollPage from 'lib/scroll/scrollPage'

/* store */
import { page as pageAction } from 'store/action/blog';

const App = () => {
    /* router */
    const history = useHistory();
    
    /* Ref */
    const appRef = useRef(null);

    /* store */
    const dispatch = useDispatch();

    /* state */
    const [scrollAvailable, setScrollAvailable] = useState(true);

    /* useEffect */
    // prevent scroll on specific route
    useEffect(() => {
        history.location.pathname === '/' ?
            setScrollAvailable(false) :
            setScrollAvailable(true);
        return history.listen((location) => {
            location.pathname === '/' ?
                setScrollAvailable(false) :
                setScrollAvailable(true);
        })
    }, [history]);

    // set scroll in page height unit
    useEffect(() => {
        scrollPage.addEvent(appRef.current, {
            wheel: (pageIndex, destination) => {
                dispatch(pageAction(pageIndex));
            }
        });
    }, [])

    return (
        <section className={`App ${scrollAvailable ?
            'App__scroll--on' :
            'App__scroll--off'
            }`}
            ref={appRef}>
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