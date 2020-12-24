/* module */
import React, { useState, useEffect, useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

/* store */
import { appElement as appElementAction } from 'store/action/app';

/* component */ 
import Prologue from 'component/page/Prologue/Prologue';
import Blog from 'component/page/Blog/Blog';
import Auth from 'component/page/Auth/Auth';
import Career from 'component/page/Career/Career';
import NotFound from 'component/page/NotFound/NotFound';

import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const App = () => {
    /* Ref */
    const appRef = useRef(null);

    /* store */
    const dispatch = useDispatch();
    const nightModeOn = useSelector(store => store.app.nightModeOn);
    // const auth = useSelector(store => store.auth.)

    // /* state */
    const [scrollAvailable, setScrollAvailable] = useState(true);

    /* useEffect */
    // auto fcous on App
    useEffect(() => {
        appRef.current.focus();

        dispatch(appElementAction(appRef.current));
    }, []);

    // check authentication
    useEffect(() => {

    }, []);

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
                <Route path='/career' component={Career} />
                <Route component={NotFound} />
            </Switch>
        </section>
    )
}

export default App;