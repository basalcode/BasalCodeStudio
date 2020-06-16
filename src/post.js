window.onload = function() {
    console.log(`[Open] 'post.js' has been opend.`);

    let post = document.createElement('#post');
    let postHeader = document.createElement('#post__header');
    let category = document.createElement('#category');
    let title = document.createElement('#title');
    let author = document.createElement('#author');
    let viewCount = document.createElement('#view-count');
    let time = document.createElement('#time');

    let postBody = document.createElement('#post__body');
    let  = document.createElement('#description');

    fetch('/readPost?')
    .then(function (response) {
        return response.json();
    })
    .then(function (parsed) {
        console.log(parsed);
    })
}