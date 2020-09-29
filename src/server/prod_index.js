const express = require('express');
const path = require('path');
const app = express();

// previous code.
// //Server Side Rendering
// // After Apply Redux
// app.get('/*', (req, res) => {
//     res.sendfile(path.join(__dirname, '../index.html'));
// })

// // Before Apply Redux
app.use('/', express.static(path.resolve(__dirname, '../../build')));
app.get('*', (req, res, next) => {
    if (req.path.split('/')[1] === 'static') {
        return next();
    }
    console.log(__dirname);

    res.sendFile(path.resolve(__dirname, '../../build/index.html'));
});

app.listen(3000);

