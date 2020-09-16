import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from 'component/layout/blog/Header';
import Lobby from 'page/Blog/Lobby/Lobby';
import Category from 'page/Blog/Category/Category';
import Footer from 'component/layout/blog/Footer';
import FloatButtons from '';

const Blog = ({ match }) => {
    return (
        <div className="Blog">
            <div className="Blog__body">
                <Switch>
                    <Route path={`${match.path}/lobby`} component={Lobby} />
                    <Route path={`${match.path}/category`} component={Category} />
                    <Route path={`${match.path}/category-editor`} component={CategoryEditor} />
                    <Route path={`${match.path}/post`} component={PostEditor} />
                    <Route path={`${match.path}/post-editor`} component={PostEditor} />
                </Switch>
            </div>
        </div>
    );
}

export default Blog;