import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var Footer = /** @class */ (function () {
    function Footer(hostRef) {
        registerInstance(this, hostRef);
    }
    /** actions to be performed prior to component loading */
    Footer.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        var shadow = this.element ? this.element : this.element;
        var href = "";
        dxp.util.appendLinkElement(shadow, href);
        href = "";
        dxp.util.appendLinkElement(shadow, href);
        href = dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-footer.min.css";
        dxp.util.appendLinkElement(shadow, href);
    };
    /** lifecycle hook */
    Footer.prototype.componentDidLoad = function () {
        var contentItemData = this.element.querySelector("[slot='content-link-list']");
        if (contentItemData) {
            var contentItemAttr = contentItemData.getAttribute('orientation');
            if (contentItemAttr === 'horizontal') {
                var windowWidth = window.innerWidth;
                if (windowWidth < 767) {
                    contentItemData.setAttribute('orientation', 'vertical');
                }
                else if (windowWidth > 768) {
                    contentItemData.setAttribute('orientation', 'horizontal');
                }
            }
        }
        var container = this.element.querySelector('.content-list');
        var lists = this.element.querySelectorAll("[slot='content-list']");
        var elem = document.createElement('div');
        elem.setAttribute('class', "column-" + lists.length + " sc-dxp-footer");
        Array.from(lists).forEach(function (node) {
            node.classList.add('sc-dxp-footer');
            elem.appendChild(node);
        });
        if (container) {
            container.appendChild(elem);
        }
    };
    /** Listen for the window resize changes */
    Footer.prototype.handleResizeEvent = function () {
        var windowWidth = window.innerWidth;
        var contentItemData = this.element.querySelector("[slot='content-link-list']");
        if (windowWidth < 992) {
            contentItemData.setAttribute('orientation', 'vertical');
        }
        else {
            contentItemData.setAttribute('orientation', 'horizontal');
        }
    };
    /** click listener for routing event on anchor tag */
    Footer.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Render Quicklink and Content List */
    Footer.prototype.renderQuicklinkAndContentList = function () {
        return ([
            h("div", { class: "dxp-row content-cta-list" }, h("div", { class: "dxp-col-12" }, h("div", { class: "dxp-col-lg-3 dxp-col-sm-7 dxp-col-md-5  dxp-p-0 cta-list-data" }, this.enableQuicklink && this.ctaListData ? (h("dxp-cta-list", { orientation: "vertical", "title-style": "dxp-title-sm", "title-text": this.ctaListData['titleText'] }, this.ctaListData.ctaList.map(function (cta) {
                return (h("dxp-cta", { "link-type": cta.linkType, "icon-align": cta.iconAlign, text: cta.text, type: cta.type, src: cta.src, "aria-label": cta.ariaLabel, href: cta.href }));
            }))) : h("slot", { name: "cta-list" })), this.enableContentlist &&
                h("div", { class: "dxp-col-lg-5 content-list dxp-col-md-12 dxp-col-sm-12 dxp-col-offset-lg-4" }, this.contentListData ?
                    h("div", { class: "column-" + this.contentListData.length + " sc-dxp-footer" }, this.contentListData.map(function (listData) {
                        return (h("dxp-content-list", { orientation: "vertical", "header-size": listData.headerSize, "title-text": listData.titleText, href: listData.href, "aria-label": listData.titleText, target: listData.target }, listData.contentListItems.map(function (item) {
                            return (h("dxp-content-list-item", { "sub-title": item.subTitle, href: item.href, "aria-label": item.ariaLabel, target: item.target }));
                        })));
                    }))
                    : h("slot", { name: "content-list" })))),
            h("dxp-line", { type: "solid", height: 1, "border-color": "#444340" })
        ]);
    };
    /** Render the footer */
    Footer.prototype.render = function () {
        return (h("footer", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, this.enableLogo && h("div", { class: "dxp-row logo" }, h("div", { class: "dxp-col-12" }, this.logoData ? (h("dxp-logo", { src: this.logoData.src, "src-sm": this.logoData.srcSm, href: this.logoData.href, alt: this.logoData.alt })) : h("slot", { name: "logo" }))), (this.enableQuicklink || this.enableContentlist) && this.renderQuicklinkAndContentList(), h("div", { class: "dxp-row flex-direction" }, this.enableCopyright && [
            h("div", { class: "dxp-col-lg-2 dxp-col-sm-12  dxp-col-12 copyright" }, this.copyrightData ? h("dxp-copyright", { text: this.copyrightData.text })
                : h("slot", { name: "copyright" }))
        ], this.enableFooterlink && [
            h("div", { class: "dxp-col-lg-4 dxp-col-sm-12 dxp-col-12 content-link-list" }, this.footerlinkData ? (h("dxp-content-list", { class: "dxp-content-list sc-dxp-content-list", orientation: this.footerlinkData.orientation }, this.footerlinkData.contentListItems.map(function (item) {
                return (h("dxp-content-list-item", { "sub-title": item.subTitle, href: item.href }));
            }))) : h("slot", { name: "content-link-list" }))
        ], this.enableCountrylanguageselectors && [
            h("div", { class: "dxp-col-lg-3 dxp-col-sm-12 dxp-col-12 dxp-text-sm-left dxp-text-md-left dxp-text-lg-right  country-language-selector" }, (this.countryLanguageData) ?
                h("dxp-country-language-selector", { "end-point-url": this.countryLanguageData.endpointurl, "target-url": this.countryLanguageData.endpointurl }) : h("slot", { name: "country-language-selector" }))
        ], this.enableSociallinks && [
            h("div", { class: "dxp-col-lg-3 dxp-col-sm-12 dxp-col-12 dxp-text-sm-left dxp-text-md-left dxp-text-lg-right  enable-social-follow" }, this.socialFollowData ? (h("dxp-social-links", { orientation: "horizontal", "social-links-items": this.socialFollowData.socialLinksItems }, this.socialFollowData.socialLinksItems.map(function (item) {
                return (h("dxp-social-links-item", { "aria-label": item.ariaLabel, "social-title": item.socialTitle, type: item.type, href: item.href }));
            }))) : h("slot", { name: "social-links" }))
        ])));
    };
    Object.defineProperty(Footer.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Footer, "style", {
        get: function () { return "footer.dxp.dxp-footer{overflow:hidden}footer.dxp.dxp-footer .logo{margin-bottom:1.7rem}footer.dxp.dxp-footer .content-cta-list,footer.dxp.dxp-footer .logo{margin-top:5.5rem}footer.dxp.dxp-footer .logo+.content-cta-list{margin-top:0}\@media screen and (max-width:767px){footer.dxp.dxp-footer .content-list{padding:3.5rem 0 0 0}footer.dxp.dxp-footer .flex-direction{display:-ms-flexbox;display:flex;-ms-flex-direction:column-reverse;flex-direction:column-reverse;padding:40px 0 40px 0}footer.dxp.dxp-footer .flex-direction .content-link-list,footer.dxp.dxp-footer .flex-direction .country-language-selector,footer.dxp.dxp-footer .flex-direction .enable-social-follow{padding-bottom:40px}footer.dxp.dxp-footer .flex-direction .logo{margin-top:1.5rem;margin-bottom:2.5rem}footer.dxp.dxp-footer .column-1.sc-dxp-footer>dxp-content-list,footer.dxp.dxp-footer .column-2.sc-dxp-footer>dxp-content-list,footer.dxp.dxp-footer .column-3.sc-dxp-footer>dxp-content-list{width:100%;float:left;padding-bottom:56px}}\@media screen and (min-width:768px) and (max-width:992px){footer.dxp.dxp-footer .flex-direction{display:-ms-flexbox;display:flex;-ms-flex-direction:column-reverse;flex-direction:column-reverse;padding:40px 0 40px 0}footer.dxp.dxp-footer .flex-direction .content-link-list,footer.dxp.dxp-footer .flex-direction .country-language-selector,footer.dxp.dxp-footer .flex-direction .enable-social-follow{padding-bottom:40px}footer.dxp.dxp-footer .content-list{padding:3.5rem 0 3.5rem 0}footer.dxp.dxp-footer .column-1.sc-dxp-footer>dxp-content-list,footer.dxp.dxp-footer .column-2.sc-dxp-footer>dxp-content-list,footer.dxp.dxp-footer .column-3.sc-dxp-footer>dxp-content-list{width:50%;float:left}}\@media screen and (min-width:993px){footer.dxp.dxp-footer .column-2.sc-dxp-footer>dxp-content-list,footer.dxp.dxp-footer .column-2>dxp-content-list{width:50%;float:left}footer.dxp.dxp-footer .column-3.sc-dxp-footer>dxp-content-list,footer.dxp.dxp-footer .column-3>dxp-content-list{width:33.33%;float:left}footer.dxp.dxp-footer .content-cta-list{padding-bottom:112px}footer.dxp.dxp-footer .flex-direction{padding:2.5rem 0 2.5rem 0}}\@media (min-width:993px) and (max-width:1200px){footer.dxp.dxp-footer .country-language-selector{text-align:left!important}}"; },
        enumerable: true,
        configurable: true
    });
    return Footer;
}());
export { Footer as dxp_footer };
