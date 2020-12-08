/* module */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* component */
import Login from './Login';
import Signup from './Signup';

const Auth = ({ match }) => {
    return (
        <div className="Auth">
            <Switch>
                <Route path={`${match.path}/login`} component={Login} />
                <Route path={`${match.path}/signup`} component={Signup} />
            </Switch>
        </div>
    );
}

export default Auth;