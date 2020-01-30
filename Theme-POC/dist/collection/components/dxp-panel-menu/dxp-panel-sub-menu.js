import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-sub-menu */
export class PanelSubMenu {
    constructor() {
        /** panel item status */
        this.active = false;
        /** It specifies that whether need to show progress bar or not */
        this.progressBar = false;
        /** change color of progress  (for both) */
        this.progressColor = '#000000';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'PanelMenu', messages);
    }
    /** actions to be performed after component loading */
    async componentDidLoad() {
        // when this component is rendered inside slot of dxp-panel-menu
        let host = this.element.closest('dxp-panel-menu');
        // when this component is rendered inside shadow root of dxp-panel-menu
        host = host ? host : this.element['getRootNode']()['host'];
        const hostComponentRef = host && await host.componentOnReady();
        if (hostComponentRef) {
            await hostComponentRef.registerMenu();
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the panels */
    render() {
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-panel-menu.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: `panel-item-content ${this.active ? 'panel-item-active' : ''}` }, this.content
                ? h("div", { innerHTML: this.content })
                : h("slot", null))));
    }
    static get is() { return "dxp-panel-sub-menu"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-panel-sub-menu.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-panel-sub-menu.css"]
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
                "text": "panel item status"
            },
            "attribute": "active",
            "reflect": false,
            "defaultValue": "false"
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
                "text": "alt text for panel icon"
            },
            "attribute": "alt",
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
                "text": "sub-menu item contents"
            },
            "attribute": "content",
            "reflect": false
        },
        "currentValue": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "current value for progress  (for both)"
            },
            "attribute": "current-value",
            "reflect": false
        },
        "maxValue": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "maximum value for progress  (for both)"
            },
            "attribute": "max-value",
            "reflect": false
        },
        "menuIconSrc": {
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
                "text": "image url for panel icon"
            },
            "attribute": "menu-icon-src",
            "reflect": false
        },
        "menuTitle": {
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
                "text": "sub-panel item title"
            },
            "attribute": "menu-title",
            "reflect": false
        },
        "progressBar": {
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
                "text": "It specifies that whether need to show progress bar or not"
            },
            "attribute": "progress-bar",
            "reflect": false,
            "defaultValue": "false"
        },
        "progressColor": {
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
                "text": "change color of progress  (for both)"
            },
            "attribute": "progress-color",
            "reflect": false,
            "defaultValue": "'#000000'"
        },
        "subMenu": {
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
                "text": "sub-menu - coma seperated string for sub-menu list for active menu panel"
            },
            "attribute": "sub-menu",
            "reflect": false
        }
    }; }
    static get states() { return {
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
