/* module */
import React, { useState, useEffect } from 'react';

const CircleLayout = (props) => {
    const [contentStyle, setContentStyle] = useState({});

    const contents = props.contents;
    const contentCount = Object.keys(contents).keys;

    const size = '500px';

    const onSelectChange = event => {
        const target = event.target;
        props.onSelectChange(target.key);
    }


    useEffect(() => {
        const elementAmount = contents.length;
        const multiplyPosition = 3;
        const positionAmount = elementAmount * multiplyPosition;

        const getCirclePositions = (diameter, amount) => {
            const maxAngle = toRadian(360);
            const angleInterval = maxAngle / amount;
            const radius = diameter / 2;

            let circlePositions = [];

            for (let degree = 0; degree < maxAngle; degree += angleInterval) {
                const circlePosition = getCirclePosition(degree, radius);
                circlePositions.push(circlePosition);
            }

            return circlePositions;
        }

        const getCirclePosition = (degree, radius) => {
            const x = Math.floor(Math.cos(degree) * radius);
            const y = Math.floor(Math.sin(degree) * radius);

            return { x: x, y: y };
        }

        const toRadian = (degree) => {
            return degree * (Math.PI / 180);
        }

        const circlePositions = getCirclePositions(size, positionAmount);

        const frameInterval = 1000;

        let positionIndex = 0;
        setInterval(() => {
            let newStyles = [];
            for (let i = 0; i < elementAmount; i++) {
                const elementIndex = i * multiplyPosition + positionIndex;

                const top = `${circlePositions[elementIndex].y}`;
                const left = `${circlePositions[elementIndex].x}`;
                const interval = "0.2";

                const newStyle = {
                    position: 'absolute',
                    top: top,
                    left: left,
                    transition: `top ${interval}s, left ${interval}s`
                };
                newStyles.push(newStyle);
            }
            setContentStyle(newStyles);

            positionIndex = (positionIndex + 1) % positionAmount;
        }, frameInterval);
    }, [])

    return (
        <div className="CircleLayout">
            {Object.keys(contents).map((title, index) =>
                <div className="CircleLayout__section"
                    style={contentStyle}
                    key={index}
                    onClick={onSelectChange}>
                    <h2 className="CircleLayout__section-title">
                        {contentCount[index]}
                    </h2>
                </div>
            )}
        </div>
    );
}

export default CircleLayout;


/*
{Object.keys(skillsObjects).map((title, index) =>
    <div className="BlogLobbySkills__content"
        key={index}>
        <h2 className="BlogLobbySkills__content-title">
            {title}
        </h2>
        <div className="BlogLobbySkills__content-body-container">
            {skillsObjects[title].map((content, index) =>
                <div className="BlogLobbySkills__content-body"
                    key={index}>
                    <img className="BlogLobbySkills__logo"
                        src={content.imagePath} />
                    <div className="BlogLobbySkills__text">
                        {content.text}
                    </div>
                </div>
            )}
        </div>
    </div>
)
*/