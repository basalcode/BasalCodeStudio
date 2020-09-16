import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainLobby from 'page/MainLobby/MainLobby';
import Blog from 'page/Blog/Blog';
import Auth from 'page/Auth/Auth';
import NotFound from 'page/NotFound/NotFound';

const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route exact path='/' component={MainLobby} />
                <Route path='/blog' component={Blog}/>
                <Route path='/auth' component={Auth}/>
                <Route component={NotFound} />
            </Switch>
        </div>
    )
}

export default App;