const $menuBurgerBtn = document.querySelector("#menu-burger");
const $menu = document.querySelector(".header-menu");
const $burgerSpans = document.querySelectorAll('#menu-burger span');

const $fade = document.querySelector('.fade-off');
const $cardPopup = document.querySelector('.card-popup');
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

const makeCardsTransparent = (arr) => {
    arr.forEach(item => {
        item.classList.remove('card-transparency');
    })
}

const makeCardsVisible = (arr) => {
    arr.forEach(item => {
        item.classList.add('card-transparency');
    })
}

const fetchingPets = async () => {
    return fetch(`pets.json`).then(response => response.json())
                             .catch(response => console.error(response))
}

class CardDOM {
    constructor () {
        this.nameDOM = document.querySelectorAll('.card-name');
        this.imgDOM = document.querySelectorAll('.card-img');
        this.namePopupDOM = document.querySelectorAll('.card-popup_name');
        this.imgPopupDOM = document.querySelectorAll('.card-popup_img');
        this.typeDOM = document.querySelectorAll('.card-type');
        this.breedDOM = document.querySelectorAll('.card-breed');
        this.descriptionDOM = document.querySelectorAll('.card-desc');
        this.ageDOM = document.querySelectorAll('.card-age');
        this.inoculationsDOM = document.querySelectorAll('.card-inoculations');
        this.diseasesDOM = document.querySelectorAll('.card-diseases');
        this.parasitesDOM = document.querySelectorAll('.card-parasites');
    }

}

class Card extends CardDOM {
    constructor ({name, img, type, breed, description, age, inoculations, diseases, parasites}) {
        super(CardDOM);
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
        this.nameDOM[index].innerText = this.name || '';
        this.imgDOM[index].src = this.img || '';

    }

    madePopup = async () => {
        this.namePopupDOM[0].innerText = this.name || '';
        this.imgPopupDOM[0].src = this.img || '';
        this.typeDOM[0].innerText = this.type || '';
        this.breedDOM[0].innerText = this.breed || '';
        this.descriptionDOM[0].innerText = this.description || '';
        this.ageDOM[0].innerText = this.age || '';
        this.inoculationsDOM[0].innerText = this.inoculations || '';
        this.diseasesDOM[0].innerText = this.diseases || '';
        this.parasitesDOM[0].innerText = this.parasites || '';
        
        $fade.classList.add('fade-on');
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
        for(let i=0;i<cardsArr.length;i++) {
            cardsArr[i].madeCard(i);
        }   
        this.getBTNSPopup(cardsArr);

        return cardsArr;
    }

    start = async () => {
        const pets = await this.getPets();
        let petsArr = [pets];
        petsArr = petsArr[0];
        
        let bigArr = [];

        if (winWidth > 1280) {
            bigArr = makeArr48(petsArr, bigArr, randomArr, 6);
            this.startPagination(bigArr, 0);
            this.loadContent(bigArr[0]);
        }
        else if (winWidth <= 1280 && winWidth > 768) {
            bigArr = makeArr6(petsArr, bigArr, randomArr, 8);
            this.startPagination(bigArr, 0);
            this.loadContent(bigArr[0]);
            document.querySelector('.cards_wrapper > .card:nth-child(8)').remove();
            document.querySelector('.cards_wrapper > .card:nth-child(7)').remove();

        }
        else if (winWidth <= 768) {
            bigArr = makeArr3(petsArr, bigArr, randomArr, 16);
            this.startPagination(bigArr, 0);
            this.loadContent(bigArr[0]);
            document.querySelector('.cards_wrapper > .card:nth-child(8)').remove();
            document.querySelector('.cards_wrapper > .card:nth-child(7)').remove();
            document.querySelector('.cards_wrapper > .card:nth-child(6)').remove();
            document.querySelector('.cards_wrapper > .card:nth-child(5)').remove();
            document.querySelector('.cards_wrapper > .card:nth-child(4)').remove();

        }

    }

    getBTNSPopup = async (arr) => {
        const $cardBtns = document.querySelectorAll('.card-btn');
        $cardBtns.forEach(item => item.addEventListener('click', function(){
            let nameBTN = this.previousSibling.previousSibling.innerText
            for(let i=0;i<arr.length;i++) {
                if (arr[i].name === nameBTN) {
                    $cardPopup.classList.remove('hidden');
                    arr[i].madePopup();
                }
            }          
        }))
        this.closePopup();
    }

    closePopup = async () => {
        const $closePopupBTN = document.querySelector('.popup-close');
        $closePopupBTN.addEventListener('click', ()=>{
            $cardPopup.classList.add('hidden');
            $fade.classList.remove('fade-on');

        })

        $fade.addEventListener('click', function(){
            $cardPopup.classList.add('hidden');
            $fade.classList.remove('fade-on');
        })
    } 

    startPagination = async (arr, currI) => {
        const $pageFirstBTN = document.querySelector('.control-first');
        const $pagePrevBTN = document.querySelector('.control-prev');
        const $pageCurrBTN = document.querySelector('.control-curr');
        const $pageNextBTN = document.querySelector('.control-next');
        const $pageLastBTN = document.querySelector('.control-last');
        const $cards = document.querySelectorAll('.card');

        makeCardsVisible($cards);

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

        }
        $pageFirstBTN.addEventListener('click', ()=>{
            makeCardsTransparent($cards);
            this.loadContent(arr[0]);
            $pageCurrBTN.innerText = 1;
            makeBtnInactive($pageFirstBTN, $pagePrevBTN);
            makeBtnActive($pageNextBTN, $pageLastBTN);
            setTimeout(makeCardsVisible($cards), 5000);
        });
        $pagePrevBTN.addEventListener('click', ()=>{
            makeCardsTransparent($cards);         
            currI-=1;
            this.loadContent(arr[currI-1]);
            $pageCurrBTN.innerText = arr.indexOf(currI)-1;
            if (currI === 1) {
                makeBtnInactive($pageFirstBTN, $pagePrevBTN);
                makeBtnActive($pageNextBTN, $pageLastBTN);
            }
            setTimeout(makeCardsVisible($cards), 5000);

        });

        $pageNextBTN.addEventListener('click', ()=>{
            makeCardsTransparent($cards);
            currI+=1;
            this.loadContent(arr[currI+1]);
            $pageCurrBTN.innerText = currI+1;
            if (currI === arr.length-1) {
                makeBtnInactive($pageNextBTN, $pageLastBTN);
                makeBtnActive($pageFirstBTN, $pagePrevBTN);
            }
            setTimeout(makeCardsVisible($cards), 5000);
        });
        $pageLastBTN.addEventListener('click', ()=>{
            makeCardsTransparent($cards);
            this.loadContent(arr[arr.length-1]);
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