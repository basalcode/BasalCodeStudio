const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

const errorHandler = require('./src/server/errors');
const DBOperator = require('./src/server/DBOperator');
const post = require('./src/server/post');

/* body-parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/source', express.static('./src/client'));

app.get('/', function (req, res) {
    if (req.headers['x-forwarded-proto' === 'http']) {
        res.redirect(301, 'https://basalcode.space');
    } else {
        fs.readFile('./src/client/lobby.html', function (err, data) {
            if (err) {
                res.status(404).send('Not Found');
            } else {
                res.status(200).send(data.toString());
            }
        })
    }
})

app.post('/writePost', post.write);
app.get('/readPost', post.read);
app.post('/updatePost', post.update);
app.post('/deletePost', post.delete);

app.get('/readPostList', function (req, res) {
    (async () => {
        DBOperator.init(
            req,
            DBOperator.InputType.READ,
            DBOperator.ContentType.POST_LIST
        );

        res.send({
            result: await DBOperator.run()
        });
    })();
});

app.post('/createCategory', category.write);
app.get('/readCategory', category.read);
app.post('/updateCategory', category.update);
app.post('/deleteCategory', category.delete);

app.post('/createGroup', group.write);
app.post('/updateGroup', group.update);
app.post('/deleteGroup', group.delete);
app.get('/readCategoryList');

app.use(errorHandler.error404);
app.use(errorHandler.error500);

app.listen(3000);