/* module */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* component */
import MainLobby from 'component/page/MainLobby/MainLobby';
import Blog from 'component/page/Blog/Blog';
import Auth from 'component/page/Auth/Auth';
import NotFound from 'component/page/NotFound/NotFound';

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