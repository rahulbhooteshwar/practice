'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const CtaList = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** orientation of icons list (horizontal/ vertical) */
        this.orientation = 'horizontal';
    }
    /** Listener that looks for CTA object to be assigned/changed externally */
    ctaChangeHandler() {
        this.base.createNestedMarkup(this.ctaContainer, 'dxp-cta', this.ctaList);
    }
    /** action performed before the component has loaded */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
    }
    /** actions to be performed after component load */
    componentDidLoad() {
        this.ctaChangeHandler();
        const ctaButtons = this.element ? this.element.querySelectorAll('dxp-cta') : this.element.querySelectorAll('dxp-cta');
        for (const cta of ctaButtons) {
            cta.classList.add('sc-dxp-cta-list');
        }
    }
    /** listens to window resize event and applies vertical orientation on mobile devices */
    handleCTAResize() {
        const windowWidth = window.innerWidth;
        if (windowWidth < 767) {
            this.orientation = 'vertical';
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /**
     * method that returns class name based on type
     * of titleStyle applied
     */
    getClassName() {
        switch (this.titleStyle) {
            case 'dxp-title-xl': {
                return 'dxp-title-1';
            }
            case 'dxp-title-lg': {
                return 'dxp-title-2';
            }
            case 'dxp-title-md': {
                return 'dxp-title-3';
            }
            case 'dxp-title-sm': {
                return 'dxp-title-4';
            }
            default: {
                return 'dxp-title-1';
            }
        }
    }
    /** listen to window resize events and change the orientation of list */
    /** Render the cta-list */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-cta-list render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-cta.min.css` })]
        ];
        return (core$1.h("div", { class: `${this.base.componentClass()} sc-dxp-cta-list`, dir: this.dir, "data-theme": this.theme }, styles, this.titleText && core$1.h("p", { class: this.getClassName(), innerHTML: this.titleText }), core$1.h("div", { class: `${this.orientation.toLowerCase()} sc-dxp-cta-list`, ref: el => this.ctaContainer = el }, core$1.h("slot", null))));
    }
    get element() { return core$1.getElement(this); }
    static get watchers() { return {
        "ctaList": ["ctaChangeHandler"]
    }; }
    static get style() { return "div.dxp.dxp-cta-list{background:transparent}div.dxp.dxp-cta-list ::slotted(dxp-cta),div.dxp.dxp-cta-list dxp-cta{-webkit-appearance:none!important}div.dxp.dxp-cta-list .dxp-cta.dxp-btn-block,div.dxp.dxp-cta-list ::slotted(dxp-cta.dxp-btn-block),div.dxp.dxp-cta-list dxp-cta.dxp-btn-block{display:block;width:100%}div.dxp.dxp-cta-list .vertical{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}div.dxp.dxp-cta-list .vertical ::slotted(dxp-cta),div.dxp.dxp-cta-list .vertical dxp-cta{display:inline-block}div.dxp.dxp-cta-list .vertical ::slotted(dxp-cta:not(:last-child)),div.dxp.dxp-cta-list .vertical dxp-cta:not(:last-child){margin-bottom:24px}div.dxp.dxp-cta-list .horizontal ::slotted(dxp-cta),div.dxp.dxp-cta-list .horizontal dxp-cta{margin:0 0 24px 0;display:inline-block}div.dxp.dxp-cta-list .horizontal ::slotted(dxp-cta:not(:last-child)),div.dxp.dxp-cta-list .horizontal dxp-cta:not(:last-child){margin:0 24px 24px 0}div.dxp.dxp-cta-list p{margin-bottom:40px}div.dxp.dxp-cta-list[dir=rtl] .horizontal ::slotted(dxp-cta),div.dxp.dxp-cta-list[dir=rtl] .horizontal dxp-cta{margin:0 0 24px 24px}"; }
};

exports.dxp_cta_list = CtaList;
