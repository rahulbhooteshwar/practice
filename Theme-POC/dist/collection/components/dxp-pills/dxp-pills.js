import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-pills */
export class Pills {
    constructor() {
        /** property to whether show x button or now */
        this.removable = true;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Pills', messages);
    }
    /** actions to be performed post component loading */
    componentDidLoad() {
        let pillsDiv;
        pillsDiv = this.base.shadowRootQuerySelector(this.element, '.pill', false);
        if (this.backgroundColor) {
            pillsDiv.style.backgroundColor = this.backgroundColor;
        }
        if (this.borderColor) {
            pillsDiv.style.border = `1px solid ${this.borderColor}`;
        }
        let pillsSpanDiv;
        pillsSpanDiv = this.base.shadowRootQuerySelector(this.element, '.pill-text', false);
        if (this.color) {
            pillsSpanDiv.style.color = this.color;
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** remove element on close */
    onDeleteHandler(pillValue) {
        this.deleted.emit(pillValue);
        this.element.remove();
    }
    /** Render the pills */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-pills render() : ${process.env.MODE}`);
        if (!this.text) {
            dxp.log.debug(this.element.tagName, 'Component not rendered check props', `in dxp-modal render() : ${process.env.MODE}`);
            return;
        }
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-pills.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "pill", title: this.text, tabindex: "1", "aria-label": `${this.text} pills` },
                h("span", { class: "pill-text", "aria-label": this.text }, this.text),
                this.removable && h("button", { class: "icon-close dxp-icon dxp-icon-small dxp-icon-close", "aria-label": dxp.i18n.t('Pills:close'), onClick: () => { this.onDeleteHandler(this.text); }, tabindex: "2" }))));
    }
    static get is() { return "dxp-pills"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-pills.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-pills.css"]
    }; }
    static get properties() { return {
        "backgroundColor": {
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
                "text": "Prop for background color"
            },
            "attribute": "background-color",
            "reflect": false
        },
        "borderColor": {
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
                "text": "Prop for border color"
            },
            "attribute": "border-color",
            "reflect": false
        },
        "color": {
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
                "text": "Prop for text color"
            },
            "attribute": "color",
            "reflect": false
        },
        "removable": {
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
                "text": "property to whether show x button or now"
            },
            "attribute": "removable",
            "reflect": false,
            "defaultValue": "true"
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
                "text": "input text"
            },
            "attribute": "text",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "deleted",
            "name": "deleted",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "notify consumer about delete event"
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
