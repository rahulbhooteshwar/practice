'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-a4472c89.js');

const AccordionItem = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** checkbox to expand the accordion item description */
        this.showExpanded = false;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'Accordion-Item', messages.messages);
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
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-accordion-item render() : ${"DEVELOPMENT"}`);
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, core$1.h("div", { class: "dxp-row" }, core$1.h("div", { class: "dxp-col-12" }, core$1.h("div", { class: "accordion" }, core$1.h("div", { class: "acc-item" }, core$1.h("label", { class: "acc-label dxp-no-outline", role: "button", "aria-pressed": "false", tabindex: "0", onMouseEnter: this.onmouseenter.bind(this), onMouseLeave: this.onmouseleave.bind(this) }, core$1.h("span", { class: "item-title", innerHTML: this.itemTitle }), core$1.h("i", { class: "icon-plus" }), this.itemSubtitle && core$1.h("span", { class: "item-subtitle", innerHTML: this.itemSubtitle })), core$1.h("div", { class: "acc-content dxp-none" }, core$1.h("slot", { name: "top" }), this.itemDescription && core$1.h("p", { class: "item-description", innerHTML: this.itemDescription }), core$1.h("slot", { name: "bottom" }), core$1.h("slot", null))))))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-accordion-item ol,div.dxp.dxp-accordion-item ul{padding-left:.75rem}div.dxp.dxp-accordion-item .acc-label{display:block;cursor:pointer;position:relative;margin-bottom:0;padding:1rem 0 .875rem}div.dxp.dxp-accordion-item .acc-label .item-subtitle{cursor:pointer;position:relative;margin-bottom:0;margin-top:.375rem;display:block;line-height:1.25rem;padding-right:1.25rem}div.dxp.dxp-accordion-item .acc-label .icon-plus{width:.938rem;height:.938rem;position:absolute;right:.938rem;top:1.25rem;z-index:1}div.dxp.dxp-accordion-item .acc-label .icon-plus:after,div.dxp.dxp-accordion-item .acc-label .icon-plus:before{content:\"\";position:absolute;left:.438rem;width:.063rem;height:100%;transition:transform .25s ease-out,-webkit-transform .25s ease-out}div.dxp.dxp-accordion-item .acc-label .icon-plus:before{-webkit-transform:rotate(90deg);transform:rotate(90deg)}div.dxp.dxp-accordion-item .acc-label span{display:block;line-height:1.5rem;padding-right:2.5rem;position:relative;z-index:2}div.dxp.dxp-accordion-item .acc-label.active .icon-plus:after{-webkit-transform:rotate(90deg);transform:rotate(90deg);transition:transform .25s ease-out,-webkit-transform .25s ease-out}div.dxp.dxp-accordion-item .acc-label.active .icon-plus:before{-webkit-transform:rotate(270deg);transform:rotate(270deg);transition:transform .25s ease-out,-webkit-transform .25s ease-out}div.dxp.dxp-accordion-item .acc-label:first-child{margin-top:0}div.dxp.dxp-accordion-item .acc-bottom.active{border-bottom:none}div.dxp.dxp-accordion-item .acc-content{max-height:0;overflow:hidden;-webkit-transition:max-height .2s ease-out;-o-transition:max-height .2s ease-out;transition:max-height .2s ease-out;padding-bottom:1rem}div.dxp.dxp-accordion-item .acc-content .item-description{margin-bottom:0}\@media (min-width:576px){div.dxp.dxp-accordion-item .acc-label{padding:1.313rem 0 1.063rem}div.dxp.dxp-accordion-item .acc-label .icon-plus{width:1.063rem;height:1.063rem;position:absolute;right:.938rem;top:1.375rem}div.dxp.dxp-accordion-item .acc-label .icon-plus:after,div.dxp.dxp-accordion-item .acc-label .icon-plus:before{content:\"\";position:absolute;left:.5rem;width:.063rem;height:100%;transition:transform .25s ease-out,-webkit-transform .25s ease-out}div.dxp.dxp-accordion-item .acc-label .icon-plus:before{-webkit-transform:rotate(90deg);transform:rotate(90deg)}div.dxp.dxp-accordion-item .acc-label span{padding-right:3.25rem}div.dxp.dxp-accordion-item .acc-content{padding-bottom:1.5rem}}div.dxp.dxp-accordion-item[dir=rtl] .acc-label{padding:1rem 0 .875rem}div.dxp.dxp-accordion-item[dir=rtl] .acc-label .item-subtitle{padding-right:0;padding-left:1.25rem}div.dxp.dxp-accordion-item[dir=rtl] .acc-label .icon-plus{left:.938rem;right:auto}div.dxp.dxp-accordion-item[dir=rtl] .acc-label span{padding-right:0;padding-left:2.5rem}\@media (min-width:576px){div.dxp.dxp-accordion-item[dir=rtl] .acc-label{padding:1.313rem 0 1.063rem}div.dxp.dxp-accordion-item[dir=rtl] .acc-label .icon-plus{left:.938rem;right:auto}div.dxp.dxp-accordion-item[dir=rtl] .acc-label span{padding-left:3.25rem}}"; }
};

exports.dxp_accordion_item = AccordionItem;
