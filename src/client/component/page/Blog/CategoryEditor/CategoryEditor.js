/* module */
import React from 'react';

const BlogCategoryEditor = () => {
    return (
        <div className="CategoryEditor">
            <div id="category-editor">
                <div id="controls">
                    <input id="add-section" type="button" value="Add Section" />
                    <input id="add-category" type="button" value="Add Category" />
                    <input id="remove" type="button" value="Remove" />
                    <input id="move-up" type="button" value="▲" />
                    <input id="move-down" type="button" value="▼" />
                </div>
                <div id="category-list"></div>
                <input id="apply" type="button" value="apply" />
            </div>
        </div>
    );
}

export default BlogCategoryEditor;