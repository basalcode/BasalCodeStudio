import stringParser from './stringParser.js';

export default (function () {
    function getHeight(element) {
        return stringParser.removePixel(element.style.height);
    }

    function getWidth(element) {
        return stringParser.removePixel(element.style.width);
    }

    function center(element, parent) {
        centerX(element, parent);
        centerY(element, parent);
    }
    
    function centerX(element, parent) {
        let xCordination = centeredXCordinate(element, parent)
        console.log(xCordination);
        element.style.left = xCordination + 'px';
    }
    
    function centerY(element, parent) {
        let yCordination = centeredYCordinate(element, parent);
        element.style.top = yCordination + 'px';
    }

    function centeredCordinates(element) {
        return [
            centeredXCordinate(element),
            centeredYCordinate(element)
        ];
    }

    function centeredXCordinate(element, parent) {
        let parentWidth = stringParser.removePixel(parent.style.width);
        let width = stringParser.removePixel(element.style.width);
        let xCordination = (parentWidth - width) / 2;
        
        return xCordination;
    }

    function centeredYCordinate(element, parent) {
        let parentHeight = stringParser.removePixel(parent.style.height);
        let height = stringParser.removePixel(element.style.height);
        let yCordination = (parentHeight - height) / 2;

        return yCordination;
    }

    function aboveViewport(element) {
        let height = stringParser.removePixel(element.style.height);
        element.style.top = (height * -1) + 'px';
    }

    function belowViewport(element) {
        let height = stringParser.removePixel(element.style.height);
        element.style.bottom = (height * -1) + 'px';
    }

    function leftViewport(element) {
        let width = stringParser.removePixel(element.style.width);
        element.style.right = (width * -1) + 'px';
    }

    function rightViewport(element) {
        let width = stringParser.removePixel(element.style.width);
        element.style.right = (width * -1) + 'px';
    }

    return {
        getHeight: getHeight,
        getWidth: getWidth,
        center: center,
        centerX: centerX,
        centerY: centerY,
        centeredCordinates: centeredCordinates,
        centeredXCordinate: centeredXCordinate,
        centeredYCordinate: centeredYCordinate,
        aboveViewport: aboveViewport,
        belowViewport: belowViewport,
        leftViewport: leftViewport,
        rightViewport: rightViewport,
        
    }
})();