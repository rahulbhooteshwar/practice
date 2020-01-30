import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-flex-layout */
export class FlexLayout {
    constructor() {
        /** Nested layout items */
        this.layoutItems = [];
        /** this object is used to re-render the dom as we dont have any state to force re render */
        this.reRender = {};
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        this.layoutItems = Array.from(this.getLayoutItems());
    }
    /** listner for window resize/orientation change */
    windowResize() {
        this.reRender = Object.assign({}, this.reRender);
    }
    /** actions to be performed after render method is called */
    componentDidRender() {
        dxp.log.debug(this.element.tagName, 'componentDidRender()', `dxp-Flex-layout`);
        this.element.classList.add('hydrated');
    }
    /** convert nodelist to array */
    getArrayFromNodeList(nodeList) {
        return [].slice.call(nodeList);
    }
    /**
     * Function to return column class based on provided column width
     */
    getColumnClass(item) {
        let columnClass = 'dxp-col-12';
        if (item['columnWidthSm']) {
            columnClass += ` dxp-col-sm-${item['columnWidthSm']}`;
        }
        if (item['columnWidthMd']) {
            columnClass += ` dxp-col-md-${item['columnWidthMd']}`;
        }
        if (item['columnWidthLg']) {
            columnClass += ` dxp-col-lg-${item['columnWidthLg']}`;
        }
        if (item['columnWidthXl']) {
            columnClass += ` dxp-col-xl-${item['columnWidthXl']}`;
        }
        return columnClass;
    }
    /** get array of rendered child tab elements */
    getLayoutItems() {
        // search for slotted items (childNodes)
        return this.getArrayFromNodeList(this.element.childNodes).filter(child => {
            return child['tagName'] && child['tagName'].toLowerCase() === 'dxp-flex-layout-item';
        });
    }
    /** apply column reverse as per condition */
    isColumnReverseApplicable() {
        const deviceWidthType = this.base.getDeviceWidthType();
        return (deviceWidthType === 'sm' || deviceWidthType === 'md') && this.columnReverse;
    }
    /** Render the layout */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-flex-layout render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })]
        ];
        return (h("div", { class: `${this.base.componentClass()}`, "data-theme": this.theme },
            styles,
            h("div", { style: { border: this.borderStyle }, class: `dxp-row ${this.isColumnReverseApplicable() ? 'dxp-flex-column-reverse' : ''}` }, this.layoutItems.map((item, index) => h("div", { style: { border: item['borderStyle'] }, class: `${this.getColumnClass(item)}` },
                h("slot", { name: `column-${index + 1}` }))))));
    }
    static get is() { return "dxp-flex-layout"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-flex-layout.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-flex-layout.css"]
    }; }
    static get properties() { return {
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
        "columnReverse": {
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
                "text": "reverse columns for small devices"
            },
            "attribute": "column-reverse",
            "reflect": false
        }
    }; }
    static get states() { return {
        "layoutItems": {},
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
