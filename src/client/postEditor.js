window.onload = function () {
    console.log(`[Open] 'postEditor.js' has been opend.`);
    loadPostEditor();
}

function loadPostEditor() {
    const PageMode = {
        WRITE: 'write',
        UPDATE: 'update'
    }

    const SelectBoxMode = {
        SECTION: 'section',
        CATEGORY: 'category'
    }
    const DEFAULT_VALUE = 0;

    const url = new URL(window.location.href);
    const params = url.searchParams;

    let mode = params.get('mode');
    let postId = params.get('post');
    let categoryId = params.get('category');

    if (mode === PageMode.WRITE) {
        readSelectBoxes(DEFAULT_VALUE);
        submitButton(`/createPost`);
    } else if (mode === PageMode.UPDATE) {
        console.log('categoryId', categoryId);
        readSelectBoxes(categoryId);
        readPostContent();
        function readPostContent() {
            fetch(`/readPost?post=${postId}`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (parsed) {
                    postObj = parsed.result[0];

                    title.value = postObj.title;
                    author.value = postObj.author;
                    description.value = postObj.description;

                    submitButton(`/updatePost`);
                });
        }
    } else {
        alert('Incorrect mode value.');
        location.href = '/source/category.html';
    }
    function readSelectBoxes(categoryId) {
        return fetch(`/readSection`)
            .then(function (response) {
                return response.json();
            })
            .then(function (parsed) {
                let resultObject = parsed.result;
                console.log(resultObject);

                let sectionSelectBox = document.querySelector('#section');
                let categorySelectBox = document.querySelector('#category');

                getSelectBoxes();
                function getSelectBoxes() {
                    let overlapIdCheck;
                    let sectionOption;
                    let sectionIndex = 0;
                    let categoryIndex = 0;
                    for (let key in resultObject) {
                        let content = resultObject[key];

                        if (overlapIdCheck !== content.section_id) {
                            overlapIdCheck = content.section_id
                            sectionOption = document.createElement('option');

                            sectionOption.id = `section-id__${content.section_id}`;
                            sectionOption.innerText = content.section_name;

                            sectionSelectBox.appendChild(sectionOption);
                            sectionIndex++;
                        }

                        let categoryOption = document.createElement('option');

                        categoryOption.id = `category-id__${content.category_id}`;
                        categoryOption.value = sectionIndex - 1;
                        categoryOption.innerText = content.category_name;

                        categorySelectBox.appendChild(categoryOption);
                        categoryIndex++;
                    }
                }

                showCategorySelectItems(categoryId);

                function showCategorySelectItems(contentId, isSectionId) {
                    let selectCategoryIndex;
                    let categoryIndexExist = false;
                    
                    let categorySelectItems = categorySelectBox.childNodes;
                    let selectedSectionId = isSectionId ? contentId : Number(categorySelectItems[contentId].value);

                    categorySelectItems.forEach((categorySelectItem, index) => {
                        let sectionIdOfCateogry = Number(categorySelectItem.value);

                        console.log('[sectionIdOfCateogry]', sectionIdOfCateogry);
                        console.log('[selectedSectionId]', selectedSectionId);
                        if (sectionIdOfCateogry === selectedSectionId) {
                            if (!categoryIndexExist) {
                                if (isSectionId) {
                                    selectCategoryIndex = index;
                                    categoryIndexExist = true;
                                } else {
                                    selectCategoryIndex = contentId;
                                    categoryIndexExist = true;
                                }
                            }
                            console.log('show');
                            categorySelectItem.hidden = false;
                        } else {
                            console.log('hide');
                            categorySelectItem.hidden = true;
                        }
                    });
                    categorySelectBox.selectedIndex = selectCategoryIndex;
                }

                sectionSelectBoxChangeEvent();

                function sectionSelectBoxChangeEvent() {
                    sectionSelectBox.addEventListener('change', function (event) {
                        let sectionId = event.target.selectedIndex;
                        
                        showCategorySelectItems(sectionId, true);
                    });
                }
            });
    }

    function submitButton(path) {
        let submit = document.querySelector('#submit');
        let lock = false;

        submit.addEventListener('click', function (event) {
            if (!lock) {
                lock = true;

                let categorySelectBox = document.querySelector('#category');
                let optionIndex = categorySelectBox.selectedIndex;

                let category_id = categorySelectBox.options[optionIndex].value;
                let title = document.querySelector('#title');
                let author = document.querySelector('#author');
                let description = document.querySelector('#description');
                let postEditorObj = {
                    category: Number(category_id),
                    title: title.value,
                    author: author.value,
                    description: description.value
                }

                fetch(path, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postEditorObj)
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (parsed) {
                        if (parsed.result.constructor.name === 'String') {
                            alert(parsed.result);
                        } else {
                            window.location.href = '/source/blogMain.html';
                        }
                        lock = false;
                    })
            }
        });
    }
}