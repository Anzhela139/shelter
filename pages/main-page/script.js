const $menuBurgerBtn = document.querySelector("#menu-burger");
const $menu = document.querySelector(".header-menu");
const $logo = document.querySelector('.logo_wrapper');

const $fade = document.querySelector('.fade-off');
const $cardPopup = document.querySelector('.card-popup');
const $cardWrapper = document.querySelector('.cards_carousel');
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
console.log(winWidth)

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

    madeElem = async (index, item) => {
        let elWrap = document.createElement('div');
        elWrap.classList.add('card');
    
        let elImgWrap = document.createElement('div');
        elImgWrap.classList.add('card_image');
    
        let elImg = document.createElement('img');
        elImg.classList.add('card-img');
    
        let elTitle = document.createElement('h4');
        elTitle.classList.add('card-name');
    
        let elBtn = document.createElement('button');
        let btnText = document.createTextNode('Learn more');
        elBtn.classList.add('card-btn');
        elBtn.classList.add('button-secondary');
        elBtn.appendChild(btnText);
    
    
        let $firstCard = document.querySelector('.card:first-of-type');
        let $lastCard = document.querySelector('.card:last-of-type');

        let nameSl = '';
        let imgSl = '';
        
    
        if (index === 'prev') {
            $firstCard.before(elWrap);
            elWrap.append(elImgWrap);
            elImgWrap.append(elImg);
            elWrap.append(elTitle);
            elWrap.append(elBtn);

            nameSl = document.querySelector('.card-name');
            imgSl = document.querySelector('.card .card-img');
        }
        else if (index === 'next') {
            $lastCard.after(elWrap);
            elWrap.append(elImgWrap);
            elImgWrap.append(elImg);
            elWrap.append(elTitle);
            elWrap.append(elBtn);

            nameSl = document.querySelector(".cards_carousel > div:nth-child(3) > .card-name")
            imgSl = document.querySelector('.card:nth-child(3) .card-img');    
        }

        nameSl.innerText = item.name || '';
        imgSl.src = item.img || '';
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
        let fullArr = petsArr.flat();
        if (winWidth > 1280) {
            petsArr = threeArr(fullArr);
            let arrSlider = makeArrSlider(fullArr, petsArr);

            this.loadContent(petsArr);
            this.startSlider(petsArr, arrSlider);
        }

        else if (winWidth <= 1280 && winWidth > 768) {
            document.querySelector('.cards_carousel > div:nth-child(3)').remove();

            petsArr = twoArr(fullArr);
            let arrSlider = makeArrSlider(fullArr, petsArr);

            this.loadContent(petsArr);
            this.startSlider(petsArr, arrSlider);
        }
        else if (winWidth <= 768) {
            document.querySelector('.cards_carousel > div:nth-child(3)').remove();
            document.querySelector('.cards_carousel > div:nth-child(2)').remove();

            petsArr = oneArr(fullArr);
            let arrSlider = makeArrSlider(fullArr, petsArr);

            this.loadContent(petsArr);
            this.startSlider(petsArr, arrSlider);
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

    startSlider = async (arr3, arr5) => {
        const $prevCtrlSlider = document.querySelector('.control-prev');


        $prevCtrlSlider.addEventListener('click', ()=>{
            let ranEl = randomEl(arr5);
            let ranElIndex = arr5.indexOf(ranEl);
            let itemV = arr3[arr3.length-1];
            let el = new Card(arr5[ranElIndex]);
            el.madeElem('prev', el);
            let $lastCard = document.querySelector('.card:last-of-type');
            $lastCard.remove();
            makeArrConsistent(arr5, itemV, ranEl, 'prev');
            makeArrConsistent(arr3, ranEl, itemV, 'prev');


        })

        const $nextCtrlSlider = document.querySelector('.control-next');
        $nextCtrlSlider.addEventListener('click', ()=>{
            let ranEl = randomEl(arr5);
            let ranElIndex = arr5.indexOf(ranEl);
            let itemV = arr3[0];
            let el = new Card(arr5[ranElIndex]);
            let $firstCard = document.querySelector('.card:first-of-type');
            $firstCard.remove();
            el.madeElem('next', el);
            makeArrConsistent(arr5, itemV, ranEl, 'next');
            makeArrConsistent(arr3, ranEl, itemV, 'next');

        })
    }

}



const newPet = new Render();
newPet.start()