import dxp from '@mc-dxp/dxp-ui-core';
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import { h } from "@stencil/core";
/** dxp-footer */
export class Footer {
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-footer.min.css`;
        dxp.util.appendLinkElement(shadow, href);
    }
    /** lifecycle hook */
    componentDidLoad() {
        const contentItemData = this.element.querySelector(`[slot='content-link-list']`);
        if (contentItemData) {
            const contentItemAttr = contentItemData.getAttribute('orientation');
            if (contentItemAttr === 'horizontal') {
                const windowWidth = window.innerWidth;
                if (windowWidth < 767) {
                    contentItemData.setAttribute('orientation', 'vertical');
                }
                else if (windowWidth > 768) {
                    contentItemData.setAttribute('orientation', 'horizontal');
                }
            }
        }
        const container = this.element.querySelector('.content-list');
        const lists = this.element.querySelectorAll(`[slot='content-list']`);
        const elem = document.createElement('div');
        elem.setAttribute('class', `column-${lists.length} sc-dxp-footer`);
        Array.from(lists).forEach(node => {
            node.classList.add('sc-dxp-footer');
            elem.appendChild(node);
        });
        if (container) {
            container.appendChild(elem);
        }
    }
    /** Listen for the window resize changes */
    handleResizeEvent() {
        const windowWidth = window.innerWidth;
        const contentItemData = this.element.querySelector(`[slot='content-link-list']`);
        if (windowWidth < 992) {
            contentItemData.setAttribute('orientation', 'vertical');
        }
        else {
            contentItemData.setAttribute('orientation', 'horizontal');
        }
    }
    /** click listener for routing event on anchor tag */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render Quicklink and Content List */
    renderQuicklinkAndContentList() {
        return ([
            h("div", { class: "dxp-row content-cta-list" },
                h("div", { class: "dxp-col-12" },
                    h("div", { class: "dxp-col-lg-3 dxp-col-sm-7 dxp-col-md-5  dxp-p-0 cta-list-data" }, this.enableQuicklink && this.ctaListData ? (h("dxp-cta-list", { orientation: "vertical", "title-style": "dxp-title-sm", "title-text": this.ctaListData['titleText'] }, this.ctaListData.ctaList.map(cta => {
                        return (h("dxp-cta", { "link-type": cta.linkType, "icon-align": cta.iconAlign, text: cta.text, type: cta.type, src: cta.src, "aria-label": cta.ariaLabel, href: cta.href }));
                    }))) : h("slot", { name: "cta-list" })),
                    this.enableContentlist &&
                        h("div", { class: "dxp-col-lg-5 content-list dxp-col-md-12 dxp-col-sm-12 dxp-col-offset-lg-4" }, this.contentListData ?
                            h("div", { class: `column-${this.contentListData.length} sc-dxp-footer` }, this.contentListData.map((listData) => {
                                return (h("dxp-content-list", { orientation: "vertical", "header-size": listData.headerSize, "title-text": listData.titleText, href: listData.href, "aria-label": listData.titleText, target: listData.target }, listData.contentListItems.map((item) => {
                                    return (h("dxp-content-list-item", { "sub-title": item.subTitle, href: item.href, "aria-label": item.ariaLabel, target: item.target }));
                                })));
                            }))
                            : h("slot", { name: "content-list" })))),
            h("dxp-line", { type: "solid", height: 1, "border-color": "#444340" })
        ]);
    }
    /** Render the footer */
    render() {
        return (h("footer", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            this.enableLogo && h("div", { class: "dxp-row logo" },
                h("div", { class: "dxp-col-12" }, this.logoData ? (h("dxp-logo", { src: this.logoData.src, "src-sm": this.logoData.srcSm, href: this.logoData.href, alt: this.logoData.alt })) : h("slot", { name: "logo" }))),
            (this.enableQuicklink || this.enableContentlist) && this.renderQuicklinkAndContentList(),
            h("div", { class: "dxp-row flex-direction" },
                this.enableCopyright && [
                    h("div", { class: "dxp-col-lg-2 dxp-col-sm-12  dxp-col-12 copyright" }, this.copyrightData ? h("dxp-copyright", { text: this.copyrightData.text })
                        : h("slot", { name: "copyright" }))
                ],
                this.enableFooterlink && [
                    h("div", { class: "dxp-col-lg-4 dxp-col-sm-12 dxp-col-12 content-link-list" }, this.footerlinkData ? (h("dxp-content-list", { class: "dxp-content-list sc-dxp-content-list", orientation: this.footerlinkData.orientation }, this.footerlinkData.contentListItems.map(item => {
                        return (h("dxp-content-list-item", { "sub-title": item.subTitle, href: item.href }));
                    }))) : h("slot", { name: "content-link-list" }))
                ],
                this.enableCountrylanguageselectors && [
                    h("div", { class: "dxp-col-lg-3 dxp-col-sm-12 dxp-col-12 dxp-text-sm-left dxp-text-md-left dxp-text-lg-right  country-language-selector" }, (this.countryLanguageData) ?
                        h("dxp-country-language-selector", { "end-point-url": this.countryLanguageData.endpointurl, "target-url": this.countryLanguageData.endpointurl }) : h("slot", { name: "country-language-selector" }))
                ],
                this.enableSociallinks && [
                    h("div", { class: "dxp-col-lg-3 dxp-col-sm-12 dxp-col-12 dxp-text-sm-left dxp-text-md-left dxp-text-lg-right  enable-social-follow" }, this.socialFollowData ? (h("dxp-social-links", { orientation: "horizontal", "social-links-items": this.socialFollowData.socialLinksItems }, this.socialFollowData.socialLinksItems.map(item => {
                        return (h("dxp-social-links-item", { "aria-label": item.ariaLabel, "social-title": item.socialTitle, type: item.type, href: item.href }));
                    }))) : h("slot", { name: "social-links" }))
                ])));
    }
    static get is() { return "dxp-footer"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-footer.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-footer.css"]
    }; }
    static get properties() { return {
        "contentListData": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "contentListData - utilized by DXP footer script support"
            },
            "attribute": "content-list-data",
            "reflect": false
        },
        "copyrightData": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "copyrightData - utilized by DXP footer script support"
            },
            "attribute": "copyright-data",
            "reflect": false
        },
        "countryLanguageData": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "countryLanguageData - utilized by DXP footer script support"
            },
            "attribute": "country-language-data",
            "reflect": false
        },
        "ctaListData": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "ctaListData - utilized by DXP footer script support"
            },
            "attribute": "cta-list-data",
            "reflect": false
        },
        "enableContentlist": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "isContentList Present"
            },
            "attribute": "enable-contentlist",
            "reflect": false
        },
        "enableCopyright": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "is Copyright Present"
            },
            "attribute": "enable-copyright",
            "reflect": false
        },
        "enableCountrylanguageselectors": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "is Country Language Selector Present"
            },
            "attribute": "enable-countrylanguageselectors",
            "reflect": false
        },
        "enableFooterlink": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "is QuickLink Present"
            },
            "attribute": "enable-footerlink",
            "reflect": false
        },
        "enableLogo": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "isLogo Present"
            },
            "attribute": "enable-logo",
            "reflect": false
        },
        "enableQuicklink": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "isCTA Present"
            },
            "attribute": "enable-quicklink",
            "reflect": false
        },
        "enableSociallinks": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "is Social Follow Present"
            },
            "attribute": "enable-sociallinks",
            "reflect": false
        },
        "footerData": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "footer object which contains data for all elements"
            },
            "attribute": "footer-data",
            "reflect": false
        },
        "footerlinkData": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "footerlinkData - utilized by DXP footer script support"
            },
            "attribute": "footerlink-data",
            "reflect": false
        },
        "logoData": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "logoData - utilized by DXP footer script support"
            },
            "attribute": "logo-data",
            "reflect": false
        },
        "socialFollowData": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "socialFollowData - utilized by DXP footer script support"
            },
            "attribute": "social-follow-data",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "resize",
            "method": "handleResizeEvent",
            "target": "window",
            "capture": false,
            "passive": true
        }, {
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
