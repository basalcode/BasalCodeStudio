 const parser = (function() {
    function removePixel(string) {
        if (Number(string)) {
            throw new Error('[Error] removaPixel: The \'string\'value is a number.');
        }
        
        let number = Number(string.split('px')[0]);
        if (isNaN(number)) {
            throw new Error('[Error] removaPixel: Invalid string value.');
        }
        return number;
    }

    function percentToPixel(percentage, size) {
        if (isNaN(Number(percentage))) {
            throw new Error('[Error] removaPixel: Percentage value should be a number.');
        }

        let parentPixelValue = isNaN(Number(size)) ? removePixel(size) : size
        let ratio = parentPixelValue / 100;
        let result = ratio * percentage;

        if (isNaN(Number(percentage))) {
            throw new Error('[Error] removaPixel: Invalid result value.');
        }
        return result;
    }

    return {
        removePixel: removePixel,
        percentToPixel: percentToPixel
    }
})();

export default parser;