const $menuBurgerBtn = document.querySelector("#menu-burger");
const $menu = document.querySelector(".header-menu");
const $logo = document.querySelector('.logo_wrapper');

const $fade = document.querySelector('.fade-off');
const $cardPopup = document.querySelector('.card-popup');
const $cardWrapper = document.querySelector('.cards_carousel');
$menuBurgerBtn.addEventListener('click', () => {
    if (document.querySelector(".menu-open")) {$menu.classList.add('menu-close')};
    $menu.classList.toggle('menu-open');
    $menuBurgerBtn.classList.toggle('menu-burger-rotate');

    if (!document.querySelector(".fade-on")) {
        $fade.classList.add('fade-on');
    }
    else {
        $fade.classList.remove('fade-on');
    }

    $fade.addEventListener('click', () => {
        $menu.classList.toggle('menu-open');
        $menuBurgerBtn.classList.toggle('menu-burger-rotate');
        $fade.classList.remove('fade-on');
        $burgerSpans.forEach(item => {
            item.classList.toggle('menu-burger-rotate-span');
        });
    })
})

const randomizer = (max, min) => Math.ceil(Math.random() * (max - min) + min); 
const randomArr = (arr) => arr.slice(0).sort( (a,b)=> 0.5-Math.random()); 
function makeArr48 (arrInc, arrResult, func, limit){
    if (arrResult.length < limit) {
        arrResult.push([func(arrInc)]);
        return makeArr48(arrInc, arrResult, func, limit);
    }
    else {
        return arrResult.flat();
    }

}; 

const makeArrConsistent =  (arr, itemA, itemD, index) => {
    arr.splice(arr.indexOf(itemD), 1);
    if (index === 'prev') {
        arr.push(itemA);
        console.log(itemA)
        console.log(itemD)
    }
    else if (index === 'next') {
        arr.unshift(itemA);
    }
    return arr;
}

const makeElem = (type, className = '', text = '') => {
    let el = document.createElement(type);
    if (className) {
        if (typeof className === 'string') {
            el.classList.add(className);
        } else {
            className.forEach(item => el.classList.add(item));
        }
    };
    let textNode = document.createTextNode(text);
    el.appendChild(textNode);
    return el;
}

const makeTwoDimensionalArray = ( length, width, data ) => {
    let arr = Array.from(Array(length), () => Array(width));
    let m = 0;
    for(let i = 0; i < length; i++) {
        for(let j = 0; j < width; j++) {
            arr[i][j] = (data[m]) ? data[m] : data[m-data.length];
            m++;
        }
    }
    return arr;
}

const makeArrSlider = (arrFull, threeArr) => {
    let result = [];
    arrFull.forEach(item => {
        if (!threeArr.includes(item)) result.push(item)
    })
    return result;
};

const threeArr = (arr) => arr.slice(0,3);
const twoArr = (arr) => arr.slice(0,2);
const oneArr = (arr) => arr.slice(0,1);

const randomEl = (arr) => arr[Math.floor(Math.random() * arr.length)];

const fetchingPets = async () => {
    return fetch(`pets.json`).then(response => response.json())
                             .catch(response => console.error(response))
}

class Card  {
    constructor ({name, img, type, breed, description, age, inoculations, diseases, parasites}) {
        this.name = name;
        this.img = img;
        this.type = type;
        this.breed = breed;
        this.description = description;
        this.age = age;
        this.inoculations = inoculations;
        this.diseases = diseases;
        this.parasites = parasites;
    }

    madeCard = async (index) =>{
        let cardD = `<div class="card">
        <div class="card_image">
            <img src="${this.img}" alt="" class="card-img">
        </div>
            <h4 class="card-name">${this.name}</h4>
            <button class="button-secondary card-btn">Learn more</button>
        </div>`;
        return cardD;
    }

    madePopup = async () => {
        let popupD = `
        <button class="popup-close"><img src="../../assets/icons/popup-close.svg" alt=""></button>
        <div class="card-popup_wrapper">
            <img src="${this.img}" alt=""class="card-popup_img">
            <div class="card-popup_text-wrapper">
                <h3 class="card-popup_name">${this.name}</h3>
                <p class="card_type-breed"><span class="card-type">${this.type}</span> - <span class="card-breed">${this.breed}</span></p>
                <p class="card-desc">${this.description}
                </p>
                <ul>
                    <li>Age: <span class="card-age">${this.age}</span></li>
                    <li>Inoculations: <span class="card-inoculations">${this.inoculations}</span></li>
                    <li>Diseases: <span class="card-diseases">${this.diseases}</span></li>
                    <li>Parasites: <span class="card-parasites">${this.parasites}</span></li>
                </ul>
            </div>
        </div>`;        
        $fade.classList.add('fade-on');
        return popupD;
    }
}

class Render {
    constructor () {

    }

    getPets = async () => {
        fetchingPets();
        let fetchPets = await fetchingPets();
        return fetchPets;
    }

    loadContent = async (petsArr) => {
        let cardsArr = [];
        petsArr.forEach(item => {
            cardsArr.push(new Card(item));
        });
        let sliderHTML = '';
        for(let i=0;i<cardsArr.length;i++) {
            sliderHTML += await cardsArr[i].madeCard(i);
        }   

        return { cardsArr, sliderHTML };
    }

    start = async () => {
        const pets = await this.getPets();
        let petsArr = [pets];
        let fullArr = petsArr.flat();
        this.winWidthResize(fullArr);
        window.addEventListener('resize', () => {
            this.winWidthResize(fullArr);
        })

    }

    winWidthResize = async ( fullArr ) => {
        if (document.documentElement.clientWidth > 1280) {
            this.startSlider(3, 3, fullArr);
        } else if (document.documentElement.clientWidth <= 1280 && document.documentElement.clientWidth > 768) {
            this.startSlider(4, 2, fullArr);
        } else if (document.documentElement.clientWidth <= 768) {
            this.startSlider(8, 1, fullArr);
        }
    }

    getBTNSPopup = async (arr) => {
        const $cardBtns = document.querySelectorAll('.card-btn');
        await $cardBtns.forEach(item => item.addEventListener('click', async function(){
            let nameBTN = this.previousSibling.previousSibling.innerText
            for(let i=0;i<arr.length;i++) {
                if (arr[i].name === nameBTN) {
                    let popup = await arr[i].madePopup();
                    $cardPopup.classList.remove('hidden');
                    $cardPopup.insertAdjacentHTML('beforeend', popup);
                    await newPet.closePopup();
                }
            }          
        }))
    }

    closePopup = async () => {
        const $closePopupBTN = document.querySelector('.popup-close');
        $closePopupBTN.addEventListener('click', ()=>{
            $cardPopup.classList.add('hidden');
            $cardPopup.innerHTML = '';
            $fade.classList.remove('fade-on');
        })

        $fade.addEventListener('click', function(){
            $cardPopup.classList.add('hidden');
            $cardPopup.innerHTML = '';
            $fade.classList.remove('fade-on');
        })
    } 

    startSlider = async (length, width, arr5) => {
        const $prevCtrlSlider = document.querySelector('.control-prev');

        let arrD = makeTwoDimensionalArray(length, width, arr5);
        let curr = 0;
        let { cardsArr, sliderHTML } = await this.loadContent(arrD[curr]);
        $cardWrapper.insertAdjacentHTML("beforeEnd", sliderHTML);
        await this.getBTNSPopup(cardsArr);
        $prevCtrlSlider.addEventListener('click', async () => {
            curr = (curr === 0) ? 2: curr - 1;
            let { cardsArr, sliderHTML } = await this.loadContent(arrD[curr]);
            $cardWrapper.innerHTML = '';
            $cardWrapper.insertAdjacentHTML("beforeEnd", sliderHTML);
        })

        const $nextCtrlSlider = document.querySelector('.control-next');
        $nextCtrlSlider.addEventListener('click', async () => {
            curr = (curr === 2) ? 0: curr + 1;
            let { cardsArr, sliderHTML } = await this.loadContent(arrD[curr]);
            $cardWrapper.innerHTML = '';
            $cardWrapper.insertAdjacentHTML("beforeEnd", sliderHTML);

        })
    }

}

const newPet = new Render();
newPet.start()