/* nodemailer */
const nodemailer = require('nodemailer');

/* private */
const oAuth2 = require('../../../.private/security/oAuth2');
const email = require('../../../.private/security/email');

module.exports = (request, response) => {
    const type = request.params.type;

    const route = {
        auth() {
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

            request.session.emailAuthKey = authKey;

            /* send mail to sender */
            let SenderEmail = request.query.email;
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
            console.log('test');

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
                    response.status(200).send({
                        validity: true,
                        message: 'The server has sent the email successfully.',
                        code: 1
                    });
                }, () => {
                    response.status(500).send({
                        validity: false,
                        message: 'An error has occurred during a sending email.',
                        code: 3
                    });
                });
        },
        send() {
            let inputAuthKey = request.body.authKey;
            let sessionAuthKey = request.session.emailAuthKey;
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
                let formData = request.body.formData;
                let mailToRecipient = {
                    from: ServerEmail,
                    to: RecipientEmail,
                    subject: formData.subject,
                    html: `
                        <h1>[Subject]: ${formData.subject}</h1>
                        <h2>[Sender Information]</h2>
                        <p>
                        Email: ${formData.email}
                        <br />
                        Name: ${formData.name}
                        </p>
                        <h2>[Message]</h2>
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
                        request.session.emailAuthKey = null;

                        response.status(200).send({
                            validity: true,
                            message: 'The server has sent the email successfully.',
                            code: 1
                        });
                    }, () => {
                        response.status(500).send({
                            validity: false,
                            message: 'An error has occurred during a sending email.',
                            code: 2
                        });
                    });
            } else {
                response.status(400).send({
                    validity: false,
                    message: 'The authentication value is not the correct key.',
                    code: 3
                });
            }
        }
    }

    route[type]();
    console.log('test');
}