'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const SEPARATOR_CLASS = '.separator';
const Logo = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        this.analyticsDataEmitter = core$1.createEvent(this, "dxp_comp", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        if (this.element.querySelector('dxp-logo')) {
            if (this.element.querySelector('dxp-logo').querySelector('img') || this.element.querySelector('dxp-logo').querySelector('img')) {
                this.element.querySelector('dxp-logo').querySelector(SEPARATOR_CLASS) ?
                    this.element.querySelector('dxp-logo').querySelector(SEPARATOR_CLASS).classList.remove('dxp-none') :
                    this.element.querySelector(SEPARATOR_CLASS).classList.remove('dxp-none');
            }
        }
        if (!this.element.getAttribute('src') || !this.element.getAttribute('schema-type')) {
            return;
        }
        // creates the schema tag for SEO
        this.schemaScript();
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** appending domain url to relative path */
    appendingDomain(url) {
        let domainURL;
        let arr;
        let result;
        domainURL = window.location.href;
        arr = domainURL.split('/');
        result = `${arr[0]}//${arr[2]}`;
        return result + url;
    }
    /** Emit the analytics data after clicking on dxp-logo component */
    emitAnalyticsData() {
        const obj = { 'di_comp_name': this.element.tagName, 'di_comp_title': this.logoTitle ? this.logoTitle : this.alt, 'di_comp_cta': this.href ? this.href : '' };
        this.analyticsDataEmitter.emit(obj);
        core$1.dxp.log.info(this.element.tagName, 'emitAnalyticsData()', obj);
    }
    /** SEO script of Schema  */
    schemaScript() {
        let hrefLink;
        let imgLink;
        if (this.src && window.screen.width > 767.9) {
            imgLink = core$1.dxp.util.checkValidUrl(this.src) ? this.src : this.appendingDomain(this.src);
        }
        else if (this.srcSm && window.screen.width < 767.9) {
            imgLink = core$1.dxp.util.checkValidUrl(this.srcSm) ? this.srcSm : this.appendingDomain(this.srcSm);
        }
        hrefLink = this.href ? core$1.dxp.util.checkValidUrl(this.href) ? this.href : this.appendingDomain(this.href) : window.location.href;
        const schema = JSON.stringify({ '@context': 'https://schema.org', '@type': this.schemaType, 'url': hrefLink, 'logo': imgLink });
        /** created script tag to be appended on the body tag for SEO schema */
        this.base.createSeoSchema(core$1.dxp, this.element, schema);
    }
    /** Render the logo */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-logo render() : ${"DEVELOPMENT"}`);
        const imgs = [
            this.src && core$1.h("img", { src: this.src, alt: this.alt, title: this.logoTitle, class: "dxp-hidden-sm-down" }),
            (this.srcSm || this.src) && core$1.h("img", { src: this.srcSm || this.src, alt: this.alt, title: this.logoTitle, class: "dxp-hidden-md-up" })
        ];
        const styles = (core$1.h("span", null, core$1.h("link", { rel: "stylesheet", href: `` }), this.theme && (core$1.h("link", { rel: "stylesheet", href: `` })), this.dtmUrl && (core$1.h("script", { src: this.dtmUrl }))));
        if (this.href && this.src) {
            return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("span", { class: "separator dxp-none" }, "|"), core$1.h("a", { class: "logo-img", onClick: () => this.emitAnalyticsData(), href: this.href, target: this.target ? '_blank' : '_self', "aria-label": this.ariaLabel }, this.src && imgs), this.src && core$1.h("slot", null)));
        }
        if (this.src) {
            return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, onClick: () => this.emitAnalyticsData() }, core$1.h("span", { class: "separator dxp-none" }, "|"), core$1.h("p", null, styles, this.src && imgs), this.src && core$1.h("slot", null)));
        }
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-logo{overflow:hidden;display:-ms-flexbox;display:flex}div.dxp.dxp-logo a,div.dxp.dxp-logo p{display:-ms-flexbox;display:flex;height:40px}div.dxp.dxp-logo p{margin-bottom:0}div.dxp.dxp-logo img{max-height:40px;width:auto;height:100%}div.dxp.dxp-logo .separator{font-size:34px;font-weight:100;line-height:32px;width:32px;height:40px;text-align:center}\@media (max-width:991px){div.dxp.dxp-logo img{max-height:30px}div.dxp.dxp-logo .separator{font-size:25px;line-height:25px;height:30px}}"; }
};

exports.dxp_logo = Logo;
