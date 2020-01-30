import { h } from "@stencil/core";
import dxp from '@mc-dxp/dxp-ui-core';
import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
const CONTENT_LIST_ITEM = 'dxp-content-list-item';
/** dxp-content-list */
export class ContentList {
    constructor() {
        /** list item alignment */
        this.orientation = 'vertical';
    }
    /** Listener that looks for content list items object to be assigned/changed externally */
    contentItemsChangeHandler() {
        if (this.contentListItems) {
            this.base.createNestedMarkup(this.linksContainer, CONTENT_LIST_ITEM, this.contentListItems);
        }
    }
    /** actions to perform prior to component load */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-content-list.min.css`;
        dxp.util.appendLinkElement(shadow, href);
    }
    /** actions to perform after component load */
    componentDidLoad() {
        this.contentItemsChangeHandler();
        const dxpContentListItemsWithSlot = this.element.querySelectorAll(CONTENT_LIST_ITEM).length ?
            this.element.querySelectorAll(CONTENT_LIST_ITEM)
            :
                this.element.querySelectorAll(CONTENT_LIST_ITEM);
        const ele = dxpContentListItemsWithSlot.length - 1;
        if (dxpContentListItemsWithSlot.length !== 0) {
            dxpContentListItemsWithSlot[ele].classList.add('margin-bottom-0');
            dxpContentListItemsWithSlot[ele].componentOnReady().then(res => {
                res.querySelector('.dxp-content-list-item').classList.add('margin-bottom-0');
            });
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the content list */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-content-list render() : ${process.env.MODE}`);
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            h("div", { class: "header-tag" }, this.titleText && (this.href ? h("h4", { class: this.headerSize },
                h("a", { href: this.href }, this.titleText)) :
                h("h4", { class: this.headerSize }, this.titleText))),
            h("div", { class: `dxp-content-list-items sc-dxp-content-list ${this.orientation ? this.orientation : 'vertical'}`, ref: el => this.linksContainer = el },
                h("slot", null))));
    }
    static get is() { return "dxp-content-list"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-content-list.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-content-list.css"]
    }; }
    static get properties() { return {
        "ariaLabel": {
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
                "text": "content title accessibility data"
            },
            "attribute": "aria-label",
            "reflect": false
        },
        "headerSize": {
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
                "text": "content header size"
            },
            "attribute": "header-size",
            "reflect": false
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
                "text": "content href"
            },
            "attribute": "href",
            "reflect": false
        },
        "orientation": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'vertical' | 'horizontal'",
                "resolved": "\"horizontal\" | \"vertical\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "list item alignment"
            },
            "attribute": "orientation",
            "reflect": false,
            "defaultValue": "'vertical'"
        },
        "target": {
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
                "text": "content target"
            },
            "attribute": "target",
            "reflect": false
        },
        "titleText": {
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
                "text": "content title text"
            },
            "attribute": "title-text",
            "reflect": false
        },
        "contentListItems": {
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
                "text": "object to hold multiple content list items blocks that can be passed as json array"
            },
            "attribute": "content-list-items",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "contentListItems",
            "methodName": "contentItemsChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
