import Main from './script.js';

/** инициализирует главную страницы приложения */
class Render extends Main {
    constructor() {
        super();

        this.sliderArray = [];
        this.sliderWrapper = document.querySelector('.cards_carousel--wrapper');
        this.sliderElem = document.querySelector('.cards_carousel');
        this.max = 0;

        this.start();
    }

    /**
     * @description - главную страницы приложения
     */
    start = async () => {
        this.petsArr = await this.getPets();

        this.winWidthResize({}, this.petsArr, this.initSlider.bind(this));
        window.addEventListener('resize', this.winWidthResize.bind(this, this.petsArr, this.initSlider.bind(this)))
    }

    /**
     * @description - инициализирует слайдер при загрузке страницы, и изменении размеров окна
     * @param {Number} winNum код размеров окна
     */
    initSlider(winNum) {
        this.startSlider(winNum);
    }

    /**
     * @description - хандлер изменения слайдера
     */
    handleSlidChange(event) {
        const isNext = event.target.closest('.slider-control').classList.contains('control-next');
        if((this.current === this.max && isNext) || (this.current === 0 && !isNext)) return;

        this.current = isNext 
                    ? (this.current === this.max) ? this.current : this.current + 1 
                    : (this.current === 0) ? 0 : this.current - 1;

        let carouselWidth = this.sliderWrapper.getBoundingClientRect()?.width / (this.max === 5 ? 3 : 1);
        carouselWidth = carouselWidth <= 310 ? 310 : carouselWidth;
        const currentLeft = parseInt(this.sliderElem.style.transform?.replace(/[^\.\d]/gi, '') || '0');
        const sliderLeft = (isNext ? carouselWidth + currentLeft : currentLeft - carouselWidth);

        this.sliderElem.style.transform = `translateX(-${sliderLeft || 0}px)`;
    }

    /**
     * @description - инициализирует слайдер на главной странице
     * @param {Number} winNum код размеров окна
     */
    startSlider(winNum) {
        this.max = winNum !== 3 ? 5 : 7;
        
        const prevCtrlSlider = document.querySelector('.control-prev');
        const nextCtrlSlider = document.querySelector('.control-next');

        let sliderHTML = this.loadContent(this.sliderArray[0]);
        this.cardWrapper.insertAdjacentHTML("beforeEnd", sliderHTML);

        [...document.querySelectorAll('.card-btn')]
            .map(item => item.addEventListener('click', this.handleOpenPopup.bind(this)));

        prevCtrlSlider.addEventListener('click', this.handleSlidChange.bind(this));
        nextCtrlSlider.addEventListener('click', this.handleSlidChange.bind(this));
    }

}

document.addEventListener('DOMContentLoaded', new Render());
