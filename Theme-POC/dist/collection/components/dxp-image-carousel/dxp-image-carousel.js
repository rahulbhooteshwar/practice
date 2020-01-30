import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-image-carousel */
export class ImageCarousel {
    constructor() {
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
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'ImageCarousel', messages);
        if (this.carouselData && typeof this.carouselData === 'string') {
            this.carouselData = JSON.parse(this.carouselData);
        }
        // 1 / 5 duration will be used to reveal the new slide
        this.slideReveal = this.pauseDuration / 5;
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        this.dxpCarouselSlide = this.findElements(this.element, 'dxp-image-slide', true);
        const imgs = [];
        let imgload = false;
        if (this.dxpCarouselSlide) {
            for (const i of Object.keys(this.dxpCarouselSlide)) {
                const dxpImg = this.findElements(this.dxpCarouselSlide[i], 'dxp-image');
                dxpImg.componentOnReady().then(res => {
                    // add '0' before the index number of image till the 9 images, e.g.(01, 02,... 09)
                    this.totalSlides.innerHTML = (this.dxpCarouselSlide.length < 10 ? '0' : '') + this.dxpCarouselSlide.length;
                    this.applyWidthOnDxpImg();
                    const img = this.findElements(res, 'img');
                    imgs.push(img);
                    if (!imgload) {
                        imgload = true;
                        imgs[0].addEventListener('load', () => {
                            imgs[0].style.width = '100%';
                            this.wrapDxpImg();
                            this.slideShow(undefined);
                            // Apply height on carousel container
                            this.carouselContainer.style.height = `${this.slides[0].offsetHeight}px`;
                            imgs[0].style.removeProperty('width');
                        }, false);
                    }
                });
            }
        }
    }
    /** Resize event handler  */
    resizeEventHandler() {
        this.applyWidthOnDxpImg();
        // Apply height on carousel container
        this.carouselContainer.style.height = `${this.slides[0].offsetHeight}px`;
    }
    /** apply width on dxp-image of carousel container  */
    applyWidthOnDxpImg() {
        for (const i of Object.keys(this.dxpCarouselSlide)) {
            this.dxpCarouselSlide[i].style.display = 'block';
            this.dxpCarouselSlide[i].style.width = `${this.carouselContainer.offsetWidth}px`;
        }
    }
    /** to return the host elements inside or outside shadowRoot */
    findElements(host, query, all = false) {
        if (all) {
            return host.querySelectorAll(query).length ? host.querySelectorAll(query) :
                host.querySelectorAll(query).length ? host.querySelectorAll(query) : undefined;
        }
        return host && host.querySelector(query) ? host.querySelector(query) : host && host && host.querySelector(query);
    }
    /** convert nodelist to array */
    getArrayFromNodeList(nodeList) {
        return [].slice.call(nodeList);
    }
    /** hide slide to display next one */
    hideSlide(slide) {
        slide.setAttribute('data-visible', 'false');
        slide.style.transitionDelay = `${this.slideReveal}ms`;
        slide.style.opacity = '0';
        slide.style.width = '0';
        slide.style.zIndex = '0';
        slide.style.transform = 'translateX(-100px)';
    }
    /** reveal the next slide */
    nextSlide(e) {
        // !e.code will be true with mouse click. Rest condition check the key events
        if (!e.code || e.code.toLowerCase() === 'space' || e.code.toLowerCase() === 'enter' || e.code.toLowerCase() === 'numpadenter') {
            let n = this.index;
            n++;
            clearInterval(this.clrInterval);
            const val = n > (this.slides.length - 1) ? 0 : n;
            this.slideShow(val);
        }
    }
    /** reveal the previous slide */
    prevSlide(e) {
        // !e.code will be true with mouse click. Rest condition check the key events
        if (!e.code || e.code.toLowerCase() === 'space' || e.code.toLowerCase() === 'enter' || e.code.toLowerCase() === 'numpadenter') {
            let n = this.index;
            n--;
            clearInterval(this.clrInterval);
            const val = n < 0 ? this.slides.length - 1 : n;
            this.slideShow(val);
        }
    }
    /** reveal the slides with autoplay */
    revealSlide(slide) {
        const slideIndex = slide.getAttribute('data-index');
        let reduceTm = 0;
        slide.setAttribute('data-visible', 'true');
        slide.style.transitionDelay = '';
        slide.style.opacity = 1;
        slide.style.width = '100%';
        slide.style.zIndex = 1;
        slide.style.transform = 'translateX(0px)';
        // '0' will be prepend before singel deget number like '09'
        this.activeSlide.innerHTML = `${((Number(slideIndex) + 1) < 10 ? '0' : '')}${(Number(slideIndex) + 1)} / `;
        // shrink progress bar with image hide
        if (this.delayNextProgressBar) {
            this.carouselProgressbar.style.transition = `width ${this.slideReveal}ms`;
            this.carouselProgressbar.style.width = '0';
            this.carouselProgressbar.classList.remove('left');
            this.carouselProgressbar.classList.add('right');
            reduceTm = this.slideReveal * 2;
        }
        // Add transition on the progress bar to show the smooth animation of the increase/decrease the width of the progress bar
        setTimeout(() => {
            this.carouselProgressbar.style.transition = `width ${this.pauseDuration - reduceTm}ms`;
            this.carouselProgressbar.style.transitionDelay = `${this.delayNextProgressBar}ms`;
            this.carouselProgressbar.classList.remove('right');
            this.carouselProgressbar.classList.add('left');
            this.carouselProgressbar.style.width = `${100}%`;
        }, this.delayNextProgressBar);
    }
    /** carousel */
    slideShow(nextPrevSlide) {
        this.index = this.curIndex;
        // show next or previous slide based on next/prev button pressed
        if (nextPrevSlide > -1) {
            // find the currently active slide to break the existing transition
            const visibleElement = this.findElements(this.element, '[data-visible="true"]');
            // hide the previous slide
            this.hideSlide(visibleElement);
            this.curIndex = nextPrevSlide;
            this.index = this.curIndex;
        }
        // reveal the current slide
        this.revealSlide(this.slides[this.curIndex]);
        // collect current element index before increment/reset it
        const currentElm = this.curIndex;
        this.curIndex++;
        // reset the current index as 0 if the image is the last element of carousel
        if (this.curIndex === this.slides.length) {
            this.curIndex = 0;
        }
        // setTimeout used to hold the slide for a particular duration to keep visible
        if (this.autoplay) {
            this.clrInterval = setTimeout(() => {
                this.hideSlide(this.slides[currentElm]);
                // Hide previous slide
                this.delayNextProgressBar = this.slideReveal;
                this.slideShow(undefined);
            }, this.pauseDuration);
        }
    }
    /** wrap each dxp-image element in a div */
    wrapDxpImg() {
        for (const i of Object.keys(this.dxpCarouselSlide)) {
            const parentElement = this.dxpCarouselSlide[i].parentElement;
            const div = document.createElement('div');
            div.classList.add('image-wrapper');
            // IE/Ddge
            div.classList.add('sc-dxp-image-carousel');
            div.appendChild(this.dxpCarouselSlide[i]);
            div.appendChild(this.dxpCarouselSlide[i]);
            parentElement.appendChild(div);
        }
        this.slides = this.findElements(this.element, '.image-wrapper', true);
        for (const i of Object.keys(this.slides)) {
            this.slides[i].setAttribute('data-index', i);
            this.slides[i].style.transition = `transform ${this.slideReveal}ms, opacity 0ms, width ${this.slideReveal}ms`;
        }
    }
    /** Render the image-carousel */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-image-carousel render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-image-carousel.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "carousel-container", tabindex: "0", ref: es => this.carouselContainer = es }, this.carouselData ? this.carouselData.map(item => h("dxp-image-slide", { "eyebrow-title": item['eyebrow-title'], "slide-caption": item['slide-caption'], "sub-title": item['sub-title'], src: item.src, alt: item.alt, "image-title": item['image-title'] })) :
                h("slot", null)),
            h("div", { class: "bar-container" },
                h("div", { class: "carousel-progress-values dxp-eyebrow-lg" },
                    h("span", { class: "current-value", ref: es => this.activeSlide = es }, " /"),
                    h("span", { class: "max-value", ref: es => this.totalSlides = es })),
                h("div", { class: "carousel-progress-bar" },
                    h("div", { class: "carousel-current-progress", ref: es => this.carouselProgressbar = es })),
                h("div", { class: "arrow-container" },
                    h("div", { class: "prev-arrow", role: "button", "aria-label": dxp.i18n.t('ImageCarousel:prev'), tabindex: "0", onClick: e => this.prevSlide(e), onKeyPress: e => this.prevSlide(e), ref: es => this.prev = es }),
                    h("div", { class: "next-arrow", role: "button", "aria-label": dxp.i18n.t('ImageCarousel:next'), tabindex: "0", onClick: e => this.nextSlide(e), onKeyPress: e => this.nextSlide(e), ref: es => this.next = es })))));
    }
    static get is() { return "dxp-image-carousel"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-image-carousel.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-image-carousel.css"]
    }; }
    static get properties() { return {
        "autoplay": {
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
            "attribute": "autoplay",
            "reflect": false,
            "defaultValue": "true"
        },
        "carouselData": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "carousel data"
            },
            "attribute": "carousel-data",
            "reflect": true
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
            "defaultValue": "6000"
        },
        "slideCaption": {
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
                "text": "Caption of slide"
            },
            "attribute": "slide-caption",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "resize",
            "method": "resizeEventHandler",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
