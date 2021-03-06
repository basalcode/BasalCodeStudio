const circularFunctions = (() => {
    /* function */
    const toRadian = (degree) => {
        return degree * (Math.PI / 180);
    }

    const getCosineX = (degree, radius) => {
        return Math.floor(Math.cos(degree) * radius);
    }

    const getSineY = (degree, radius) => {
        return Math.floor(Math.sin(degree) * radius);
    }

    const getCirclePosition = (degree, radius) => {
        const x = getCosineX(degree, radius);
        const y = getSineY(degree, radius);

        return { x: x, y: y };
    }
    
    const getCirclePositions = (
            diameter, amount, clockwise = true, startDegree = 0, maxAngle = 360
        ) => {
        const angleRange = toRadian(maxAngle);
        const angleStart = toRadian(startDegree);
        const angleInterval = angleRange / amount;
        const radius = diameter / 2;

        const circlePositions = [];

        let degree = clockwise ? angleStart : -angleStart;
        for (let i = 0; i < amount; i++) {
            const circlePosition = getCirclePosition(degree, radius);
            
            circlePosition.x = circlePosition.x + radius;
            circlePosition.y = circlePosition.y + radius;
            circlePositions.push(circlePosition);

            degree = clockwise ? 
                (degree + angleInterval) % angleRange :
                (degree - angleInterval) % angleRange;
        }

        return circlePositions;
    }

    return {
        toRadian: toRadian,
        getCosineX: getCosineX,
        getSineY: getSineY,
        getCirclePosition: getCirclePosition,
        getCirclePositions: getCirclePositions
    };
})();

export default circularFunctions;