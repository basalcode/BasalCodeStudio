const DefaultTitle = {
    SECTION: 'Default Section',
    CATEGORY: 'Default Category'
}

let focusedElement = null;

window.onload = function () {
    console.log(`[Open] 'categoryEditor.js' has been opend.`);

    let elementObject = {
        editor: document.querySelector('#category-editor'),

        controls: document.querySelector('#controls'),
        addCategoryButton: document.querySelector('#add-category'),
        addSectionButton: document.querySelector('#add-section'),
        removeButton: document.querySelector('#remove'),
        applyButton: document.querySelector('#apply'),

        categoryList: document.querySelector('#category-list'),
        listHeader: document.querySelector('#list-header'),
        listBody: document.querySelector('#list-body')
    }

    loadContents();

    addSection(elementObject.addSectionButton);
    addCategory(elementObject.addCategoryButton);
    
    removeContent(elementObject);

    elementObject.applyButton.addEventListener('click', function (event) {
        applyContent(elementObject);
    })
}

function loadContents() {
    console.log('loadContents() has been loaded.');

    fetch('/readCategoryEditor')
        .then(function (response) {
            return response.json();
        })
        .then(function (parsed) {
            let contentArray = parsed.result;

            function initContent(contentArray) {
                let sections = {}
                contentArray.forEach(element => {
                    appendSection(element);
                });
                function appendSection(element) {
                    let id = element.section_id;
                    let name = element.section_name;
                    let order = element.section_order;
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

            let contentsObject = initContent(contentArray);
            showContents(contentsObject);
        });
}

function addSection() {
    console.log('addSection() has been loaded.');
    let listBody = document.querySelector('#list-body');
    let addSectionButton = document.querySelector('#add-section');

    addSectionButton.addEventListener('click', function (event) {
        let newSectionObject = {
            section: document.createElement('div'),
            title: document.createElement('div'),
            categories: document.createElement('div')
        }
        newSectionObject.title.className = 'title';
        newSectionObject.section.className = 'section';

        newSectionObject.section.appendChild(newSectionObject.title);
        newSectionObject.section.appendChild(newSectionObject.categories);

        if (focusedElement.className === 'section') {
            listBody.insertBefore(newSectionObject.section, focusedElement.nextSibling);
        } else if (focusedElement.className === 'category') {
            listBody.insertBefore(newSectionObject.section, focusedElement.parentNode.nextSibling);
        } else {
            
        }
        console.log(listBody);

        newSectionObject.title.innerText = DefaultTitle.SECTION;
        addModifyElementTextEvent(newSectionObject.title, DefaultTitle.SECTION);
        addFocusedContentEvent(newSectionObject.section);
    });
}

function addCategory() {
    console.log('addCategory() has been loaded.');
    let listBody = document.querySelector('#list-body');
    let addCategoryButton = document.querySelector('#add-category');

    addCategoryButton.addEventListener('click', function (event) {
        let newCategoryObject = {
            category: document.createElement('div'),
            title: document.createElement('div'),
        }
        console.log(listBody);

        newCategoryObject.title.className = 'title';
        newCategoryObject.category.className = 'category';

        newCategoryObject.category.appendChild(newCategoryObject.title);

        if (focusedElement.className === 'category') {
            console.log('activated');
            focusedElement.parentNode.insertBefore(newCategoryObject.category, focusedElement.nextSibling);
        } else if (focusedElement.className === 'section') {
            focusedElement.appendChild(newCategoryObject.category);
        } else {

        }
        console.log(listBody);

        newCategoryObject.title.innerText = DefaultTitle.CATEGORY;
        addModifyElementTextEvent(newCategoryObject.title, DefaultTitle.CATEGORY);
        addFocusedContentEvent(newCategoryObject.category);
    });
}

function removeContent(elementObject) {
    console.log('removeContent() has been loaded.');
    elementObject.removeButton.addEventListener('click', function (event) {
        let checkboxes = document.querySelectorAll('.checkbox__section');
        console.log(checkboxes);
        for (let key in checkboxes) {
            if (checkboxes[key].checked) {
                let target = checkboxes[key].parentNode;
                let parent = target.parentNode;
                parent.removeChild(target);
            }
        }
    });
}

function applyContent(object) {

}

function showContents(contentsObject) {
    let sectionsObject = orderedObject(contentsObject);
    for (let i in sectionsObject) {
        let sectionObject = sectionsObject[i];

        let categoriesObject = orderedObject(sectionObject.categories);
        console.log(sectionObject);

        createSectionElements(sectionObject);
        function createSectionElements(sectionObject) {
            let listBody = document.querySelector('#list-body');

            let sectionElementObject = {
                section: document.createElement('div'),
                title: document.createElement('div'),
                categories: document.createElement('div')
            }
            sectionElementObject.section.className = 'section';

            sectionElementObject.title.innerText = sectionObject.name;
            sectionElementObject.title.className = 'title';

            sectionElementObject.categories.id = sectionObject.name + '-categories';

            sectionElementObject.section.appendChild(sectionElementObject.title);
            sectionElementObject.section.appendChild(sectionElementObject.categories);

            listBody.appendChild(sectionElementObject.section);

            addModifyElementTextEvent(sectionElementObject.title, DefaultTitle.SECTION);
            addFocusedContentEvent(sectionElementObject.section);
        }

        for (let j in categoriesObject) {
            let categoryObject = categoriesObject[j];
            createCategoryElements(categoryObject);
            function createCategoryElements(categoryObject) {
                let categories = document.querySelector('#' + sectionObject.name + '-categories');

                let categoryElementObject = {
                    category: document.createElement('div'),
                    title: document.createElement('div')
                }
                categoryElementObject.category.className = 'category';

                categoryElementObject.title.innerText = categoryObject.name;
                categoryElementObject.title.className = 'title';
                categoryElementObject.category.appendChild(categoryElementObject.title);

                categories.appendChild(categoryElementObject.category);

                addModifyElementTextEvent(categoryElementObject.title, DefaultTitle.CATEGORY);
                addFocusedContentEvent(categoryElementObject.category);
            }
            console.log(categoryObject);
        }
    }
}

function orderedObject(unorderedObject) {
    let orderedObject = {};

    Object.keys(unorderedObject).sort().forEach(key => {
        orderedObject[key] = unorderedObject[key];
    })

    return orderedObject;
}

function addModifyElementTextEvent(element, defaultTitle) {
    let parentElement = element.parentNode;
    let doubleClickLock = false;

    parentElement.addEventListener('dblclick', function (event) {
        if (!doubleClickLock) {
            doubleClickLock = true;

            let originalName = element;
            let modifiedName = document.createElement('input');
            modifiedName.type = 'text';

            let titleText = originalName.innerText;

            if (titleText !== defaultTitle) {
                modifiedName.value = titleText;
            }
            parentElement.replaceChild(modifiedName, originalName);

            event.stopPropagation();
            modifiedName.focus();
            let isFocused = true;

            modifiedName.addEventListener('keydown', function (event) {
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

            modifiedName.addEventListener('blur', function (event) {
                if (isFocused) {
                    renameCategory(true);
                }
            });

            function renameCategory(apply) {
                if (apply) {
                    let changedText = modifiedName.value;
                    if (changedText.length === 0) {
                        changedText = defaultTitle;
                    }
                    originalName.innerText = changedText;
                }
                isFocused = false;
                parentElement.replaceChild(originalName, modifiedName);
                doubleClickLock = false;
            }
        }
    })
}

function addFocusedContentEvent(element) {
    element.addEventListener('click', function (event) {
        event.stopPropagation();
        if (focusedElement !== element) {
            focusedElement = element;

            console.log('TEST: ', focusedElement);
        }
    })
}