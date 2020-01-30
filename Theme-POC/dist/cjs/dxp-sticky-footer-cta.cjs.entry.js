'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const StickyFooterCta = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        if (this.linkType === 'email-link') {
            this.linkUrl = ['mailto:', this.emailId, '?subject=', this.emailSubject, '&body=', this.emailBody ? this.emailBody.replace('\n', '%0D%0A') : this.emailBody].join(' ');
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the sticky-footer */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-sticky-footer-cta render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-sticky-footer.min.css` })]
        ];
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core$1.h("p", { class: "dxp-cta-links sticky-footer-btn" }, core$1.h("a", { href: this.linkUrl,
            // @ts-ignore
            target: this.openInNewTab === 'true' ? '_target' : '_self', "aria-label": this.visuallyImpairedText, class: this.buttonStyle === 'true' ? 'dxp-btn dxp-btn-cta dxp-btn-primary' : 'visit-link', download: this.linkType === 'download-link' ? this.downloadFile : undefined }, this.linkText))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-sticky-footer-cta .sticky-footer-btn{margin-bottom:0}"; }
};

exports.dxp_sticky_footer_cta = StickyFooterCta;
