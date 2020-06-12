window.onload = function() {
    console.log(`[Open] 'postEditor.js' has been opend.`);

    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let description = document.querySelector('#description');
    let submit = document.querySelector('#submit');

    submit.addEventListener('click', function(event) {
        let postEditorObj = {
            title: title.value,
            author: author.value,
            description: description.value
        }

        console.log(JSON.stringify(postEditorObj));

        fetch('/writePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postEditorObj)
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(parsed) {
            console.log(parsed);
        })
    })
}