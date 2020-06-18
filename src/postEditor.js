window.onload = function () {
    console.log(`[Open] 'postEditor.js' has been opend.`);

    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let description = document.querySelector('#description');
    let submit = document.querySelector('#submit');

    let url = new URL(window.location.href);
    let params = url.searchParams;
    let post_id = params.get('post_id');
    let mode = params.get('mode');

    
    if (mode === 'write') {
        let postEditorObj = {
            title: title.value,
            author: author.value,
            description: description.value
        }
        submit.addEventListener('click', function (event) {
            fetch('/writePost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postEditorObj)
            })
            .then(function(response) {
                window.location.href = '/source/postList.html';    
            })
        })
    } else if (mode === 'update') {
        fetch(`/readPost?post_id=${post_id}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (parsed) {
                postObj = parsed.result[0];

                title.value = postObj.title;
                author.value = postObj.author;
                description.value = postObj.description;
            })

        submit.addEventListener('click', function (event) {
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
                window.location.href = '/source/postList.html';
            })
        });
    } else {

    }
}
