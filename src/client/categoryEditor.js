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
        addCategory(elementObject);
    });
    elementObject.addSectionButton.addEventListener('click', function (event) {
        addSection(elementObject);
    });
    elementObject.removeButton.addEventListener('click', function(event) {
        removeContent(elementObject);
    });
}

function addCategory(object) {
    let category = document.createElement('div');
    let checkBox = document.createElement('input');
    let categoryName = document.createElement('div');

    const defaultCategoryName = 'Default Category';

    category.id = 'content';
    checkBox.id = 'checkbox';
    checkBox.type = 'checkbox';
    categoryName.innerText = defaultCategoryName;

    category.appendChild(checkBox);
    category.appendChild(categoryName);

    object.listBody.appendChild(category);

    categoryName.addEventListener('click', function (event) {
        let modifyName = document.createElement('input');
        let categoryNameText = categoryName.innerText;

        let isFocused = false;

        modifyName.type = 'text';
        if (categoryNameText !== defaultCategoryName) {
            modifyName.value = categoryNameText;
        }
        category.replaceChild(modifyName, categoryName);

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
                categoryName.innerText = changedText;
            }
            category.replaceChild(categoryName, modifyName);
        }
    })
}

function addSection(object) {
    let section = document.createElement('div');
    let checkBox = document.createElement('input');
    let sectionName = document.createElement('div');

    const defaultCategoryName = 'Default Section';

    checkBox.type = 'checkbox';
    checkBox.id = 'checkbox';
    sectionName.innerText = defaultCategoryName;

    section.appendChild(checkBox);
    section.appendChild(sectionName);

    object.listBody.appendChild(section);

    sectionName.addEventListener('click', function (event) {
        let modifyName = document.createElement('input');
        let sectionNameText = sectionName.innerText;

        let isFocused = false;

        modifyName.type = 'text';
        if (sectionNameText !== defaultCategoryName) {
            modifyName.value = sectionNameText;
        }
        section.replaceChild(modifyName, sectionName);

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
                sectionName.innerText = changedText;
            }
            section.replaceChild(sectionName, modifyName);
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

/* fetch('/createCategory', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify()
})
    .then(function (response) {

    })
    .then(function (parsed) {
        console.log(parsed);


    }); */