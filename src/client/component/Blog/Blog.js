import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './Blog.css'

import BlogLobby from './BlogLobby';

function Blog({match}) {
    return (
        <div className="Blog">
            <Switch>
                <Route path={`${match.path}/main`} component={BlogLobby}></Route>
            </Switch>
        </div>
    );
}

export default Blog;


/* <input></input>
<a></a>
<a></a>
<div></div>


<input id="write-post" type="button" value="Write Post" />
<a id="category-editor" href="/source/blog/categoryEditor.html">Category Editor</a>
<a id="log-in" href="/source/auth/login.html">Log In</a>
<div id="category-list"></div>
<script type="module" src="/source/blog/blogMain.js"></script> */