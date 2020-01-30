import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

const BannerCta = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** 'with-overlay' css class will be store in this variable */
        this.withOverlay = '';
        /** button style for cta */
        this.bannerSize = '';
        /** banner type for cta */
        this.bannerType = '';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        if (this.linkType === 'email-link') {
            this.linkUrl = ['mailto:', this.emailId, '?subject=', this.emailSubject, '&body=', this.emailBody ? this.emailBody.replace('\n', '%0D%0A') : this.emailBody].join(' ');
        }
        // cta buttons will display in-line if image banner is enabled with overlay
        if (this.enableOverlay === 'true') {
            this.withOverlay = 'with-overlay';
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the banner */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-banner-cta render() : ${"DEVELOPMENT"}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-banner.min.css` })]
        ];
        return (h("div", { dir: this.dir, class: `${this.base.componentClass()} dxp-cta-block-${this.bannerType} ${this.bannerSize} ${this.withOverlay}`, "data-theme": this.theme }, styles, h("p", { class: "dxp-cta-links" }, h("a", { href: this.linkUrl,
            // @ts-ignore
            target: this.openInNewTab === 'true' ? '_target' : '_self', "aria-label": this.visuallyImpairedText, class: this.buttonStyle === 'true' ? 'dxp-btn dxp-btn-cta dxp-btn-primary' : 'visit-link', download: this.linkType === 'download-link' ? this.downloadFile : undefined }, this.linkText))));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-banner-cta{background:transparent;display:inline-block}div.dxp.dxp-banner-cta .dxp-cta-links{margin-right:24px;margin-bottom:0}div.dxp.dxp-banner-cta[dir=rtl] .dxp-cta-links{margin-right:0;margin-left:24px}div.dxp.dxp-banner-cta[dir=rtl] .dxp-cta-links .visit-link:first-child{margin-right:0}\@media (min-width:576px){div.dxp.dxp-banner-cta .dxp-banner-cta{display:inline-block}div.dxp.dxp-banner-cta .dxp-banner-cta .dxp-cta-links{margin-right:24px;margin-bottom:0}}div.dxp.dxp-cta-block-small-image{background:transparent}\@media (max-width:991px){div.dxp.dxp-cta-block-small-image{background:transparent;display:inline-block;margin-bottom:0;margin-right:0}}\@media (max-width:575px){div.dxp.dxp-cta-block-small-image{margin-bottom:32px}}\@media (max-width:575px){div.dxp.dxp-cta-block-image-overlay.dxp-banner-cta{display:block}}div.dxp.dxp-cta-block-image-overlay.with-overlay.short{display:block}\@media (min-width:576px) and (max-width:767px){div.dxp.dxp-cta-block-image-overlay.short{display:inline-block}}\@media (max-width:575px){div.dxp.dxp-cta-block-solid-background.dxp-banner-cta{display:block}}\@media (max-width:575px){div.dxp.dxp-cta-block-regular-banner .dxp-cta-links{margin-bottom:-.25rem}}\@media (max-width:575px){div.dxp.dxp-banner-image-overlay.sub-feature-bg-block.dxp-banner-cta{display:block}}"; }
};

export { BannerCta as dxp_banner_cta };
