import { fetchingPets } from './utils.js';

class Card {
    constructor({ name, img, type, breed, description, age, inoculations, diseases, parasites }, isPages) {
        this.name = name;
        this.img = isPages ? `./../${img}`: img;
        this.type = type;
        this.breed = breed;
        this.description = description;
        this.age = age;
        this.inoculations = inoculations;
        this.diseases = diseases;
        this.parasites = parasites;
    }

    madeCard = async () => {
        let cardD = `<div class="card fadeIn">
        <div class="card_image">
            <img src="${this.img}" alt="" class="card-img">
        </div>
            <h4 class="card-name">${this.name}</h4>
            <button class="button-secondary card-btn" data-pet-name="${this.name}">Learn more</button>
        </div>`;
        return cardD;
    }

    madePopup(fade) {
        console.log(this)
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
                    <li>Inoculations: <span class="card-inoculations">${this.inoculations.join(', ')}</span></li>
                    <li>Diseases: <span class="card-diseases">${this.diseases.join(', ')}</span></li>
                    <li>Parasites: <span class="card-parasites">${this.parasites.join(', ')}</span></li>
                </ul>
            </div>
        </div>`;
        fade.classList.add('fade-on');
        return popupD;
    }
}

class Main {
    constructor() {
        this.cardWrapper = document.querySelector('.cards_carousel, .cards_wrapper');
        this.cardPopup = document.querySelector('.card-popup');
        this.menuBurgerBtn = document.querySelector("#menu-burger");
        this.menu = document.querySelector(".header-menu");
        this.logo = document.querySelector('.logo_wrapper');

        this.fade = document.querySelector('.fade-off');
        this.winWidth = document.documentElement.clientWidth;
        this.isPages = /pages/.test(window.location.pathname);
        this.cards = []
        this.petsArr = [];
        this.current = 0;
        this.init();
    }

    init() {
        this.menuBurgerBtn.addEventListener('click', () => {
            if (document.querySelector(".menu-open")) { $menu.classList.add('menu-close') };
            this.menu.classList.toggle('menu-open');
            this.menuBurgerBtn.classList.toggle('menu-burger-rotate');

            if (!document.querySelector(".fade-on")) {
                this.fade.classList.add('fade-on');
            }
            else {
                this.fade.classList.remove('fade-on');
            }

            this.fade.addEventListener('click', () => {
                this.menu.classList.toggle('menu-open');
                this.menuBurgerBtn.classList.toggle('menu-burger-rotate');
                this.fade.classList.remove('fade-on');
                this.burgerSpans.forEach(item => {
                    item.classList.toggle('menu-burger-rotate-span');
                });
            })
        })
    }

    start() {
        const burgerSpans = document.querySelectorAll('#menu-burger span');
        menuBurgerBtn.addEventListener('click', () => {
            if (document.querySelector(".menu-open")) { menu.classList.add('menu-close') };
            console.log(menu);
            menu.classList.toggle('menu-open');
            menuBurgerBtn.classList.toggle('menu-burger-rotate');
            burgerSpans.forEach(item => {
                item.classList.toggle('menu-burger-rotate-span');
            });


            if (!document.querySelector(".fade-on")) {
                fade.classList.add('fade-on');
            }
            else {
                fade.classList.remove('fade-on');
            }

            fade.addEventListener('click', () => {
                menu.classList.toggle('menu-open');
                menuBurgerBtn.classList.toggle('menu-burger-rotate');
                fade.classList.remove('fade-on');
                burgerSpans.forEach(item => {
                    item.classList.toggle('menu-burger-rotate-span');
                });
            })
        })
    }

    loadContent = async () => {
        let sliderHTML = '';
        this.petsArr.forEach(item => {
            console.log(item)
            this.cards.push(new Card(item, this.isPages));
        });

        for (let i = 0; i < this.cards.length; i++) {
            sliderHTML += await this.cards[i].madeCard(i);
        }

        return sliderHTML;
    }

    getPets = async () => {
        let fetchPets = await fetchingPets(this.isPages ? './../' : './');
        return fetchPets;
    }

    winWidthResize(obj, fullArr, func) {
        if (this.winWidth > 1280) {
            func(1);
        } else if (this.winWidth <= 1280 && this.winWidth > 768) {
            func(2);
        } else if (this.winWidth <= 768) {
            func(3);
        }
    }

    handleOpenPopup(e) {
        const petName = e.target.closest('.card-btn').dataset['petName'];

        this.cards.map((el) => {
            if (el.name === petName) {
                console.log(el)
                let popup = el.madePopup(this.fade);
                this.cardPopup.classList.remove('hidden');
                this.cardPopup.insertAdjacentHTML('beforeend', popup);
                this.cardPopup.classList.add('fadeIn');
                this.initClosePopup();
            }
        })
    }

    handleClosePopup() {
        this.cardPopup.classList.add('hidden');
        this.cardPopup.innerHTML = '';
        this.cardPopup.classList.remove('fadeIn');
        this.fade.classList.remove('fade-on');
    }

    initClosePopup() {
        const closePopupBTN = document.querySelector('.popup-close');
        closePopupBTN.addEventListener('click', this.handleClosePopup.bind(this))
        this.fade.addEventListener('click', this.handleClosePopup.bind(this));
    }
}

export default Main;