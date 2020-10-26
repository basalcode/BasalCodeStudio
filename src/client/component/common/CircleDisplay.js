/* module */
import React, { useState, useEffect } from 'react';

/* lib */
import circle from 'lib/circle/circularFunction';

const CircleDisplay = (props) => {
    /* props */
    const activated = props.activated;
    const reset = props.reset;
    const elements = props.elements;
    const diameter = props.diameter;

    /* state */
    const [currentSelected, setCurrentSelected] = useState(-1);

    const [contentStyle, setContentStyle] = useState({});
    const [componentStyle, setComponentStlye] = useState({});

    /* event handler */
    const onSelect = index => {
        if (activated) {
            setCurrentSelected(index);
            props.onSelect(index);
        }
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
        const manualAdjustment = 0.2;

        const styles = [];
        for (let i = 0; i < elementAmount; i++) {
            styles.push({
                top: (circlePositions[i].y - (elementDiameter / 2)) - manualAdjustment + 'rem',
                left: (circlePositions[i].x - (elementDiameter / 2)) + 'rem',
            });
        }
        setContentStyle(styles);
    }, []);

    // reset
    useEffect(() => {
        if (reset) {
            setCurrentSelected(-1);
        }
    }, [reset]);

    return (
        <div className="CircleDisplay"
            style={componentStyle}>
            {Object.keys(elements).map((title, index) =>
                <div className={`CircleDisplay__category ` +
                    `${index === currentSelected &&
                    "CircleDisplay__category--selected "}`}
                    style={contentStyle[index]}
                    key={index}
                    onClick={event => onSelect(index)}>
                    <div className="CircleDisplay__category-title">
                        {elements[index]}
                    </div>
                </div>
            )}
            <div className="CircleDisplay__inner-line"></div>
        </div>
    );
}

export default CircleDisplay;