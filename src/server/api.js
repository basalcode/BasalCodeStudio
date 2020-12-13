/* express */
const express = require('express');
const app = express();

/* body parser */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* session */
const session = require('./session/session');
app.use(session);

/* api */
const apiMiddleware = require('./apiMiddleware');
const emailProcessor = require('./email/emailProcessor');
const requestProcessor = require('./db/requestProcessor');
const sessionProcessor = require('./session/sessionProcessor');
const errorHandler = require('./errors');

/* shared */
const log = require(process.cwd() + '/../shared/fancyLogger');

log.line.double(' # [ REQUEST ] # ');
log.message({ START: 'Request to API Server' })
log.line.double('');
log.print();

/* api */
app.use('/api/*', apiMiddleware);
// app.use('/api/email/:type', emailProcessor);
// app.use('/api/db/:type', requestProcessor);
// app.use('/api/session/:type', sessionProcessor);

/* error handler */
app.use((req, res, next) => {
    res.status(404).send('404 NOT FOUND!');
});
app.use((err, req, res, next) => {
    res.status(500).send('500 INTERNAL SERVER ERROR!');
});

app.listen(3030);