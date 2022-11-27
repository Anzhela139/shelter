import Main from './script.js';
import { makeArray, setBtnActivity } from './utils.js';

/** инициализирует страницу с питомцами */
class Render extends Main {
    constructor() {
        super();

        this.paginationArray = [];
        this.pageFirstBTN = document.querySelector('.control-first');
        this.pagePrevBTN = document.querySelector('.control-prev');
        this.pageCurrBTN = document.querySelector('.control-curr');
        this.pageNextBTN = document.querySelector('.control-next');
        this.pageLastBTN = document.querySelector('.control-last');
        this.max = 0;

        this.start();
    }

    /**
     * @description - инициализирует страницу с питомцами
     */
    async start() {
        this.petsArr = await this.getPets();

        this.winWidthResize(this.petsArr, this.initSlider.bind(this));
        window.addEventListener('resize', this.winWidthResize.bind(this, this.petsArr, this.initSlider.bind(this)))
    }

    /**
     * @description - инициализирует пагинацию при загрузке страницы, и изменении размеров окна
     * @param {Number} winNum код размеров окна
     */
    initSlider( winNum ) {
        this.paginationArray = makeArray(this.petsArr, winNum === 1 
                                    ? (6, 48)
                                    : winNum === 2 
                                        ? (8, 6) 
                                        : (16, 3));

        this.max = winNum === 1 
                    ? 48
                    : winNum === 2 
                        ? 5
                        : 3;

        this.startPagination(this.paginationArray);
    }

    /**
     * @description - хандлер изменения пагинации
     */
    handlePaginationChange(event) {
        const btn = event.target.closest('.pagination-control');
        if(btn.classList.contains('control-first')) {
            this.current = 0;
        } else if(btn.classList.contains('control-prev')) {
            this.current--;
        } else if(btn.classList.contains('control-next')) {
            this.current++;
        } else if(btn.classList.contains('control-last')) {
            this.current = this.max;
        }

        let sliderHTML = this.loadContent(this.paginationArray[this.current]);
        const isPrev = this.current === 0;
        const isNext = this.current === this.max;
        this.cardWrapper.innerHTML = sliderHTML;
        this.pageCurrBTN.innerText = this.current + 1;

        setBtnActivity(this.pageFirstBTN, isPrev);
        setBtnActivity(this.pagePrevBTN, isPrev);
        setBtnActivity(this.pageNextBTN, isNext);
        setBtnActivity(this.pageLastBTN, isNext);

        [...document.querySelectorAll('.card-btn')]
            .map(item => item.addEventListener('click', this.handleOpenPopup.bind(this)));
    }

    /**
     * @description - инициализирует пагинацию на странице питомцев
     */
    startPagination() {
        let sliderHTML = this.loadContent(this.paginationArray[this.current]);
        this.cardWrapper.innerHTML = sliderHTML;

        [...document.querySelectorAll('.card-btn')]
            .map(item => item.addEventListener('click', this.handleOpenPopup.bind(this)));

        if (this.current === 0) {
            setBtnActivity(this.pageFirstBTN, true);
            setBtnActivity(this.pagePrevBTN, true);
        }

        this.pageFirstBTN.addEventListener('click', this.handlePaginationChange.bind(this));
        this.pagePrevBTN.addEventListener('click', this.handlePaginationChange.bind(this));
        this.pageNextBTN.addEventListener('click', this.handlePaginationChange.bind(this));
        this.pageLastBTN.addEventListener('click', this.handlePaginationChange.bind(this));
    }

}

document.addEventListener('DOMContentLoaded', new Render());
