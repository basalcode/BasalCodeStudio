import React, { Component } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className="Blog">
                <Header></Header>
                <div className="Blog__main-image">Image</div>
                <div className="Blog__category-list"></div>
                <div className="Blog__content-board">
                    <div className="Blog__lastest-posts">Latest Posts</div>
                    <div className="Blog__introduction">Introduction</div>
                    <div className="Blog__post-list">PostList</div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default Blog;


{/* <input></input>
<a></a>
<a></a>
<div></div>


<input id="write-post" type="button" value="Write Post" />
<a id="category-editor" href="/source/blog/categoryEditor.html">Category Editor</a>
<a id="log-in" href="/source/auth/login.html">Log In</a>
<div id="category-list"></div>
<script type="module" src="/source/blog/blogMain.js"></script> */}