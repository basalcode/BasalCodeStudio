window.onload = function () {
    console.log(`[Open] 'postList.js' has been opend.`);

    fetch(`/readPostList`)
        .then(function (response) {
            return response.json();
        })
        .then(function (parsed) {
            showPostList(parsed.result);
        })
}

function showPostList(postObjArr) {
    let postList = document.querySelector('#post-list');
    let tableHeader = document.querySelector('#thead');
    let tableBody = document.querySelector('#tbody');

    const HeaderType = {
        POST_ID: 'PostID',
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

        tableHeader.appendChild(th);
    }

    if (postObjArr.length === 0) {
        let div = document.createElement('div');
        div.innerText = 'There is no post.';

        document.body.appendChild(div);
    } else {
        postObjArr.forEach(postObj => {
            let tr = document.createElement('tr');
            for (const key in postObj) {
                let td = document.createElement('td');
                if (key === 'title') {
                    let postLink = document.createElement('a');
                    let post_id = postObj.post_id;
                
                    postLink.innerText = postObj[key];
                    postLink.setAttribute('href', `/source/post.html?post_id=${post_id}`);
        
                    td.appendChild(postLink);
                    tr.appendChild(td);
                } else {
                    td.innerText = postObj[key];
                    
                    tr.appendChild(td);
                }
            }
            tableBody.appendChild(tr);
        })
    }
}