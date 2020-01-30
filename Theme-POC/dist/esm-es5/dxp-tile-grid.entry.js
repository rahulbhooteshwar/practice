import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-aa646bb6.js';
var TILE_GRID_CONTAINER = '.dxp-tile-grid-container';
var COL_VAL = 'dxp-col-lg-4 dxp-col-md-6 dxp-col-sm-12';
var TEXT_LEFT = 'dxp-text-left';
var TEXT_RIGHT = 'dxp-text-right';
var TileGrid = /** @class */ (function () {
    function TileGrid(hostRef) {
        registerInstance(this, hostRef);
        /** page number count defined */
        this.pageNumber = 0;
        /** tile item count defined */
        this.tileItemCount = 0;
        /** Nested layout items */
        this.tileItems = [];
        /** class to be applied for header alignment */
        this.headerAlignment = 'center';
    }
    /** actions to be performed prior to component loading */
    TileGrid.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'TileGrid', messages);
    };
    /** actions to be performed prior to component loading */
    TileGrid.prototype.componentDidLoad = function () {
        this.findTileList();
        this.tileCalc();
    };
    /** Listen for the window resize changes */
    TileGrid.prototype.handleResizeEvent = function () {
        this.tileCalc();
    };
    /**
     * click listener for routing events on anchor tag
     */
    TileGrid.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** click event for sliding tiles */
    TileGrid.prototype.changeSlide = function (direction) {
        if (direction === 'NEXT') {
            this.pageNumber += 1;
            this.tileCalc();
        }
        else {
            this.pageNumber -= 1;
            this.tileCalc();
        }
    };
    /** function for list data */
    TileGrid.prototype.findTileList = function () {
        var _this = this;
        var eleTileContainer = this.base.shadowRootQuerySelector(this.element, TILE_GRID_CONTAINER);
        var renderedTiles = this.getRenderedTileItems();
        var tileLength = this.renderColumns(renderedTiles.length);
        this.tileItemCount = renderedTiles.length;
        Array.from(renderedTiles).forEach(function (node, index) {
            if (_this.isSquare) {
                node.setAttribute('is-square', _this.isSquare);
            }
            var tileEle = document.createElement('div');
            if (!_this.isSquare) {
                tileEle.style.paddingLeft = '1px';
                tileEle.style.paddingRight = '1px';
                tileEle.style.flexShrink = '0';
                tileEle.style.overflow = 'hidden';
            }
            tileEle.style.flexShrink = '0';
            tileEle.className = tileLength;
            tileEle.appendChild(node);
            eleTileContainer.appendChild(tileEle);
            if (index === 0) {
                tileEle.style.paddingLeft = 0;
            }
            if (index === (_this.tileItemCount - 1)) {
                tileEle.style.paddingRight = 0;
            }
        });
        var nextBtn = this.base.shadowRootQuerySelector(this.element, '.next');
        if ((this.isSquare && this.tileItemCount > 3) || (this.tileItemCount > 4)) {
            nextBtn.classList.add('active');
        }
        else {
            nextBtn.classList.add('disable');
        }
        var eleTileWrapper = this.base.shadowRootQuerySelector(this.element, TILE_GRID_CONTAINER);
        var containerWidth = eleTileWrapper.getBoundingClientRect().width;
        var singleWidth = this.getCalcWidth();
        // Calculate how many pages are necessary
        return Math.ceil(renderedTiles.length / (containerWidth / singleWidth));
    };
    /** convert node list to array */
    TileGrid.prototype.getArrayFromNodeList = function (nodeList) {
        return [].slice.call(nodeList);
    };
    /** function return width of container */
    TileGrid.prototype.getCalcWidth = function () {
        var eleTileWrapper = this.base.shadowRootQuerySelector(this.element, '.dxp-tile');
        return eleTileWrapper.getBoundingClientRect().width;
    };
    /** get array of rendered child tab elements */
    TileGrid.prototype.getRenderedTileItems = function () {
        // query select rendered items if child items are created within this component
        // querySelectorAll returns a NodeList, we can convert it to array using spread operator but that doesn't work on IE
        // so using array slicing workaround
        var renderedTiles = this.getArrayFromNodeList(this.base.shadowRootQuerySelector(this.element, 'dxp-tile', true));
        // if child items are not found within this component then search for slotted items (childNodes)
        renderedTiles = renderedTiles.length > 0 ? renderedTiles : this.getArrayFromNodeList(this.element.childNodes).filter(function (child) {
            return child['tagName'] && child['tagName'].toLowerCase() === 'dxp-tile';
        });
        return renderedTiles;
    };
    /** render classes for slot */
    TileGrid.prototype.renderColumns = function (noOfTiles) {
        var classes = '';
        switch (noOfTiles) {
            case (1): {
                classes = this.isSquare ? COL_VAL : 'dxp-col-12 sc-dxp-tile-grid';
                break;
            }
            case (2): {
                classes = this.isSquare ? COL_VAL : 'dxp-col-md-6 dxp-col-12 sc-dxp-tile-grid';
                break;
            }
            case (3): {
                classes = COL_VAL;
                break;
            }
            case (4): {
                classes = this.isSquare ? COL_VAL : 'dxp-col-lg-3 dxp-col-md-6 dxp-col-sm-12';
                break;
            }
            default: {
                classes = this.isSquare ? COL_VAL : 'dxp-col-lg-3 dxp-col-md-6 dxp-col-sm-12';
            }
        }
        classes = classes + " full-width";
        return classes;
    };
    /** assign width */
    TileGrid.prototype.setX = function (x) {
        var eleTileWrapper = this.base.shadowRootQuerySelector(this.element, TILE_GRID_CONTAINER);
        eleTileWrapper.style.left = x + "px";
        eleTileWrapper.style.transition = "left 1s";
    };
    /** Tile calculation function */
    TileGrid.prototype.tileCalc = function () {
        var eletile = this.base.shadowRootQuerySelector(this.element, '.full-width');
        var singleWidth = eletile.getBoundingClientRect().width;
        var nooftilesEle;
        if (window.innerWidth >= 576 && window.innerWidth <= 768) {
            nooftilesEle = 2;
        }
        else if (window.innerWidth < 575) {
            nooftilesEle = 1;
        }
        else {
            if (this.isSquare) {
                nooftilesEle = 3;
            }
            else {
                nooftilesEle = 4;
            }
        }
        var gridWidth = singleWidth * nooftilesEle;
        var renderedTiles = this.getRenderedTileItems();
        var eleTileWrapper = this.base.shadowRootQuerySelector(this.element, TILE_GRID_CONTAINER);
        var containerWidth = eleTileWrapper.getBoundingClientRect().width;
        for (var _i = 0, renderedTiles_1 = renderedTiles; _i < renderedTiles_1.length; _i++) {
            var i = renderedTiles_1[_i];
            i.style.width = singleWidth + "px";
        }
        // Calculate how many pages are necessary
        var pagesCount = Math.ceil(renderedTiles.length / (containerWidth / singleWidth));
        if (this.pageNumber <= pagesCount) {
            this.setX(this.pageNumber * gridWidth * -1);
        }
        var prevBtn = this.base.shadowRootQuerySelector(this.element, '.prev');
        if (this.pageNumber > 0) {
            // show pre button
            prevBtn.classList.remove('disable');
        }
        else {
            prevBtn.classList.add('disable');
        }
        var nextBtn = this.base.shadowRootQuerySelector(this.element, '.next');
        if (this.pageNumber === pagesCount - 1) {
            nextBtn.classList.add('disable');
        }
        else {
            nextBtn.classList.remove('disable');
        }
    };
    /** Render dxp-tile-grid */
    TileGrid.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-tile-grid render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [this.theme && h("link", { rel: "stylesheet", href: "" })],
            [this.theme && h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-tile-grid.min.css" })]
        ];
        return (h("div", { class: "" + this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, this.tileGridEyebrowText && h("p", { class: "dxp-title-eyebrow sc-dxp-tile-grid\n         " + (this.headerAlignment === 'left' ? TEXT_LEFT : this.headerAlignment === 'right' ? TEXT_RIGHT : 'center'), innerHTML: this.tileGridEyebrowText }), this.tileGridTitle && h("h3", { class: this.headerAlignment === 'left' ? TEXT_LEFT : this.headerAlignment === 'right' ? TEXT_RIGHT : 'center', innerHTML: this.tileGridTitle }), this.tileGridDescription && h("p", { class: "description " + (this.headerAlignment === 'left' ? TEXT_LEFT : this.headerAlignment === 'right' ? TEXT_RIGHT : 'center'), innerHTML: this.tileGridDescription }), h("div", { class: "dxp-tile-grid-container dxp-row" }, this.tileListData ? (this.tileListData.map(function (item) {
            return (h("dxp-tile", { class: "dxp-tile", "tile-caption": item['tile-caption'], "badge-text": item['badge-text'], "background-type": item['tile-type'], src: item['src'], "src-lg": item['src-lg'], "src-md": item['src-md'], "focal-point-lg": item['focal-point-lg'], "eyebrow-title": item['eyebrow-title'], "focal-point": item['focal-point'], "focal-point-md": item['focal-point-md'], "open-in-new-tab": item['open-in-new-tab'], description: item['description'], responsive: item['responsive'], "is-square": item.isSquare, href: item['href'] }, item.ctaListData && (h("dxp-cta-list", { orientation: "vertical", slot: "cta" }, item.ctaListData.ctaList.map(function (cta) {
                return (h("dxp-cta", { class: cta.linkType, "link-type": cta.linkType, text: cta.text, type: cta.type, src: cta.src, "aria-label": cta.ariaLabel, href: cta.href, "open-in-new-tab": cta.openInNewTab }));
            })))));
        })) : h("slot", null)), h("div", { class: "cta-panel" }, this.tileGridCta ? (h("dxp-cta-list", { orientation: "vertical" }, this.tileGridCta[0].ctaList.map(function (cta) {
            return (h("dxp-cta", { text: cta.text, type: cta.type, "button-type": "secondary", src: cta.src, "aria-label": cta.ariaLabel, href: cta.href, "open-in-new-tab": cta.openInNewTab }));
        }))) : h("slot", { name: "tilegridcta" }), h("div", { class: "button-panel" }, h("button", { class: "next", onClick: function () { return _this.changeSlide('NEXT'); }, "aria-label": dxp.i18n.t('TileCarousel:next') }), h("button", { class: "prev disable", onClick: function () { return _this.changeSlide('PREV'); }, "aria-label": dxp.i18n.t('TileCarousel:prev') })))));
    };
    Object.defineProperty(TileGrid.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TileGrid, "style", {
        get: function () { return "div.dxp.dxp-tile-grid{-webkit-transition-delay:10s;transition-delay:10s;position:relative;overflow:hidden;padding-bottom:50px}div.dxp.dxp-tile-grid .center{text-align:center}div.dxp.dxp-tile-grid .tile-grid-title{padding-bottom:5px}div.dxp.dxp-tile-grid .cta-panel{display:-ms-flexbox;display:flex;padding-top:25px}div.dxp.dxp-tile-grid .button-panel{margin-left:auto}div.dxp.dxp-tile-grid .button-panel:after{content:\"\";display:block;clear:both}div.dxp.dxp-tile-grid .button-panel .next,div.dxp.dxp-tile-grid .button-panel .prev{float:right;cursor:pointer;height:24px;width:24px;border:none}div.dxp.dxp-tile-grid .button-panel .next.disable,div.dxp.dxp-tile-grid .button-panel .prev.disable{pointer-events:none;opacity:.5}div.dxp.dxp-tile-grid .button-panel .next{margin-left:36px}div.dxp.dxp-tile-grid .next:hover,div.dxp.dxp-tile-grid .prev:hover{width:24px;height:24px}div.dxp.dxp-tile-grid .dxp-tile-grid-container{left:0;-webkit-transition:left 1s;transition:left 1s;position:relative;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;margin:0;padding:0}div.dxp.dxp-tile-grid .dxp-tile-grid-container .dxp-col-12{position:static}div.dxp.dxp-tile-grid .dxp-tile-grid-container ::slotted(div){padding:0;margin:0}\@media (max-width:575px){div.dxp.dxp-tile-grid .dxp-tile-grid-container .full-width{width:100%}}"; },
        enumerable: true,
        configurable: true
    });
    return TileGrid;
}());
export { TileGrid as dxp_tile_grid };
