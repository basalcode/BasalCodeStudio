window.onload = function () {
    console.log(`[Open] 'postEditor.js' has been opend.`);
    loadPostEditor();
}

function loadPostEditor() {
    const Mode = {
        WRITE: 'write',
        UPDATE: 'update'
    }

    const url = new URL(window.location.href);
    const params = url.searchParams;
    let pathArray = url.pathname.split('/')
    let pageName = pathArray[pathArray.length - 1].split('.html')[0];

    let post_id = params.get('post');
    let mode = params.get('mode');

    if (mode === Mode.WRITE) {
        readDefaultSelectBoxes(pageName);
        submitButton(`/createPost`);
    } else if (mode === Mode.UPDATE) {
        fetch(`/readPost?post=${post_id}`)
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
    } else {
        alert('Incorrect mode value.');
        location.href = '/source/category.html';
    }

}

async function readDefaultSelectBoxes(pageName) {
    let sectionSelectBox = document.querySelector('#section');
    await fetch(`/readSection`)
        .then(function (response) {
            return response.json();
        })
        .then(function (parsed) {
            let sectionObject = parsed.result;
            for (let key in sectionObject) {
                let section = sectionObject[key];
                let sectionOption = document.createElement('option');

                sectionOption.innerText = section.name;
                sectionSelectBox.appendChild(sectionOption);
            }
        });

    const default_section_id = 0;
    await fetch(`/readCategory?page=${pageName}&section=${default_section_id}`)
        .then(function (response) {
            return response.json();
        })
        .then(createCategoryOptions);

    sectionSelectBoxChangeEvent(pageName);
}

function sectionSelectBoxChangeEvent(pageName) {
    let sectionSelectBox = document.querySelector('#section');

    sectionSelectBox.addEventListener('change', function (event) {
        let categorySelectBox = document.querySelector('#category');
        while (categorySelectBox.hasChildNodes()) {
            categorySelectBox.removeChild(categorySelectBox.firstChild);
        }
        
        let section_id = event.target.selectedIndex;
        fetch(`/readCategory?page=${pageName}&section=${section_id}`)
            .then(function (response) {
                return response.json();
            })
            .then(createCategoryOptions);
    });
}

function createCategoryOptions(parsed) {
    let categorySelectBox = document.querySelector('#category');

    let categoryObject = parsed.result;

    for (let key in categoryObject) {
        let category = categoryObject[key];
        let categoryOption = document.createElement('option');

        categoryOption.value = category.id;
        categoryOption.innerText = category.name;
        
        categorySelectBox.appendChild(categoryOption);
    }
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

