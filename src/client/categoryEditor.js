window.onload = function () {
    console.log(`[Open] 'categoryEditor.js' has been opend.`);
    loadContents();
}

function loadContents() {
    console.log('loadContents() has been loaded.');

    const DefaultTitle = {
        SECTION: 'New Section',
        CATEGORY: 'New Category'
    }

    let defaultFocusedElement;
    let focusedElementObject;
    function createFocusedElementObject(initElement) {
        let element = initElement;
        element.style.backgroundColor = 'blue';
        return {
            get value() { return element; },
            set value([originalElement, newElement]) {
                originalElement.style.backgroundColor = '';
                element = newElement;
                element.style.backgroundColor = 'blue';
            }
        }
    }

    let isUpdated = false;

    document.body.style.border = '1px solid green';

    fetch('/readCategoryEditor')
        .then(function (response) {
            return response.json();
        })
        .then(function (parsed) {
            let contentArray = parsed.result;
            console.log('[contentArray]', contentArray);
            let contentsObject = initContent(contentArray);

            console.log('[contentsObject]', contentsObject);

            createCategoryEditorElements(contentsObject);

            let sectionsElement = document.querySelector('#sections');
            defaultFocusedElement = sectionsElement.firstChild.querySelector('.section__self');
            focusedElementObject = createFocusedElementObject(defaultFocusedElement);

            addSection();
            addCategory();
            removeContent();

            applyContent();
        });

    function initContent(contentArray) {
        let sections = {}
        contentArray.forEach(element => {
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

    function createCategoryEditorElements(contentsObject) {
        const DEFAULT_INDEX_KEY = '0';
        let sections = contentsObject;
        console.log(sections);
        let sectionsElement = document.createElement('div');
        for (let i in sections) {
            let section = sections[i];
            let sectionElement = createSectionElement(section);

            sectionsElement.appendChild(sectionElement);

            let categories = sections[i].categories;
            let categoriesElement = sectionElement.querySelector('.section__categories');

            for (let j in categories) {
                let category = categories[j];
                let categoryElement = createCategoryElement(category);

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

        let contentList = document.querySelector('#content-list');
        contentList.appendChild(sectionsElement);

        sectionsElement.id = 'sections';
    }

    function createSectionElement(sectionObject) {
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

        addElementTextModifyEvent(title);
        addFocusedContentEvent(self);

        return section;
    }

    function createCategoryElement(categoryObject) {
        let category = document.createElement('div');
        let self = document.createElement('div');
        let title = document.createElement('div');

        category.className = 'category';

        self.className = 'category__self';

        title.className = 'category__title';
        title.innerText = categoryObject.name;

        category.appendChild(self);
        self.appendChild(title);

        addElementTextModifyEvent(title);
        addFocusedContentEvent(self);

        return category;
    }

    function addSection() {
        console.log('addSection() has been loaded.');
        let addSectionButton = document.querySelector('#add-section');
        let lock = false;
        addSectionButton.addEventListener('click', function (event) {
            if (!lock) {
                lock = true;
                isUpdated = true;

                let section = document.createElement('div');
                let self = document.createElement('div');
                let title = document.createElement('div');
                let categories = document.createElement('div');

                section.className = 'section';

                self.className = 'section__self';

                title.className = 'section__title';
                title.innerText = DefaultTitle.SECTION;

                categories.className = 'section__categories';

                section.appendChild(self);
                self.appendChild(title)

                section.appendChild(categories);

                let target = focusedElementObject.value;

                if (target.className === 'section__self') {
                    target.parentNode.parentNode.insertBefore(section, target.parentNode.nextSibling);
                } else if (target.className === 'category__self') {
                    let sections = document.querySelector('#sections');
                    let targetParentSection = target.parentNode.parentNode.parentNode;

                    console.log('[target]', target);
                    console.log('[targetParentSection', targetParentSection);
                    sections.insertBefore(section, targetParentSection.nextSibling);
                } else {
                    let sections = document.querySelector('#sections');
                    sections.appendChild(section);
                }

                addElementTextModifyEvent(title);
                addFocusedContentEvent(self);

                lock = false;
            }
        });
    }

    function addCategory() {
        console.log('addCategory() has been loaded.');
        let addCategoryButton = document.querySelector('#add-category');
        let lock = false;
        addCategoryButton.addEventListener('click', function (event) {
            if (!lock) {
                lock = true;
                isUpdated = true;

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
                    let targetSection = target.parentNode;
                    let targetCategories = targetSection.querySelector('.section__categories');
                    targetCategories.appendChild(category);
                } else if (target.className === 'category__self') {
                    target.parentNode.insertBefore(category, target.nextSibling);
                } else {
                    let defaultCategories = document.querySelector('#default-categories');
                    defaultCategories.appendChild(category);
                }

                addElementTextModifyEvent(title);
                addFocusedContentEvent(self);

                lock = false;
            }
        });
    }

    function removeContent() {
        console.log('removeContent() has been loaded.');
        let removeButton = document.querySelector('#remove');
        let lock = false;
        removeButton.addEventListener('click', function (event) {
            if (!lock) {
                lock = true;
                isUpdated = true;

                let target = focusedElementObject.value.parentNode;
                let sections = document.querySelector('#sections');
                let defaultSection = document.querySelector('#default-section');
                let defaultCategory = document.querySelector('#default-category');

                if (target === defaultSection || target === defaultCategory) {
                    alert(`Can\'t remove default content.`);
                } else {
                    if (target.className === 'section') {
                        let targetSection = target;
                        let targetCategories = targetSection.querySelector('.section__categories');

                        let defaultCategories = document.querySelector('#default-categories');

                        while (targetCategories.hasChildNodes()) {
                            let targetCategory = targetCategories.querySelector('.category');
                            defaultCategories.appendChild(targetCategory);
                        }

                        sections.removeChild(targetSection);
                    } else {
                        // It needs to implement post moving features in near future.
                        let targetCategories = target.parentNode;
                        targetCategories.removeChild(target);
                    }
                    let originalElement = focusedElementObject.value;
                    focusedElementObject.value = [originalElement, defaultFocusedElement];
                }
                lock = false;
            }
        });
    }

    function applyContent() {
        console.log('applyContent() has been loaded.');
        let applyButton = document.querySelector('#apply');
        let lock = false;
        applyButton.addEventListener('click', function (event) {
            let updateConfirm = confirm('Sure you want to update?');
            if (!lock && updateConfirm) {
                lock = true;
                if (isUpdated) {
                    let sections = document.querySelector('#sections');
                    let sectionsLength = sections.childElementCount;

                    let cloneSections = {};
                    for (let i = 0; i < sectionsLength; i++) {
                        let section = sections.childNodes[i];
                        let sectionTitle = section.querySelector('.section__title').innerText;

                        cloneSections[i] = {};
                        cloneSections[i].name = sectionTitle;
                        cloneSections[i].categories = {};

                        let categories = section.querySelector('.section__categories');
                        let categoriesLength = categories.childElementCount;

                        for (let j = 0; j < categoriesLength; j++) {
                            let category = categories.childNodes[j];
                            let categoryTitle = category.querySelector('.category__title').innerText;

                            cloneSections[i].categories[j] = {};
                            cloneSections[i].categories[j].name = categoryTitle;
                        }
                    }

                    fetch(`/updateCategoryEditor`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            categoryEditor: cloneSections
                        })
                    })
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (parsed) {
                            console.log('[From Server]', parsed);
                            alert('Successfully updated!');
                            isUpdated = false;
                            lock = false;
                        })
                } else {
                    alert('There is no change.');
                    lock = false;
                }
            }
        });
    }

    function addElementTextModifyEvent(element) {
        let doubleClickLock = false;
        element.addEventListener('dblclick', function (event) {
            let currentTarget = event.target;
            if (!doubleClickLock) {
                doubleClickLock = true;

                let parentElement = currentTarget.parentNode;

                let originalNameField = currentTarget;
                let newNameField = document.createElement('input');
                newNameField.type = 'text';

                let titleText = originalNameField.innerText;
                let defaultTitle;
                if (originalNameField.className === 'section__title') {
                    defaultTitle = DefaultTitle.SECTION;
                } else {
                    defaultTitle = DefaultTitle.CATEGORY;
                }

                if (titleText !== defaultTitle) {
                    newNameField.value = titleText;
                }
                parentElement.replaceChild(newNameField, originalNameField);

                event.stopPropagation();
                newNameField.focus();
                let isFocused = true;

                newNameField.addEventListener('keydown', function (event) {
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

                newNameField.addEventListener('blur', function (event) {
                    if (isFocused) {
                        renameCategory(true);
                    }
                });

                function renameCategory(apply) {
                    if (apply) {
                        let changedText = newNameField.value;
                        if (changedText.length === 0) {
                            changedText = defaultTitle;
                        }
                        originalNameField.innerText = changedText;
                    }
                    isFocused = false;
                    parentElement.replaceChild(originalNameField, newNameField);
                    doubleClickLock = false;
                }
            }
        });
    }

    function addFocusedContentEvent(element) {
        element.addEventListener('click', function (event) {
            let currentTarget = event.currentTarget;
            if (focusedElementObject.value !== currentTarget) {
                let originalElement = focusedElementObject.value;
                focusedElementObject.value = [originalElement, currentTarget];
                console.log('focused Changed', focusedElementObject.value);
            }
        })
    }
}