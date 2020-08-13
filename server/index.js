const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.get('/hello', function (req, res) {
    res.send({
        result: 'Hello'
    });
})

app.listen(3001);