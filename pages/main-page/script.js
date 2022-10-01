const $menuBurgerBtn = document.querySelector("#menu-burger");
const $menu = document.querySelector(".header-menu");

const $fade = document.querySelector('.fade-off');
const $cardPopup = document.querySelector('.card-popup');
const $cardWrapper = document.querySelector('.cards_carousel');
$menuBurgerBtn.addEventListener('click', () => {
    if (document.querySelector(".menu-open")) {$menu.classList.add('menu-close')};
    $menu.classList.toggle('menu-open');
    if (!document.querySelector(".fade-on")) {
        $fade.classList.add('fade-on');
    }
    else {
        $fade.classList.remove('fade-on');
    }
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
/*
  let arrTest = [1, 2, 4, 3, 5, 6, 7, 8];
  console.log(randomArr(arrTest))
  let arrTest2 = [];
  console.log(makeArr48(arrTest, arrTest2, randomArr, 8))
  arrTest4 = arrTest4.reduceRight((p,c) => (c.next = p,c));

console.log(arrTest3);
console.log(first(arrTest3));
console.log(prev(arrTest3, 3));
  let arrTest3 = [1, 2, 4, 3, 5, 6, 7, 8];



console.log(arrTest3)
*/


let arrTest4 = [1, 2, 4, 3, 5, 6, 7, 8];
let arrtest6 = [1, 2, 4];
let arrTest5 = [11, 12, 14, 3, 15, 16, 17, 18];

//let randomArrs = () => {}

const makeArrSlider = (arrFull, threeArr) => {
    let result = [];
    arrFull.forEach(item => {
        if (!threeArr.includes(item)) result.push(item)
    })
    return result;
};



const first = (arr) => arr[0];

const prev = (arr, item) => arr[arr.indexOf(item)-1];

console.log(prev(arrTest4, 8));

const curr = (arr, item) => arr.indexOf(item) + 1;

const next = (arr, item) => arr[arr.indexOf(item)+1];

const last = (arr) => arr[arr.length-1];
const pagination = (arr, curr, index) => {
    if (index === 'first') {
        return first(arr);
    }
    else if (index === 'prev') {
        return prev(arr, curr);
    }
    else if (index === 'next') {
        return next(arr, curr);
    }
    else if (index === 'last') {
        return last(arr);
    }
}

const threeArr = (arr) => arr.slice(0,3);

const randomEl = (arr) => arr[Math.floor(Math.random() * arr.length)];

//madeElem('prev');

//console.log(madeElem('prev'));
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

    madeSlide = async (index, item) => {
        let nameSl = '';
        let imgSl = '';
        if (index === 'prev') {
            nameSl = document.querySelector('.card-name');
            imgSl = document.querySelector('.card .card-img');
        }
        else if (index === 'next') {
            nameSl = document.querySelector(".cards_carousel > div:nth-child(3) > .card-name")
            imgSl = document.querySelector('.card:nth-child(3) .card-img');
        }
        console.log(imgSl);


        nameSl.innerText = item.name || '';
        imgSl.src = item.img || '';

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
    
        //elObj.imgDOM = elObj.img;
        //elObj.nameDOM = elObj.name;
    
        console.log(item);
    
        let $firstCard = document.querySelector('.card:first-of-type');
        let $lastCard = document.querySelector('.card:last-of-type');
    
        if (index === 'prev') {
            $firstCard.before(elWrap);
            elWrap.append(elImgWrap);
            elImgWrap.append(elImg);
            elWrap.append(elTitle);
            elWrap.append(elBtn);
            $lastCard.remove();
            item.madeCard([0]);
        }
        else if (index === 'next') {
            $lastCard.after(elWrap);
            elWrap.append(elImgWrap);
            elImgWrap.append(elImg);
            elWrap.append(elTitle);
            elWrap.append(elBtn);
            $firstCard.remove();
            //elObj.madeCard();
    
        }
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
        petsArr = threeArr(fullArr);
        let arrSlider = makeArrSlider(fullArr, petsArr);

        this.loadContent(petsArr);

        this.startSlider(arrSlider);
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

    getBTNSSlider = async (arr) => {
        const $prevCtrlSlider = document.querySelector('.control-prev');

        let ranEl = randomEl(arr);
        ranEl = arr.indexOf(ranEl);
        console.log(arr[ranEl])
        $prevCtrlSlider.addEventListener('click', ()=>{
            let el = new Card(arr[ranEl]);
            el.madeElem('prev', el);
            console.log(el)
            el.madeSlide('prev', el);
           // transform: translateX(-20%);
          // this.loadContent(index);


        })

        const $nextCtrlSlider = document.querySelector('.control-next');
        $nextCtrlSlider.addEventListener('click', ()=>{
            let el = new Card(arr[ranEl]);
            el.madeElem('next', el);
            console.log(el)
            el.madeSlide('next', el);

        })
    }

    startSlider = async (arr) => {
        this.getBTNSSlider(arr);

        //const linkedList = new LinkedList(bigArr);
    }

}



const newPet = new Render();
newPet.start()