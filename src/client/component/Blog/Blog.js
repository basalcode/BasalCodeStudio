import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './Blog.css'

import BlogLobby from './BlogLobby';
import Category from './Category';

const Blog = ({ match }) => {
    return (
        <div className="Blog">
            <Switch>
                <Route path={`${match.path}/lobby`} component={BlogLobby} />
                <Route path={`${match.path}/category`} component={Category} />
            </Switch>
        </div>
    );
}

export default Blog;