import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const TILE_GRID_CONTAINER = '.dxp-tile-grid-container';
const COL_VAL = 'dxp-col-lg-4 dxp-col-md-6 dxp-col-sm-12';
const TEXT_LEFT = 'dxp-text-left';
const TEXT_RIGHT = 'dxp-text-right';
/** dxp-tile-grid */
export class TileGrid {
    constructor() {
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
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'TileGrid', messages);
    }
    /** actions to be performed prior to component loading */
    componentDidLoad() {
        this.findTileList();
        this.tileCalc();
    }
    /** Listen for the window resize changes */
    handleResizeEvent() {
        this.tileCalc();
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** click event for sliding tiles */
    changeSlide(direction) {
        if (direction === 'NEXT') {
            this.pageNumber += 1;
            this.tileCalc();
        }
        else {
            this.pageNumber -= 1;
            this.tileCalc();
        }
    }
    /** function for list data */
    findTileList() {
        const eleTileContainer = this.base.shadowRootQuerySelector(this.element, TILE_GRID_CONTAINER);
        const renderedTiles = this.getRenderedTileItems();
        const tileLength = this.renderColumns(renderedTiles.length);
        this.tileItemCount = renderedTiles.length;
        Array.from(renderedTiles).forEach((node, index) => {
            if (this.isSquare) {
                node.setAttribute('is-square', this.isSquare);
            }
            const tileEle = document.createElement('div');
            if (!this.isSquare) {
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
            if (index === (this.tileItemCount - 1)) {
                tileEle.style.paddingRight = 0;
            }
        });
        const nextBtn = this.base.shadowRootQuerySelector(this.element, '.next');
        if ((this.isSquare && this.tileItemCount > 3) || (this.tileItemCount > 4)) {
            nextBtn.classList.add('active');
        }
        else {
            nextBtn.classList.add('disable');
        }
        const eleTileWrapper = this.base.shadowRootQuerySelector(this.element, TILE_GRID_CONTAINER);
        const containerWidth = eleTileWrapper.getBoundingClientRect().width;
        const singleWidth = this.getCalcWidth();
        // Calculate how many pages are necessary
        return Math.ceil(renderedTiles.length / (containerWidth / singleWidth));
    }
    /** convert node list to array */
    getArrayFromNodeList(nodeList) {
        return [].slice.call(nodeList);
    }
    /** function return width of container */
    getCalcWidth() {
        const eleTileWrapper = this.base.shadowRootQuerySelector(this.element, '.dxp-tile');
        return eleTileWrapper.getBoundingClientRect().width;
    }
    /** get array of rendered child tab elements */
    getRenderedTileItems() {
        // query select rendered items if child items are created within this component
        // querySelectorAll returns a NodeList, we can convert it to array using spread operator but that doesn't work on IE
        // so using array slicing workaround
        let renderedTiles = this.getArrayFromNodeList(this.base.shadowRootQuerySelector(this.element, 'dxp-tile', true));
        // if child items are not found within this component then search for slotted items (childNodes)
        renderedTiles = renderedTiles.length > 0 ? renderedTiles : this.getArrayFromNodeList(this.element.childNodes).filter(child => {
            return child['tagName'] && child['tagName'].toLowerCase() === 'dxp-tile';
        });
        return renderedTiles;
    }
    /** render classes for slot */
    renderColumns(noOfTiles) {
        let classes = '';
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
        classes = `${classes} full-width`;
        return classes;
    }
    /** assign width */
    setX(x) {
        const eleTileWrapper = this.base.shadowRootQuerySelector(this.element, TILE_GRID_CONTAINER);
        eleTileWrapper.style.left = `${x}px`;
        eleTileWrapper.style.transition = `left 1s`;
    }
    /** Tile calculation function */
    tileCalc() {
        const eletile = this.base.shadowRootQuerySelector(this.element, '.full-width');
        const singleWidth = eletile.getBoundingClientRect().width;
        let nooftilesEle;
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
        const gridWidth = singleWidth * nooftilesEle;
        const renderedTiles = this.getRenderedTileItems();
        const eleTileWrapper = this.base.shadowRootQuerySelector(this.element, TILE_GRID_CONTAINER);
        const containerWidth = eleTileWrapper.getBoundingClientRect().width;
        for (const i of renderedTiles) {
            i.style.width = `${singleWidth}px`;
        }
        // Calculate how many pages are necessary
        const pagesCount = Math.ceil(renderedTiles.length / (containerWidth / singleWidth));
        if (this.pageNumber <= pagesCount) {
            this.setX(this.pageNumber * gridWidth * -1);
        }
        const prevBtn = this.base.shadowRootQuerySelector(this.element, '.prev');
        if (this.pageNumber > 0) {
            // show pre button
            prevBtn.classList.remove('disable');
        }
        else {
            prevBtn.classList.add('disable');
        }
        const nextBtn = this.base.shadowRootQuerySelector(this.element, '.next');
        if (this.pageNumber === pagesCount - 1) {
            nextBtn.classList.add('disable');
        }
        else {
            nextBtn.classList.remove('disable');
        }
    }
    /** Render dxp-tile-grid */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-tile-grid render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-tile-grid.min.css` })]
        ];
        return (h("div", { class: `${this.base.componentClass()}`, dir: this.dir, "data-theme": this.theme },
            styles,
            this.tileGridEyebrowText && h("p", { class: `dxp-title-eyebrow sc-dxp-tile-grid
         ${this.headerAlignment === 'left' ? TEXT_LEFT : this.headerAlignment === 'right' ? TEXT_RIGHT : 'center'}`, innerHTML: this.tileGridEyebrowText }),
            this.tileGridTitle && h("h3", { class: this.headerAlignment === 'left' ? TEXT_LEFT : this.headerAlignment === 'right' ? TEXT_RIGHT : 'center', innerHTML: this.tileGridTitle }),
            this.tileGridDescription && h("p", { class: `description ${this.headerAlignment === 'left' ? TEXT_LEFT : this.headerAlignment === 'right' ? TEXT_RIGHT : 'center'}`, innerHTML: this.tileGridDescription }),
            h("div", { class: "dxp-tile-grid-container dxp-row" }, this.tileListData ? (this.tileListData.map(item => {
                return (h("dxp-tile", { class: "dxp-tile", "tile-caption": item['tile-caption'], "badge-text": item['badge-text'], "background-type": item['tile-type'], src: item['src'], "src-lg": item['src-lg'], "src-md": item['src-md'], "focal-point-lg": item['focal-point-lg'], "eyebrow-title": item['eyebrow-title'], "focal-point": item['focal-point'], "focal-point-md": item['focal-point-md'], "open-in-new-tab": item['open-in-new-tab'], description: item['description'], responsive: item['responsive'], "is-square": item.isSquare, href: item['href'] }, item.ctaListData && (h("dxp-cta-list", { orientation: "vertical", slot: "cta" }, item.ctaListData.ctaList.map(cta => {
                    return (h("dxp-cta", { class: cta.linkType, "link-type": cta.linkType, text: cta.text, type: cta.type, src: cta.src, "aria-label": cta.ariaLabel, href: cta.href, "open-in-new-tab": cta.openInNewTab }));
                })))));
            })) : h("slot", null)),
            h("div", { class: "cta-panel" },
                this.tileGridCta ? (h("dxp-cta-list", { orientation: "vertical" }, this.tileGridCta[0].ctaList.map(cta => {
                    return (h("dxp-cta", { text: cta.text, type: cta.type, "button-type": "secondary", src: cta.src, "aria-label": cta.ariaLabel, href: cta.href, "open-in-new-tab": cta.openInNewTab }));
                }))) : h("slot", { name: "tilegridcta" }),
                h("div", { class: "button-panel" },
                    h("button", { class: "next", onClick: () => this.changeSlide('NEXT'), "aria-label": dxp.i18n.t('TileCarousel:next') }),
                    h("button", { class: "prev disable", onClick: () => this.changeSlide('PREV'), "aria-label": dxp.i18n.t('TileCarousel:prev') })))));
    }
    static get is() { return "dxp-tile-grid"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-tile-grid.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-tile-grid.css"]
    }; }
    static get properties() { return {
        "ctaListData": {
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
                "text": "cta for tile grid"
            },
            "attribute": "cta-list-data",
            "reflect": false
        },
        "headerAlignment": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'left' | 'right' | 'center'",
                "resolved": "\"center\" | \"left\" | \"right\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "class to be applied for header alignment"
            },
            "attribute": "header-alignment",
            "reflect": false,
            "defaultValue": "'center'"
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
                "text": "href for tile component"
            },
            "attribute": "href",
            "reflect": false
        },
        "isSquare": {
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
                "text": "check if tile is square"
            },
            "attribute": "is-square",
            "reflect": false
        },
        "tileGridCta": {
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
                "text": "view all cta data for tile grid components"
            },
            "attribute": "tile-grid-cta",
            "reflect": false
        },
        "tileGridDescription": {
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
                "text": "description to be shown in the header of tile grid"
            },
            "attribute": "tile-grid-description",
            "reflect": false
        },
        "tileGridEyebrowText": {
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
                "text": "eyebrow text to be shown in the header of tile grid"
            },
            "attribute": "tile-grid-eyebrow-text",
            "reflect": false
        },
        "tileGridTitle": {
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
                "text": "Prop for the tile grid text"
            },
            "attribute": "tile-grid-title",
            "reflect": false
        },
        "tileListData": {
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
                "text": "json data for tile"
            },
            "attribute": "tile-list-data",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {},
        "tileItems": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "resize",
            "method": "handleResizeEvent",
            "target": "window",
            "capture": false,
            "passive": true
        }, {
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
