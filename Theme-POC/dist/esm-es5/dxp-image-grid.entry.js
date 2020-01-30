import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
var ImageGrid = /** @class */ (function () {
    function ImageGrid(hostRef) {
        registerInstance(this, hostRef);
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
    ImageGrid.prototype.imageContentDataChangeHandler = function () {
        this.base.createNestedMarkup(this.imagesContainer, 'dxp-image', this.imageContentData);
    };
    /** actions to be performed prior to component loading */
    ImageGrid.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
    };
    /** actions to be performed after component loading */
    ImageGrid.prototype.componentDidLoad = function () {
        this.imageContentDataChangeHandler();
        var container = this.element && this.element.querySelector(".image-grid-container") ?
            this.element.querySelector(".image-grid-container") : this.element.querySelector(".image-grid-container");
        var imageContentItems = this.imageContentData ? container.querySelectorAll('dxp-image') : this.element.querySelectorAll('dxp-image');
        this.createImageGridContainer(container, imageContentItems);
        this.displayImagesInGrid(container, imageContentItems);
    };
    /**
     * click listener for routing events on anchor tag
     */
    ImageGrid.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** Create image grid skeleton */
    ImageGrid.prototype.createImageGridContainer = function (container, imageContentItems) {
        /** Removing extra <dxp-image> tags as per selection of layout option */
        var count = this.IMAGE_COUNT[this.layoutOption];
        for (var _i = 0, _a = Object.keys(imageContentItems); _i < _a.length; _i++) {
            var i = _a[_i];
            if (Number(i) >= count) {
                imageContentItems[i].remove();
            }
        }
        if (imageContentItems.length >= 1) {
            for (var i = 0; i < count; i++) {
                var imagePanel = document.createElement('div');
                var imagePanelContent = document.createElement('div');
                imagePanel.classList.add('image-panel');
                imagePanel.classList.add('sc-dxp-image-grid');
                imagePanelContent.classList.add('image-panel-content');
                imagePanelContent.classList.add('sc-dxp-image-grid');
                imagePanel.appendChild(imagePanelContent);
                container.appendChild(imagePanel);
            }
        }
    };
    /** Display images as per selection of grid layout */
    ImageGrid.prototype.displayImagesInGrid = function (container, imageContentItems) {
        var imagePanelContainer = container.querySelectorAll('.image-panel-content');
        Array.from(imagePanelContainer).forEach(function (imagePanel, i) {
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
    };
    /** Render the image grid */
    ImageGrid.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-image-grid render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })]
        ];
        return (h("div", { class: this.base.componentClass() + " sc-dxp-image-grid", dir: this.dir, "data-theme": this.theme }, styles, h("div", { id: "dxp-image-grid-container", class: "dxp-image-grid-container" }, h("div", { class: this.layoutOption + " sc-dxp-image-grid image-grid-container", ref: function (el) { return _this.imagesContainer = el; } }, h("slot", null)))));
    };
    Object.defineProperty(ImageGrid.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageGrid, "watchers", {
        get: function () {
            return {
                "imageContentData": ["imageContentDataChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageGrid, "style", {
        get: function () { return "div.dxp.dxp-image-grid .image-grid-container{display:-ms-flexbox;display:flex;-ms-flex-flow:column wrap;flex-flow:column wrap;-webkit-flex-flow:column wrap;-moz-flex-flow:column wrap;max-width:100%;height:600px}div.dxp.dxp-image-grid .image-grid-container .image-panel{width:25%;overflow:hidden;height:300px}div.dxp.dxp-image-grid .image-grid-container .image-panel.blank-panel{background-color:#5b6770}div.dxp.dxp-image-grid .size-2x2 .image-panel,div.dxp.dxp-image-grid .size-2x2--c .image-panel:nth-child(3),div.dxp.dxp-image-grid .size-2x2--l .image-panel:first-child,div.dxp.dxp-image-grid .size-2x2--r .image-panel:nth-child(5){height:600px;width:50%}\@media (max-width:1200px){div.dxp.dxp-image-grid .dxp-image-grid-container{display:-ms-flexbox;display:flex;overflow:hidden;height:300px;position:relative;width:100%;-ms-flex-flow:nowrap;flex-flow:nowrap}div.dxp.dxp-image-grid .dxp-image-grid-container .image-grid-container{overflow:auto;height:320px;-webkit-overflow-scrolling:touch}div.dxp.dxp-image-grid .dxp-image-grid-container .image-grid-container .image-panel{width:300px}div.dxp.dxp-image-grid .dxp-image-grid-container .image-grid-container.size-1x1{width:2400px;max-width:2400px}div.dxp.dxp-image-grid .dxp-image-grid-container .image-grid-container.size-2x2--c,div.dxp.dxp-image-grid .dxp-image-grid-container .image-grid-container.size-2x2--l,div.dxp.dxp-image-grid .dxp-image-grid-container .image-grid-container.size-2x2--r{width:1500px;max-width:1500px}div.dxp.dxp-image-grid .dxp-image-grid-container .image-grid-container.size-2x2{width:600px;max-width:600px}div.dxp.dxp-image-grid .size-2x2 .image-panel,div.dxp.dxp-image-grid .size-2x2--c .image-panel:nth-child(3),div.dxp.dxp-image-grid .size-2x2--l .image-panel:first-child,div.dxp.dxp-image-grid .size-2x2--r .image-panel:nth-child(5){height:300px;width:300px}}"; },
        enumerable: true,
        configurable: true
    });
    return ImageGrid;
}());
export { ImageGrid as dxp_image_grid };
