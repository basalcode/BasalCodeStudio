const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

/* body-parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/post', express.static('./src'));

app.get('/', function (req, res) {
    if (req.headers['x-forwarded-proto' === 'http']) {
        res.redirect(301, 'https://basalcode.space');
    } else {
        fs.readFile('./src/blogMain.html', function (err, data) {
            if (err) {
                res.status(404).send('Not Found');
            } else {
                res.status(200).send(data.toString());
            }
        })
    }
})

app.post('/writePost', function (req, res) {
    res.send({
        result: req.body
    });
})

app.listen(3000);