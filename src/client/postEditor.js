window.onload = function () {
    console.log(`[Open] 'postEditor.js' has been opend.`);
    loadPostEditor();
}

function loadPostEditor() {
    let section = document.querySelector('#section');
    let category = document.querySelector('#category');

    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let description = document.querySelector('#description');
    let submit = document.querySelector('#submit');

    let url = new URL(window.location.href);
    let params = url.searchParams;
    let post_id = params.get('post');
    let mode = params.get('mode');

    let lock = false;
    if (mode === 'write') {
        submit.addEventListener('click', function (event) {
            if (!lock) {
                lock = true;
                let postEditorObj = {
                    title: title.value,
                    author: author.value,
                    description: description.value
                }

                fetch('/createPost', {
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
        })
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

                submit.addEventListener('click', function (event) {
                    if (!lock) {
                        lock = true;
                        let postEditorObj = {
                            title: title.value,
                            author: author.value,
                            description: description.value,
                            post_id: post_id
                        }
        
                        fetch(`/updatePost`, {
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
                                    window.location.href = '/source/category.html';
                                }
                                lock = false;
                            })
                    }
                });
            })
    } else {
        alert('Incorrect mode value.');
        location.href = '/source/category.html';
    }
}