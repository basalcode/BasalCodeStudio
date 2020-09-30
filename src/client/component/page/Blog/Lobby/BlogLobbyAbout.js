/* module */
import React from 'react';
import { useSelector } from 'react-redux';

const BlogLobbyAbout = () => {
    /* store */
    const pageIndex = useSelector(store => store.blog.index, []);
    
    /* constant */
    const textArray = [
        '이해하기 어려운 복잡함 속에서',
        '단순함을 추구하는 것.',
        '압도적인 동작이',
        '한줄의 코드로 맺어지는 순간의 짜릿함을 알기에,',
        '오늘도 새로운 세미콜론을 새겨넣기 위해 모험하는',
        'BasalCodeStudio에 오신 것을 환영합니다.'
    ];

    return (
        <section className="BlogLobbyAbout">
            <div className="BlogLobbyAbout__container">
                <div className="BlogLobbyAbout__content">
                    <article className= {
                            `BlogLobbyAbout__about ` + 
                            (pageIndex === 1 ?
                            `BlogLobbyAbout__about--appear` :
                            `BlogLobbyAbout__about--disappear`)
                            }>
                        <h1 className="BlogLobbyAbout__about-title">ABOUT</h1>
                        <p className="BlogLobbyAbout__about-paragraph">
                            {textArray.map(text => (
                                <div className="BlogLobbyAbout__about-text">
                                    {text}
                                </div>
                            ))}
                        </p>
                    </article>
                </div>
                <section className="
                    BlogLobbyAbout__content
                    BlogLobbyAbout__picture
                "></section>
            </div>
        </section>
    );
}

export default BlogLobbyAbout;