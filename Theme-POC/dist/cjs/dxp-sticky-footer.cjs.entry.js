'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const TITLE_TEXT_CLASS = '.titleText';
const STICKY_CONTAINER_ID = '#stickyContainer';
const FooterSticky = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
    }
    /** Listener that looks for cta object to be assigned/changed externally */
    ctaChangeHandler() {
        if (this.cta) {
            const footerprops = this.cta.map(it => (Object.assign(Object.assign({}, it), { footerType: this.footerType })));
            this.base.createNestedMarkup(this.ctaContainer, 'dxp-sticky-footer-cta', footerprops);
        }
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        // For supporting RTE, this code will work fine for the normal text too
        if (this.element && this.element.querySelector(TITLE_TEXT_CLASS)) {
            this.element.querySelector(TITLE_TEXT_CLASS).innerHTML = this.titleText;
        }
        else {
            if (this.element.querySelector(TITLE_TEXT_CLASS)) {
                this.element.querySelector(TITLE_TEXT_CLASS).innerHTML = this.titleText;
            }
        }
        this.ctaChangeHandler();
        setTimeout(() => {
            const stickyContainer = this.element.querySelectorAll(STICKY_CONTAINER_ID);
            if (this.footerType === 'sticky') {
                document.body.style.paddingBottom = `${stickyContainer[0]['offsetHeight'] + 50}px`;
            }
        }, 100);
    }
    /** Handle resize event */
    handleResize() {
        if (this.footerType === 'sticky') {
            const stickyContainer = this.element ? this.element.querySelectorAll(STICKY_CONTAINER_ID) : this.element.querySelectorAll(STICKY_CONTAINER_ID);
            document.body.style.paddingBottom = stickyContainer[0] && `${stickyContainer[0]['offsetHeight'] + 50}px`;
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the footer-sticky */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-sticky-footer render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-sticky-footer.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("div", { id: "stickyContainer", class: this.footerType === 'sticky' ? 'sticky-footer' : 'non-sticky-footer' }, core$1.h("div", { class: "dxp-text-center sticky-footer-cont" }, core$1.h("p", { class: "titleText sticky-footer-text" }, this.titleText), core$1.h("div", { class: "btn-cont", ref: el => (this.ctaContainer = el) }, core$1.h("slot", { name: "footer-sticky-cta" }))))));
    }
    get element() { return core$1.getElement(this); }
    static get watchers() { return {
        "cta": ["ctaChangeHandler"]
    }; }
    static get style() { return "div.dxp.dxp-sticky-footer .sticky-footer-cont{margin:0}div.dxp.dxp-sticky-footer .sticky-footer-cont .sticky-footer-text{font-size:1.4rem}div.dxp.dxp-sticky-footer .sticky-footer{margin:0;padding:10px 0;right:0;left:0;z-index:1;position:fixed;bottom:0;width:100%}div.dxp.dxp-sticky-footer .sticky-footer .sticky-footer-text{display:inline-block;margin:0 42px 0 0}\@media (max-width:767px){div.dxp.dxp-sticky-footer .sticky-footer .sticky-footer-text{margin:0 0 20px 0;display:block}}div.dxp.dxp-sticky-footer .sticky-footer .btn-cont{display:inline-block}div.dxp.dxp-sticky-footer .non-sticky-footer{margin:0;padding:10px 0;right:0;left:0;z-index:1}div.dxp.dxp-sticky-footer .non-sticky-footer .sticky-footer-text{display:inline-block;margin:0 42px 0 0}\@media (max-width:767px){div.dxp.dxp-sticky-footer .non-sticky-footer .sticky-footer-text{margin:0 0 20px 0;display:block}}div.dxp.dxp-sticky-footer .non-sticky-footer .btn-cont{display:inline-block}"; }
};

exports.dxp_sticky_footer = FooterSticky;
