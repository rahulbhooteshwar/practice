import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-in-language */
export class DxpInLanguage {
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'CountrySelector', messages);
        this.countryName = this.element && this.element.parentElement ? this.element.parentElement.querySelector('.country-name').textContent : '';
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the country-selector */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-country render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-site-list.min.css` })]
        ];
        return (h("span", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("a", { href: this.link, "aria-label": dxp.i18n.t('CountrySelector:accessibilitySelectedcountrylang', { selectedcountry: this.countryName, selectedlanguage: this.name }) }, this.name)));
    }
    static get is() { return "dxp-in-language"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-language.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-language.css"]
    }; }
    static get properties() { return {
        "link": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "redirection link"
            },
            "attribute": "link",
            "reflect": false
        },
        "name": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "name"
            },
            "attribute": "name",
            "reflect": false
        }
    }; }
    static get states() { return {
        "countryName": {},
        "dir": {},
        "locale": {},
        "theme": {}
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
