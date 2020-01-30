import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var StickyFooterCta = /** @class */ (function () {
    function StickyFooterCta(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    StickyFooterCta.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        if (this.linkType === 'email-link') {
            this.linkUrl = ['mailto:', this.emailId, '?subject=', this.emailSubject, '&body=', this.emailBody ? this.emailBody.replace('\n', '%0D%0A') : this.emailBody].join(' ');
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    StickyFooterCta.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Render the sticky-footer */
    StickyFooterCta.prototype.render = function () {
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-sticky-footer-cta render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-sticky-footer.min.css" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("p", { class: "dxp-cta-links sticky-footer-btn" }, h("a", { href: this.linkUrl,
            // @ts-ignore
            target: this.openInNewTab === 'true' ? '_target' : '_self', "aria-label": this.visuallyImpairedText, class: this.buttonStyle === 'true' ? 'dxp-btn dxp-btn-cta dxp-btn-primary' : 'visit-link', download: this.linkType === 'download-link' ? this.downloadFile : undefined }, this.linkText))));
    };
    Object.defineProperty(StickyFooterCta.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StickyFooterCta, "style", {
        get: function () { return "div.dxp.dxp-sticky-footer-cta .sticky-footer-btn{margin-bottom:0}"; },
        enumerable: true,
        configurable: true
    });
    return StickyFooterCta;
}());
export { StickyFooterCta as dxp_sticky_footer_cta };
