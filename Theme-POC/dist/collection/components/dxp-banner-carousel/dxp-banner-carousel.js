import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const TRANSLATE_VALUE = 'translate3d(0px, 0px, 0px) scale(';
const BANNER = 'dxp-banner';
/** dxp-banner-carousel */
export class BannerCarousel {
    constructor() {
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
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'BannerCarousel', messages);
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
        return (h("div", { class: `indicators ${this.badgeAlignment ? '' : 'center'} ${this.carouselState.navigationReady ? '' : 'dxp-none'}`, role: "application" }, this.carouselState.slides && this.carouselState.slides.map((_slide, index) => h("span", { class: `dot ${index === this.carouselState.activeSlideIndex ? 'active' : ''}`, "aria-describedby": `index${index}`, "aria-controls": `index${index}`, tabindex: "0", role: "button", onClick: () => this.activateSlide(index), onFocus: () => this.showSlide(index), "aria-label": `${index + 1} ${dxp.i18n.t('BannerCarousel:slide')} ${this.carouselState.slides.length}` }))));
    }
    /** show the progress bar for transition of slides */
    renderProgressBar() {
        return (h("div", { class: `bar-container ${this.indicatorToLeft ? 'set-to-left' : ''} ${this.isBenefitsHero ? 'benefits-indicator' : ''}` },
            h("div", { class: "carousel-progress-values" },
                h("span", { class: "current-value" }, `${String(this.carouselState.activeSlideIndex + 1).padStart(2, '0')} /`),
                h("span", { class: "max-value" }, ` ${String(this.slides ? this.slides.length : this.maxSlides).padStart(2, '0')}`)),
            this.theme !== 'dxp-theme-b2b' && h("div", { class: "carousel-progress-bar" },
                h("div", { class: "carousel-current-progress" })),
            h("div", { class: "arrow-container" },
                h("div", { class: `prev-arrow ${this.carouselState.activeSlideIndex === 0 ? 'disable-prev-arrow' : ''}`, onFocus: () => this.focusNextPrev('PREV'), onClick: () => this.changeSlide('PREV'), tabindex: "0" }),
                h("div", { class: "next-arrow", onFocus: () => this.focusNextPrev('NEXT'), onClick: () => this.changeSlide('NEXT'), tabindex: "0" }))));
    }
    /** show thumnails for transition of slides */
    renderThumbnails() {
        return (h("div", { class: "thumbnails", role: "application" }, this.carouselState.slides && this.carouselState.slides.map((_slide, index) => h("img", { class: `thumbnail ${index === this.carouselState.activeSlideIndex ? 'active' : ''}`, "aria-describedby": `index${index}`, tabindex: "0", onClick: () => this.activateSlide(index), onFocus: () => this.showSlide(index), alt: _slide['alt'], src: _slide['src'], "aria-label": `${index + 1} ${dxp.i18n.t('BannerCarousel:slide')} ${this.carouselState.slides.length}` }))));
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-banner-carousel render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-banner-carousel.min.css` })],
            h("style", null, this.indicatorColor && `
          .dxp.${this.theme}.dxp-banner-carousel .bar-container{color: ${this.indicatorColor}}
          .dxp.${this.theme}.dxp-banner-carousel .carousel-current-progress{background-color: ${this.indicatorColor}}
        `)
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "carousel-container", tabindex: "0", onFocus: () => this.onMouseover() },
                this.slides ? this.slides.map(items => h("dxp-banner", { "banner-type": items['bannerType'], "banner-size": items['bannerSize'], "data-theme": items['dataTheme'], "eyebrow-title": items['eyebrowTitle'], "title-text": items['titleText'], "title-heading": items['titleHeading'], "sub-title": items['subTitle'], "enable-overlay": items['enableOverlay'], "overlay-position": items['overlayPosition'], "image-enable-overlay": items['imageEnableOverlay'], src: items['src'], "src-lg": items['srcLg'], "src-md": items['srcMd'], "image-title": items['imageTitle'], alt: items['alt'], href: items['href'], "open-in-new-tab": items['openInNewTab'], "focal-point": items['focalPoint'], "focal-point-lg": items['focalPointLg'], "focal-point-md": items['focalPointMd'], "position-of-image": items['positionOfImage'], responsive: items['responsive'], cta: items['cta'] })) :
                    h("slot", null),
                this.showArrows ?
                    h("div", { class: `nav-controls ${this.carouselState.navigationReady ? '' : 'dxp-none'}` },
                        h("span", { class: "prev", onFocus: () => this.focusNextPrev('PREV'), onBlur: () => this.blurNextPrev('PREV'), onClick: () => this.changeSlide('PREV'), "aria-controls": "carousel", "aria-label": dxp.i18n.t('BannerCarousel:prev') }),
                        h("span", { class: "next", onFocus: () => this.focusNextPrev('NEXT'), onBlur: () => this.blurNextPrev('NEXT'), onClick: () => this.changeSlide('NEXT'), "aria-controls": "carousel", "aria-label": dxp.i18n.t('BannerCarousel:next') }))
                    :
                        ''),
            this.showThumbnails && !this.showProgressbar ? this.renderThumbnails() : this.showProgressbar ? this.renderProgressBar() : this.renderIndicators()));
    }
    static get is() { return "dxp-banner-carousel"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-banner-carousel.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-banner-carousel.css"]
    }; }
    static get properties() { return {
        "autoPlay": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "This is property for autoplay of carousel"
            },
            "attribute": "auto-play",
            "reflect": false
        },
        "badgeAlignment": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "This is property to set the position of badge/dots"
            },
            "attribute": "badge-alignment",
            "reflect": false
        },
        "indicatorColor": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "This is property to set indicator color in b2b carousel"
            },
            "attribute": "indicator-color",
            "reflect": false
        },
        "indicatorToLeft": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Check this to set indicator position to left in b2b carousel"
            },
            "attribute": "indicator-to-left",
            "reflect": false
        },
        "isBenefitsHero": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If banner type is benefits hero then set this to true"
            },
            "attribute": "is-benefits-hero",
            "reflect": false
        },
        "pauseDuration": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "This defines the speed of carousel"
            },
            "attribute": "pause-duration",
            "reflect": false,
            "defaultValue": "5000"
        },
        "showArrows": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "check this to show arrows for carousel"
            },
            "attribute": "show-arrows",
            "reflect": false
        },
        "showProgressbar": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "check this property to show thumbnails of banner"
            },
            "attribute": "show-progressbar",
            "reflect": false
        },
        "showThumbnails": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "check this property to show thumbnails of banner"
            },
            "attribute": "show-thumbnails",
            "reflect": false
        },
        "slides": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "slide data for script elements"
            },
            "attribute": "slides",
            "reflect": false
        }
    }; }
    static get states() { return {
        "carouselState": {},
        "dir": {},
        "focusOnDots": {},
        "focusOnNext": {},
        "focusOnPrev": {},
        "locale": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "keydown",
            "method": "keydownEvents",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "focus",
            "method": "onCarouselFocus",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "mouseout",
            "method": "onMouseout",
            "target": undefined,
            "capture": false,
            "passive": true
        }, {
            "name": "mouseover",
            "method": "onMouseover",
            "target": undefined,
            "capture": false,
            "passive": true
        }, {
            "name": "resize",
            "method": "windowResize",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
