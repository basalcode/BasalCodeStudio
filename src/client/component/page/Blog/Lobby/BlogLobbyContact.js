/* module */
import React, { useState } from 'react';

const BlogLobbyContact = () => {
    /* state */
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    /* event handler */
    const onEmailChange = event => {
        setEmail(event.target.value);
    }

    const onNameChange = event => {
        const value = event.target.value;
        setName(value);
    }

    const onTitleChange = event => {
        const value = event.target.value;
        setTitle(value);
    }

    const onMessageChange = event => {
        const value = event.target.value;

        console.log(event.target.ctrlKey);
        console.log(event.target.keycode);
        setMessage(value);
    }

    const onSubmitClick = event => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData();

        /* form.forEach(element => {
            formData.append(element.name, element.value);
        }); */
    }

    return (
        <section className="BlogLobbyContact">
            <div className="BlogLobbyContact__container">
                <section className="BlogLobbyContact__content"></section>
                <section className="BlogLobbyContact__content">
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
                                name="title"
                                value={title}
                                placeholder="title"
                                autoComplete="off"
                                onChange={onTitleChange} />
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
            </div>
        </section>
    );
}

export default BlogLobbyContact;

/*

*/