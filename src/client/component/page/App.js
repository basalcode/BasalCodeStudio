/* module */
import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

/* component */
import Prologue from 'component/page/Prologue/Prologue';
import Blog from 'component/page/Blog/Blog';
import Auth from 'component/page/Auth/Auth';
import NotFound from 'component/page/NotFound/NotFound';

const App = () => {
    const history = useHistory();

    const [doesScrollOn, setDoesScrollOn] = useState(false);

    useEffect(() => {
        return history.listen((location) => {
            location.pathname === '/' ?
            setDoesScrollOn(false) :
            setDoesScrollOn(true);
        })
    }, [history]);

    return (
        <div className={`App ${doesScrollOn ?
            'App__scroll--on' :
            'App__scroll--off'
        }`}>
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