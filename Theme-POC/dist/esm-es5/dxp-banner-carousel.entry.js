import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var messages = {
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
var TRANSLATE_VALUE = 'translate3d(0px, 0px, 0px) scale(';
var BANNER = 'dxp-banner';
var BannerCarousel = /** @class */ (function () {
    function BannerCarousel(hostRef) {
        registerInstance(this, hostRef);
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
    BannerCarousel.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'BannerCarousel', messages);
    };
    /** actions to be performed after component loading */
    BannerCarousel.prototype.componentDidLoad = function () {
        this.insertAnimationStyles();
        this.activateSlide(0);
        this.setIndicatorsPosition();
        this.maxSlides = this.carouselState.slides && this.carouselState.slides.length;
        var banner = this.carouselState.activeSlide;
        var rootEle = banner && banner ? banner : banner;
        if (this.element && this.element.querySelector('.carousel-container') && rootEle &&
            rootEle.querySelector('dxp-banner-small-image') !== undefined) {
            this.element.querySelector('.carousel-container').classList.add('card');
        }
    };
    /** keydown events for accessibility */
    BannerCarousel.prototype.keydownEvents = function (event) {
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
    };
    /** listener for accessibility to stop carousel autoplay on focus */
    BannerCarousel.prototype.onCarouselFocus = function () {
        this.autoPlayPause();
    };
    /** Mouseout event listener */
    BannerCarousel.prototype.onMouseout = function () {
        if (this.autoPlay) {
            this.startSlideShow();
        }
    };
    /** Mouseover event listener */
    BannerCarousel.prototype.onMouseover = function () {
        this.autoPlayPause();
    };
    /** window resize event */
    BannerCarousel.prototype.windowResize = function () {
        if (this.carouselState.activeSlide) {
            this.setIndicatorsPosition();
        }
    };
    /** active slide by index */
    BannerCarousel.prototype.activateSlide = function (index) {
        var _this = this;
        this.carouselState.slides = this.getCarouselItems();
        this.carouselState.activeSlide = this.carouselState.slides[index];
        this.carouselState.activeSlideIndex = index;
        this.carouselState.slides.forEach(function (slide) {
            slide.style.position = 'relative';
            slide.style.width = '100%';
            slide.style.display = 'inline-block';
            slide.style.verticalAlign = 'top';
            slide.style.transition = 'all 0.8s cubic-bezier(0.4, 1.3, 0.65, 1)';
            _this.carouselState.activeSlide.setAttribute('aria-hidden', 'false');
            _this.carouselState.slides[index].style.transition = '2s';
            slide.setAttribute('id', "index" + index);
            slide.setAttribute('aria-hidden', 'true');
        });
        this.carouselState = Object.assign({}, this.carouselState);
        this.animateSlide(index, 'NEXT');
    };
    /** add slide animation styles */
    BannerCarousel.prototype.animateSlide = function (index, direction) {
        var j = 1;
        if (this.carouselState && this.carouselState.slides[0]) {
            if (index === 0) {
                this.carouselState.slides[0].style.marginLeft = 0;
            }
            while (j <= index) {
                if (direction === 'NEXT') {
                    this.carouselState.slides[0].style.marginLeft = -100 * j + "%";
                }
                j++;
            }
            while (j > index) {
                if (direction === 'PREV') {
                    this.carouselState.slides[0].style.marginLeft = -100 * (j - 1) + "%";
                }
                j--;
            }
        }
    };
    /** apply calculations to indicators, progrssbar and arrows */
    BannerCarousel.prototype.applyCalculationsToElements = function (bannerType, carouselElement, imgTag) {
        var _this = this;
        imgTag = imgTag ? imgTag : imgTag;
        imgTag = imgTag.querySelector('img');
        var interval = setInterval(function () {
            if (imgTag && imgTag.complete === true) {
                // get the parent element of dxp-image and calculate it height
                var imageParent = bannerType ? bannerType.querySelector('dxp-image').parentElement : bannerType &&
                    bannerType.querySelector('dxp-image').parentElement;
                var imgEleHeight = imageParent && imageParent.getBoundingClientRect().height;
                var indicatorPlaceholder = bannerType && bannerType.querySelector('.indicators-placeholder');
                var positionLeft = carouselElement &&
                    (indicatorPlaceholder.getBoundingClientRect().left - carouselElement.querySelector('.carousel-container').getBoundingClientRect().left);
                var indicatorsEle = carouselElement && carouselElement.querySelector('.indicators');
                var calcTop = window.innerWidth > 767.9 ? (imgEleHeight - 51) : (imgEleHeight - 42);
                var navControls = carouselElement && carouselElement.querySelector('.nav-controls');
                _this.applyLeftValue(indicatorsEle, positionLeft);
                _this.applyTopValue(calcTop, indicatorsEle, navControls, imgEleHeight);
                _this.carouselState = Object.assign(Object.assign({}, _this.carouselState), { navigationReady: true });
                if (_this.autoPlay) {
                    _this.startSlideShow();
                }
                clearInterval(interval);
            }
        }, 200);
    };
    /** center align */
    BannerCarousel.prototype.applyDefaultCenter = function (carouselElement) {
        this.carouselState = Object.assign(Object.assign({}, this.carouselState), { navigationReady: true });
        var navControls = carouselElement && carouselElement.querySelector('.nav-controls');
        if (navControls && !this.badgeAlignment) {
            navControls.style.top = 50 + "%";
        }
        if (this.autoPlay) {
            this.startSlideShow();
        }
    };
    /** apply calculations to indicators */
    BannerCarousel.prototype.applyLeftValue = function (indicatorsEle, positionLeft) {
        if (indicatorsEle && (window.innerWidth < 992 || !this.badgeAlignment && window.innerWidth > 991.9)) {
            indicatorsEle.style.left = '';
            indicatorsEle.classList.add('center');
        }
        if (indicatorsEle && this.badgeAlignment && window.innerWidth > 991.9) {
            indicatorsEle.classList.remove('center');
            indicatorsEle.style.left = positionLeft + "px";
        }
    };
    /** apply top values for alignment of indicators and navigation arrows */
    BannerCarousel.prototype.applyTopValue = function (calcTop, indicatorsEle, navControls, imgEleHeight) {
        if (indicatorsEle) {
            indicatorsEle.style.top = calcTop + "px";
        }
        if (navControls) {
            navControls.style.top = (imgEleHeight / 2 - 54) + "px";
        }
    };
    /** pause auto play */
    BannerCarousel.prototype.autoPlayPause = function () {
        if (this.autoPlay) {
            this.pauseAutoplay();
        }
    };
    /** to reset the state for focus of next or prev navigation arrows */
    BannerCarousel.prototype.blurNextPrev = function (direction) {
        direction === 'NEXT' ? this.focusOnNext = false : this.focusOnPrev = false;
    };
    /** calculate indicator position */
    BannerCarousel.prototype.calculateIndicatorPosition = function () {
        var carouselElement = this.element ? this.element : this.element;
        var banner = this.carouselState.activeSlide;
        var rootEle = banner && banner ? banner : banner;
        var bannerType = (rootEle && rootEle.querySelector('dxp-banner-benefits-hero')) || (rootEle && rootEle.querySelector('dxp-banner-small-image'))
            || (rootEle && rootEle.querySelector('dxp-banner-image-overlay')) || (rootEle && rootEle.querySelector('dxp-banner-regular'));
        var imgTag = bannerType && bannerType ? bannerType.querySelector('dxp-image') : bannerType && bannerType.querySelector('dxp-image');
        if (imgTag) {
            this.applyCalculationsToElements(bannerType, carouselElement, imgTag);
        }
        else {
            this.applyDefaultCenter(carouselElement);
        }
    };
    /** active slide by index */
    BannerCarousel.prototype.changeSlide = function (direction) {
        var index = this.carouselState.activeSlideIndex;
        index = direction === 'NEXT' ? (index + 1 < this.carouselState.slides.length ? index + 1 : 0) : (index - 1 < 0 ? this.carouselState.slides.length - 1 : index - 1);
        clearInterval(this.setWidth);
        this.endProgressBar();
        this.activateSlide(index);
        this.animateSlide(index, direction);
    };
    /** to end the bar progress */
    BannerCarousel.prototype.endProgressBar = function () {
        var _this = this;
        var max = 100;
        this.setWidth = setInterval(function () {
            var currentProgress = _this.base && _this.base.shadowRootQuerySelector(_this.element, '.carousel-current-progress');
            var styleTransform = currentProgress && currentProgress.style;
            if (styleTransform) {
                max--;
                if (max < 0) {
                    clearInterval(_this.setWidth);
                }
                else {
                    styleTransform.transformOrigin = '100% 50%';
                    styleTransform.transform = TRANSLATE_VALUE + max / 100 + ", 1)";
                }
            }
        }, 5);
    };
    /** to show the bar progress */
    BannerCarousel.prototype.fillProgressBar = function () {
        var _this = this;
        var max = 100;
        var counter = 0;
        this.setWidth = setInterval(function () {
            var currentProgress = _this.base && _this.base.shadowRootQuerySelector(_this.element, '.carousel-current-progress');
            var styleTransform = currentProgress && currentProgress.style;
            if (styleTransform) {
                if (counter < 100) {
                    counter++;
                    styleTransform.transformOrigin = '0 50%';
                    styleTransform.transform = TRANSLATE_VALUE + counter / 100 + ", 1)";
                }
                else {
                    max--;
                    if (max < 0) {
                        clearInterval(_this.setWidth);
                    }
                    else {
                        styleTransform.transformOrigin = '100% 50%';
                        styleTransform.transform = TRANSLATE_VALUE + max / 100 + ", 1)";
                    }
                }
            }
        }, this.pauseDuration / 200);
    };
    /** to set the state for focus of next or prev navigation arrows */
    BannerCarousel.prototype.focusNextPrev = function (direction) {
        // using if else as lint error for ternary operator
        if (direction === 'NEXT') {
            this.focusOnNext = true;
            this.focusOnPrev = false;
        }
        else {
            this.focusOnPrev = true;
            this.focusOnNext = false;
        }
    };
    /** convert node list to array */
    BannerCarousel.prototype.getArrayFromNodeList = function (nodeList) {
        return [].slice.call(nodeList);
    };
    /** get array of rendered child tab elements */
    BannerCarousel.prototype.getCarouselItems = function () {
        // query select rendered items if child items are created within this component
        // querySelectorAll returns a NodeList, we can convert it to array using spread operator but that doesn't work on IE
        // so using array slicing workaround
        var carouselItems = this.element ?
            this.getArrayFromNodeList(this.element.querySelectorAll(BANNER))
            : this.getArrayFromNodeList(this.element.querySelectorAll(BANNER));
        // if child items are not found within this component then search for slotted items (childNodes)
        carouselItems = carouselItems.length > 0 ? carouselItems : this.getArrayFromNodeList(this.element.childNodes).filter(function (child) {
            return child['tagName'] && child['tagName'].toLowerCase() === BANNER;
        });
        return carouselItems;
    };
    /** insert animation styles */
    BannerCarousel.prototype.insertAnimationStyles = function () {
        var css = "\n    .fade {\n      -webkit-animation-name: fade;\n      -webkit-animation-duration: 1.5s;\n      animation-name: fade;\n      animation-duration: 1.5s;\n    }\n    @-webkit-keyframes fade {\n      from {opacity: .4}\n      to {opacity: 1}\n    }\n    @keyframes fade {\n      from {opacity: .4}\n      to {opacity: 1}\n    }\n    ";
        var styleTag = document.createElement('style');
        styleTag.setAttribute('type', 'text/css');
        styleTag.appendChild(document.createTextNode(css));
        this.element.appendChild(styleTag);
    };
    /** pause auto play */
    BannerCarousel.prototype.pauseAutoplay = function () {
        if (this.carouselState.intervalObj) {
            clearInterval(this.carouselState.intervalObj);
            this.carouselState.intervalObj = undefined;
        }
    };
    /** show the indicators for transition of slides */
    BannerCarousel.prototype.renderIndicators = function () {
        var _this = this;
        return (h("div", { class: "indicators " + (this.badgeAlignment ? '' : 'center') + " " + (this.carouselState.navigationReady ? '' : 'dxp-none'), role: "application" }, this.carouselState.slides && this.carouselState.slides.map(function (_slide, index) { return h("span", { class: "dot " + (index === _this.carouselState.activeSlideIndex ? 'active' : ''), "aria-describedby": "index" + index, "aria-controls": "index" + index, tabindex: "0", role: "button", onClick: function () { return _this.activateSlide(index); }, onFocus: function () { return _this.showSlide(index); }, "aria-label": index + 1 + " " + dxp.i18n.t('BannerCarousel:slide') + " " + _this.carouselState.slides.length }); })));
    };
    /** show the progress bar for transition of slides */
    BannerCarousel.prototype.renderProgressBar = function () {
        var _this = this;
        return (h("div", { class: "bar-container " + (this.indicatorToLeft ? 'set-to-left' : '') + " " + (this.isBenefitsHero ? 'benefits-indicator' : '') }, h("div", { class: "carousel-progress-values" }, h("span", { class: "current-value" }, String(this.carouselState.activeSlideIndex + 1).padStart(2, '0') + " /"), h("span", { class: "max-value" }, " " + String(this.slides ? this.slides.length : this.maxSlides).padStart(2, '0'))), this.theme !== 'dxp-theme-b2b' && h("div", { class: "carousel-progress-bar" }, h("div", { class: "carousel-current-progress" })), h("div", { class: "arrow-container" }, h("div", { class: "prev-arrow " + (this.carouselState.activeSlideIndex === 0 ? 'disable-prev-arrow' : ''), onFocus: function () { return _this.focusNextPrev('PREV'); }, onClick: function () { return _this.changeSlide('PREV'); }, tabindex: "0" }), h("div", { class: "next-arrow", onFocus: function () { return _this.focusNextPrev('NEXT'); }, onClick: function () { return _this.changeSlide('NEXT'); }, tabindex: "0" }))));
    };
    /** show thumnails for transition of slides */
    BannerCarousel.prototype.renderThumbnails = function () {
        var _this = this;
        return (h("div", { class: "thumbnails", role: "application" }, this.carouselState.slides && this.carouselState.slides.map(function (_slide, index) { return h("img", { class: "thumbnail " + (index === _this.carouselState.activeSlideIndex ? 'active' : ''), "aria-describedby": "index" + index, tabindex: "0", onClick: function () { return _this.activateSlide(index); }, onFocus: function () { return _this.showSlide(index); }, alt: _slide['alt'], src: _slide['src'], "aria-label": index + 1 + " " + dxp.i18n.t('BannerCarousel:slide') + " " + _this.carouselState.slides.length }); })));
    };
    /** set focus for accessibility */
    BannerCarousel.prototype.setFocus = function () {
        if (this.base) {
            this.setFocusElement(this.base.shadowRootQuerySelector(this.element, '.carousel-container'));
        }
    };
    /** set focus for accessibility */
    BannerCarousel.prototype.setFocusElement = function (ele) {
        ele.focus();
    };
    /** method to set indicator/dots and navigation arrow positions */
    BannerCarousel.prototype.setIndicatorsPosition = function () {
        var _this = this;
        if (this.carouselState.activeSlide && this.carouselState.activeSlide.classList.contains('hydrated')) {
            this.calculateIndicatorPosition();
        }
        else {
            var interval_1 = setInterval(function () {
                if (_this.carouselState.activeSlide && _this.carouselState.activeSlide.classList.contains('hydrated')) {
                    _this.calculateIndicatorPosition();
                    clearInterval(interval_1);
                }
            }, 500);
        }
    };
    /** fired on focus for accessibility */
    BannerCarousel.prototype.showSlide = function (index) {
        this.indicatorIndex = index;
        this.focusOnDots = true;
    };
    /** start slide show */
    BannerCarousel.prototype.startSlideShow = function () {
        var _this = this;
        if (this.carouselState.navigationReady) {
            // clear existing auto play interval if any
            this.pauseAutoplay();
            var index_1 = this.carouselState.activeSlideIndex ? this.carouselState.activeSlideIndex : 0;
            this.carouselState.intervalObj = setInterval(function () {
                // for progress bar
                if (_this.showProgressbar) {
                    clearInterval(_this.setWidth);
                    _this.fillProgressBar();
                }
                _this.activateSlide(index_1);
                index_1 = index_1 + 1 < _this.carouselState.slides.length ? index_1 + 1 : 0;
            }, this.pauseDuration);
        }
    };
    /** Render the banner-carousel */
    BannerCarousel.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-banner-carousel render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-banner-carousel.min.css" })],
            h("style", null, this.indicatorColor && "\n          .dxp." + this.theme + ".dxp-banner-carousel .bar-container{color: " + this.indicatorColor + "}\n          .dxp." + this.theme + ".dxp-banner-carousel .carousel-current-progress{background-color: " + this.indicatorColor + "}\n        ")
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "carousel-container", tabindex: "0", onFocus: function () { return _this.onMouseover(); } }, this.slides ? this.slides.map(function (items) { return h("dxp-banner", { "banner-type": items['bannerType'], "banner-size": items['bannerSize'], "data-theme": items['dataTheme'], "eyebrow-title": items['eyebrowTitle'], "title-text": items['titleText'], "title-heading": items['titleHeading'], "sub-title": items['subTitle'], "enable-overlay": items['enableOverlay'], "overlay-position": items['overlayPosition'], "image-enable-overlay": items['imageEnableOverlay'], src: items['src'], "src-lg": items['srcLg'], "src-md": items['srcMd'], "image-title": items['imageTitle'], alt: items['alt'], href: items['href'], "open-in-new-tab": items['openInNewTab'], "focal-point": items['focalPoint'], "focal-point-lg": items['focalPointLg'], "focal-point-md": items['focalPointMd'], "position-of-image": items['positionOfImage'], responsive: items['responsive'], cta: items['cta'] }); }) :
            h("slot", null), this.showArrows ?
            h("div", { class: "nav-controls " + (this.carouselState.navigationReady ? '' : 'dxp-none') }, h("span", { class: "prev", onFocus: function () { return _this.focusNextPrev('PREV'); }, onBlur: function () { return _this.blurNextPrev('PREV'); }, onClick: function () { return _this.changeSlide('PREV'); }, "aria-controls": "carousel", "aria-label": dxp.i18n.t('BannerCarousel:prev') }), h("span", { class: "next", onFocus: function () { return _this.focusNextPrev('NEXT'); }, onBlur: function () { return _this.blurNextPrev('NEXT'); }, onClick: function () { return _this.changeSlide('NEXT'); }, "aria-controls": "carousel", "aria-label": dxp.i18n.t('BannerCarousel:next') }))
            :
                ''), this.showThumbnails && !this.showProgressbar ? this.renderThumbnails() : this.showProgressbar ? this.renderProgressBar() : this.renderIndicators()));
    };
    Object.defineProperty(BannerCarousel.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BannerCarousel, "style", {
        get: function () { return "div.dxp.dxp-banner-carousel{position:relative}div.dxp.dxp-banner-carousel .carousel-container{position:relative;overflow:hidden;white-space:nowrap}div.dxp.dxp-banner-carousel .carousel-container.card{-webkit-box-shadow:0 2px 10px 0 rgba(20,20,19,.2);box-shadow:0 2px 10px 0 rgba(20,20,19,.2);border-radius:4px}div.dxp.dxp-banner-carousel .fade{-webkit-animation-name:fade;-webkit-animation-duration:1.5s;animation-name:fade;animation-duration:1.5s}\@-webkit-keyframes fade{0%{opacity:.4}to{opacity:1}}\@keyframes fade{0%{opacity:.4}to{opacity:1}}div.dxp.dxp-banner-carousel .dot{cursor:pointer;height:10px;z-index:10;width:10px;margin-right:8px;border-radius:50%;display:inline-block;-webkit-transition:background-color .6s ease;transition:background-color .6s ease}div.dxp.dxp-banner-carousel .nav-controls{position:absolute;z-index:10;right:0;left:0}div.dxp.dxp-banner-carousel .next,div.dxp.dxp-banner-carousel .prev{position:absolute;cursor:pointer;width:48px;height:108px;-webkit-transition:.6s ease;transition:.6s ease;border-radius:0 8px 8px 0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}div.dxp.dxp-banner-carousel .next{right:0;border-radius:8px 0 0 8px}div.dxp.dxp-banner-carousel .indicators{position:absolute;text-align:center;line-height:1}div.dxp.dxp-banner-carousel .indicators.center{width:100%}div.dxp.dxp-banner-carousel .bar-container{display:-ms-flexbox;display:flex;position:absolute;width:50%;right:0;bottom:0;padding:0 2.5rem 2.5rem;line-height:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between}div.dxp.dxp-banner-carousel .bar-container.set-to-left{right:auto;left:0}div.dxp.dxp-banner-carousel .bar-container .carousel-progress-bar{display:none}div.dxp.dxp-banner-carousel .bar-container.benefits-indicator{padding-left:128px;padding-right:0;-ms-flex-pack:start;justify-content:flex-start}div.dxp.dxp-banner-carousel .bar-container.benefits-indicator .carousel-progress-bar{display:block;margin-top:0;margin-left:2.75rem}\@media (max-width:768px){div.dxp.dxp-banner-carousel .bar-container.benefits-indicator .carousel-progress-bar{margin-left:1.5rem}}div.dxp.dxp-banner-carousel .bar-container.benefits-indicator .arrow-container{margin-left:1.875rem}div.dxp.dxp-banner-carousel .bar-container.benefits-indicator .next-arrow,div.dxp.dxp-banner-carousel .bar-container.benefits-indicator .next-arrow:after,div.dxp.dxp-banner-carousel .bar-container.benefits-indicator .prev-arrow,div.dxp.dxp-banner-carousel .bar-container.benefits-indicator .prev-arrow:after{width:26px}\@media (min-width:992px){div.dxp.dxp-banner-carousel .bar-container.benefits-indicator .prev-arrow{margin-right:2rem}}\@media (max-width:991px){div.dxp.dxp-banner-carousel .bar-container.benefits-indicator{padding-left:36px;padding-right:36px}}\@media (max-width:767px){div.dxp.dxp-banner-carousel .bar-container.benefits-indicator{padding-left:16px;padding-right:16px}}\@media (max-width:991px){div.dxp.dxp-banner-carousel .bar-container{width:100%}}div.dxp.dxp-banner-carousel .arrow-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;height:24px;margin:0}div.dxp.dxp-banner-carousel .carousel-progress-bar{position:relative;margin-top:10px;width:39.5%;height:2px}div.dxp.dxp-banner-carousel .carousel-progress-values{color:inherit;margin:0;min-width:60px}div.dxp.dxp-banner-carousel .carousel-current-progress{position:absolute;top:0;right:0;bottom:0;left:0;-webkit-transform:scaleX(0);transform:scaleX(0);-webkit-transform-origin:0 50%;transform-origin:0 50%}div.dxp.dxp-banner-carousel .next-arrow:before{right:0;border-width:1px 1px 0 0;-webkit-transform:translate(-2px,-50%) rotate(45deg);transform:translate(-2px,-50%) rotate(45deg)}div.dxp.dxp-banner-carousel .next-arrow:after{right:0;-webkit-transform:translate(-1px,-50%);transform:translate(-1px,-50%)}div.dxp.dxp-banner-carousel .prev-arrow{margin-right:16px}div.dxp.dxp-banner-carousel .prev-arrow:before{left:0;border-width:0 0 1px 1px;-webkit-transform:translate(2px,-50%) rotate(45deg);transform:translate(2px,-50%) rotate(45deg)}div.dxp.dxp-banner-carousel .prev-arrow:after{left:0;-webkit-transform:translate(1px,-50%);transform:translate(1px,-50%)}div.dxp.dxp-banner-carousel .next-arrow,div.dxp.dxp-banner-carousel .prev-arrow{display:inline-block;padding:0;background:none;height:24px;width:20px;position:relative;cursor:pointer}div.dxp.dxp-banner-carousel .next-arrow:before,div.dxp.dxp-banner-carousel .prev-arrow:before{content:\"\";display:block;height:9px;width:9px;position:absolute;top:50%;border-color:inherit;border-style:solid}div.dxp.dxp-banner-carousel .next-arrow:after,div.dxp.dxp-banner-carousel .prev-arrow:after{content:\"\";display:block;height:0;border-top:1px solid;width:19px;position:absolute;top:50%}div.dxp.dxp-banner-carousel .disable-prev-arrow{pointer-events:none;opacity:.6}div.dxp.dxp-banner-carousel .thumbnails{text-align:center}div.dxp.dxp-banner-carousel .thumbnails .thumbnail{overflow:hidden;cursor:pointer;display:inline-block;width:90px;height:40px;margin:7px 3px}div.dxp.dxp-banner-carousel[dir=rtl] .next{left:0;right:auto}div.dxp.dxp-banner-carousel[dir=rtl] .arrow-container{-ms-flex-direction:row-reverse;flex-direction:row-reverse}div.dxp.dxp-banner-carousel[dir=rtl] .arrow-container .next-arrow,div.dxp.dxp-banner-carousel[dir=rtl] .arrow-container .prev-arrow{background:none}div.dxp.dxp-banner-carousel[dir=rtl] .benefits-indicator{padding-left:0;padding-right:128px}div.dxp.dxp-banner-carousel[dir=rtl] .benefits-indicator .carousel-progress-bar{margin-left:0;margin-right:2.75rem}div.dxp.dxp-banner-carousel[dir=rtl] .benefits-indicator .arrow-container{margin-left:0;margin-right:1.875rem}\@media (max-width:991px){div.dxp.dxp-banner-carousel[dir=rtl] .benefits-indicator{padding-right:36px}}\@media (max-width:767px){div.dxp.dxp-banner-carousel[dir=rtl] .benefits-indicator{padding-right:16px}}"; },
        enumerable: true,
        configurable: true
    });
    return BannerCarousel;
}());
export { BannerCarousel as dxp_banner_carousel };
