import React from 'react';

import Category from './Category';

const Section = ({ name, categories, link }) => {

    return (
        <div className="section">
            <div className="section__self">
                <div className="section__title">{name}</div>
            </div>
            <div className="section__categories"> {
                Object.values(categories).map(category => (
                    <Category
                        key={category.id}
                        id={category.id}
                        name={category.name}
                        link={link}
                    ></Category>
                ))}
            </div>
        </div>
    )
}

export default Section;