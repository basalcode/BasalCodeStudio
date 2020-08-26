import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './Blog.css'

import BlogLobby from './BlogLobby';

function Blog({match}) {
    return (
        <div className="Blog">
            <Switch>
                <Route path={`${match.path}/lobby`} component={BlogLobby}></Route>
            </Switch>
        </div>
    );
}

export default Blog;