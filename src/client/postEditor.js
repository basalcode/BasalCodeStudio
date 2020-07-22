window.onload = function () {
    console.log(`[Open] 'postEditor.js' has been opend.`);
    loadPostEditor();
}

function loadPostEditor() {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    let pathArray = url.pathname.split('/')
    let pageName = pathArray[pathArray.length - 1].split('.html')[0];

    let post_id = params.get('post');
    let mode = params.get('mode');

    if (mode === 'write') {
        readDefaultSelectBoxes(pageName);
        submitButton(`/createPost`);
    } else if (mode === 'update') {
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
            console.log(parsed);
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
    console.log('test');
    let categorySelectBox = document.querySelector('#category');

    let categoryObject = parsed.result;
    for (let key in categoryObject) {
        let category = categoryObject[key];
        let categoryOption = document.createElement('option');

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

            let sectionSelectBox = document.querySelector('#section');
            let sectionOption = document.createElement('option');
            let title = document.querySelector('#title');
            let author = document.querySelector('#author');
            let description = document.querySelector('#description');
            let postEditorObj = {
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

