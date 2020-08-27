import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Category.css';

function Category({ name, link }) {
    const linkedTitle = (link) => {
        if (link) {
            return (<Link to={`/category/${name}`}>{name}</Link>);
        } else {
            return name;
        }
    }

    return (
        <div className="category">
            <div className="category__self">
                <div className="category__title">{linkedTitle(link)}</div>
            </div>
        </div>
    )
}

export default Category;