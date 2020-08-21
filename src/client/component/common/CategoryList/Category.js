import React, { useEffect, useState } from 'react';
import './Category.css';

function Category({name}) {
    return (
        <div className="category">
            <div className="category__self">
                <div className="category__title">{name}</div>
            </div>
        </div>
    )
}

export default Category;