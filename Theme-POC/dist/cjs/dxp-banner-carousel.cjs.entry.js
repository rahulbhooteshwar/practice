'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const messages = {
    'en': {
        slide: 'of slide',
        prev: 'previous slide',
        next: 'next slide'
    },
    'en-US': {
        slide: 'of slide',
        prev: 'previous slide',
        next: 'next slide'
    }
};

const TRANSLATE_VALUE = 'translate3d(0px, 0px, 0px) scale(';
const BANNER = 'dxp-banner';
const BannerCarousel = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        /** carousel state */
        this.carouselState = { activeSlide: undefined, activeSlideIndex: undefined, slides: undefined, intervalObj: undefined, navigationReady: false };
        /** state variable for dots arrow */
        this.focusOnDots = false;
        /** state variable for next arrow */
        this.focusOnNext = false;
        /** state variable for prev arrow */
        this.focusOnPrev = false;
        /** This defines the speed of carousel */
        this.pauseDuration = 5000;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core.dxp);
        this.base.i18Init(core.dxp, 'BannerCarousel', messages);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        this.insertAnimationStyles();
        this.activateSlide(0);
        this.setIndicatorsPosition();
        this.maxSlides = this.carouselState.slides && this.carouselState.slides.length;
        const banner = this.carouselState.activeSlide;
        const rootEle = banner && banner ? banner : banner;
        if (this.element && this.element.querySelector('.carousel-container') && rootEle &&
            rootEle.querySelector('dxp-banner-small-image') !== undefined) {
            this.element.querySelector('.carousel-container').classList.add('card');
        }
    }
    /** keydown events for accessibility */
    keydownEvents(event) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            if (this.focusOnNext) {
                this.changeSlide('NEXT');
                this.setFocus();
                this.focusOnDots = false;
            }
            else if (this.focusOnPrev) {
                this.changeSlide('PREV');
                this.setFocus();
                this.focusOnDots = false;
            }
            if (this.focusOnDots) {
                this.activateSlide(this.indicatorIndex);
                this.setFocus();
            }
            clearInterval(this.carouselState.intervalObj);
        }
    }
    /** listener for accessibility to stop carousel autoplay on focus */
    onCarouselFocus() {
        this.autoPlayPause();
    }
    /** Mouseout event listener */
    onMouseout() {
        if (this.autoPlay) {
            this.startSlideShow();
        }
    }
    /** Mouseover event listener */
    onMouseover() {
        this.autoPlayPause();
    }
    /** window resize event */
    windowResize() {
        if (this.carouselState.activeSlide) {
            this.setIndicatorsPosition();
        }
    }
    /** active slide by index */
    activateSlide(index) {
        this.carouselState.slides = this.getCarouselItems();
        this.carouselState.activeSlide = this.carouselState.slides[index];
        this.carouselState.activeSlideIndex = index;
        this.carouselState.slides.forEach(slide => {
            slide.style.position = 'relative';
            slide.style.width = '100%';
            slide.style.display = 'inline-block';
            slide.style.verticalAlign = 'top';
            slide.style.transition = 'all 0.8s cubic-bezier(0.4, 1.3, 0.65, 1)';
            this.carouselState.activeSlide.setAttribute('aria-hidden', 'false');
            this.carouselState.slides[index].style.transition = '2s';
            slide.setAttribute('id', `index${index}`);
            slide.setAttribute('aria-hidden', 'true');
        });
        this.carouselState = Object.assign({}, this.carouselState);
        this.animateSlide(index, 'NEXT');
    }
    /** add slide animation styles */
    animateSlide(index, direction) {
        let j = 1;
        if (this.carouselState && this.carouselState.slides[0]) {
            if (index === 0) {
                this.carouselState.slides[0].style.marginLeft = 0;
            }
            while (j <= index) {
                if (direction === 'NEXT') {
                    this.carouselState.slides[0].style.marginLeft = `${-100 * j}%`;
                }
                j++;
            }
            while (j > index) {
                if (direction === 'PREV') {
                    this.carouselState.slides[0].style.marginLeft = `${-100 * (j - 1)}%`;
                }
                j--;
            }
        }
    }
    /** apply calculations to indicators, progrssbar and arrows */
    applyCalculationsToElements(bannerType, carouselElement, imgTag) {
        imgTag = imgTag ? imgTag : imgTag;
        imgTag = imgTag.querySelector('img');
        const interval = setInterval(() => {
            if (imgTag && imgTag.complete === true) {
                // get the parent element of dxp-image and calculate it height
                const imageParent = bannerType ? bannerType.querySelector('dxp-image').parentElement : bannerType &&
                    bannerType.querySelector('dxp-image').parentElement;
                const imgEleHeight = imageParent && imageParent.getBoundingClientRect().height;
                const indicatorPlaceholder = bannerType && bannerType.querySelector('.indicators-placeholder');
                const positionLeft = carouselElement &&
                    (indicatorPlaceholder.getBoundingClientRect().left - carouselElement.querySelector('.carousel-container').getBoundingClientRect().left);
                const indicatorsEle = carouselElement && carouselElement.querySelector('.indicators');
                const calcTop = window.innerWidth > 767.9 ? (imgEleHeight - 51) : (imgEleHeight - 42);
                const navControls = carouselElement && carouselElement.querySelector('.nav-controls');
                this.applyLeftValue(indicatorsEle, positionLeft);
                this.applyTopValue(calcTop, indicatorsEle, navControls, imgEleHeight);
                this.carouselState = Object.assign(Object.assign({}, this.carouselState), { navigationReady: true });
                if (this.autoPlay) {
                    this.startSlideShow();
                }
                clearInterval(interval);
            }
        }, 200);
    }
    /** center align */
    applyDefaultCenter(carouselElement) {
        this.carouselState = Object.assign(Object.assign({}, this.carouselState), { navigationReady: true });
        const navControls = carouselElement && carouselElement.querySelector('.nav-controls');
        if (navControls && !this.badgeAlignment) {
            navControls.style.top = `${50}%`;
        }
        if (this.autoPlay) {
            this.startSlideShow();
        }
    }
    /** apply calculations to indicators */
    applyLeftValue(indicatorsEle, positionLeft) {
        if (indicatorsEle && (window.innerWidth < 992 || !this.badgeAlignment && window.innerWidth > 991.9)) {
            indicatorsEle.style.left = '';
            indicatorsEle.classList.add('center');
        }
        if (indicatorsEle && this.badgeAlignment && window.innerWidth > 991.9) {
            indicatorsEle.classList.remove('center');
            indicatorsEle.style.left = `${positionLeft}px`;
        }
    }
    /** apply top values for alignment of indicators and navigation arrows */
    applyTopValue(calcTop, indicatorsEle, navControls, imgEleHeight) {
        if (indicatorsEle) {
            indicatorsEle.style.top = `${calcTop}px`;
        }
        if (navControls) {
            navControls.style.top = `${(imgEleHeight / 2 - 54)}px`;
        }
    }
    /** pause auto play */
    autoPlayPause() {
        if (this.autoPlay) {
            this.pauseAutoplay();
        }
    }
    /** to reset the state for focus of next or prev navigation arrows */
    blurNextPrev(direction) {
        direction === 'NEXT' ? this.focusOnNext = false : this.focusOnPrev = false;
    }
    /** calculate indicator position */
    calculateIndicatorPosition() {
        const carouselElement = this.element ? this.element : this.element;
        const banner = this.carouselState.activeSlide;
        const rootEle = banner && banner ? banner : banner;
        const bannerType = (rootEle && rootEle.querySelector('dxp-banner-benefits-hero')) || (rootEle && rootEle.querySelector('dxp-banner-small-image'))
            || (rootEle && rootEle.querySelector('dxp-banner-image-overlay')) || (rootEle && rootEle.querySelector('dxp-banner-regular'));
        const imgTag = bannerType && bannerType ? bannerType.querySelector('dxp-image') : bannerType && bannerType.querySelector('dxp-image');
        if (imgTag) {
            this.applyCalculationsToElements(bannerType, carouselElement, imgTag);
        }
        else {
            this.applyDefaultCenter(carouselElement);
        }
    }
    /** active slide by index */
    changeSlide(direction) {
        let index = this.carouselState.activeSlideIndex;
        index = direction === 'NEXT' ? (index + 1 < this.carouselState.slides.length ? index + 1 : 0) : (index - 1 < 0 ? this.carouselState.slides.length - 1 : index - 1);
        clearInterval(this.setWidth);
        this.endProgressBar();
        this.activateSlide(index);
        this.animateSlide(index, direction);
    }
    /** to end the bar progress */
    endProgressBar() {
        let max = 100;
        this.setWidth = setInterval(() => {
            const currentProgress = this.base && this.base.shadowRootQuerySelector(this.element, '.carousel-current-progress');
            const styleTransform = currentProgress && currentProgress.style;
            if (styleTransform) {
                max--;
                if (max < 0) {
                    clearInterval(this.setWidth);
                }
                else {
                    styleTransform.transformOrigin = '100% 50%';
                    styleTransform.transform = `${TRANSLATE_VALUE + max / 100}, 1)`;
                }
            }
        }, 5);
    }
    /** to show the bar progress */
    fillProgressBar() {
        let max = 100;
        let counter = 0;
        this.setWidth = setInterval(() => {
            const currentProgress = this.base && this.base.shadowRootQuerySelector(this.element, '.carousel-current-progress');
            const styleTransform = currentProgress && currentProgress.style;
            if (styleTransform) {
                if (counter < 100) {
                    counter++;
                    styleTransform.transformOrigin = '0 50%';
                    styleTransform.transform = `${TRANSLATE_VALUE + counter / 100}, 1)`;
                }
                else {
                    max--;
                    if (max < 0) {
                        clearInterval(this.setWidth);
                    }
                    else {
                        styleTransform.transformOrigin = '100% 50%';
                        styleTransform.transform = `${TRANSLATE_VALUE + max / 100}, 1)`;
                    }
                }
            }
        }, this.pauseDuration / 200);
    }
    /** to set the state for focus of next or prev navigation arrows */
    focusNextPrev(direction) {
        // using if else as lint error for ternary operator
        if (direction === 'NEXT') {
            this.focusOnNext = true;
            this.focusOnPrev = false;
        }
        else {
            this.focusOnPrev = true;
            this.focusOnNext = false;
        }
    }
    /** convert node list to array */
    getArrayFromNodeList(nodeList) {
        return [].slice.call(nodeList);
    }
    /** get array of rendered child tab elements */
    getCarouselItems() {
        // query select rendered items if child items are created within this component
        // querySelectorAll returns a NodeList, we can convert it to array using spread operator but that doesn't work on IE
        // so using array slicing workaround
        let carouselItems = this.element ?
            this.getArrayFromNodeList(this.element.querySelectorAll(BANNER))
            : this.getArrayFromNodeList(this.element.querySelectorAll(BANNER));
        // if child items are not found within this component then search for slotted items (childNodes)
        carouselItems = carouselItems.length > 0 ? carouselItems : this.getArrayFromNodeList(this.element.childNodes).filter(child => {
            return child['tagName'] && child['tagName'].toLowerCase() === BANNER;
        });
        return carouselItems;
    }
    /** insert animation styles */
    insertAnimationStyles() {
        const css = `
    .fade {
      -webkit-animation-name: fade;
      -webkit-animation-duration: 1.5s;
      animation-name: fade;
      animation-duration: 1.5s;
    }
    @-webkit-keyframes fade {
      from {opacity: .4}
      to {opacity: 1}
    }
    @keyframes fade {
      from {opacity: .4}
      to {opacity: 1}
    }
    `;
        const styleTag = document.createElement('style');
        styleTag.setAttribute('type', 'text/css');
        styleTag.appendChild(document.createTextNode(css));
        this.element.appendChild(styleTag);
    }
    /** pause auto play */
    pauseAutoplay() {
        if (this.carouselState.intervalObj) {
            clearInterval(this.carouselState.intervalObj);
            this.carouselState.intervalObj = undefined;
        }
    }
    /** show the indicators for transition of slides */
    renderIndicators() {
        return (core.h("div", { class: `indicators ${this.badgeAlignment ? '' : 'center'} ${this.carouselState.navigationReady ? '' : 'dxp-none'}`, role: "application" }, this.carouselState.slides && this.carouselState.slides.map((_slide, index) => core.h("span", { class: `dot ${index === this.carouselState.activeSlideIndex ? 'active' : ''}`, "aria-describedby": `index${index}`, "aria-controls": `index${index}`, tabindex: "0", role: "button", onClick: () => this.activateSlide(index), onFocus: () => this.showSlide(index), "aria-label": `${index + 1} ${core.dxp.i18n.t('BannerCarousel:slide')} ${this.carouselState.slides.length}` }))));
    }
    /** show the progress bar for transition of slides */
    renderProgressBar() {
        return (core.h("div", { class: `bar-container ${this.indicatorToLeft ? 'set-to-left' : ''} ${this.isBenefitsHero ? 'benefits-indicator' : ''}` }, core.h("div", { class: "carousel-progress-values" }, core.h("span", { class: "current-value" }, `${String(this.carouselState.activeSlideIndex + 1).padStart(2, '0')} /`), core.h("span", { class: "max-value" }, ` ${String(this.slides ? this.slides.length : this.maxSlides).padStart(2, '0')}`)), this.theme !== 'dxp-theme-b2b' && core.h("div", { class: "carousel-progress-bar" }, core.h("div", { class: "carousel-current-progress" })), core.h("div", { class: "arrow-container" }, core.h("div", { class: `prev-arrow ${this.carouselState.activeSlideIndex === 0 ? 'disable-prev-arrow' : ''}`, onFocus: () => this.focusNextPrev('PREV'), onClick: () => this.changeSlide('PREV'), tabindex: "0" }), core.h("div", { class: "next-arrow", onFocus: () => this.focusNextPrev('NEXT'), onClick: () => this.changeSlide('NEXT'), tabindex: "0" }))));
    }
    /** show thumnails for transition of slides */
    renderThumbnails() {
        return (core.h("div", { class: "thumbnails", role: "application" }, this.carouselState.slides && this.carouselState.slides.map((_slide, index) => core.h("img", { class: `thumbnail ${index === this.carouselState.activeSlideIndex ? 'active' : ''}`, "aria-describedby": `index${index}`, tabindex: "0", onClick: () => this.activateSlide(index), onFocus: () => this.showSlide(index), alt: _slide['alt'], src: _slide['src'], "aria-label": `${index + 1} ${core.dxp.i18n.t('BannerCarousel:slide')} ${this.carouselState.slides.length}` }))));
    }
    /** set focus for accessibility */
    setFocus() {
        if (this.base) {
            this.setFocusElement(this.base.shadowRootQuerySelector(this.element, '.carousel-container'));
        }
    }
    /** set focus for accessibility */
    setFocusElement(ele) {
        ele.focus();
    }
    /** method to set indicator/dots and navigation arrow positions */
    setIndicatorsPosition() {
        if (this.carouselState.activeSlide && this.carouselState.activeSlide.classList.contains('hydrated')) {
            this.calculateIndicatorPosition();
        }
        else {
            const interval = setInterval(() => {
                if (this.carouselState.activeSlide && this.carouselState.activeSlide.classList.contains('hydrated')) {
                    this.calculateIndicatorPosition();
                    clearInterval(interval);
                }
            }, 500);
        }
    }
    /** fired on focus for accessibility */
    showSlide(index) {
        this.indicatorIndex = index;
        this.focusOnDots = true;
    }
    /** start slide show */
    startSlideShow() {
        if (this.carouselState.navigationReady) {
            // clear existing auto play interval if any
            this.pauseAutoplay();
            let index = this.carouselState.activeSlideIndex ? this.carouselState.activeSlideIndex : 0;
            this.carouselState.intervalObj = setInterval(() => {
                // for progress bar
                if (this.showProgressbar) {
                    clearInterval(this.setWidth);
                    this.fillProgressBar();
                }
                this.activateSlide(index);
                index = index + 1 < this.carouselState.slides.length ? index + 1 : 0;
            }, this.pauseDuration);
        }
    }
    /** Render the banner-carousel */
    render() {
        core.dxp.log.debug(this.element.tagName, 'render()', `in dxp-banner-carousel render() : ${"DEVELOPMENT"}`);
        const styles = [
            core.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core.h("link", { rel: "stylesheet", href: `${core.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-banner-carousel.min.css` })],
            core.h("style", null, this.indicatorColor && `
          .dxp.${this.theme}.dxp-banner-carousel .bar-container{color: ${this.indicatorColor}}
          .dxp.${this.theme}.dxp-banner-carousel .carousel-current-progress{background-color: ${this.indicatorColor}}
        `)
        ];
        return (core.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core.h("div", { class: "carousel-container", tabindex: "0", onFocus: () => this.onMouseover() }, this.slides ? this.slides.map(items => core.h("dxp-banner", { "banner-type": items['bannerType'], "banner-size": items['bannerSize'], "data-theme": items['dataTheme'], "eyebrow-title": items['eyebrowTitle'], "title-text": items['titleText'], "title-heading": items['titleHeading'], "sub-title": items['subTitle'], "enable-overlay": items['enableOverlay'], "overlay-position": items['overlayPosition'], "image-enable-overlay": items['imageEnableOverlay'], src: items['src'], "src-lg": items['srcLg'], "src-md": items['srcMd'], "image-title": items['imageTitle'], alt: items['alt'], href: items['href'], "open-in-new-tab": items['openInNewTab'], "focal-point": items['focalPoint'], "focal-point-lg": items['focalPointLg'], "focal-point-md": items['focalPointMd'], "position-of-image": items['positionOfImage'], responsive: items['responsive'], cta: items['cta'] })) :
            core.h("slot", null), this.showArrows ?
            core.h("div", { class: `nav-controls ${this.carouselState.navigationReady ? '' : 'dxp-none'}` }, core.h("span", { class: "prev", onFocus: () => this.focusNextPrev('PREV'), onBlur: () => this.blurNextPrev('PREV'), onClick: () => this.changeSlide('PREV'), "aria-controls": "carousel", "aria-label": core.dxp.i18n.t('BannerCarousel:prev') }), core.h("span", { class: "next", onFocus: () => this.focusNextPrev('NEXT'), onBlur: () => this.blurNextPrev('NEXT'), onClick: () => this.changeSlide('NEXT'), "aria-controls": "carousel", "aria-label": core.dxp.i18n.t('BannerCarousel:next') }))
            :
                ''), this.showThumbnails && !this.showProgressbar ? this.renderThumbnails() : this.showProgressbar ? this.renderProgressBar() : this.renderIndicators()));
    }
    get element() { return core.getElement(this); }
    static get style() { return "div.dxp.dxp-banner-carousel{position:relative}div.dxp.dxp-banner-carousel .carousel-container{position:relative;overflow:hidden;white-space:nowrap}div.dxp.dxp-banner-carousel .carousel-container.card{-webkit-box-shadow:0 2px 10px 0 rgba(20,20,19,.2);box-shadow:0 2px 10px 0 rgba(20,20,19,.2);border-radius:4px}div.dxp.dxp-banner-carousel .fade{-webkit-animation-name:fade;-webkit-animation-duration:1.5s;animation-name:fade;animation-duration:1.5s}\@-webkit-keyframes fade{0%{opacity:.4}to{opacity:1}}\@keyframes fade{0%{opacity:.4}to{opacity:1}}div.dxp.dxp-banner-carousel .dot{cursor:pointer;height:10px;z-index:10;width:10px;margin-right:8px;border-radius:50%;display:inline-block;-webkit-transition:background-color .6s ease;transition:background-color .6s ease}div.dxp.dxp-banner-carousel .nav-controls{position:absolute;z-index:10;right:0;left:0}div.dxp.dxp-banner-carousel .next,div.dxp.dxp-banner-carousel .prev{position:absolute;cursor:pointer;width:48px;height:108px;-webkit-transition:.6s ease;transition:.6s ease;border-radius:0 8px 8px 0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}div.dxp.dxp-banner-carousel .next{right:0;border-radius:8px 0 0 8px}div.dxp.dxp-banner-carousel .indicators{position:absolute;text-align:center;line-height:1}div.dxp.dxp-banner-carousel .indicators.center{width:100%}div.dxp.dxp-banner-carousel .bar-container{display:-ms-flexbox;display:flex;position:absolute;width:50%;right:0;bottom:0;padding:0 2.5rem 2.5rem;line-height:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between}div.dxp.dxp-banner-carousel .bar-container.set-to-left{right:auto;left:0}div.dxp.dxp-banner-carousel .bar-container .carousel-progress-bar{display:none}div.dxp.dxp-banner-carousel .bar-container.benefits-indicator{padding-left:128px;padding-right:0;-ms-flex-pack:start;justify-content:flex-start}div.dxp.dxp-banner-carousel .bar-container.benefits-indicator .carousel-progress-bar{display:block;margin-top:0;margin-left:2.75rem}\@media (max-width:768px){div.dxp.dxp-banner-carousel .bar-container.benefits-indicator .carousel-progress-bar{margin-left:1.5rem}}div.dxp.dxp-banner-carousel .bar-container.benefits-indicator .arrow-container{margin-left:1.875rem}div.dxp.dxp-banner-carousel .bar-container.benefits-indicator .next-arrow,div.dxp.dxp-banner-carousel .bar-container.benefits-indicator .next-arrow:after,div.dxp.dxp-banner-carousel .bar-container.benefits-indicator .prev-arrow,div.dxp.dxp-banner-carousel .bar-container.benefits-indicator .prev-arrow:after{width:26px}\@media (min-width:992px){div.dxp.dxp-banner-carousel .bar-container.benefits-indicator .prev-arrow{margin-right:2rem}}\@media (max-width:991px){div.dxp.dxp-banner-carousel .bar-container.benefits-indicator{padding-left:36px;padding-right:36px}}\@media (max-width:767px){div.dxp.dxp-banner-carousel .bar-container.benefits-indicator{padding-left:16px;padding-right:16px}}\@media (max-width:991px){div.dxp.dxp-banner-carousel .bar-container{width:100%}}div.dxp.dxp-banner-carousel .arrow-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;height:24px;margin:0}div.dxp.dxp-banner-carousel .carousel-progress-bar{position:relative;margin-top:10px;width:39.5%;height:2px}div.dxp.dxp-banner-carousel .carousel-progress-values{color:inherit;margin:0;min-width:60px}div.dxp.dxp-banner-carousel .carousel-current-progress{position:absolute;top:0;right:0;bottom:0;left:0;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:0 50%;transform-origin:0 50%}div.dxp.dxp-banner-carousel .next-arrow:before{right:0;border-width:1px 1px 0 0;-webkit-transform:translate(-2px,-50%) rotate(45deg);transform:translate(-2px,-50%) rotate(45deg)}div.dxp.dxp-banner-carousel .next-arrow:after{right:0;-webkit-transform:translate(-1px,-50%);transform:translate(-1px,-50%)}div.dxp.dxp-banner-carousel .prev-arrow{margin-right:16px}div.dxp.dxp-banner-carousel .prev-arrow:before{left:0;border-width:0 0 1px 1px;-webkit-transform:translate(2px,-50%) rotate(45deg);transform:translate(2px,-50%) rotate(45deg)}div.dxp.dxp-banner-carousel .prev-arrow:after{left:0;-webkit-transform:translate(1px,-50%);transform:translate(1px,-50%)}div.dxp.dxp-banner-carousel .next-arrow,div.dxp.dxp-banner-carousel .prev-arrow{display:inline-block;padding:0;background:none;height:24px;width:20px;position:relative;cursor:pointer}div.dxp.dxp-banner-carousel .next-arrow:before,div.dxp.dxp-banner-carousel .prev-arrow:before{content:\"\";display:block;height:9px;width:9px;position:absolute;top:50%;border-color:inherit;border-style:solid}div.dxp.dxp-banner-carousel .next-arrow:after,div.dxp.dxp-banner-carousel .prev-arrow:after{content:\"\";display:block;height:0;border-top:1px solid;width:19px;position:absolute;top:50%}div.dxp.dxp-banner-carousel .disable-prev-arrow{pointer-events:none;opacity:.6}div.dxp.dxp-banner-carousel .thumbnails{text-align:center}div.dxp.dxp-banner-carousel .thumbnails .thumbnail{overflow:hidden;cursor:pointer;display:inline-block;width:90px;height:40px;margin:7px 3px}div.dxp.dxp-banner-carousel[dir=rtl] .next{left:0;right:auto}div.dxp.dxp-banner-carousel[dir=rtl] .arrow-container{-ms-flex-direction:row-reverse;flex-direction:row-reverse}div.dxp.dxp-banner-carousel[dir=rtl] .arrow-container .next-arrow,div.dxp.dxp-banner-carousel[dir=rtl] .arrow-container .prev-arrow{background:none}div.dxp.dxp-banner-carousel[dir=rtl] .benefits-indicator{padding-left:0;padding-right:128px}div.dxp.dxp-banner-carousel[dir=rtl] .benefits-indicator .carousel-progress-bar{margin-left:0;margin-right:2.75rem}div.dxp.dxp-banner-carousel[dir=rtl] .benefits-indicator .arrow-container{margin-left:0;margin-right:1.875rem}\@media (max-width:991px){div.dxp.dxp-banner-carousel[dir=rtl] .benefits-indicator{padding-right:36px}}\@media (max-width:767px){div.dxp.dxp-banner-carousel[dir=rtl] .benefits-indicator{padding-right:16px}}"; }
};

exports.dxp_banner_carousel = BannerCarousel;
