/* module */
import React from 'react';

const BlogLobbyAbout = () => {
    const textArray = [
        '이해하기 어려운 복잡함 속에서 단순함을 추구하는 것.',
        '압도적인 동작이 한줄의 코드로 맺어지는 순간의 짜릿함을 알기에,',
        '오늘도 새로운 세미콜론을 새겨넣기 위해 모험하는',
        'BasalCodeStudio에 오신 것을 환영합니다.'
    ]

    return (
        <section className="BlogLobbyAbout">
            <h1 className="BlogLobbyAbout__title">Intro</h1>
            <p className="BlogLobbyAbout__paragraph">
                {textArray.map(text => (
                    <span className="BlogLobbyAbout__text">
                        {text}
                    </span>
                ))}
            </p>
        </section>
    );
}

export default BlogLobbyAbout;