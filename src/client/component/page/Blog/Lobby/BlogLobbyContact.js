/* module */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';

const BlogLobbyContact = (props) => {
    /* store */
    const pageIndex = useSelector(store => store.blog.index, []);
    const nightModeOn = useSelector(store => store.app.nightModeOn, []);

    /* state */
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [authKey, setAuthKey] = useState('');

    const [submitLock, setSubmitLock] = useState(false);
    const [authEmailSent, setAuthEmailSent] = useState(false);

    const [submitButtonDown, setSubmitButtonDown] = useState(false);

    const [formMessage, setFormMessage] = useState('나누고 싶은 얘기가 있다면 문의주세요 :)');
    const [formError, setFormError] = useState(false);

    /* event handler */
    const onEmailChange = event => {
        const value = event.target.value;

        setEmail(value);
    }

    const onNameChange = event => {
        const value = event.target.value;

        setName(value);
    }

    const onSubjectChange = event => {
        const value = event.target.value;

        setSubject(value);
    }

    const onMessageChange = event => {
        const value = event.target.value;

        setMessage(value);
    }

    const onSubmitClick = event => {
        event.preventDefault();

        if (!submitLock) {
            /* lock */
            setSubmitLock(true);

            /* error */
            const errorHandler = (message) => {
                setFormMessage(message);
                setFormError(true);
                setSubmitLock(false);
            }

            if (email === '') {
                return errorHandler('이메일을 입력해주세요.');;
            }
            if (name === '') {
                return errorHandler('이름을 입력해주세요.');;
            }
            if (subject === '') {
                return errorHandler('주제를 입력해주세요.');;
            }
            if (message === '') {
                return errorHandler('메세지를 입력해주세요.');;
            }

            setFormMessage('요청중입니다...');
            setFormError(false);
            
            if (!authEmailSent) {
                axios(`/email/auth?email=${email}`)
                    .then(response => {
                        console.log('response', response);

                        if (response.validity) {
                            setAuthEmailSent(true);

                            setFormMessage('입력한 메일로 인증코드가 발송되었습니다.');
                            setFormError(false);
                        } else {
                            alert('[에러] 인증 메일 전송이 실패했습니다. 관리자에게 문의하세요.');
                        }

                        /* unlock */
                        setSubmitLock(false);
                    });
            } else {
                const emailSendData = {
                    authKey: authKey,
                    formData: {
                        email: email,
                        name: name,
                        subject: subject,
                        message: message
                    }
                }

                axios.post(`/email/send`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(emailSendData)
                })
                    .then(response => response.json())
                    .then(parsed => {
                        if (parsed.validity) {
                            setEmail('');
                            setName('');
                            setSubject('');
                            setMessage('');
                            setAuthKey('');

                            setAuthEmailSent(false);

                            setFormMessage('메일이 성공적으로 전송되었습니다!');
                            setFormError(false);
                        } else {
                            const statusCode = {
                                FailToSendEmail: 2,
                                WrongAuthKey: 3
                            }

                            if (parsed.code === statusCode.FailToSendEmail) {
                                alert('[에러] 이메일 전송이 실패했습니다. 관리자에게 문의하세요.');
                                setFormError(false);
                                return;
                            }

                            if (parsed.code === statusCode.WrongAuthKey) {
                                setAuthKey('');

                                setFormMessage('입력하신 키가 올바르지 않습니다.');
                                setFormError(true);
                            }
                        }

                        /* unlock */
                        setSubmitLock(false);
                    });
            }
        } else {
            setFormMessage('메일이 전송 중입니다.');
            setFormError(true);
        }
    }

    const onAuthKeyChange = event => {
        event.preventDefault();

        const value = event.target.value;

        setAuthKey(value);
    }

    const onSubmitButtonDown = event => {
        event.preventDefault();

        setSubmitButtonDown(true);
    }

    const onSubmitButtonUp = event => {
        event.preventDefault();

        setSubmitButtonDown(false);
    }

    return (
        <section className="BlogLobbyContact">
            <div className="BlogLobbyContact__container">
                <section className={"BlogLobbyContact__content " +
                    "BlogLobbyContact__content-frame " +
                    `${pageIndex === props.index ?
                        "BlogLobbyContact__content--appear " :
                        "BlogLobbyContact__content--disappear "}`}>
                    <div className="BlogLobbyContact__contact">
                        <h1 className="BlogLobbyContact__title">Contact</h1>
                        <form className="BlogLobbyContact__form"
                            onSubmit={onSubmitClick}>
                            <input className="BlogLobbyContact__text"
                                type="text"
                                value={email}
                                placeholder="Your email"
                                autoComplete="off"
                                onChange={onEmailChange} />
                            <input className="BlogLobbyContact__text"
                                type="text"
                                value={name}
                                placeholder="Your name"
                                autoComplete="off"
                                onChange={onNameChange} />
                            <input className="BlogLobbyContact__text"
                                type="text"
                                value={subject}
                                placeholder="Subject"
                                autoComplete="off"
                                onChange={onSubjectChange} />
                            <textarea className="
                                    BlogLobbyContact__text
                                    BlogLobbyContact__text-area"
                                value={message}
                                placeholder="Message"
                                autoComplete="off"
                                onChange={onMessageChange} />
                            <div className={`BlogLobbyContact__form-message ` +
                                `${formError ?
                                    "BlogLobbyContact__form-message--error" : ""} ` +
                                `${nightModeOn ? 
                                    "BlogLobbyContact__form-message--night-mode" : ""} `}>
                                {formMessage}
                            </div>
                            <div className="BlogLobbyContact__submit-container">
                                <input className={`BlogLobbyContact__submit ` +
                                    `${authEmailSent ?
                                        "BlogLobbyContact__submit--email-sent" :
                                        ""} ` +
                                    `${submitButtonDown ?
                                        "BlogLobbyContact__submit--down" :
                                        ""}`}
                                    type="submit"
                                    value={authEmailSent ?
                                        "Send Email" :
                                        "Check Email"}
                                    onMouseDown={onSubmitButtonDown}
                                    onMouseUp={onSubmitButtonUp} />
                                <input className={`BlogLobbyContact__auth-key ` +
                                    `${authEmailSent ?
                                        "BlogLobbyContact__auth-key--on " :
                                        ""}`}
                                    type="text"
                                    value={authKey}
                                    placeholder="Auth Key"
                                    autoComplete="off"
                                    onChange={onAuthKeyChange} />
                            </div>
                        </form>
                    </div>
                </section>
                <section className="
                    BlogLobbyContact__content 
                    BlogLobbyContact__image-display
                "></section>
            </div>
        </section>
    );
}

export default BlogLobbyContact;