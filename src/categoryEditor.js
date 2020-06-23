window.onload = function() {
    console.log(`[Open] 'categoryEditor.js' has been opend.`);

    let categoryEditor = document.querySelector('#category-editor');

    let control = document.querySelector('#control');
    let addCategoryButton = document.querySelector('#add-category');
    let addGroupButton = document.querySelector('#add-group');
    let removeButton = document.querySelector('#remove');

    let categoryList = document.querySelector('#category-list');
    let listHeader = document.querySelector('#list-header');
    let listBody = document.querySelector('#list-body');

    let defaultCategory = document.createElement('div');
    defaultCategory.innerText = 'Default Category';
    listBody.appendChild(defaultCategory);

    fetch('/readCategoryList')
    .then(function(response) {
        return response.json();
    })
    .then(function(parsed) {
        console.log(parsed);
    }) 
}