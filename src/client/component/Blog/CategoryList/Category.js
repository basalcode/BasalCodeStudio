import React from 'react';
import { Link } from 'react-router-dom';

import './Category.scss';

const Category = ({ id, name, link }) => {
    return (
        <div className="Category">
            <div className="Category__self">
                <div className="Category__self-title">{
                    link ? 
                    <Link to={`/blog/category/${id}`}>{name}</Link> :
                    name
                }</div>
            </div>
        </div>
    )
}

export default Category;