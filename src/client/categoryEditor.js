const ContentType = {
    CATEGORY: 1,
    SECTION: 2
}

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

    elementObject.addCategoryButton.addEventListener('click', function (event) {
        addContent(elementObject, ContentType.CATEGORY);
    });
    elementObject.addSectionButton.addEventListener('click', function (event) {
        addContent(elementObject, ContentType.SECTION);
    });
    elementObject.removeButton.addEventListener('click', function (event) {
        removeContent(elementObject);
    });

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

                    if (sections[name] === undefined) {
                        sections[name] = sectionObject;
                    }
                    appendCategory(sections[name], element);
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

                    if (target.categories[name] === undefined) {
                        target.categories[name] = categoryObject;
                    }
                }
                return sections;
            }

            let contentsObject = initContent(contentArray);
            showContents(contentsObject);
            function showContents(sections) {
                let content = document.createElement('div');

                for (const i in sections) {
                    let sectionObject = sections[i];
                    let categories = sectionObject.categories;
                    console.log(sectionObject);

                    createSectionElements(sectionObject);
                    function createSectionElements(sectionObject) {
                        let listBody = document.querySelector('#list-body');

                        let section = document.createElement('div');
                        let checkBox = document.createElement('input');
                        let title = document.createElement('div');

                        let categories = document.createElement('div');

                        section.id = sectionObject.name + 'Section';

                        checkBox.id = sectionObject.name + 'CheckBox';
                        checkBox.type = 'checkbox';

                        title.id = sectionObject.name + 'Title';
                        title.innerText = sectionObject.name;

                        categories.id = sectionObject.name + 'Categories';

                        section.appendChild(checkBox);
                        section.appendChild(title);
                        section.appendChild(categories);

                        listBody.appendChild(section);
                    }

                    for (const j in categories) {
                        let categoryObject = categories[j];
                        createCategoryElements(categoryObject);
                        function createCategoryElements(categoryObject) {
                            let categories = document.querySelector('#' + sectionObject.name + 'Categories');

                            let category = document.createElement('div');
                            let checkBox = document.createElement('input');
                            let title = document.createElement('div');

                            category.id = categoryObject.name + 'Section';

                            checkBox.id = categoryObject.name + 'CheckBox';
                            checkBox.type = 'checkbox';

                            title.id = categoryObject.name + 'Title';
                            title.innerText = categoryObject.name;

                            category.appendChild(checkBox);
                            category.appendChild(title);

                            categories.appendChild(category);
                        }
                        console.log(categoryObject);
                    }
                }

                /* let section = document.createElement('div');
                let checkBox = document.createElement('input');
                let title = document.createElement('div');
                let category = document.createElement('div');
                let checkBox = document.createElement('input');
                let title = document.createElement('div'); */
            }
        });
}

function addContent(object, contentType) {
    console.log('addContent() has been loaded.');

    let content = document.createElement('div');
    let checkBox = document.createElement('input');
    let title = document.createElement('div');

    const DefaultName = {
        CATEGORY: 'Default Category',
        SECTION: 'Default Section'
    }

    content.className = 'content';
    checkBox.className = 'checkbox';
    checkBox.type = 'checkbox';
    title.className = 'title';

    if (contentType === ContentType.CATEGORY) {
        title.innerText = DefaultName.CATEGORY;
    } else if (contentType === ContentType.SECTION) {
        title.innerText = DefaultName.SECTION;
    } else {
        throw new Error('[Error] addContent() : Parameter \'contentType\' is wrong.');
    }

    content.appendChild(checkBox);
    content.appendChild(title);

    object.listBody.appendChild(content);

    title.addEventListener('click', function (event) {
        let modifyName = document.createElement('input');
        let titleText = title.innerText;

        let isFocused = false;

        modifyName.type = 'text';
        if (titleText !== defaultCategoryName) {
            modifyName.value = titleText;
        }
        content.replaceChild(modifyName, title);

        modifyName.focus();
        isFocused = true;

        modifyName.addEventListener('keydown', function (event) {
            if (isFocused) {
                const ApprovalKeys = {
                    ENTER: 'Enter',
                    NUMPAD_ENTER: 'NumpadEnter'
                };
                const CanselKey = {
                    ESC: 'Escape'
                };

                for (const key in ApprovalKeys) {
                    if (event.code === ApprovalKeys[key]) {
                        renameCategory(true);
                        return;
                    }
                }
                for (const key in CanselKey) {
                    if (event.code === CanselKey[key]) {
                        renameCategory(false);
                        return;
                    }
                }
            }
        });

        modifyName.addEventListener('blur', function (event) {
            if (isFocused) {
                console.log(isFocused);
                renameCategory(true);
            }
        });

        function renameCategory(apply) {
            isFocused = false;
            if (apply) {
                let changedText = modifyName.value;
                if (changedText.length === 0) {
                    changedText = defaultCategoryName;
                }
                title.innerText = changedText;
            }
            content.replaceChild(title, modifyName);
        }
    })
}

function removeContent(object) {
    console.log('removeContent() has been loaded.');
    let checkboxs = document.querySelectorAll('.checkbox');
    for (const key in checkboxs) {
        if (checkboxs[key].checked) {
            let target = checkboxs[key].parentNode;
            let parent = target.parentNode;
            parent.removeChild(target);
        }
    }
}

function applyContent(object) {

}