import React, { useState, useEffect } from 'react';

import Section from './Section';

import './CategoryList.scss';

const CategoryList = ({ link }) => {
    const [sections, setSections] = useState({});

    const getCategoryListObject = (dbResult) => {
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
    const getSections = () => {
        return new Promise((resolve, reject) => {
            fetch('/request/blog/read/categoryEditor')
                .then(function (response) {
                    return response.json();
                })
                .then(function (result) {
                    if (result.validity) {
                        let categoryListObject = getCategoryListObject(result.value);
                        resolve(categoryListObject);
                    }
                });
        })
    };

    useEffect(() => {
        const fetchSections = async () => {
            const sectionsObject = await getSections();
            setSections(sectionsObject);
        }
        fetchSections();
    }, [])

    return (
        <div className="CategoryList">
            <div className="CategoryList__sections">
                {Object.values(sections).map(section => {
                    return (<Section
                        key={section.id}
                        name={section.name}
                        categories={section.categories}
                        link={link}
                    ></Section>);
                })}
            </div>
        </div>
    );
}

export default CategoryList;

