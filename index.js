const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const app = express();

const errorHandler = require('./src/server/errors');
const DBOperator = require('./src/server/DBOperator');

/* body-parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* cookie-parser */
app.use(cookieParser());

/* session-store */
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    passward: '1135',
    database: 'sessions'
}
const sessionStore = new MySQLStore(options);

/* session */
app.use(session({
    key: '',
    secret: 'i am not a cat',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));


app.use('/source', express.static('./src/client'));
app.get('/', function (req, res) {
    fs.readFile('./src/client/lobby.html', function (err, data) {
        if (err) {
            res.status(404).send('Not Found');
        } else {
            res.status(200).send(data.toString());
        }
    })
})

app.get('/testTest', DBOperator.run);

app.post('/createPost', DBOperator.run);
app.get('/readPost', DBOperator.run);
app.post('/updatePost', DBOperator.run);
app.post('/deletePost', DBOperator.run);

app.get('/readCategoryEditor', DBOperator.run);
app.post('/updateCategoryEditor', DBOperator.run);

app.post('/createCategory', DBOperator.run);
app.get('/readCategory', DBOperator.run);
app.post('/updateCategory', DBOperator.run);
app.post('/deleteCategory', DBOperator.run);

app.get('/readSection', DBOperator.run);

app.use(errorHandler.error404);
app.use(errorHandler.error500);

app.listen(3000);