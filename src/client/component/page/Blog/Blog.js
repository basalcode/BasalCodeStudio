/* module */
import React, { useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

/* component */
// route
import BlogLobby from 'component/page/Blog/Lobby/BlogLobby';
import Category from 'component/page/Blog/Category/Category';
import CategoryEditor from 'component/page/Blog/CategoryEditor/CategoryEditor';
import Post from 'component/page/Blog/Post/Post';
import PostEditor from 'component/page/Blog/PostEditor/PostEditor';

// layout
import Header from 'component/layout/Header/Header';
import Footer from 'component/layout/Footer';
import FloatingUIs from 'component/layout/FloatingUIs';

const Blog = () => {
    const [fadeInOn, setFadeInOn] = useState(false)

    const match = useRouteMatch();

    useEffect(() => {
        const interval = 1500;
        setTimeout(() => {
            setFadeInOn(true);
        }, interval)
    }, []);

    return (
        <div className="Blog">
            <Header fadeInOn={fadeInOn} />
            <main className="Blog__main">
                <Switch>
                    <Route path={`${match.path}/`} component={BlogLobby} />
                    <Route path={`${match.path}/category`} component={Category} />
                    <Route path={`${match.path}/category-editor`} component={CategoryEditor} />
                    <Route path={`${match.path}/post`} component={Post} />
                    <Route path={`${match.path}/post-editor`} component={PostEditor} />
                </Switch>
            </main>
            <Footer fadeInOn={fadeInOn} />
            <FloatingUIs fadeInOn={fadeInOn} />
        </div>
    );
}

export default Blog;