/* module */
import React, { useState, useEffect } from 'react';

/* lib */
import circle from 'lib/circle/circularFunction';

const CircleLayout = (props) => {
    /* state */
    const [contentStyle, setContentStyle] = useState({});
    const [componentStyle, setComponentStlye] = useState({});

    /* props */
    const elements = props.elements;
    const diameter = props.diameter;

    /* event handler */
    const onSelect = index => {
        props.onSelect(index);
    }

    /* useEffect */
    useEffect(() => {
        setComponentStlye({
            width: diameter + 'rem',
            height: diameter + 'rem'
        });

        const elementAmount = elements.length;
        const circlePositions = circle.getCirclePositions(diameter, elementAmount, false, 90);

        const elementDiameter = 5;

        const styles = [];
        for (let i = 0; i < elementAmount; i++) {
            styles.push({
                top: (circlePositions[i].y - (elementDiameter / 2)) + 'rem',
                left: (circlePositions[i].x - (elementDiameter / 2)) + 'rem',
            });
        }
        setContentStyle(styles);
    }, []);

    return (
        <div className="CircleLayout"
            style={componentStyle}>
            {Object.keys(elements).map((title, index) =>
                <div className="CircleLayout__category"
                    style={contentStyle[index]}
                    key={index}>
                    <h2 className="CircleLayout__category-title"
                        onClick={event => onSelect(index)}>
                        {elements[index]}
                    </h2>
                </div>
            )}
        </div>
    );
}

export default CircleLayout;