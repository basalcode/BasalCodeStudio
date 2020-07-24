export default (async function () {
    function init() {
        return fetch('/readCategoryEditor')
            .then(function (response) {
                return response.json();
            })
            .then(function (parsed) {
                console.log(1);
                let dbResult = parsed.result;
                let categoryListObject = getCategoryListObject(dbResult);

                let root = getCategoryListElement(categoryListObject);

                let defaultElement = {
                    section: root.querySelector('#default-section'),
                    categories: root.querySelector('#default-categories'),
                    category: root.querySelector('#default-category')
                }

                let elements = {
                    section: root.querySelectorAll('.section'),
                    sectionSelf: root.querySelectorAll('.section__self'),
                    sectionTitle: root.querySelectorAll('.section__title'),
                    categories: root.querySelectorAll('.section__categories'),
                    category: root.querySelectorAll('.category'),
                    categorySelf: root.querySelectorAll('.category__self'),
                    categoryTitle: root.querySelectorAll('.category__title')
                }
                return {
                    root: root,
                    defaultElement: defaultElement,
                    elements: elements
                }
            });
    }

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

    function getCategoryListElement(categoryListObject) {
        const DEFAULT_INDEX_KEY = '0';
        let sections = categoryListObject;
        let sectionsElement = document.createElement('div');
        sectionsElement.id = 'sections';
        for (let i in sections) {
            let section = sections[i];
            let sectionElement = (function getSectionElement(sectionObject) {
                let section = document.createElement('div');
                let self = document.createElement('div');
                let title = document.createElement('div');
                let categories = document.createElement('div');

                section.className = 'section';

                self.className = 'section__self';

                title.className = 'section__title';
                title.innerText = sectionObject.name;

                categories.className = 'section__categories';

                section.appendChild(self);
                self.appendChild(title);

                section.appendChild(categories);

                return section;
            })(section);

            sectionsElement.appendChild(sectionElement);

            let categories = sections[i].categories;
            let categoriesElement = sectionElement.querySelector('.section__categories');

            for (let j in categories) {
                let category = categories[j];
                let categoryElement = (function getCategoryElement(categoryObject) {
                    let category = document.createElement('div');
                    let self = document.createElement('div');
                    let title = document.createElement('div');

                    category.className = 'category';

                    self.className = 'category__self';

                    title.className = 'category__title';
                    title.innerText = categoryObject.name;

                    category.appendChild(self);
                    self.appendChild(title);

                    return category;
                })(category);

                categoriesElement.appendChild(categoryElement);
            }

            if (i === DEFAULT_INDEX_KEY) {
                let defaultSectionElement = sectionElement;
                let defaultCategoriesElement = defaultSectionElement.querySelector('.section__categories');
                let defaultCategoryElement = defaultCategoriesElement.firstChild;

                sectionElement.id = 'default-section';
                defaultCategoriesElement.id = 'default-categories';
                defaultCategoryElement.id = 'default-category';
            }
        }

        return sectionsElement;
    }

    return await init();
})();