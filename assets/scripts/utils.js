const randomArr = (arr) => arr.slice(0).sort((a, b) => 0.5 - Math.random());

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

const setBtnActivity = ( btn, isActive = false ) => {
    btn.disabled = isActive;
    if(isActive) {
        btn.classList.add('inactive');
    } else {
        btn.classList.remove('inactive');
        
    }
}

export {
    makeArray,
    randomArr,
    setBtnActivity,
    fetchingPets
}