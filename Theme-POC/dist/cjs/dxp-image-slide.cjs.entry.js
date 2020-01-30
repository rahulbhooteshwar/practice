'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-4d6e6a31.js');

const ImageSlide = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'BaseComponent', messages.messages);
    }
    /** Render the image-slide */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-image-slide render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-image-carousel.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("dxp-image", { src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, "image-data-theme": this.theme, "image-title": this.imageTitle, alt: this.alt, responsive: true }), core$1.h("div", { class: `info-container dxp-font-size-md dxp ${this.theme}`, "data-theme": this.theme }, core$1.h("span", { class: "eyebrow-title" }, this.eyebrowTitle, " \u00A0"), (this.eyebrowTitle && this.slideCaption) || (this.eyebrowTitle && this.subTitle) ? core$1.h("span", null, "|\u00A0") : undefined, core$1.h("span", { class: "slide-caption dxp-bold" }, this.slideCaption, "\u00A0"), core$1.h("span", { class: "sub-title" }, this.subTitle))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-image-slide .info-container{margin-top:10px}"; }
};

exports.dxp_image_slide = ImageSlide;
