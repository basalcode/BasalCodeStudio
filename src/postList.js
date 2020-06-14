window.onload = function () {
    console.log(`[Open] 'postList.js' has been opend.`);

    fetch(`/readPostList`)
        .then(function (response) {
            return response.json();
        })
        .then(function (parsed) {
            showPostList(parsed.blog);
        })
}

function showPostList(postObj) {
    console.log(postObj);

    let postList = document.querySelector('#post-list');
    let thead = document.querySelector('#thead');
    let tbody = document.querySelector('#tbody');

    const HeaderType = {
        CATEGORY: 'Category',
        TITLE: 'Title',
        Author: 'Author',
        VIEW_COUNT: 'View',
        COMMENT_COUNT: 'Comment',
        TIME: 'Time'
    }

    for (const key in HeaderType) {
        let th = document.createElement('th');
        th.innerText = HeaderType[key];

        thead.appendChild(th);
    }

    postObj.forEach(postObj => {
        let tr = document.createElement('tr');
        for (const key in postObj) {
            let td = document.createElement('td');
            td.innerText = postObj[key];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    })
}