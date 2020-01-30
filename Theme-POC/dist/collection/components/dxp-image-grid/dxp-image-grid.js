import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-image-grid */
export class ImageGrid {
    constructor() {
        /** set Maximum Number of images to be shown in grid */
        this.IMAGE_COUNT = {
            'size-1x1': 8,
            'size-2x2': 2,
            'size-2x2--l': 5,
            'size-2x2--c': 5,
            'size-2x2--r': 5
        };
    }
    /** Watcher that looks for imageContentData object to be assigned/changed externally */
    imageContentDataChangeHandler() {
        this.base.createNestedMarkup(this.imagesContainer, 'dxp-image', this.imageContentData);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        this.imageContentDataChangeHandler();
        const container = this.element && this.element.querySelector(`.image-grid-container`) ?
            this.element.querySelector(`.image-grid-container`) : this.element.querySelector(`.image-grid-container`);
        const imageContentItems = this.imageContentData ? container.querySelectorAll('dxp-image') : this.element.querySelectorAll('dxp-image');
        this.createImageGridContainer(container, imageContentItems);
        this.displayImagesInGrid(container, imageContentItems);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Create image grid skeleton */
    createImageGridContainer(container, imageContentItems) {
        /** Removing extra <dxp-image> tags as per selection of layout option */
        const count = this.IMAGE_COUNT[this.layoutOption];
        for (const i of Object.keys(imageContentItems)) {
            if (Number(i) >= count) {
                imageContentItems[i].remove();
            }
        }
        if (imageContentItems.length >= 1) {
            for (let i = 0; i < count; i++) {
                const imagePanel = document.createElement('div');
                const imagePanelContent = document.createElement('div');
                imagePanel.classList.add('image-panel');
                imagePanel.classList.add('sc-dxp-image-grid');
                imagePanelContent.classList.add('image-panel-content');
                imagePanelContent.classList.add('sc-dxp-image-grid');
                imagePanel.appendChild(imagePanelContent);
                container.appendChild(imagePanel);
            }
        }
    }
    /** Display images as per selection of grid layout */
    displayImagesInGrid(container, imageContentItems) {
        const imagePanelContainer = container.querySelectorAll('.image-panel-content');
        Array.from(imagePanelContainer).forEach((imagePanel, i) => {
            if (imageContentItems[i]) {
                imagePanel.appendChild(imageContentItems[i]);
            }
            else {
                imagePanel.parentElement.classList.add('blank-panel');
            }
        });
        if (this.element && this.element.querySelector('slot')) {
            this.element.querySelector('slot').remove();
        }
    }
    /** Render the image grid */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-image-grid render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })]
        ];
        return (h("div", { class: `${this.base.componentClass()} sc-dxp-image-grid`, dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { id: "dxp-image-grid-container", class: "dxp-image-grid-container" },
                h("div", { class: `${this.layoutOption} sc-dxp-image-grid image-grid-container`, ref: el => this.imagesContainer = el },
                    h("slot", null)))));
    }
    static get is() { return "dxp-image-grid"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-image-grid.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-image-grid.css"]
    }; }
    static get properties() { return {
        "layoutOption": {
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
                "text": "layout options to select image ordering placement"
            },
            "attribute": "layout-option",
            "reflect": false
        },
        "imageContentData": {
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
                "text": "content data for child components"
            },
            "attribute": "image-content-data",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "imageContentData",
            "methodName": "imageContentDataChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
