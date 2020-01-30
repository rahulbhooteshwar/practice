import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-tab-item */
export class TabList {
    constructor() {
        /** animation status */
        this.animationStatus = '';
        /** Nested tab elements */
        this.nestedTabs = [];
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Tabs', messages);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** activate default tab if not provided */
    activateTab(_e) {
        this.activateTabs.emit(this.element);
    }
    /** onFocusElement for tabs */
    onFocusElement(_e) {
        this.focusTabs.emit(_e);
    }
    /** Render the tabs */
    render() {
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-tabs.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "dxp-row vertical" },
                h("div", { class: "tab-wrapper-vertical dxp-col-lg-4 dxp-col-12" },
                    h("div", { class: `tab-control-group ${this.verticalAlign ? '' : 'dxp-col-12'} ${this.verticalAlign ? 'tab-vertical' : ''} ${this.verticalAlign ? 'dxp-col-12' : ''}` },
                        h("div", { class: `tab-control ${this.active ? 'tab-control-active' : ''} ${this.fixedWidth ? 'tab-fixed-width' : ''}`, onClick: e => { this.activateTab(e); } },
                            h("div", { tabindex: `${this.active ? 0 : -1}`, role: "button", class: "tab-title", onFocus: event => { this.onFocusElement(event.target); } },
                                this.tabIconSrc ? h("div", { class: "tab-icon-wrapper" },
                                    h("img", { src: this.tabIconSrc, alt: this.alt ? this.alt : this.tabTitle })) : '',
                                h("span", { class: `tab-title-text ${this.iconOnlySm && !this.verticalAlign ? 'icon-only-sm' : ''}`, innerHTML: this.tabTitle }),
                                h("span", { class: "arrow-container" },
                                    h("span", { class: `arrow ${this.active ? 'up' : 'down'}` })))))))));
    }
    static get is() { return "dxp-tab-list"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-tab-list.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-tab-list.css"]
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
                "text": "tab item status"
            },
            "attribute": "active",
            "reflect": false
        },
        "alt": {
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
                "text": "alt text for tab icon"
            },
            "attribute": "alt",
            "reflect": false
        },
        "animationStatus": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "animation status"
            },
            "attribute": "animation-status",
            "reflect": false,
            "defaultValue": "''"
        },
        "arrowOrientation": {
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
                "text": "arrowOrientation"
            },
            "attribute": "arrow-orientation",
            "reflect": false
        },
        "content": {
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
                "text": "tab item contents"
            },
            "attribute": "content",
            "reflect": false
        },
        "fixedWidth": {
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
                "text": "Enable adaptive or fixed width designs"
            },
            "attribute": "fixed-width",
            "reflect": false
        },
        "iconOnlySm": {
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
                "text": "Enable icon only labels on mobile devices"
            },
            "attribute": "icon-only-sm",
            "reflect": false
        },
        "iconSm": {
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
                "text": "Enable icon only labels on mobile devices"
            },
            "attribute": "icon-sm",
            "reflect": false
        },
        "nestedTabs": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLElement[]",
                "resolved": "HTMLElement[]",
                "references": {
                    "HTMLElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Nested tab elements"
            },
            "defaultValue": "[]"
        },
        "tabIconSrc": {
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
                "text": "image url for tab icon"
            },
            "attribute": "tab-icon-src",
            "reflect": false
        },
        "tabTitle": {
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
                "text": "tab item title"
            },
            "attribute": "tab-title",
            "reflect": false
        },
        "verticalAlign": {
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
                "text": "vertical align"
            },
            "attribute": "vertical-align",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "focusedControl": {},
        "locale": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "activateTabs",
            "name": "activateTabs",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "emit activate tab content event"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "focusTabs",
            "name": "focusTabs",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "emit focus tab content event"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
