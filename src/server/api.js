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
app.get('/email/verification', (req, res) => {
    const ServerEmail = email.serverEmail;

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

    const authKeyLength = 6;
    const authChars = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ];

    let authKey = '';
    for (let i = 0; i < authKeyLength; i++) {
        const randomIndex = Math.floor(Math.random() * authChars.length);
        const randomChar = authChars[randomIndex];

        authKey += randomChar;
    }

    req.session.emailAuthKey = authKey;

    /* send mail to sender */
    let SenderEmail = req.query.email;
    let mailToSender = {
        from: ServerEmail,
        to: SenderEmail,
        subject: '[BasalCodeStudio] 이메일이 본인 소유의 계정인지 확인해주세요.',
        html: `
            <h1>BasalCodeStudio_</h1>
            <p>안녕하세요. BasalCode 입니다.
            <br /><br />
            이 메일은 BasalCodeStudio에 입력해주신 메일의 계정 확인을 위해 작성되었습니다.
            <br />
            다음의 <b>인증번호</b>를 입력하시면 메일의 전송이 완료됩니다.
            <br /><br />
            인증번호:
            <h2>${authKey}</h2>
            보내주신 메일은 꼼꼼히 검토하여 빠른 시일내로 답신 드리겠습니다.
            <br /><br />
            응원합니다.
            <br />
            BasalCode</p>`
    }
    
    const sendVerificationEmail = () => {
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailToSender, (err, info) => {
                if (err) {
                    console.log(`[Error occured] ${err.message}`);
                    reject();
                }

                console.log(`[Message sent] ${info.messageId}`);
                resolve();
            });
        })
    }

    sendVerificationEmail()
    .then(() => {
        res.status(200).send({
            validity: true,
            message: 'The server has sent the email successfully.',
            code: 1
        });
    }, () => {
        res.status(500).send({
            validity: false,
            message: 'An error has occurred during a sending email.',
            code: 2
        });
    });
});

app.post('/email/send', (req, res) => {
    let inputAuthKey = req.body.authKey;
    let sessionAuthKey = req.session.emailAuthKey;
    if (inputAuthKey === sessionAuthKey) {
        const ServerEmail = email.serverEmail;
        const RecipientEmail = email.recipientEmail

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

        /* send mail to recipient */
        let formData = req.body.formData;
        let mailToRecipient = {
            from: ServerEmail,
            to: RecipientEmail,
            subject: formData.subject,
            html: `
            <h1>${formData.subject}</h1>
            <h2>발신자 정보</h2>
            <p>
            Email: ${formData.email}
            <br />
            Name: ${formData.name}
            </p>
            <h2>내용</h2>
            <p>${formData.message}</p>`
        }

        const sendEmailToRecipient = () => {
            return new Promise((resolve, reject) => {
                transporter.sendMail(mailToRecipient, (err, info) => {
                    if (err) {
                        console.log(`[Error occured] ${err.message}`);
                        reject();
                    }

                    console.log(`[Message sent] ${info.messageId}`);
                    resolve();
                });
            })
        }

        sendEmailToRecipient()
        .then(() => {
            req.session.emailAuthKey = null;

            res.status(200).send({
                validity: true,
                message: 'The server has sent the email successfully.',
                code: 1
            });
        }, () => {
            res.status(500).send({
                validity: false,
                message: 'An error has occurred during a sending email.',
                code: 2
            });
        });

        
    } else {
        res.status(400).send({
            validity: false,
            message: 'The authentication value is not the correct key.',
            code: 3
        });
    }
});

app.use('/api/:dbType/:inputType/:contentType', requestProcessor);
app.use('/auth/:inputType/:session', sessionProcessor);

/* error handler */
app.use((req, res, next) => {
    res.status(404).send('404 NOT FOUND!');
});
app.use((err, req, res, next) => {
    res.status(500).send('500 INTERNAL SERVER ERROR!');
});

app.listen(3030);