import {expire} from './common/expiredPage.js';

window.onload = function () {
    console.log(`[Open] 'postEditor.js' has been opend.`);
    loadPostEditor();
}

function loadPostEditor() {
    const PageMode = {
        WRITE: 'write',
        UPDATE: 'update'
    }

    const DEFAULT_VALUE = 0;

    const url = new URL(window.location.href);
    const params = url.searchParams;

    let mode = params.get('mode');
    let postId = params.get('post');
    let categoryId = params.get('category');

    let isUpdated = false;

    if (mode === PageMode.WRITE) {
        initSelectBoxes(DEFAULT_VALUE);
        postContentUpdateEvent();
        submitButtonEvent('/createPost');
    } else if (mode === PageMode.UPDATE) {
        initSelectBoxes(categoryId);
        readPostContent();
        postContentUpdateEvent();
        submitButtonEvent('/updatePost');
    } else {
        alert('Incorrect mode value.');
        location.href = '/source/category.html';
    }


    function initSelectBoxes(categoryId) {
        return fetch(`/readSection`)
            .then(function (response) {
                return response.json();
            })
            .then(function (parsed) {
                let resultObject = parsed.result;

                let sectionSelectBox = document.querySelector('#section');
                let categorySelectBox = document.querySelector('#category');

                getSelectBoxes();
                showCategorySelectItems(categoryId);
                selectBoxChangeEvent();

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

                function showCategorySelectItems(contentId, isSectionId) {
                    let selectCategoryIndex;
                    let categoryIndexExist = false;

                    let categorySelectItems = categorySelectBox.childNodes;
                    let selectedSectionId = isSectionId ? contentId : Number(categorySelectItems[contentId].value);

                    categorySelectItems.forEach((categorySelectItem, index) => {
                        let sectionIdOfCateogry = Number(categorySelectItem.value);
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
                            categorySelectItem.hidden = false;
                        } else {
                            categorySelectItem.hidden = true;
                        }
                    });
                    categorySelectBox.selectedIndex = selectCategoryIndex;
                }

                function selectBoxChangeEvent() {
                    sectionSelectBox.addEventListener('change', function (event) {
                        let sectionId = event.target.selectedIndex;
                        showCategorySelectItems(sectionId, true);

                        isUpdated = true;
                    });

                    categorySelectBox.addEventListener('change', function (event) {
                        isUpdated = true;
                    });
                }
            });
    }

    function readPostContent() {
        fetch(`/readPost?post=${postId}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (parsed) {
                console.log(parsed);
                let postObj = parsed.result[0];
                console.log()

                title.value = postObj.title;
                author.value = postObj.author;
                description.value = postObj.description;
            });
    }

    function postContentUpdateEvent() {
        let contents = []
        contents.push(document.querySelector('#title'));
        contents.push(document.querySelector('#author'));
        contents.push(document.querySelector('#description'));

        contents.forEach(content => {
            content.addEventListener('change', function (event) {
                isUpdated = true;
            });
        });
    }

    function submitButtonEvent(requestUrl) {
        let submit = document.querySelector('#submit');
        let lock = false;

        submit.addEventListener('click', function (event) {
            if (!lock) {
                lock = true;
                if (isUpdated) {
                    // let sectionSelectBox = document.querySelector('#section');
                    // let selectedSectionIndex = sectionSelectBox.selectedIndex;
                    // let section_id = sectionSelectBox.options[selectedSectionIndex].value;

                    let categorySelectBox = document.querySelector('#category');
                    let selectedCategoryIndex = categorySelectBox.selectedIndex;

                    let category_id = selectedCategoryIndex;
                    let title = document.querySelector('#title');
                    let author = document.querySelector('#author');
                    let description = document.querySelector('#description');

                    let postEditorObj = {
                        // section_id: Number(section_id),
                        id: Number(postId),
                        title: title.value,
                        author: author.value,
                        description: description.value,
                        category_id: Number(category_id)
                    }

                    fetch(requestUrl, {
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
                                expire();
                                window.location.href = '/source/blogMain.html';
                            }
                            isUpdated = false
                            lock = false;
                        });
                } else {
                    alert('There is no change.');
                    lock = false;
                }
            }
        });
    }
}