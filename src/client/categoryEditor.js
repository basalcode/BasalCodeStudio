const DefaultTitle = {
    SECTION: 'Default Section',
    CATEGORY: 'Default Category'
}

let focusedElement;

document.body.style.border = '1px solid green';

window.onload = function () {
    console.log(`[Open] 'categoryEditor.js' has been opend.`);

    loadContents();
}

function loadContents() {
    console.log('loadContents() has been loaded.');

    fetch('/readCategoryEditor')
        .then(function (response) {
            return response.json();
        })
        .then(function (parsed) {
            let contentArray = parsed.result;
            console.log(contentArray);
            let contentsObject = initContent(contentArray);
            displayElements(contentsObject);

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

            focusedElement = document.querySelector('#list-body').firstChild;

            document.querySelectorAll('.section');
            document.querySelectorAll('.category').forEach(element => {
                element.style.border = '1px solid red';
            });

            addSection(elementObject.addSectionButton);
            addCategory(elementObject.addCategoryButton);

            removeContent();

            applyContent();
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
            listBody.appendChild(newSectionObject.section);
        }

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

        newCategoryObject.title.className = 'title';
        newCategoryObject.category.className = 'category';

        newCategoryObject.category.appendChild(newCategoryObject.title);

        if (focusedElement.className === 'category') {
            focusedElement.parentNode.insertBefore(newCategoryObject.category, focusedElement.nextSibling);
        } else if (focusedElement.className === 'section') {
            focusedElement.appendChild(newCategoryObject.category);
        } else {
            listBody.firstChild.appendChild(newSectionObject.category);
        }

        newCategoryObject.title.innerText = DefaultTitle.CATEGORY;
        addModifyElementTextEvent(newCategoryObject.title, DefaultTitle.CATEGORY);
        addFocusedContentEvent(newCategoryObject.category);
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

function displayElements(contentsObject) {
    let listBody = document.querySelector('#list-body');
    
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
    listBody.appendChild(sectionsElement);
}

function createSectionElement(sectionObject) {
    let sectionElementObject = {
        section: document.createElement('div'),
        title: document.createElement('div'),
        categories: document.createElement('div')
    }
    
    sectionElementObject.title.innerText = sectionObject.name;
    sectionElementObject.title.className = 'title';

    sectionElementObject.categories.id = 'categories__' + sectionObject.name;

    sectionElementObject.section.appendChild(sectionElementObject.title);
    sectionElementObject.section.appendChild(sectionElementObject.categories);

    addModifyElementTextEvent(sectionElementObject.title, DefaultTitle.SECTION);
    addFocusedContentEvent(sectionElementObject.section);

    return sectionElementObject.section;
}

function createCategoryElement(categoryObject) {
    let categoryElementObject = {
        category: document.createElement('div'),
        title: document.createElement('div')
    }

    categoryElementObject.title.innerText = categoryObject.name;
    categoryElementObject.title.className = 'title';

    categoryElementObject.category.appendChild(categoryElementObject.title);

    addModifyElementTextEvent(categoryElementObject.title, DefaultTitle.CATEGORY);
    addFocusedContentEvent(categoryElementObject.category);

    return categoryElementObject.category;
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
        let target = event.target;
        
        if (target.className === 'category') {
            focusedElement = target;
            console.log(target);
            return;
        }

        if (target.className === 'section') {
            focusedElement = target;
            console.log(target);
            return;
        }
    })
}