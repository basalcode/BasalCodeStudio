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

        categoryList: document.querySelector('#category-list'),
        listHeader: document.querySelector('#list-header'),
        listBody: document.querySelector('#list-body')
    }

    fetch('/readCategoryEditor')
        .then(function (response) {
            return response.json();
        })
        .then(function (parsed) {
            console.log(parsed);
        });

    elementObject.addCategoryButton.addEventListener('click', function (event) {
        addContent(elementObject, ContentType.CATEGORY);
    });
    elementObject.addSectionButton.addEventListener('click', function (event) {
        addContent(elementObject, ContentType.SECTION);
    });
    elementObject.removeButton.addEventListener('click', function(event) {
        removeContent(elementObject);
    });
}

function addContent(object, contentType) {
    let content = document.createElement('div');
    let checkBox = document.createElement('input');
    let title = document.createElement('div');

    const DefaultName = {
        CATEGORY: 'Default Category',
        SECTION: 'Default Section'
    }

    content.id = 'content';
    checkBox.id = 'checkbox';
    checkBox.type = 'checkbox';
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
    let checkboxs = document.querySelectorAll('#checkbox');
    for (const key in checkboxs) {
        if (checkboxs[key].checked) {
            let target = checkboxs[key].parentNode;
            let parent = target.parentNode;
            parent.removeChild(target);
        }
    }
}