const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

const errorHandler = require('./src/server/errors');
const DBOperator = require('./src/server/DBOperator');
// const post = require('./src/server/post');

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


app.post('/writePost', DBOperator.run);
app.get('/readPost', DBOperator.run);
app.post('/updatePost', DBOperator.run);
app.post('/deletePost', DBOperator.run);

app.post('/createCategory', DBOperator.run);
app.get('/readCategory', DBOperator.run);
app.post('/updateCategory', DBOperator.run);
app.post('/deleteCategory', DBOperator.run);

app.post('/createSection', DBOperator.run);
app.post('/createSection', DBOperator.run);
app.post('/createSection', DBOperator.run);
// app.get('/readCategoryList', DBOperator.run);

app.use(errorHandler.error404);
app.use(errorHandler.error500);

app.listen(3000);