const circularFunctions = (() => {
    const toRadian = (degree) => {
        return degree * (Math.PI / 180);
    }

    const getCirclePosition = (degree, radius) => {
        const x = Math.floor(Math.cos(degree) * radius);
        const y = Math.floor(Math.sin(degree) * radius);

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

        let degree = angleStart;
        for (let i = 0; i < amount; i++) {
            degree = (degree + angleInterval) % angleRange;

            const circlePosition = getCirclePosition(degree, radius);
            if (!clockwise) { circlePosition.y = -circlePosition.y; }

            circlePositions.push(circlePosition);
        }

        return circlePositions;
    }

    return {
        toRadian: toRadian,
        getCirclePosition: getCirclePosition,
        getCirclePositions: getCirclePositions
    };
})();

export default circularFunctions;