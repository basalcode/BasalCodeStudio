import React, { useState, useRef } from 'react';

import './PostEditor.css'

import SectionSelector from './SectionSelector';
import CategorySelector from './CategorySelector'
import section from '../../../../server/db/queries/blog/section';

function PostEditor({ history }) {
    const [sectionValue, setSectionValue] = useState(0);
    const [categoryValue, setCategoryValue] = useState(0);
    const [titleText, setTitleText] = useState('');
    const [authorText, setAuthorText] = useState('');
    const [descriptionText, setDescriptionText] = useState('');

    const titleRef = useRef(null);
    const authorRef = useRef(null);
    const descriptionRef = useRef(null);

    const [selectBoxes, setSelectBoxes] = useState({});

    const onChangeHandler = {
        title: (event) => {
            setTitleText(event.target.value);
        },
        author: (event) => {
            setAuthorText(event.target.value);
        },
        description: (event) => {
            setDescriptionText(event.target.value);
        }
    }

    const canSubmit = () => {
        const EMPTY = 0;
        let permission = false;
        if (titleText.length === EMPTY) {
            titleRef.current.focus();
        } else if (authorText === EMPTY) {
            authorRef.current.focus();
        } else if (descriptionText === EMPTY) {
            descriptionRef.current.focus();
        } else {
            console.log('submit !!');
            permission = true;
        }
        return permission;
    }
    const submitPost = () => {
        return new Promise((resolve, reject) => {
            const postObject = {
                section: sectionValue,
                category: categoryValue,
                title: titleText,
                author: authorText,
                description: descriptionText
            }
            fetch('/request/blog/create/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postObject)
            })
        })
    }
    const onSubmitHandler = (event) => {
        const eventTarget = event.target;
        event.preventDefault();
        if (canSubmit()) {
            submitPost()
            .then((resolve) => {
                eventTarget.reset();
                alert(resolve);
                history.push('/blog/lobby');
            }, (reject) => {
                eventTarget.reset();
                alert(reject);
                history.replace('/postEditor');
            })
        }
    }

    return (
        <div className="PostEditor">
            <form
                onSubmit={onSubmitHandler}
            >
                <SectionSelector
                    onIndexChange={(index) => {
                        setSectionValue(index);
                    }}
                ></SectionSelector>
                <CategorySelector
                    onIndexChange={(index) => {
                        setCategoryValue(index);
                    }}
                    sectionValue={sectionValue}
                ></CategorySelector>
                <div>Title</div>
                <input
                    ref={titleRef}
                    type="text"
                    onChange={onChangeHandler.title}
                />
                <div>Description</div>
                <textarea
                    ref={descriptionRef}
                    onChange={onChangeHandler.description}
                ></textarea>
                <input type="submit"
                />
            </form>
        </div>
    );
}

export default PostEditor;



/*
function initSelectBoxes(categoryId) {
    return fetch(`/request/blog/read/section`)
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
*/