import sections from './common/categoryList.js';

window.onload = function() {
    console.log(`[Open] 'blogMain.js' has been opend.`);

    let writePost = document.querySelector('#write-post');
    let readPostList = document.querySelector('#read-post-list');
    
    writePost.addEventListener('click', function(event) {
        window.location.href='/source/postEditor.html?mode=write';
    });

    readPostList.addEventListener('click', function(event) {
        window.location.href='/source/category.html';
    });

    loadCategoryList();
}

async function loadCategoryList() {
    let categoryList = document.querySelector('#category-list');

    let loadedSection = await sections;
    categoryList.appendChild(loadedSection.root);
}