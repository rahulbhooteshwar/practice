import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-34e5af55.js';
var ImageCarousel = /** @class */ (function () {
    function ImageCarousel(hostRef) {
        registerInstance(this, hostRef);
        /** the current index of the slide  */
        this.curIndex = 0;
        /** make delay for next slide progressbar */
        this.delayNextProgressBar = 0;
        /** This is property for autoplay of carousel */
        this.autoplay = true;
        /** This defines the speed of carousel */
        this.pauseDuration = 6000;
    }
    /** actions to be performed prior to component loading */
    ImageCarousel.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'ImageCarousel', messages);
        if (this.carouselData && typeof this.carouselData === 'string') {
            this.carouselData = JSON.parse(this.carouselData);
        }
        // 1 / 5 duration will be used to reveal the new slide
        this.slideReveal = this.pauseDuration / 5;
    };
    /** actions to be performed after component loading */
    ImageCarousel.prototype.componentDidLoad = function () {
        var _this = this;
        this.dxpCarouselSlide = this.findElements(this.element, 'dxp-image-slide', true);
        var imgs = [];
        var imgload = false;
        if (this.dxpCarouselSlide) {
            for (var _i = 0, _a = Object.keys(this.dxpCarouselSlide); _i < _a.length; _i++) {
                var i = _a[_i];
                var dxpImg = this.findElements(this.dxpCarouselSlide[i], 'dxp-image');
                dxpImg.componentOnReady().then(function (res) {
                    // add '0' before the index number of image till the 9 images, e.g.(01, 02,... 09)
                    _this.totalSlides.innerHTML = (_this.dxpCarouselSlide.length < 10 ? '0' : '') + _this.dxpCarouselSlide.length;
                    _this.applyWidthOnDxpImg();
                    var img = _this.findElements(res, 'img');
                    imgs.push(img);
                    if (!imgload) {
                        imgload = true;
                        imgs[0].addEventListener('load', function () {
                            imgs[0].style.width = '100%';
                            _this.wrapDxpImg();
                            _this.slideShow(undefined);
                            // Apply height on carousel container
                            _this.carouselContainer.style.height = _this.slides[0].offsetHeight + "px";
                            imgs[0].style.removeProperty('width');
                        }, false);
                    }
                });
            }
        }
    };
    /** Resize event handler  */
    ImageCarousel.prototype.resizeEventHandler = function () {
        this.applyWidthOnDxpImg();
        // Apply height on carousel container
        this.carouselContainer.style.height = this.slides[0].offsetHeight + "px";
    };
    /** apply width on dxp-image of carousel container  */
    ImageCarousel.prototype.applyWidthOnDxpImg = function () {
        for (var _i = 0, _a = Object.keys(this.dxpCarouselSlide); _i < _a.length; _i++) {
            var i = _a[_i];
            this.dxpCarouselSlide[i].style.display = 'block';
            this.dxpCarouselSlide[i].style.width = this.carouselContainer.offsetWidth + "px";
        }
    };
    /** to return the host elements inside or outside shadowRoot */
    ImageCarousel.prototype.findElements = function (host, query, all) {
        if (all === void 0) { all = false; }
        if (all) {
            return host.querySelectorAll(query).length ? host.querySelectorAll(query) :
                host.querySelectorAll(query).length ? host.querySelectorAll(query) : undefined;
        }
        return host && host.querySelector(query) ? host.querySelector(query) : host && host && host.querySelector(query);
    };
    /** convert nodelist to array */
    ImageCarousel.prototype.getArrayFromNodeList = function (nodeList) {
        return [].slice.call(nodeList);
    };
    /** hide slide to display next one */
    ImageCarousel.prototype.hideSlide = function (slide) {
        slide.setAttribute('data-visible', 'false');
        slide.style.transitionDelay = this.slideReveal + "ms";
        slide.style.opacity = '0';
        slide.style.width = '0';
        slide.style.zIndex = '0';
        slide.style.transform = 'translateX(-100px)';
    };
    /** reveal the next slide */
    ImageCarousel.prototype.nextSlide = function (e) {
        // !e.code will be true with mouse click. Rest condition check the key events
        if (!e.code || e.code.toLowerCase() === 'space' || e.code.toLowerCase() === 'enter' || e.code.toLowerCase() === 'numpadenter') {
            var n = this.index;
            n++;
            clearInterval(this.clrInterval);
            var val = n > (this.slides.length - 1) ? 0 : n;
            this.slideShow(val);
        }
    };
    /** reveal the previous slide */
    ImageCarousel.prototype.prevSlide = function (e) {
        // !e.code will be true with mouse click. Rest condition check the key events
        if (!e.code || e.code.toLowerCase() === 'space' || e.code.toLowerCase() === 'enter' || e.code.toLowerCase() === 'numpadenter') {
            var n = this.index;
            n--;
            clearInterval(this.clrInterval);
            var val = n < 0 ? this.slides.length - 1 : n;
            this.slideShow(val);
        }
    };
    /** reveal the slides with autoplay */
    ImageCarousel.prototype.revealSlide = function (slide) {
        var _this = this;
        var slideIndex = slide.getAttribute('data-index');
        var reduceTm = 0;
        slide.setAttribute('data-visible', 'true');
        slide.style.transitionDelay = '';
        slide.style.opacity = 1;
        slide.style.width = '100%';
        slide.style.zIndex = 1;
        slide.style.transform = 'translateX(0px)';
        // '0' will be prepend before singel deget number like '09'
        this.activeSlide.innerHTML = "" + ((Number(slideIndex) + 1) < 10 ? '0' : '') + (Number(slideIndex) + 1) + " / ";
        // shrink progress bar with image hide
        if (this.delayNextProgressBar) {
            this.carouselProgressbar.style.transition = "width " + this.slideReveal + "ms";
            this.carouselProgressbar.style.width = '0';
            this.carouselProgressbar.classList.remove('left');
            this.carouselProgressbar.classList.add('right');
            reduceTm = this.slideReveal * 2;
        }
        // Add transition on the progress bar to show the smooth animation of the increase/decrease the width of the progress bar
        setTimeout(function () {
            _this.carouselProgressbar.style.transition = "width " + (_this.pauseDuration - reduceTm) + "ms";
            _this.carouselProgressbar.style.transitionDelay = _this.delayNextProgressBar + "ms";
            _this.carouselProgressbar.classList.remove('right');
            _this.carouselProgressbar.classList.add('left');
            _this.carouselProgressbar.style.width = 100 + "%";
        }, this.delayNextProgressBar);
    };
    /** carousel */
    ImageCarousel.prototype.slideShow = function (nextPrevSlide) {
        var _this = this;
        this.index = this.curIndex;
        // show next or previous slide based on next/prev button pressed
        if (nextPrevSlide > -1) {
            // find the currently active slide to break the existing transition
            var visibleElement = this.findElements(this.element, '[data-visible="true"]');
            // hide the previous slide
            this.hideSlide(visibleElement);
            this.curIndex = nextPrevSlide;
            this.index = this.curIndex;
        }
        // reveal the current slide
        this.revealSlide(this.slides[this.curIndex]);
        // collect current element index before increment/reset it
        var currentElm = this.curIndex;
        this.curIndex++;
        // reset the current index as 0 if the image is the last element of carousel
        if (this.curIndex === this.slides.length) {
            this.curIndex = 0;
        }
        // setTimeout used to hold the slide for a particular duration to keep visible
        if (this.autoplay) {
            this.clrInterval = setTimeout(function () {
                _this.hideSlide(_this.slides[currentElm]);
                // Hide previous slide
                _this.delayNextProgressBar = _this.slideReveal;
                _this.slideShow(undefined);
            }, this.pauseDuration);
        }
    };
    /** wrap each dxp-image element in a div */
    ImageCarousel.prototype.wrapDxpImg = function () {
        for (var _i = 0, _a = Object.keys(this.dxpCarouselSlide); _i < _a.length; _i++) {
            var i = _a[_i];
            var parentElement = this.dxpCarouselSlide[i].parentElement;
            var div = document.createElement('div');
            div.classList.add('image-wrapper');
            // IE/Ddge
            div.classList.add('sc-dxp-image-carousel');
            div.appendChild(this.dxpCarouselSlide[i]);
            div.appendChild(this.dxpCarouselSlide[i]);
            parentElement.appendChild(div);
        }
        this.slides = this.findElements(this.element, '.image-wrapper', true);
        for (var _b = 0, _c = Object.keys(this.slides); _b < _c.length; _b++) {
            var i = _c[_b];
            this.slides[i].setAttribute('data-index', i);
            this.slides[i].style.transition = "transform " + this.slideReveal + "ms, opacity 0ms, width " + this.slideReveal + "ms";
        }
    };
    /** Render the image-carousel */
    ImageCarousel.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-image-carousel render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-image-carousel.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "carousel-container", tabindex: "0", ref: function (es) { return _this.carouselContainer = es; } }, this.carouselData ? this.carouselData.map(function (item) { return h("dxp-image-slide", { "eyebrow-title": item['eyebrow-title'], "slide-caption": item['slide-caption'], "sub-title": item['sub-title'], src: item.src, alt: item.alt, "image-title": item['image-title'] }); }) :
            h("slot", null)), h("div", { class: "bar-container" }, h("div", { class: "carousel-progress-values dxp-eyebrow-lg" }, h("span", { class: "current-value", ref: function (es) { return _this.activeSlide = es; } }, " /"), h("span", { class: "max-value", ref: function (es) { return _this.totalSlides = es; } })), h("div", { class: "carousel-progress-bar" }, h("div", { class: "carousel-current-progress", ref: function (es) { return _this.carouselProgressbar = es; } })), h("div", { class: "arrow-container" }, h("div", { class: "prev-arrow", role: "button", "aria-label": dxp.i18n.t('ImageCarousel:prev'), tabindex: "0", onClick: function (e) { return _this.prevSlide(e); }, onKeyPress: function (e) { return _this.prevSlide(e); }, ref: function (es) { return _this.prev = es; } }), h("div", { class: "next-arrow", role: "button", "aria-label": dxp.i18n.t('ImageCarousel:next'), tabindex: "0", onClick: function (e) { return _this.nextSlide(e); }, onKeyPress: function (e) { return _this.nextSlide(e); }, ref: function (es) { return _this.next = es; } })))));
    };
    Object.defineProperty(ImageCarousel.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageCarousel, "style", {
        get: function () { return "div.dxp.dxp-image-carousel{position:relative;overflow:hidden}div.dxp.dxp-image-carousel .carousel-container{height:0}div.dxp.dxp-image-carousel .image-wrapper{-webkit-transform:translateX(0);transform:translateX(0);opacity:0;position:absolute;top:0;overflow:hidden}div.dxp.dxp-image-carousel .image-wrapper:not(:first-child){width:0;-webkit-transform:translateX(-100px);transform:translateX(-100px)}div.dxp.dxp-image-carousel ::slotted(.image-wrapper){position:absolute;top:0;overflow:hidden}div.dxp.dxp-image-carousel ::slotted(.image-wrapper:not(:first-child)){width:0;-webkit-transform:translateX(-100px);transform:translateX(-100px)}div.dxp.dxp-image-carousel .nav-controls{position:absolute;z-index:10;right:0;left:0}div.dxp.dxp-image-carousel .bar-container{max-width:808px;margin:24px auto 0}div.dxp.dxp-image-carousel .bar-container>div{float:left}div.dxp.dxp-image-carousel .bar-container>div:last-child{float:right}div.dxp.dxp-image-carousel .bar-container:after{content:\"\";display:block;clear:both}div.dxp.dxp-image-carousel .carousel-progress-bar{position:relative;margin-left:16px;margin-top:12px;width:calc(100% - 135px);height:1px}div.dxp.dxp-image-carousel .carousel-current-progress{position:absolute;height:1px;width:0}div.dxp.dxp-image-carousel .arrow-container{display:-ms-flexbox;display:flex;margin-left:auto;margin-top:0;padding-bottom:1px;padding-right:1px}div.dxp.dxp-image-carousel .next-arrow,div.dxp.dxp-image-carousel .prev-arrow{display:inline-block;width:24px;height:24px;cursor:pointer}div.dxp.dxp-image-carousel .next-arrow{margin-left:12px}div.dxp.dxp-image-carousel .right{right:0}div.dxp.dxp-image-carousel .left{left:0}div.dxp.dxp-image-carousel .thumbnails{text-align:center}div.dxp.dxp-image-carousel .thumbnails .thumbnail{overflow:hidden;cursor:pointer;display:inline-block;width:90px;height:40px;margin:7px 3px}\@media (min-width:768px){div.dxp.dxp-image-carousel .carousel-progress-bar{width:calc(100% - 220px);margin-left:48px}div.dxp.dxp-image-carousel .next-arrow{margin-left:32px}}div.dxp.dxp-image-carousel[dir=rtl] .next{left:0;right:auto}div.dxp.dxp-image-carousel[dir=rtl] .carousel-progress-bar{margin-left:0;margin-right:16px}\@media (min-width:768px){div.dxp.dxp-image-carousel[dir=rtl] .carousel-progress-bar{margin-left:0;margin-right:48px}div.dxp.dxp-image-carousel[dir=rtl] .next-arrow{margin-left:0;margin-right:32px}}"; },
        enumerable: true,
        configurable: true
    });
    return ImageCarousel;
}());
export { ImageCarousel as dxp_image_carousel };
