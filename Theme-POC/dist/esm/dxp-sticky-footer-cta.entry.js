import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

const StickyFooterCta = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-sticky-footer-cta render() : ${"DEVELOPMENT"}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-sticky-footer.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("p", { class: "dxp-cta-links sticky-footer-btn" }, h("a", { href: this.linkUrl,
            // @ts-ignore
            target: this.openInNewTab === 'true' ? '_target' : '_self', "aria-label": this.visuallyImpairedText, class: this.buttonStyle === 'true' ? 'dxp-btn dxp-btn-cta dxp-btn-primary' : 'visit-link', download: this.linkType === 'download-link' ? this.downloadFile : undefined }, this.linkText))));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-sticky-footer-cta .sticky-footer-btn{margin-bottom:0}"; }
};

export { StickyFooterCta as dxp_sticky_footer_cta };
