import { h } from "@stencil/core";
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
/** dxp-language-selector */
export class LanguageItem {
    constructor() {
        /** condition to show the language */
        this.showLanguage = false;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** change of language */
    async handleChange() {
        dxp.i18n.changeLanguage(this.locale);
        this.languageChanged.emit({ 'locale': this.locale.toLowerCase() });
        if (this.link) { // not to redirect in case of SPAs
            window.location.href = this.link;
        }
    }
    /** render function */
    render() {
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-language-selector.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), "data-theme": this.theme },
            styles,
            h("li", { tabindex: "-2", role: "option", "data-value": this.locale, "aria-label": this.accessibilityText, "aria-selected": "true", class: this.selectedLanguage ? 'active langElement' : 'langElement', onClick: async () => { await this.handleChange(); } },
                h("a", { class: "language-link", "data-value": this.locale }, this.inLanguage))));
    }
    static get is() { return "dxp-language-item"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-language-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-language-item.css"]
    }; }
    static get properties() { return {
        "accessibilityText": {
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
                "text": "Accessibility text"
            },
            "attribute": "accessibility-text",
            "reflect": false
        },
        "inLanguage": {
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
                "text": "display language"
            },
            "attribute": "in-language",
            "reflect": false
        },
        "language": {
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
                "text": "language in plain English"
            },
            "attribute": "language",
            "reflect": false
        },
        "link": {
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
                "text": "URL for particular language"
            },
            "attribute": "link",
            "reflect": false
        },
        "locale": {
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
                "text": "locale for the language"
            },
            "attribute": "locale",
            "reflect": false
        },
        "selectedLanguage": {
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
                "text": "selected language"
            },
            "attribute": "selected-language",
            "reflect": false
        }
    }; }
    static get states() { return {
        "showLanguage": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "languageChanged",
            "name": "languageChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "if language changed"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "handleChange": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "change of language",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
