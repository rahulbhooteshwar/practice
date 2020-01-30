import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-accordion-item */
export class AccordionItem {
    constructor() {
        /** checkbox to expand the accordion item description */
        this.showExpanded = false;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Accordion-Item', messages);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        const accLabelArray = this.element.querySelectorAll('.acc-item');
        // For supporting RTE, this code will work fine for the normal text too
        this.itemTitle = `${this.itemTitle}&lrm;`;
        if (this.itemSubtitle) {
            this.itemSubtitle = `${this.itemSubtitle}&lrm;`;
        }
        if (this.itemDescription) {
            this.itemDescription = `${this.itemDescription}&lrm;`;
        }
        const accLabel = Array.prototype.slice.call(accLabelArray);
        this.expandAndCollapse(this.element, accLabel);
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
        if ((keyCode === 13 || keyCode === 32) && activeElement.classList.contains('acc-label')) {
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
    expandAndCollapse(element, accLabel) {
        // toggle component script
        if (element) {
            accLabel.forEach(ele => {
                ele.addEventListener('click', e => {
                    // toggle only for the elements which are in the title label
                    const targetElementsList = e.target.classList.contains('item-title') || e.target.classList.contains('item-subtitle')
                        || e.target.classList.contains('acc-label') || e.target.parentElement.classList.contains('item-title');
                    if (targetElementsList) {
                        this.toggleList(e.target);
                    }
                }, true);
            });
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
        labelEle.classList.add('acc-hover');
    }
    /** handle mouse leave */
    onmouseleave() {
        const labelEle = this.element.querySelectorAll('label')[0];
        labelEle.classList.remove('acc-hover');
    }
    /** toggle list */
    toggleList(target) {
        const parent = this.getParentOfClass(target, 'accordion');
        const accContent = parent.querySelector('.acc-content');
        const label = parent.querySelector('.acc-label');
        label.classList.toggle('active');
        label.classList.add('dxp-no-outline');
        if (accContent.style.maxHeight) {
            accContent.removeAttribute('style');
            accContent.parentElement.classList.remove('acc-item-select');
            accContent.classList.remove('acc-top');
            accContent.classList.add('dxp-none');
            label.setAttribute('aria-pressed', 'false');
        }
        else {
            accContent.parentElement.classList.add('acc-item-select');
            accContent.classList.add('acc-top');
            accContent.classList.remove('dxp-none');
            label.setAttribute('aria-pressed', 'true');
            accContent.style.maxHeight = `${accContent.scrollHeight + accContent.offsetHeight}px`;
        }
    }
    /** render dxp-accordion item(s) */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-accordion-item render() : ${process.env.MODE}`);
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            h("div", { class: "dxp-row" },
                h("div", { class: "dxp-col-12" },
                    h("div", { class: "accordion" },
                        h("div", { class: "acc-item" },
                            h("label", { class: "acc-label dxp-no-outline", role: "button", "aria-pressed": "false", tabindex: "0", onMouseEnter: this.onmouseenter.bind(this), onMouseLeave: this.onmouseleave.bind(this) },
                                h("span", { class: "item-title", innerHTML: this.itemTitle }),
                                h("i", { class: "icon-plus" }),
                                this.itemSubtitle && h("span", { class: "item-subtitle", innerHTML: this.itemSubtitle })),
                            h("div", { class: "acc-content dxp-none" },
                                h("slot", { name: "top" }),
                                this.itemDescription && h("p", { class: "item-description", innerHTML: this.itemDescription }),
                                h("slot", { name: "bottom" }),
                                h("slot", null))))))));
    }
    static get is() { return "dxp-accordion-item"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-accordion-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-accordion-item.css"]
    }; }
    static get properties() { return {
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
                "text": "checkbox to expand the accordion item description"
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
