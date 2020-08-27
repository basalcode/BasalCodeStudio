import React, { useEffect, useState } from 'react';
import './Section.css';

import Category from './Category';

function Section({ name, categories, link}) {
    
    const renderCategory = () => {
        return Object.values(categories).map(category => (
            <Category
                key={category.id}
                name={category.name}
                link={link}
            ></Category>
        ));
    }

    return (
        <div className="section">
            <div className="section__self">
                <div className="section__title">{name}</div>
            </div>
            <div className="section__categories">
                {renderCategory()}
            </div>
        </div>
    )
}

export default Section;