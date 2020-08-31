import React from 'react';
import { Link } from 'react-router-dom';

import './Category.css';

function Category({ id, name, link }) {

    return (
        <div className="category">
            <div className="category__self">
                <div className="category__title">{
                    link ? 
                    <Link to={`/blog/category/${id}`}>{name}</Link> :
                    name
                }</div>
            </div>
        </div>
    )
}

export default Category;