import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-faceted-filter-item */
export class FacetedFilterItem {
    constructor() {
        /** checkbox to expand the filter item description */
        this.isSubCategory = false;
        /** checkbox to expand the filter item description */
        this.showExpanded = false;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Faceted-Filter-Item', messages);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        const filterLabelArray = this.element.querySelectorAll('.filter-item');
        // For supporting RTE, this code will work fine for the normal text too
        this.element.querySelector('.item-title').innerHTML = `${this.itemTitle}&lrm;`;
        if (this.itemSubtitle) {
            this.element.querySelector('.item-subtitle').innerHTML = `${this.itemSubtitle}&lrm;`;
        }
        if (this.itemDescription) {
            this.element.querySelector('.item-description').innerHTML = `${this.itemDescription}&lrm;`;
        }
        const filterLabel = Array.prototype.slice.call(filterLabelArray);
        this.expandAndCollapse(this.element, filterLabel);
        if (this.showExpanded) {
            const expandItem = this.element.querySelector('.item-title');
            expandItem.click();
        }
    }
    /** expand and collapse */
    expandCollapse(e) {
        const keyCode = e.keyCode;
        const defaultPrevent = [32, 38, 40];
        const activeElement = e.target ? e.target.activeElement : e.target;
        if (defaultPrevent.indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
        if (keyCode === 9) {
            e.target.classList.remove('dxp-no-outline');
        }
        if ((keyCode === 13 || keyCode === 32) && activeElement.classList.contains('filter-label')) {
            this.toggleList(activeElement);
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Attaching click listener to the block for expanding and collapsing action */
    expandAndCollapse(element, filterLabel) {
        // toggle component script
        if (element) {
            filterLabel.forEach(ele => {
                ele.addEventListener('click', e => {
                    // toggle only for the elements which are in the title label
                    const targetElementsList = e.target.classList.contains('item-title') || e.target.classList.contains('item-subtitle')
                        || e.target.classList.contains('filter-label') || e.target.parentElement.classList.contains('item-title');
                    if (targetElementsList) {
                        this.toggleList(e.target);
                    }
                }, true);
            });
        }
        else {
            return undefined;
        }
    }
    /** get parent element of any dom element */
    getParentOfClass(el, cls) {
        let parent = el.parentElement;
        if (parent) {
            while (parent && !parent.classList.contains(cls)) {
                parent = parent.parentElement;
            }
            return parent;
        }
        return false;
    }
    /** handle mouse enter */
    onmouseenter() {
        const labelEle = this.element.querySelectorAll('label')[0];
        labelEle.classList.add('filter-hover');
    }
    /** handle mouse leave */
    onmouseleave() {
        const labelEle = this.element.querySelectorAll('label')[0];
        labelEle.classList.remove('filter-hover');
    }
    /** toggle list */
    toggleList(target) {
        const parent = this.getParentOfClass(target, 'faceted-filter');
        const filterContent = parent.querySelector('.filter-content');
        const label = parent.querySelector('.filter-label');
        label.classList.toggle('active');
        label.classList.add('dxp-no-outline');
        if (filterContent.style.maxHeight) {
            filterContent.removeAttribute('style');
            filterContent.parentElement.classList.remove('filter-item-select');
            filterContent.classList.remove('filter-top');
            filterContent.classList.add('dxp-none');
            label.setAttribute('aria-pressed', 'false');
        }
        else {
            filterContent.parentElement.classList.add('filter-item-select');
            filterContent.classList.add('filter-top');
            filterContent.classList.remove('dxp-none');
            label.setAttribute('aria-pressed', 'true');
            filterContent.style.maxHeight = `${filterContent.scrollHeight}${filterContent.offsetHeight}px`;
        }
    }
    /** render dxp-faceted-filter item(s) */
    render() {
        dxp.log.debug(`in dxp-faceted-filter-item render() : ${process.env.MODE}`);
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            h("link", { rel: "stylesheet", href: `` }),
            this.theme && h("link", { rel: "stylesheet", href: `` }),
            h("div", { class: "dxp-row" },
                h("div", { class: "dxp-col-12" },
                    h("div", { class: "faceted-filter" },
                        h("div", { class: "filter-item" },
                            h("label", { class: `filter-label no-outline ${this.isSubCategory === true ? 'sub-category' : ''}`, role: "button", "aria-pressed": "false", tabindex: "0", onMouseEnter: this.onmouseenter.bind(this), onMouseLeave: this.onmouseleave.bind(this) },
                                h("span", { class: "item-title" }),
                                this.itemSubtitle && h("span", { class: "item-subtitle" })),
                            h("div", { class: "filter-content dxp-none" },
                                h("slot", { name: "top" }),
                                this.itemDescription && h("p", { class: "item-description" }),
                                h("slot", { name: "bottom" }),
                                h("slot", null))))))));
    }
    static get is() { return "dxp-faceted-filter-item"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-faceted-filter-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-faceted-filter-item.css"]
    }; }
    static get properties() { return {
        "isSubCategory": {
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
                "text": "checkbox to expand the filter item description"
            },
            "attribute": "is-sub-category",
            "reflect": false,
            "defaultValue": "false"
        },
        "itemDescription": {
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
                "text": "sets the description"
            },
            "attribute": "item-description",
            "reflect": false
        },
        "itemSubtitle": {
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
                "text": "sets the sub-title"
            },
            "attribute": "item-subtitle",
            "reflect": false
        },
        "itemTitle": {
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
                "text": "sets the title"
            },
            "attribute": "item-title",
            "reflect": false
        },
        "showExpanded": {
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
                "text": "checkbox to expand the filter item description"
            },
            "attribute": "show-expanded",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
    static get states() { return {
        "dir": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "keyup",
            "method": "expandCollapse",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
