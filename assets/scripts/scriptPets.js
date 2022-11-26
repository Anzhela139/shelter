import Main from './script.js';
import { makeArray, setBtnActivity } from './utils.js';

class Render extends Main {
    constructor() {
        super();

        this.start();
    }

    async start() {
        console.log(this)
        this.petsArr = await this.getPets();
        console.log(this.petsArr)
        this.winWidthResize({}, this.petsArr, this.initSlider.bind(this));
        window.addEventListener('resize', this.winWidthResize.bind(this, this.petsArr, this.initSlider.bind(this)))
    }

    initSlider( winNum ) {
        console.log(this)
        let bigArr = makeArray(this.petsArr, winNum === 1 
                                    ? (6, 48)
                                    : winNum === 2 
                                        ? (8, 6) 
                                        : (16, 3));
        this.startPagination(bigArr);
    }

    startPagination = async ( arr ) => {
        const pageFirstBTN = document.querySelector('.control-first');
        const pagePrevBTN = document.querySelector('.control-prev');
        const pageCurrBTN = document.querySelector('.control-curr');
        const pageNextBTN = document.querySelector('.control-next');
        const pageLastBTN = document.querySelector('.control-last');
        console.log(arr, this.current)
        let sliderHTML = await this.loadContent(arr[this.current]);
        console.log(sliderHTML)
        this.cardWrapper.innerHTML = sliderHTML;

        [...document.querySelectorAll('.card-btn')]
            .map(item => item.addEventListener('click', this.handleOpenPopup.bind(this)));

        if (this.current === 0) {
            pageFirstBTN.disabled = true;
            pageFirstBTN.classList.add('inactive');
            pagePrevBTN.disabled = true;
            pagePrevBTN.classList.add('inactive');
        }
        else if (this.current === arr.length - 1) {
            pageNextBTN.disabled = true;
            pageNextBTN.classList.add('inactive');
            pageLastBTN.disabled = true;
            pageLastBTN.classList.add('inactive');

        } else if (this.current > 0 && this.current < arr.length - 1) {
            pageFirstBTN.disabled = false;
            pageFirstBTN.classList.remove('inactive');
            pagePrevBTN.disabled = false;
            pagePrevBTN.classList.remove('inactive');
            pageNextBTN.disabled = false;
            pageNextBTN.classList.remove('inactive');
            pageLastBTN.disabled = false;
            pageLastBTN.classList.remove('inactive');
        }
        pageFirstBTN.addEventListener('click', async () => {
            let sliderHTML = await this.loadContent(arr[this.current]);
            this.cardWrapper.innerHTML = '';
            this.cardWrapper.innerHTML = sliderHTML;
            pageCurrBTN.innerText = 1;
            setBtnActivity(pageFirstBTN, pagePrevBTN, true);
            setBtnActivity(pageNextBTN, pageLastBTN);
        });
        pagePrevBTN.addEventListener('click', async () => {
            this.current -= 1;
            let sliderHTML = await this.loadContent(arr[this.current]);

            this.cardWrapper.innerHTML = sliderHTML;
            pageCurrBTN.innerText = this.current + 1;
            if (this.current === 0) {
                setBtnActivity(pageFirstBTN, pagePrevBTN, true);
            }
            setBtnActivity(pageNextBTN, pageLastBTN);
        });

        pageNextBTN.addEventListener('click', async () => {
            this.current += 1;
            let sliderHTML = await this.loadContent(arr[this.current]);

            this.cardWrapper.innerHTML = sliderHTML;
            pageCurrBTN.innerText = this.current + 1;
            if (this.current === arr.length - 1) {
                setBtnActivity(pageNextBTN, pageLastBTN, true);
            }
            setBtnActivity(pageFirstBTN, pagePrevBTN);
        });
        pageLastBTN.addEventListener('click', async () => {
            let sliderHTML = await this.loadContent(arr[this.current]);
            console.log(sliderHTML)

            this.cardWrapper.innerHTML = sliderHTML;
            pageCurrBTN.innerText = arr.length;
            setBtnActivity(pageNextBTN, pageLastBTN, true);
            setBtnActivity(pageFirstBTN, pagePrevBTN);
        });
        return { pageFirstBTN, pagePrevBTN, pageCurrBTN, pageNextBTN, pageLastBTN };
    }

}

document.addEventListener('DOMContentLoaded', new Render());
