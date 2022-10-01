const $menuBurgerBtn = document.querySelector("#menu-burger");
const $menu = document.querySelector(".header-menu");

const $fade = document.querySelector('.fade-off');
const $cardPopup = document.querySelector('.card-popup');
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

const randomizer = (max, min) => Math.ceil(Math.random() * (max - min) + min); // That's functions needed to 
const randomArr = (arr) => arr.sort( (a,b)=> 0.5-Math.random()); // make convincing array of 48 pets out of 
function makeArr48 (arrInc, arrResult, func, limit){
    if (arrResult.length < limit) {
        arrResult.push([func(arrInc)]);
        return makeArr48(arrInc, arrResult, func, limit);
    }
    else {
        return arrResult;
    }

}; // array of 8 pets.
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

let randomArrs = () => {}

const first = (arr) => arr[0];

const prev = (arr, item) => arr[item-1];

const curr = (arr, item) => arr.indexOf(item);

const next = (arr, item) => arr[item+1];

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
console.log(pagination(arrTest4, 3, 'first'));


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

    madePagination= async () => {
        
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
        this.startPagination(petsArr);
        this.getBTNSPopup(cardsArr);

        return cardsArr;
    }

    start = async () => {
        const pets = await this.getPets();
        let petsArr = [pets];
        petsArr = petsArr[0];

        this.loadContent(petsArr);
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

    getBTNSPagination = async (arr, currI) => {
        let index = '';
        const $pageFirstBTN = document.querySelector('.control-first');
        $pageFirstBTN.addEventListener('click', ()=>{
            index = 'first';
            let pagiArr = pagination(arr, currI, index);
            this.loadContent(pagiArr);
            console.log(pagination(arr, 1, index))
        });
        const $pagePrevBTN = document.querySelector('.control-prev');
        $pagePrevBTN.addEventListener('click', ()=>{
            index = 'prev';
            pagination(arr, currI, index);
            console.log(pagination(arr, 1, index))

        });
        const $pageCurrBTN = document.querySelector('.control-curr');
        //$pageCurrBTN.innerText = curr();

        const $pageNextBTN = document.querySelector('.control-next');
        $pageNextBTN.addEventListener('click', ()=>{
            index = 'next';
            pagination(arr, currI, index);
            console.log(pagination(arr, 1, index))

        });
        const $pageLastBTN = document.querySelector('.control-last');
        $pageLastBTN.addEventListener('click', ()=>{
            index = 'last';
            pagination(arr, currI, index);
            console.log(pagination(arr, 1, index))
        });
        return {$pageFirstBTN, $pagePrevBTN, $pageCurrBTN, $pageNextBTN, $pageLastBTN};
    }

    startPagination = async (arr) => {
        let bigArr = [];

        bigArr = makeArr48(arr, bigArr, randomArr, 8);
        let currI = curr(bigArr[0]);

        const $paginBTNs = this.getBTNSPagination(bigArr, currI);
        
        console.log($paginBTNs);

        const linkedList = new LinkedList(bigArr);
        console.log(linkedList);
    }

}


class LinkedList {
    constructor(arr) {
        this._head = arr[0];
        this._tail = arr[length];
        this.length = arr.length;
    }

    append(data) {
        let temp = new Node(data);
        if (this.length == 0) {
            this._head = temp;
            this._tail = temp;
        }
        else {
            temp.prev = this._tail;
            this._tail.next = temp;
            this._tail = temp;
        }
        this.length++;
        return this;
    }
    // Should add node to the end of the list

    head() {
        if (this.length !== 0) {
            return this._head.data;
        }
        else {
            return this._head;
        }
    }
    // Should return data from the head of the list

    tail() {
        if (this.length !== 0) {
            return this._tail.data;
        }
        else {
            return this._tail;
        }
    }
    // Should return data from the end of the list

    toTail() {

    }

    at(index) {
        let currentNode = this._head;
        let i = 0;
        while (i != index) {
            currentNode = currentNode.next;
            i++;
        }
        return currentNode.data;
    }
    // Should return data of node by specified index

    insertAt(index, data) {
        let i = 0;
        let currentNode = this._head;
        let temp = new Node(data);
        if (this._head == null && index == 0) {
            this._head = temp;
            this.tail = temp;
            this.length++;
        }
        else if (this._head != null && this._tail != null && index > 0) {
            while (i != index) {
                currentNode = currentNode.next;
                i++;
            }
            temp.prev = currentNode.prev;
            temp.next = currentNode;
            currentNode.prev.next = temp;
        }
        return this;
    }
    // Should insert data to specified index
    
    isEmpty() {
        if (this.length === 0) {
            return true;
        }
        else {
            return false;
        }
    }
    // Should return true if list is empty, false otherwise

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        let counter = 0;
        let current = this._head;
        if (this._head == this._tail) {
            this._head = null;
            this._tail = null;
        } else {
            while (counter != index) {
                current = current.next;
                counter++;
            }
            current.next.prev = current.prev;
            current.prev.next = current.next;
        }
        this.length--;
        return this;
    }
    // Should delete element by specified index

    reverse() {
        let currentNode = this._head;
        let prev = null;
        while (currentNode != null) {
            let next = currentNode.next;
            currentNode.next = prev;
            currentNode.prev = next;
            prev = currentNode;
            currentNode = next;
        }
        this._tail = this._head;
        this._head = prev;
        return this;
    }
    // Should reverse the list

    indexOf(data) {
        let currentNode = this._head;
        let i = 0;
            for (let i = 0; i < this.length; i++) {
            if (currentNode.data == data) {
                return i;
            }
            currentNode = currentNode.next;
        }
        return -1;
    }
    // Should return index of specified value or -1 if list doesn't contain such
}


const newPet = new Render();
newPet.start()