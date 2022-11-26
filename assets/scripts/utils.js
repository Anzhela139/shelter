const randomArr = (arr) => arr.slice(0).sort((a, b) => 0.5 - Math.random());

const makeTwoDimensionalArray = (length, width, data) => {
    let arr = Array.from(Array(length), () => Array(width));
    let m = 0;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < width; j++) {
            arr[i][j] = (data[m]) ? data[m] : data[m - data.length];
            m++;
        }
    }
    return arr;
}

const fetchingPets = async (url) => {
    return fetch(`${url}assets/scripts/pets.json`).then(response => response.json())
        .catch(response => console.error(response))
}

const makeArray = (arr, limit, sliceNum) => {
    let arrResult = [];
    for (let i = 0; i < limit; i++) {
        arrResult[i] = randomArr(arr).slice(0, sliceNum);
    }
    return arrResult;
}

const setBtnActivity = ( first, second, isActive = false ) => {
    first.disabled = isActive;
    second.disabled = isActive;
    if(isActive) {
        first.classList.remove('inactive');
        second.classList.remove('inactive');
    } else {
        first.classList.add('inactive');
        second.classList.add('inactive');
    }
}

export {
    makeArray,
    randomArr,
    makeTwoDimensionalArray,
    setBtnActivity,
    fetchingPets
}