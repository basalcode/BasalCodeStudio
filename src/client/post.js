window.onload = function() {
    console.log(`[Open] 'post.js' has been opend.`);

    let url = new URL(window.location.href);
    let params = url.searchParams;
    let post_id = params.get('post_id');

    fetch(`/readPost?post_id=${post_id}`)
    .then(function (response) {
        return response.json();
    })
    .then(function (parsed) {
        showPost(parsed.result[0]);
    })
}

function showPost(postObj) {
    let post = document.querySelector('#post');
    let postHeader = document.querySelector('#post__header');
    let category = document.querySelector('#category');
    let title = document.querySelector('#title');
    
    let postControl = document.querySelector('#post-control');
    let updatePost = document.querySelector('#update');
    let deletePost = document.querySelector('#delete');

    let author = document.querySelector('#author');
    let viewCount = document.querySelector('#view-count');
    let time = document.querySelector('#time');

    category.innerText = postObj.category;
    title.innerText = postObj.title;

    updatePost.innerText = 'update';
    deletePost.innerText = 'delete';

    author.innerText = postObj.author;
    viewCount.innerText = postObj.view_count;
    time.innerText = postObj.time;

    let postBody = document.querySelector('#post__body');
    let description  = document.querySelector('#description');

    description.innerText = postObj.description;

    updatePost.addEventListener('click', function (event) {
        window.location.href = `/source/postEditor.html?mode=update&post_id=${postObj.post_id}`
    })

    deletePost.addEventListener('click', function (event) {
        
        fetch('/deletePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postObj)
        })
        .then(function (response) {
            return response.json()
        })
        .then(function (parsed) {
            window.location.href ='/source/postList.html';
        });
    })
}