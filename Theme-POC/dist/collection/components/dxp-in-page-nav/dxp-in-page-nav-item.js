import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-in-page-nav */
export class InPageNavItem {
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'InPageNavItem', messages);
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
        if (dxp.is.chrome()) {
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
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && (h("link", { rel: "stylesheet", href: `` }))],
            [this.theme && (h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-in-page-nav.min.css` }))]
        ];
        return (h("div", { class: `${this.active ? 'active' : ''} ${this.base.componentClass()}`, dir: this.dir, "data-theme": this.theme },
            styles,
            h("li", { class: `${this.active ? 'active' : ''}`, role: "menuitem", onClick: () => this.scrollTo(this.href), tabIndex: 0, onKeyUp: e => e.keyCode === 13 && this.scrollTo(this.href) },
                h("span", null, this.text || h("slot", null)))));
    }
    static get is() { return "dxp-in-page-nav-item"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-in-page-nav-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-in-page-nav-item.css"]
    }; }
    static get properties() { return {
        "active": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "set to true when item is active"
            },
            "attribute": "active",
            "reflect": true
        },
        "href": {
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
                "text": "link to destination or id of section"
            },
            "attribute": "href",
            "reflect": false
        },
        "text": {
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
                "text": "text to be displayed in nav-bar"
            },
            "attribute": "text",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get methods() { return {
        "getActive": {
            "complexType": {
                "signature": "() => Promise<boolean>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<boolean>"
            },
            "docs": {
                "text": "function to get active status of an item",
                "tags": []
            }
        },
        "getHref": {
            "complexType": {
                "signature": "() => Promise<string>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<string>"
            },
            "docs": {
                "text": "function to get href of an item",
                "tags": []
            }
        },
        "setActive": {
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
                "text": "function to get active status of an item",
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
