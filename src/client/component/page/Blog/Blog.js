/* module */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* component */
// route
import Lobby from 'component/page/Blog/Lobby/Lobby';
import Category from 'component/page/Blog/Category/Category';
import CategoryEditor from 'component/page/Blog/CategoryEditor/CategoryEditor';
import Post from 'component/page/Blog/Post/Post';
import PostEditor from 'component/page/Blog/PostEditor/PostEditor';

// layout
import Header from 'component/layout/Header/Header';
import Footer from 'component/layout/Footer';
import FloatingUI from 'component/layout/FloatingUI';

const Blog = ({ match }) => {
    return (
        <div className="Blog">
            <Header />
            <main className="Blog__main">
                <Switch>
                    <Route path={`${match.path}/`} component={Lobby} />
                    <Route path={`${match.path}/category`} component={Category} />
                    <Route path={`${match.path}/category-editor`} component={CategoryEditor} />
                    <Route path={`${match.path}/post`} component={Post} />
                    <Route path={`${match.path}/post-editor`} component={PostEditor} />
                </Switch>
            </main>
            <Footer />
            <FloatingUI />
        </div>
    );
}

export default Blog;