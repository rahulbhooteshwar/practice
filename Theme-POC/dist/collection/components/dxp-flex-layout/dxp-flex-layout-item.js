import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-flex-layout */
export class LayoutItem {
    constructor() {
        /** this object is used to re-render the dom as we dont have any state to force re render */
        this.reRender = {};
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /** listner for window resize/orientation change */
    windowResize() {
        this.reRender = Object.assign({}, this.reRender);
    }
    /** actions to be performed after render method is called */
    componentDidRender() {
        dxp.log.debug(this.element.tagName, 'componentDidRender()', `dxp-Flex layout-item`);
        this.element.classList.add('hydrated');
    }
    /** calculate padding style */
    setColumnStyles() {
        const deviceWidthType = this.base.getDeviceWidthType();
        const style = {};
        // add background property to flex-layout items
        style['background-image'] = `url(${this.bgImage})`;
        style['background-size'] = 'cover';
        style['background-repeat'] = 'no-repeat';
        style['background-position'] = 'center center';
        switch (deviceWidthType) {
            case 'sm':
                style['padding'] = this.paddingStyleSm || '0px';
                break;
            case 'md':
                style['padding'] = this.paddingStyleMd || this.paddingStyleSm || '0px';
                break;
            case 'lg':
                style['padding'] = this.paddingStyleLg || this.paddingStyleMd || this.paddingStyleSm || '0px';
                break;
            case 'xl':
                style['padding'] = this.paddingStyleXl || this.paddingStyleLg || this.paddingStyleMd || this.paddingStyleSm || '0px';
                break;
            default:
                style['padding'] = this.paddingStyleSm || '0px';
        }
        return style;
    }
    /** Render the layout */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-flex-layout-item render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })]
        ];
        return (h("div", { class: `${this.base.componentClass()} `, "data-theme": this.theme, style: Object.assign({}, this.setColumnStyles()) },
            styles,
            h("slot", null)));
    }
    static get is() { return "dxp-flex-layout-item"; }
    static get originalStyleUrls() { return {
        "$": ["./dxp-flex-layout-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-flex-layout-item.css"]
    }; }
    static get properties() { return {
        "bgImage": {
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
                "text": "background image path"
            },
            "attribute": "bg-image",
            "reflect": false
        },
        "borderStyle": {
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
                "text": "borderStyle"
            },
            "attribute": "border-style",
            "reflect": false
        },
        "columnWidthLg": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12",
                "resolved": "1 | 10 | 11 | 12 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "column width for small laptops - screens equal to or greater than 992px wide"
            },
            "attribute": "column-width-lg",
            "reflect": false
        },
        "columnWidthMd": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12",
                "resolved": "1 | 10 | 11 | 12 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "column width for tablets - screens equal to or greater than 768px wide"
            },
            "attribute": "column-width-md",
            "reflect": false
        },
        "columnWidthSm": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12",
                "resolved": "1 | 10 | 11 | 12 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "column width for phablets - screens less than 768px wide"
            },
            "attribute": "column-width-sm",
            "reflect": false
        },
        "columnWidthXl": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12",
                "resolved": "1 | 10 | 11 | 12 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "column width for laptops and desktops - screens equal to or greater than 1200px wide"
            },
            "attribute": "column-width-xl",
            "reflect": false
        },
        "paddingStyleLg": {
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
                "text": "padding style for large devices"
            },
            "attribute": "padding-style-lg",
            "reflect": false
        },
        "paddingStyleMd": {
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
                "text": "padding style for Medium devices"
            },
            "attribute": "padding-style-md",
            "reflect": false
        },
        "paddingStyleSm": {
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
                "text": "padding style for Small devices"
            },
            "attribute": "padding-style-sm",
            "reflect": false
        },
        "paddingStyleXl": {
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
                "text": "padding style for Xl devices"
            },
            "attribute": "padding-style-xl",
            "reflect": false
        }
    }; }
    static get states() { return {
        "reRender": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "resize",
            "method": "windowResize",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
