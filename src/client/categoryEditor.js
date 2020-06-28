let revised = false;
window.onload = function () {
    console.log(`[Open] 'categoryEditor.js' has been opend.`);
    let categoryEditor = document.querySelector('#category-editor');

    let control = document.querySelector('#controls');
    let addCategoryButton = document.querySelector('#add-category');
    let addSectionButton = document.querySelector('#add-section');
    let removeButton = document.querySelector('#remove');

    let categoryList = document.querySelector('#category-list');
    let listHeader = document.querySelector('#list-header');
    let listBody = document.querySelector('#list-body');

    /* fetch('/readCategoryEditor')
        .then(function (response) {
            return response.json();
        })
        .then(function (parsed) {
            console.log(parsed);
            showCategory(parsed);
        }); */

    addCategoryButton.addEventListener('click', function (event) {
        revised = true;
        addCategory();
    });

    addSectionButton.addEventListener('click', function (event) {
        revised = true;
        fetch('/createSection')
            .then(function (response) {

            })
            .then(function (parsed) {

            });
    });

    removeButton.addEventListener('click', function (event) {
        revised = true;
        let isCategory;
        if (isCategory) {
            fetch('/deleteCategory')
                .then(function (response) {

                })
                .then(function (parsed) {

                });
        } else {
            fetch('/deleteSection')
                .then(function (response) {

                })
                .then(function (parsed) {

                });
        }
    });

    

    function addCategory() {
        let categoryContent = document.createElement('div');
        let checkBox = document.createElement('input');
        let categoryNameField = document.createElement('div');
        

        const defaultCategoryName = 'Default Category';

        checkBox.type = 'checkbox';
        categoryNameField.innerText = defaultCategoryName;

        categoryContent.appendChild(checkBox);
        categoryContent.appendChild(categoryNameField);

        listBody.appendChild(categoryContent);

        categoryNameField.addEventListener('click', function (event) {
            let newCategoryNameField = document.createElement('input');
            let categoryName = categoryNameField.innerText;

            let isFocused = false;

            newCategoryNameField.type = 'text';
            if (categoryName !== defaultCategoryName) {
                newCategoryNameField.value = categoryName;
            }
            categoryContent.replaceChild(newCategoryNameField, categoryNameField);

            newCategoryNameField.focus();
            isFocused = true;

            newCategoryNameField.addEventListener('keydown', function (event) {
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

            newCategoryNameField.addEventListener('blur', function (event) {
                if (isFocused) {
                    renameCategory(true);
                }
            });

            function renameCategory(apply) {
                isFocused = false;
                if (apply) {
                    let changedText = newCategoryNameField.value;
                    if (changedText.length === 0) {
                        changedText = defaultCategoryName;
                    }
                    categoryNameField.innerText = changedText;
                }
                categoryContent.replaceChild(categoryNameField, newCategoryNameField);
            }
        })
    }

    
    function showCategory() {

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