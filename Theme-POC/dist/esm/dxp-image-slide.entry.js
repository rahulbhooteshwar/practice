import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-34e5af55.js';

const ImageSlide = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'BaseComponent', messages);
    }
    /** Render the image-slide */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-image-slide render() : ${"DEVELOPMENT"}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-image-carousel.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("dxp-image", { src: this.src, "src-lg": this.srcLg, "src-md": this.srcMd, "image-data-theme": this.theme, "image-title": this.imageTitle, alt: this.alt, responsive: true }), h("div", { class: `info-container dxp-font-size-md dxp ${this.theme}`, "data-theme": this.theme }, h("span", { class: "eyebrow-title" }, this.eyebrowTitle, " \u00A0"), (this.eyebrowTitle && this.slideCaption) || (this.eyebrowTitle && this.subTitle) ? h("span", null, "|\u00A0") : undefined, h("span", { class: "slide-caption dxp-bold" }, this.slideCaption, "\u00A0"), h("span", { class: "sub-title" }, this.subTitle))));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-image-slide .info-container{margin-top:10px}"; }
};

export { ImageSlide as dxp_image_slide };
