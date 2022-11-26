import Main from './script.js';
import { makeTwoDimensionalArray } from './utils.js';



class Render extends Main {
    constructor() {
        super();

        this.start();
    }

    start = async () => {
        this.petsArr = await this.getPets();

        this.winWidthResize({}, this.petsArr, this.initSlider.bind(this));
        window.addEventListener('resize', this.winWidthResize.bind(this, this.petsArr, this.initSlider.bind(this)))
    }

    initSlider( winNum ) {
        this.startSlider(winNum === 1 
            ? (3, 3)
            : winNum === 2 
                ? (4, 2) 
                : (8, 1));
    }

    async handleSlidChange(curr) {
        let { cardsArr, sliderHTML } = await this.loadContent(arrD[curr]);
        this.cardWrapper.innerHTML = '';
        this.cardWrapper.insertAdjacentHTML("beforeEnd", sliderHTML);
    }

    startSlider = async (length, width ) => {
        const prevCtrlSlider = document.querySelector('.control-prev');

        let arrD = makeTwoDimensionalArray(length, width, this.petsArr);
        let curr = 0;
        let { cardsArr, sliderHTML } = await this.loadContent(arrD[curr]);
        this.cardWrapper.insertAdjacentHTML("beforeEnd", sliderHTML);

        [...document.querySelectorAll('.card-btn')]
            .map(item => item.addEventListener('click', this.handleOpenPopup.bind(this)));

        prevCtrlSlider.addEventListener('click', async () => {
            curr = (curr === 0) ? 2 : curr - 1;
            let { cardsArr, sliderHTML } = await this.loadContent(arrD[curr]);
            this.cardWrapper.innerHTML = '';
            this.cardWrapper.insertAdjacentHTML("beforeEnd", sliderHTML);
        })

        const nextCtrlSlider = document.querySelector('.control-next');
        nextCtrlSlider.addEventListener('click', async () => {
            curr = (curr === 2) ? 0 : curr + 1;
            let { cardsArr, sliderHTML } = await this.loadContent(arrD[curr]);
            this.cardWrapper.innerHTML = '';
            this.cardWrapper.insertAdjacentHTML("beforeEnd", sliderHTML);

        })
    }

}
document.addEventListener('DOMContentLoaded', new Render());
