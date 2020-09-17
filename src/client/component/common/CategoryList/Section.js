/* module */
import React from 'react';

/* component */
import Category from './Category';

const Section = ({ name, categories, link }) => {

    return (
        <div className="Section">
            <div className="Section__self">
                <div className="Section__self-title">{name}</div>
            </div>
            <div className="Section__categories"> {
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