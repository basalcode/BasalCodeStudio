/* module */
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const ProgressBar = (props) => {
    /* store */
    const nightModeOn = useSelector(store => store.app.nightModeOn, []);

    /* props */
    const activated = props.activated;
    const percentage = props.percentage;

    /* state */
    const [animationOn, setAnimationOn] = useState(false);
    const [progressNumber, setProgressNumber] = useState(0);

    const [guageBarStyle, setGuageBarStyle] = useState({});
    const [guageBarBackgroundStyle, setGuageBarBackgroundStyle] = useState({});

    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    /* useRef */
    const progressBarRef = useRef(0);
    const progressGaugeRef = useRef(0);

    /* useEffect */
    // percentage change animation
    const progressBar = progressBarRef.current;
    useEffect(() => {
        if (activated) {
            const animationTimeout = 1000;
            setTimeout(() => {
                /* constant */
                const progressBarWidth = progressBar.offsetWidth;
                const borderSize = 4;

                const gaugeBarWidth = Math.floor(
                    (progressBarWidth - borderSize) / 100 * percentage
                );

                /* state */
                setAnimationOn(true);

                setGuageBarStyle({
                    width: gaugeBarWidth + 'px'
                });

            }, animationTimeout);

            /* constant */
            const diagonalDegree = '45deg';
            const diagonalLineWidth = 10;
            const diagonalLineColor = !nightModeOn ? 'hsl(33, 53%, 88%)' : 'hsl(159, 100%, 50%)';
            const reversalColor = !nightModeOn ? 'white' : 'hsl(152, 84%, 7%)';

            /* state */
            
            setProgressNumber(0);

            setGuageBarStyle({
                width: 0
            });

            setGuageBarBackgroundStyle({
                background: `repeating-linear-gradient(
                    ${diagonalDegree},
                    ${diagonalLineColor} 0px ${diagonalLineWidth}px,
                    ${reversalColor} ${diagonalLineWidth}px ${diagonalLineWidth * 2}px
                )`
            });
        }
    }, [activated]);

    // gaugebar gauge and finish animation
    useEffect(() => {
        if (animationOn) {
            const resizeEvent = new ResizeObserver(elements => {
                elements.forEach(element => {
                    /* constant */
                    const contentBoxSize = element.contentBoxSize[0];
                    const porgressBarWidth = progressBarRef.current.offsetWidth;
                    const gaugeBarWidth = contentBoxSize.inlineSize;

                    const borderSize = 4;
                    const currentPercentage = Math.ceil(
                        gaugeBarWidth / (porgressBarWidth - borderSize * 2) * 100
                    );

                    /* set state */
                    setProgressNumber(currentPercentage);

                    /* disconnect event */
                    if (currentPercentage === percentage) {
                        /* set props */
                        props.onFinished();

                        /* set state */
                        setAnimationOn(false);

                        setGuageBarBackgroundStyle({});
                        /* disconnect */
                        resizeEvent.disconnect(progressGaugeRef.current);
                    }
                });
            });
            resizeEvent.observe(progressGaugeRef.current);
        }
    }, [animationOn]);

    return (
        <div className="ProgressBar">
            <div className={"ProgressBar__progress-number " + 
                `${nightModeOn ? 
                    "ProgressBar__progress-number--night-mode" : ""} `}>
                {`${progressNumber} %`}
            </div>
            <div className={"ProgressBar__progress-bar " +
                    `${nightModeOn ? 
                        "ProgressBar__progress-bar--night-mode" : 
                        ""} `}
                ref={progressBarRef}>
                <div className={
                    `ProgressBar__progress-gauge ` +
                    `${percentage ?
                        "ProgressBar__progress-gauge--activated" :
                        ""} ` + 
                    `${nightModeOn ? 
                        "ProgressBar__progress-gauge--night-mode" : 
                        ""} `}
                    ref={progressGaugeRef}
                    style={guageBarStyle}>
                    <div className={
                        `ProgressBar__progress-gauge-background ` +
                        `${!activated ? nightModeOn ?
                            "ProgressBar__progress-gauge-background--off-night-mode" :
                            "ProgressBar__progress-gauge-background--off" :
                            "ProgressBar__progress-gauge-background--on" } `}
                        style={guageBarBackgroundStyle}>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProgressBar;