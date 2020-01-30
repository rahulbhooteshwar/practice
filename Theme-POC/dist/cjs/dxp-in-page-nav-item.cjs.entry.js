'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-df3feb1c.js');

const InPageNavItem = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'InPageNavItem', messages.messages);
    }
    /** click listener for routing events on anchor tag */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** function to get active status of an item */
    async getActive() {
        return this.active;
    }
    /** function to get href of an item */
    async getHref() {
        return this.href;
    }
    /** function to get active status of an item */
    async setActive() {
        this.active = true;
    }
    /** method to focus input element  */
    focusElement(elem) {
        elem.focus();
    }
    /** function to scroll to the selected section */
    scrollTo(href) {
        const elem = document.querySelector(href);
        this.focusElement(elem);
        const scrollOffset = window.pageYOffset || document.documentElement.scrollTop;
        const NAV_HEIGHT = 90;
        const target = elem.getBoundingClientRect().top + scrollOffset - NAV_HEIGHT;
        if (core$1.dxp.is.chrome()) {
            window.scrollTo({
                top: target,
                behavior: 'smooth'
            });
        }
        else {
            this.scrollView(elem);
            const scrolledY = window.scrollY;
            if (scrolledY) {
                window.scroll(0, scrolledY - NAV_HEIGHT);
            }
        }
    }
    /** method to scroll to input element  */
    scrollView(elem) {
        elem.scrollIntoView();
    }
    /** Render the in-page-nav */
    render() {
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && (core$1.h("link", { rel: "stylesheet", href: `` }))],
            [this.theme && (core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-in-page-nav.min.css` }))]
        ];
        return (core$1.h("div", { class: `${this.active ? 'active' : ''} ${this.base.componentClass()}`, dir: this.dir, "data-theme": this.theme }, styles, core$1.h("li", { class: `${this.active ? 'active' : ''}`, role: "menuitem", onClick: () => this.scrollTo(this.href), tabIndex: 0, onKeyUp: e => e.keyCode === 13 && this.scrollTo(this.href) }, core$1.h("span", null, this.text || core$1.h("slot", null)))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-in-page-nav-item{display:inline-block;text-align:center;margin:1px}div.dxp.dxp-in-page-nav-item span{padding:2rem 1.5rem;display:block;text-transform:uppercase;margin-bottom:0}div.dxp.dxp-in-page-nav-item li{list-style:none}div.dxp.dxp-in-page-nav-item li:focus,div.dxp.dxp-in-page-nav-item li:hover{border-bottom:2px solid}div.dxp.dxp-in-page-nav-item li:focus{outline:1px solid}div.dxp.dxp-in-page-nav-item li:hover{cursor:pointer}div.dxp.dxp-in-page-nav-item li.active span{border-bottom:6px solid}\@media screen and (min-width:320px) and (max-width:767px){div.dxp.dxp-in-page-nav-item{display:none}div.dxp.dxp-in-page-nav-item li:focus,div.dxp.dxp-in-page-nav-item li:hover{border-bottom:0;border-color:transparent}div.dxp.dxp-in-page-nav-item li.active span{border-bottom:0}div.dxp.dxp-in-page-nav-item span{padding:2em 1em}div.dxp.dxp-in-page-nav-item.active{display:block}}"; }
};

exports.dxp_in_page_nav_item = InPageNavItem;
