window.onload = function () {
    console.log(`[Open] 'categoryEditor.js' has been opend.`);

    loadContents();
}

function loadContents() {
    console.log('loadContents() has been loaded.');

    let elementObject = {
        editor: document.querySelector('#category-editor'),

        controls: document.querySelector('#controls'),
        addCategoryButton: document.querySelector('#add-category'),
        addSectionButton: document.querySelector('#add-section'),
        removeButton: document.querySelector('#remove'),
        applyButton: document.querySelector('#apply'),

        categoryList: document.querySelector('#category-list')
    }

    const DefaultTitle = {
        SECTION: 'Default Section',
        CATEGORY: 'Default Category'
    }

    let focusedElementObject;
    function createFocusedElementObject(initElement) {
        let element = initElement;
        return {
            get value() { return element; },
            set value(newElement) { element = newElement; }
        }
    }
    document.body.style.border = '1px solid green';

    fetch('/readCategoryEditor')
        .then(function (response) {
            return response.json();
        })
        .then(function (parsed) {
            let contentArray = parsed.result;
            let contentsObject = initContent(contentArray);

            console.log(contentArray);
            console.log(contentsObject);

            createCategoryEditorElements(contentsObject);

            let sectionsElement = document.querySelector('#sections');
            let defaultSectionElement = sectionsElement.firstChild;

            focusedElementObject = createFocusedElementObject(defaultSectionElement);
            // console.log(focusedElementObject);

            /* css */
            addSection();
            addCategory();
            removeContent();

            applyContent();
        });


    function addSection() {
        console.log('addSection() has been loaded.');

        let addSectionButton = document.querySelector('#add-section');

        addSectionButton.addEventListener('click', function (event) {
            let section = document.createElement('div');
            let self = document.createElement('div');
            let title = document.createElement('div');
            let categories = document.createElement('div');

            section.className = 'section';

            self.className = 'section__self';

            title.className = 'section__title';
            title.innerText = DefaultTitle.SECTION;

            section.appendChild(self);
            self.appendChild(title)

            section.appendChild(categories);

            let target = focusedElementObject.value;
            console.log('target', target);

            if (target.className === 'section__self') {
                target.parentNode.parentNode.insertBefore(section, target.parentNode.nextSibling);
            } else if (target.className === 'category__self') {
                target.parentNode.parentNode.insertBefore(section, target.parentNode.nextSibling);
            } else {
                let sections = document.querySelector('#sections');
                sections.appendChild(section);
            }

            addModifyElementTextEvent(title);
            addFocusedContentEvent(self);
        });
    }

    function addCategory() {
        console.log('addCategory() has been loaded.');

        let addCategoryButton = document.querySelector('#add-category');

        addCategoryButton.addEventListener('click', function (event) {
            let category = document.createElement('div');
            let self = document.createElement('div');
            let title = document.createElement('div');

            category.className = 'category';

            self.className = 'category__self';

            title.className = 'category__title';
            title.innerText = DefaultTitle.CATEGORY;

            category.appendChild(self);
            self.appendChild(title);

            let target = focusedElementObject.value;

            if (target.className === 'section__self') {
                target.appendChild(category);
            } else if (target.className === 'category__self') {
                target.parentNode.insertBefore(category, target.nextSibling);
            } else {
                let sections = document.querySelector('#sections');
                let defaultSection = sections.firstChild;
                defaultSection.appendChild(category);
            }

            addModifyElementTextEvent(title);
            addFocusedContentEvent(self);
        });
    }

    function removeContent() {
        console.log('removeContent() has been loaded.');
        let removeButton = document.querySelector('#remove');
        let lock = false;
        removeButton.addEventListener('click', function (event) {
            if (!lock) {
                lock = true;

                let targetElement = focusedElement;
                if (targetElement.className === 'section') {
                    let childCategories = targetElement.childNodes;
                    let listBody = document.querySelector('#list-body');
                    let defaultCategories = document.querySelector('#null-categories');

                    console.log(defaultCategories);
                    childCategories.forEach(element => {
                        defaultCategories.appendChild(element);
                    });

                    listBody.removeChild(targetElement);
                } else if (targetElement.className === 'category') {
                    // It needs to implement post moving features in near future.
                    targetElement.parentNode.removeChild(targetElement);
                }

                lock = false;
            }
        });
    }

    function applyContent() {
        let applyButton = document.querySelector('#apply');
        applyButton.addEventListener('click', function (event) {

        })
    }

    function initContent(contentArray) {
        let sections = {}
        contentArray.forEach(element => {
            appendSection(element);
        });

        function appendSection(element) {
            let id = element.section_id;
            let name = element.section_name;
            let order = element.section_order;
            if (order === null) {
                order = 0;
            }

            let sectionObject = {
                id: id,
                name: name,
                order: order,
                categories: {}
            }

            if (sections[order] === undefined) {
                sections[order] = sectionObject;
            }
            appendCategory(sections[order], element);
        }

        function appendCategory(target, element) {
            let id = element.category_id;
            let name = element.category_name;
            let order = element.category_order;

            let categoryObject = {
                id: id,
                name: name,
                order: order
            }
            if (target.categories[order] === undefined) {
                target.categories[order] = categoryObject;
            }
        }
        return sections;
    }

    function createCategoryEditorElements(contentsObject) {
        let categoryList = document.querySelector('#category-list');

        let sectionsObject = contentsObject;
        let sectionsElement = document.createElement('div');
        for (let i in sectionsObject) {
            let sectionObject = sectionsObject[i];
            let sectionElement = createSectionElement(sectionObject);

            sectionsElement.appendChild(sectionElement);

            let categoriesObject = sectionsObject[i].categories;
            let categoriesElement = document.createElement('div');

            sectionElement.appendChild(categoriesElement);
            for (let j in categoriesObject) {
                let categoryObject = categoriesObject[j];
                let categoryElement = createCategoryElement(categoryObject);

                categoriesElement.appendChild(categoryElement);
            }
        }
        categoryList.appendChild(sectionsElement);

        sectionsElement.id = 'sections';
        //sectionsElement.className = 'categories'

        /* sectionsElement.style.backgroundColor = 'yellow';
        document.querySelectorAll('.section__title').forEach((element) => {
            element.style.width = '200px';
            element.style.border = '1px solid gray';
        })
        document.querySelectorAll('.category__title').forEach((element) => {
            element.style.width = '200px';
            element.style.border = '1px solid red';
        })
        document.querySelectorAll('.content__self').forEach(element => {
            element.style.backgroundColor = 'blue';
        });

        document.querySelectorAll('.category__self').forEach(element => {
            element.style.backgroundColor = 'green';
        }); */
    }

    function createSectionElement(sectionObject) {
        let section = document.createElement('div');

        let self = document.createElement('div');
        let title = document.createElement('div');

        let categories = document.createElement('div');

        section.className = 'section';

        self.className = 'section__self';

        title.innerText = sectionObject.name;
        title.className = 'section__title';

        section.appendChild(self);
        self.appendChild(title);

        section.appendChild(categories);

        addModifyElementTextEvent(title);
        addFocusedContentEvent(self);

        return section;
    }

    function createCategoryElement(categoryObject) {
        let category = document.createElement('div');
        let self = document.createElement('div');
        let title = document.createElement('div');

        category.className = 'category';

        self.className = 'category__self';

        title.innerText = categoryObject.name;
        title.className = 'category__title';

        category.appendChild(self);
        self.appendChild(title);

        addModifyElementTextEvent(title);
        addFocusedContentEvent(self);

        return category;
    }

    function addModifyElementTextEvent(element) {
        let doubleClickLock = false;

        element.addEventListener('dblclick', function (event) {
            let currentTarget = event.target;
            if (!doubleClickLock) {
                doubleClickLock = true;

                let parentElement = currentTarget.parentNode;

                console.log('parentElement', parentElement);
                console.log('currentTarget', currentTarget);
                let originalNameField = currentTarget;
                let modifiedNameField = document.createElement('input');
                modifiedNameField.type = 'text';

                let titleText = originalNameField.innerText;
                let defaultTitle;
                if (originalNameField.className === 'section__title') {
                    defaultTitle = DefaultTitle.SECTION;
                } else {
                    defaultTitle = DefaultTitle.CATEGORY;
                }

                if (titleText !== defaultTitle) {
                    modifiedNameField.value = titleText;
                }
                parentElement.replaceChild(modifiedNameField, originalNameField);

                event.stopPropagation();
                modifiedNameField.focus();
                let isFocused = true;

                modifiedNameField.addEventListener('keydown', function (event) {
                    if (isFocused) {
                        const ApprovalKeys = {
                            ENTER: 'Enter',
                            NUMPAD_ENTER: 'NumpadEnter'
                        };
                        const CanselKey = {
                            ESC: 'Escape'
                        };

                        for (let key in ApprovalKeys) {
                            if (event.code === ApprovalKeys[key]) {
                                renameCategory(true);
                                return;
                            }
                        }
                        for (let key in CanselKey) {
                            if (event.code === CanselKey[key]) {
                                renameCategory(false);
                                return;
                            }
                        }
                    }
                });

                modifiedNameField.addEventListener('blur', function (event) {
                    if (isFocused) {
                        renameCategory(true);
                    }
                });

                function renameCategory(apply) {
                    if (apply) {
                        let changedText = modifiedNameField.value;
                        if (changedText.length === 0) {
                            changedText = defaultTitle;
                        }
                        originalNameField.innerText = changedText;
                    }
                    isFocused = false;
                    parentElement.replaceChild(originalNameField, modifiedNameField);
                    doubleClickLock = false;
                }
            }
        })
    }

    function addFocusedContentEvent(element) {
        element.addEventListener('click', function (event) {
            let currentTarget = event.currentTarget;
            if (focusedElementObject.value !== currentTarget) {
                focusedElementObject.value = currentTarget;
                console.log('focused Changed', focusedElementObject.value);
            }
        })
    }

}