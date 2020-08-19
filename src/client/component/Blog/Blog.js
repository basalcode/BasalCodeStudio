import React, { Component } from 'react';
import './Blog.css'

import BlogLobby from './BlogLobby';

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="Blog">
                <BlogLobby></BlogLobby>
            </div>
        );
    }
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