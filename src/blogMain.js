window.onload = function() {
    console.log(`[Open] 'blogMain.js' has been opend.`);

    let writePost = document.querySelector('#write-post');
    let readPostList = document.querySelector('#read-post-list');

    writePost.addEventListener('click', function(event) {
        window.location.href="/post/postEditor.html";
    })
}