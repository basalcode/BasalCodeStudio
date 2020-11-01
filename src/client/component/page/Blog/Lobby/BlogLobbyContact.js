/* module */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const BlogLobbyContact = (props) => {
    /* store */
    const pageIndex = useSelector(store => store.blog.index, []);

    /* state */
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [authKey, setAuthKey] = useState('');

    const [submitLock, setSubmitLock] = useState(false);
    const [authEmailSent, setAuthEmailSent] = useState(false);

    const [submitButtonDown, setSubmitButtonDown] = useState(false);

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
            
            if (!authEmailSent) {
                fetch(`/email/auth?email=${email}`)
                    .then(response => response.json())
                    .then(parsed => {
                        if (parsed.validity) {
                            setAuthEmailSent(true);
                        } else {
                            alert('[Error] Failed to send a authentication email. Please try it again later.');
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

                fetch(`/email/send`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(emailSendData)
                })
                    .then(response => response.json())
                    .then(parsed => {
                        console.log('communication result');

                        if (parsed.validity) {
                            setEmail('');
                            setName('');
                            setSubject('');
                            setMessage('');
                            setAuthKey('');

                            setAuthEmailSent(false);

                            window.alert('[Message] Email has been successfully sent!');
                        } else {
                            const statusCode = {
                                FailToSendEmail: 2,
                                WrongAuthKey: 3
                            }

                            if (parsed.code === statusCode.FailToSendEmail) {
                                alert('[Error] Failed to send the email. Please try it again later.');
                                return;
                            }

                            if (parsed.code === statusCode.WrongAuthKey) {
                                setAuthKey('');

                                alert('[Error] Your auth key is not match.');
                            }
                        }
                        
                        /* unlock */
                        setSubmitLock(false);
                    });
            }
        } else {
            alert('[Error] You have already submit the email');
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
                <section className={`BlogLobbyContact__content ` +
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
                <section className="BlogLobbyContact__content"></section>
            </div>
        </section>
    );
}

export default BlogLobbyContact;