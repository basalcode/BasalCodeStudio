import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Login/Login';
import Signup from './Signup/Signup';

import './Auth.css';

const Auth = ({ match }) => {
    
    return (
        <div className="App">
            <Switch>
                <Route path={`${match.path}/login`} component={Login} />
                <Route path={`${match.path}/signup`} component={Signup} />
            </Switch>
        </div>
    );
}

export default Auth;