export default (function() {
    function removePixel(pixelValue) {
        let number = Number(pixelValue.split('px')[0]);
        if (isNaN(number)) {
            throw new Error('[Error] removaPixel: Invalid pixel value.');
        }
        return number;
    }

    function percentToPixel(percentage, parentSize) {
        let parentPixelValue = removePixel(parentSize);
        let ratio = parentPixelValue / 100;
        let result = ratio * percentage;

        if (!isInteger(result)) {
            throw new Error('[Error] removaPixel: Invalid result value.');
        }
        return result;
    }

    return {
        removePixel: removePixel,
        percentToPixel: percentToPixel
    }
})();