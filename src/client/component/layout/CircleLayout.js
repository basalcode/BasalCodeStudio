/* module */
import React, { useState, useEffect } from 'react';

/* lib */
import circle from 'lib/circle/circularFunction';

const CircleLayout = (props) => {
    const [contentStyle, setContentStyle] = useState([]);

    const elements = props.elements;
    // console.log('elements', elements)
    const elementAmount = elements.length;

    const diameter = 500;

    const onSelectChange = event => {
        const target = event.target;
        props.onSelectChange(target.key);
    }

    useEffect(() => {
        const multiplyPosition = 3;
        const positionAmount = elementAmount * multiplyPosition;

        const circlePositions = circle.getCirclePositions(diameter, positionAmount, false, 90);
        const radius = diameter / 2;
        console.log(circlePositions);

        const frameInterval = 2000;

        let positionIndex = 0;
        setInterval(() => {
            let newStyles = [];
            for (let i = 0; i < elementAmount; i++) {
                const elementIndex = 
                    (i * multiplyPosition + positionIndex) % positionAmount;
                console.log('=====elementIndex=====', elementIndex);

                const top = `${(circlePositions[elementIndex].y + radius) + 'px'}`;
                const left = `${(circlePositions[elementIndex].x + radius) + 'px'}`;
                const interval = `${frameInterval / 1000}`;

                console.log('[top, left]', top, left);

                const style = {
                    top: top,
                    left: left,
                    transition: `top ${interval}s, left ${interval}s`
                };
                newStyles.push(style);
            }
            positionIndex = (positionIndex + 1) % positionAmount;
            console.log('newStyles', newStyles);
            
            setContentStyle(newStyles);
        }, frameInterval);
    }, [])

    return (
        <div className="CircleLayout">
            {Object.keys(elements).map((title, index) =>
                <div className="CircleLayout__category"
                    style={contentStyle[index]}
                    key={index}
                    onClick={onSelectChange}>
                    <h2 className="CircleLayout__category-title">
                        {elements[index]}
                    </h2>
                </div>
            )}
        </div>
    );
}

export default CircleLayout;