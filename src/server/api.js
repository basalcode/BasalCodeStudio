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
const requestProcessor = require('./db/requestProcessor');
const sessionProcessor = require('./session/sessionProcessor');
const errorHandler = require('./errors');

/* nodemailer */
const nodemailer = require('nodemailer');

/* private */
const oAuth2 = require('../../.private/oAuth2');
const email = require('../../.private/email');

/* api */
app.use('/mail', function (req, res) {
    const ServerEmail = email.serverEmail;

    /* option */
    let body = req.body;
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        secure: true,
        auth: {
            type: 'OAuth2',
            user: ServerEmail,
            clientId: oAuth2.clientId,
            clientSecret: oAuth2.clientSecret,
            refreshToken: oAuth2.refreshToken,
            accessToken: oAuth2.accessToken,
            expires: 3600
        }
    });

    /* send mail to sender */
    let mailToSender = {
        from: ServerEmail,
        to: body.senderEmail,
        subject: 'Test email',
        html: `<p>This message is for testing</p>`
    }

    transporter.sendMail(mailToSender, (err, info) => {
        if (err) {
            console.log(`[Error occured] ${err.message}`);
            return process.exit(1);
        }

        console.log(`[Message sent] ${info.messageId}`);
    });

    res.send({ result: 'response test' });
});

app.use('/api/:dbType/:inputType/:contentType', requestProcessor);
app.use('/auth/:inputType/:session', sessionProcessor);

app.listen(3030);