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

    const [emailSent, setEmailSent] = useState(false);

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

        if (!emailSent) {
            fetch(`/email/verification?email=${email}`)
            .then(response => response.json())
            .then(parsed => {
                if (parsed.validity) {
                    setEmailSent(true);
                } else {
                    window.alert('[Error] Failed to send a verification email. Please try it again later.');
                }
            });
        } else {
            fetch(`/email/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    authKey: authKey,
                    formData: {
                        email: email,
                        name: name,
                        subject: subject,
                        message: message
                    }
                }
            })
            .then(response => response.json())
            .then(parsed => {
                if (parsed.validity) {
                    setEmail('');
                    setName('');
                    setSubject('');
                    setMessage('');
                    setAuthKey('');

                    setEmailSent(false);

                    window.alert('[Message] Email has been successfully sent!');
                } else {
                    const statusCode = {
                        FailToSendEmail: 2,
                        WrongAuthKey: 3
                    }

                    if (parsed.code === statusCode.FailToSendEmail) {
                        window.alert('[Error] Failed to send a verification email. Please try it again later.');
                        return;
                    }
                    if (parsed.code === statusCode.WrongAuthKey) {
                        setAuthKey('');

                        window.alert('[Error] Your auth key is not match.');
                        return;
                    }
                }
            });
        }
    }

    const onVerificationCodeChange = event => {
        event.preventDefault();

        const value = event.target.value;

        setAuthKey(value);
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
                                    emailSent ? 
                                        "BlogLobbyContact__submit--email-sent" :
                                        ""}
                                    type="submit"
                                    value="Send Email" />
                                <input className={`BlogLobbyContact__auth-key ` + 
                                    emailSent ?
                                        "BlogLobbyContact__auth-key--on " :
                                        ""}
                                    type="text"
                                    value={authKey}
                                    placeholder="Verification Code"
                                    autoComplete="off"
                                    onChange={onVerificationCodeChange} />
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

/*

*/