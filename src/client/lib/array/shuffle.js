const shuffle = (array) => {
    let originalArray = array.slice(0);
    let resultArray = [];
    let randomRange = array.length;

    for (let i = 0; i < array.length; i++) {
        let randomIndex = Math.floor(Math.random() * randomRange);

        resultArray[i] = originalArray[randomIndex];
        originalArray[randomIndex] = originalArray[randomRange - 1];

        randomRange--;
    }

    return resultArray;
}

export default shuffle;