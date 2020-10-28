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

        const formData = {
            senderEmail: email,
            senderName: name,
            subject: subject,
            message: message
        }

        fetch('/mail', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(parsed => console.log(parsed));
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
                                name="email"
                                value={email}
                                placeholder="your email"
                                autoComplete="off"
                                onChange={onEmailChange} />
                            <input className="BlogLobbyContact__text"
                                type="text"
                                name="name"
                                value={name}
                                placeholder="your name"
                                autoComplete="off"
                                onChange={onNameChange} />
                            <input className="BlogLobbyContact__text"
                                type="text"
                                name="subject"
                                value={subject}
                                placeholder="subject"
                                autoComplete="off"
                                onChange={onSubjectChange} />
                            <textarea className="
                                    BlogLobbyContact__text
                                    BlogLobbyContact__text-area"
                                name="message"
                                value={message}
                                placeholder="message"
                                autoComplete="off"
                                onChange={onMessageChange} />
                            <input className="BlogLobbyContact__submit"
                                type="submit"
                                value="Send Email" />
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