/* module */
import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

/* component */
import Prologue from 'component/page/Prologue/Prologue';
import Blog from 'component/page/Blog/Blog';
import Auth from 'component/page/Auth/Auth';
import NotFound from 'component/page/NotFound/NotFound';

/* lib */
import scrollPage from 'lib/scroll/scrollPage'

const App = () => {
    const appRef = useRef(null);
    const history = useHistory();

    const [scrollAvailable, setScrollAvailable] = useState(true);

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

    
    useEffect(() => {
        scrollPage.addEvent(appRef.current);
    }, [])


    return (
        <div className={`App ${scrollAvailable ?
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
        </div>
    )
}

export default App;