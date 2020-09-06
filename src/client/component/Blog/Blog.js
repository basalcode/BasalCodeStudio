import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './Blog.css'

import BlogLobby from './BlogLobby';
import BlogCategory from './BlogCategory';

const Blog = ({ match }) => {
    return (
        <div className="Blog">
            <Switch>
                <Route path={`${match.path}/lobby`} component={BlogLobby} />
                <Route path={`${match.path}/category`} component={BlogCategory} />
            </Switch>
        </div>
    );
}

export default Blog;