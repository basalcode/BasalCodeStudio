import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from 'component/common/Header';
import FloatButtons from 'component/common/ui/FloatButtons/FloatButtons';
import BlogLobby from './BlogLobby/BlogLobby';
import BlogCategory from './BlogCategory';
import Footer from 'component/common/Footer';

import './Blog.scss'

const Blog = ({ match }) => {
    return (
        <div className="Blog">
            <Switch>
                <Route path={`${match.path}/lobby`} component={BlogLobby} />
                <Route path={`${match.path}/category`} component={BlogCategory} />
            </Switch>
            <Header></Header>
            <FloatButtons></FloatButtons>
            <Footer></Footer>
        </div>
    );
}

export default Blog;