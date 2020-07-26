import sections from './common/categoryList.js';

window.onload = function () {
    console.log(`[Open] 'blogMain.js' has been opend.`);

    let writePost = document.querySelector('#write-post');
    writePost.addEventListener('click', function (event) {
        window.location.href = '/source/postEditor.html?mode=write';
    });
    
    loadCategoryList();
}

async function loadCategoryList() {
    let categoryList = document.querySelector('#category-list');

    let loadedSection = await sections;
    let elements = loadedSection.elements;
    categoryList.appendChild(loadedSection.root);

    appendAnchorElement(elements);

    function appendAnchorElement(elements) {
        let categorys = elements.category;
        let cateogryLength = elements.category.length;
        let categorySelfs = elements.categorySelf;
        let categoryTitles = elements.categoryTitle;

        for (let i = 0; i < cateogryLength; i++) {
            let category = categorys[i];
            let categorySelf = categorySelfs[i];
            let anchorTag = document.createElement('a');
            let categoryTitle = categoryTitles[i];

            let categoryId = (i > 0) ? category.id.split('__')[1] : 0;
            
            anchorTag.href = `/source/category.html?category=${categoryId}`; // 
            anchorTag.id = '.category-anchor';

            categorySelf.appendChild(anchorTag);
            anchorTag.appendChild(categoryTitle);
        }
    }
}