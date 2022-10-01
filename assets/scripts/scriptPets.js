const $menuBurgerBtn = document.querySelector("#menu-burger");
const $menu = document.querySelector(".header-menu");
const $burgerSpans = document.querySelectorAll('#menu-burger span');

const $fade = document.querySelector('.fade-off');
const $cardPopup = document.querySelector('.card-popup');
const $cardWrapper = document.querySelector('.cards_wrapper');
$menuBurgerBtn.addEventListener('click', () => {
    if (document.querySelector(".menu-open")) {$menu.classList.add('menu-close')};
    console.log($menu);
    $menu.classList.toggle('menu-open');
    $menuBurgerBtn.classList.toggle('menu-burger-rotate');
    $burgerSpans.forEach(item => {
        item.classList.toggle('menu-burger-rotate-span');
    });


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

let winWidth = document.documentElement.clientWidth;


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

const makeArr6 = (arr, arrResult, func, limit) => {
    for (let i=0;i<limit;i++) {
        arrResult[i] = func(arr).slice(0, 6);
    }
    return arrResult;
}

const makeArr3 = (arr, arrResult, func, limit) => {
    for (let i=0;i<limit;i++) {
        arrResult[i] = func(arr).slice(0, 3);
    }
    return arrResult;
}

const pagination = (arr, curr, index) => {
    if (index === 'first') {
        return arr[0];
    }
    else if (index === 'prev') {
        return arr[arr.indexOf(curr)-1];
    }
    else if (index === 'next') {
        return arr[arr.indexOf(curr)+1];
    }
    else if (index === 'last') {
        return arr[arr.length-1];
    }
}

const makeBtnInactive = (first, second) => {
    first.disabled = true;
    first.classList.add('inactive');
    second.disabled = true;
    second.classList.add('inactive');
}

const makeBtnActive = (first, second) => {
    first.disabled = false;
    first.classList.remove('inactive');
    second.disabled = false;
    second.classList.remove('inactive');
}

const fetchingPets = async () => {
    return fetch(`assets/scripts/pets.json`).then(response => response.json())
                             .catch(response => console.error(response))
}

class Card {
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
        let cardD = `<div class="card fadeIn">
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
        petsArr = petsArr[0];
        this.winWidthResize(petsArr);
        window.addEventListener('resize', () => {
            this.winWidthResize(petsArr);
        })

    }

    winWidthResize = async ( petsArr ) => {
        let bigArr = [];
        if (document.documentElement.clientWidth > 1280) {
            bigArr = makeArr48(petsArr, bigArr, randomArr, 6);
            this.startPagination(bigArr, 0);
        } else if (document.documentElement.clientWidth <= 1280 && document.documentElement.clientWidth > 768) {
            bigArr = makeArr6(petsArr, bigArr, randomArr, 8);
            this.startPagination(bigArr, 0);
        } else if (document.documentElement.clientWidth <= 768) {
            bigArr = makeArr3(petsArr, bigArr, randomArr, 16);
            this.startPagination(bigArr, 0);
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
                    $cardPopup.classList.add('fadeIn');
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
            $cardPopup.classList.remove('fadeIn');
            $fade.classList.remove('fade-on');
        })

        $fade.addEventListener('click', function(){
            $cardPopup.classList.add('hidden');
            $cardPopup.innerHTML = '';
            $cardPopup.classList.remove('fadeIn');
            $fade.classList.remove('fade-on');
        })
    } 

    startPagination = async (arr, currI) => {
        const $pageFirstBTN = document.querySelector('.control-first');
        const $pagePrevBTN = document.querySelector('.control-prev');
        const $pageCurrBTN = document.querySelector('.control-curr');
        const $pageNextBTN = document.querySelector('.control-next');
        const $pageLastBTN = document.querySelector('.control-last');
        let { cardsArr, sliderHTML } = await this.loadContent(arr[currI]);
        $cardWrapper.insertAdjacentHTML("beforeEnd", sliderHTML);
        await this.getBTNSPopup(cardsArr);

        const $cards = document.querySelectorAll('.card');

        if (currI === 0) {
            $pageFirstBTN.disabled = true;
            $pageFirstBTN.classList.add('inactive');
            $pagePrevBTN.disabled = true;
            $pagePrevBTN.classList.add('inactive');
        }
        else if (currI === arr.length-1) {
            $pageNextBTN.disabled = true;
            $pageNextBTN.classList.add('inactive');
            $pageLastBTN.disabled = true;
            $pageLastBTN.classList.add('inactive');

        } else if (currI > 0 && currI < arr.length-1) {
            $pageFirstBTN.disabled = false;
            $pageFirstBTN.classList.remove('inactive');
            $pagePrevBTN.disabled = false;
            $pagePrevBTN.classList.remove('inactive');
            $pageNextBTN.disabled = false;
            $pageNextBTN.classList.remove('inactive');
            $pageLastBTN.disabled = false;
            $pageLastBTN.classList.remove('inactive');
        }
        $pageFirstBTN.addEventListener('click', async ()=>{
            makeCardsTransparent($cards);
            let { cardsArr, sliderHTML } = await this.loadContent(arr[currI]);
            $cardWrapper.innerHTML = '';
            $cardWrapper.insertAdjacentHTML("beforeEnd", sliderHTML);                  
            $pageCurrBTN.innerText = 1;
            makeBtnInactive($pageFirstBTN, $pagePrevBTN);
            makeBtnActive($pageNextBTN, $pageLastBTN);
            setTimeout(makeCardsVisible($cards), 5000);
        });
        $pagePrevBTN.addEventListener('click', async ()=>{
            makeCardsTransparent($cards);    
            currI-=1;
            let { cardsArr, sliderHTML } = await this.loadContent(arr[currI]);
            $cardWrapper.innerHTML = '';
            $cardWrapper.insertAdjacentHTML("beforeEnd", sliderHTML);                  
            $pageCurrBTN.innerText = currI+1;
            if (currI === 0) {
                makeBtnInactive($pageFirstBTN, $pagePrevBTN);
            }
            makeBtnActive($pageNextBTN, $pageLastBTN);
            setTimeout(makeCardsVisible($cards), 5000);

        });

        $pageNextBTN.addEventListener('click', async ()=>{
            makeCardsTransparent($cards);
            currI+=1;
            let { cardsArr, sliderHTML } = await this.loadContent(arr[currI]);
            $cardWrapper.innerHTML = '';
            $cardWrapper.insertAdjacentHTML("beforeEnd", sliderHTML);            
            $pageCurrBTN.innerText = currI+1;
            if (currI === arr.length-1) {
                makeBtnInactive($pageNextBTN, $pageLastBTN);
            }
            makeBtnActive($pageFirstBTN, $pagePrevBTN);
            setTimeout(makeCardsVisible($cards), 5000);
        });
        $pageLastBTN.addEventListener('click', async ()=>{
            makeCardsTransparent($cards);
            let { cardsArr, sliderHTML } = await this.loadContent(arr[currI]);
            $cardWrapper.innerHTML = '';
            $cardWrapper.insertAdjacentHTML("beforeEnd", sliderHTML);      
            $pageCurrBTN.innerText = arr.length;
            makeBtnInactive($pageNextBTN, $pageLastBTN);
            makeBtnActive($pageFirstBTN, $pagePrevBTN);
            setTimeout(makeCardsVisible($cards), 5000);
        });
        return {$pageFirstBTN, $pagePrevBTN, $pageCurrBTN, $pageNextBTN, $pageLastBTN};
    }

}


const newPet = new Render();
newPet.start()