import React, { useState, useEffect } from 'react';
import './CategoryList.css';

import Section from './Section';

function CategoryList() {
    const [sections, setSections] = useState({});

    const getSections = () => {
        return new Promise((resolve, reject) => {
            fetch('/request/blog/read/categoryEditor')
                .then(function (response) {
                    return response.json();
                })
                .then(function (parsed) {
                    console.log(parsed.result);
                    let dbResult = parsed.result;
                    let categoryListObject = getCategoryListObject(dbResult);
                    console.log(categoryListObject);

                    resolve(categoryListObject)
                })
        })
    };

    const renderSection = () => {
        return Object.values(sections).map(section => {
            console.log(JSON.stringify(section));
            return (<Section
                key={section.id}
                name={section.name}
                categories={section.categories}
            ></Section>);
        })
    }

    useEffect(() => {
        const fetchSections = async () => {
            const sectionsObject = await getSections();
            setSections(sectionsObject);
        }

        fetchSections();
    }, [])

    return (
        <div className="CategoryList">
            <div className="sections">
                {renderSection()}
            </div>
        </div>
    );
}

export default CategoryList;

function getCategoryListObject(dbResult) {
    let sections = {}
    dbResult.forEach(element => {
        let section = {
            id: element.section_id,
            name: element.section_name,
            categories: {}
        }

        // Prevent overwrite.
        if (sections[section.id] === undefined) {
            sections[section.id] = section;
        }

        let category = {
            id: element.category_id,
            name: element.category_name,
        }
        if (category.id !== null || category.name !== null) {
            sections[section.id].categories[category.id] = category;
        }
    });
    return sections;
}

/*
<div className="section">
                            <div className="section__self">
                                <div className="section__title"></div>
                            </div>
                            <div className="section__categories">
                                <div className="category"></div>
                                <div className="category__self">
                                    <div className="category__title"></div>
                                </div>
                            </div>
                        </div> */