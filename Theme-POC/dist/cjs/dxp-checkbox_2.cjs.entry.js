'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');
const messages = require('./messages-e49f982c.js');

const Checkbox = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** set alignment */
        this.alignment = 'horizontal';
        /** validation message */
        this.validationMessage = 'Please select required fields';
        this.checkboxData = core$1.createEvent(this, "checkboxData", 7);
        this.validationEvent = core$1.createEvent(this, "validationEvent", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        if (!this.checkboxId) {
            const randomNumber = Math.floor(Math.random() * 100);
            this.checkboxId = `'dxp-checkbox-'${randomNumber}`; // generating unique checkbox id
        }
    }
    /** lifecycle hook */
    componentDidLoad() {
        const rteText = this.required ? `<span class="dxp-required">* </span><b>${this.name}</b>` : `${this.name}`;
        this.element.querySelector('label') ? this.element.querySelector('label').innerHTML = rteText : this.element.querySelector('label').innerHTML = rteText;
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Emit the checkbox value on selection the checkbox */
    async emitData(target) {
        const obj = { 'name': target.name, 'value': target.value, 'isChecked': target.checked, 'id': this.checkboxId };
        this.checkboxData.emit(obj);
        core$1.dxp.log.info(this.element.tagName, 'emitData()', obj);
        // add or remove checkbox-error class if checkbox is required
        if (this.required) {
            if (target.checked === false) {
                const parent = this.element.querySelector('.checkbox-item');
                const p = document.createElement('p');
                p.className = 'dxp-error error-message sc-dxp-checkbox-group';
                const txtNode = document.createTextNode(this.validationMessage);
                p.appendChild(txtNode);
                parent.appendChild(p);
                target.nextElementSibling.classList.add('checkbox-error');
                this.isValid = false;
            }
            else {
                target.nextElementSibling.classList.remove('checkbox-error');
                this.isValid = true;
                const errorMessage = this.element.querySelector('.dxp-error');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        }
    }
    /** this reSet method is for the parent hosting element to reset the dxp-checkbox to unchecked status */
    async reset() {
        this.checkboxElement.checked = false;
    }
    /** setChecked method is for other element to check or uncheck this dxp-checkbox */
    async setChecked(isChecked) {
        this.checkboxElement.checked = isChecked;
    }
    /** Responsible for emitting an event to show error message appropriately (horizontal, vertical) */
    sendFlagToParent() {
        this.validationEvent.emit({ flag: this.isValid, message: this.validationMessage });
    }
    /** Render the checkbox */
    render() {
        core$1.dxp.log.debug(this.element.tagName, 'render()', `in dxp-checkbox render() : ${"DEVELOPMENT"}`);
        const styles = [
            core$1.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core$1.h("link", { rel: "stylesheet", href: `${core$1.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-checkbox.min.css` })]
        ];
        return (core$1.h("div", { dir: this.dir, class: `${this.base.componentClass()} checkbox-item  ${this.alignment}`, "data-theme": this.theme }, styles, core$1.h("input", { ref: element => this.checkboxElement = element, type: "checkbox", name: this.name, id: this.checkboxId, "aria-describedby": this.isValid ? 'error-message' : undefined, onChange: ev => this.emitData(ev.target), class: "checkbox", value: this.value, checked: this.checked, disabled: this.disabled }), core$1.h("label", { htmlFor: this.checkboxId, class: this.disabled ? 'dxp-disabled' : '' }, this.required ? core$1.h("span", { class: "dxp-required" }, "* ") : '', this.name, "\u200E"), this.required ? this.alignment === 'horizontal' ? this.sendFlagToParent() :
            this.isValid ? core$1.h("p", { class: "dxp-error", id: "errMsg" }, this.validationMessage) : '' : undefined));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-checkbox{position:relative}div.dxp.dxp-checkbox.horizontal{display:inline-block;margin-right:.625rem}div.dxp.dxp-checkbox .checkbox-txt{margin-bottom:1.25rem}div.dxp.dxp-checkbox.vertical .select-all+label{left:1.625rem}div.dxp.dxp-checkbox.vertical input[type=checkbox]+label .dxp-required{display:inline-block}div.dxp.dxp-checkbox.vertical .dxp-error{padding-left:2.5rem}div.dxp.dxp-checkbox input[type=checkbox]{opacity:0;position:absolute;top:.375rem}div.dxp.dxp-checkbox input[type=checkbox]+label{padding-left:1.5rem;position:relative}div.dxp.dxp-checkbox input[type=checkbox]+label:before{content:\"\";display:inline-block;width:1rem;height:1rem;top:.0625rem;position:absolute;left:0;cursor:pointer}div.dxp.dxp-checkbox[dir=rtl].horizontal,div.dxp.dxp-checkbox[dir=rtl].horizontal .checkbox-item{margin-right:0;margin-left:.625rem}div.dxp.dxp-checkbox[dir=rtl].vertical+label{left:inherit;right:1.625rem}div.dxp.dxp-checkbox[dir=rtl] input[type=checkbox]+label{padding-left:0;padding-right:1.5rem}div.dxp.dxp-checkbox[dir=rtl] input[type=checkbox]+label:before{left:inherit;right:0}"; }
};

const FacetedFilterItem = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** checkbox to expand the filter item description */
        this.isSubCategory = false;
        /** checkbox to expand the filter item description */
        this.showExpanded = false;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core$1.dxp);
        this.base.i18Init(core$1.dxp, 'Faceted-Filter-Item', messages.messages);
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
        core$1.dxp.log.debug(`in dxp-faceted-filter-item render() : ${"DEVELOPMENT"}`);
        return (core$1.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, core$1.h("link", { rel: "stylesheet", href: `` }), this.theme && core$1.h("link", { rel: "stylesheet", href: `` }), core$1.h("div", { class: "dxp-row" }, core$1.h("div", { class: "dxp-col-12" }, core$1.h("div", { class: "faceted-filter" }, core$1.h("div", { class: "filter-item" }, core$1.h("label", { class: `filter-label no-outline ${this.isSubCategory === true ? 'sub-category' : ''}`, role: "button", "aria-pressed": "false", tabindex: "0", onMouseEnter: this.onmouseenter.bind(this), onMouseLeave: this.onmouseleave.bind(this) }, core$1.h("span", { class: "item-title" }), this.itemSubtitle && core$1.h("span", { class: "item-subtitle" })), core$1.h("div", { class: "filter-content dxp-none" }, core$1.h("slot", { name: "top" }), this.itemDescription && core$1.h("p", { class: "item-description" }), core$1.h("slot", { name: "bottom" }), core$1.h("slot", null))))))));
    }
    get element() { return core$1.getElement(this); }
    static get style() { return "div.dxp.dxp-faceted-filter-item ol,div.dxp.dxp-faceted-filter-item ul{padding-left:.75rem}div.dxp.dxp-faceted-filter-item .filter-label,div.dxp.dxp-faceted-filter-item .filter-label .item-subtitle{display:block;cursor:pointer;position:relative;margin-bottom:0}div.dxp.dxp-faceted-filter-item .filter-label .item-subtitle{margin-top:.625rem;line-height:1.25rem;padding-right:1.25rem}div.dxp.dxp-faceted-filter-item .filter-label span{display:block;line-height:1.5rem;padding-right:1.25rem}div.dxp.dxp-faceted-filter-item .filter-label.active.filter-hover:before,div.dxp.dxp-faceted-filter-item .filter-label.active:before{-webkit-transform:rotate(90deg);transform:rotate(90deg);top:1.25rem;width:.09375rem}div.dxp.dxp-faceted-filter-item .filter-label.active.filter-hover:after,div.dxp.dxp-faceted-filter-item .filter-label.active:after{-webkit-transform:rotate(180deg);transform:rotate(180deg);top:1.84375rem;height:.09375rem}div.dxp.dxp-faceted-filter-item .filter-label:first-child{margin-top:0}div.dxp.dxp-faceted-filter-item .filter-label:after,div.dxp.dxp-faceted-filter-item .filter-label:before{content:\"\";position:absolute;-webkit-transition:-webkit-transform .25s ease-out;transition:-webkit-transform .25s ease-out;transition:transform .25s ease-out;transition:transform .25s ease-out,-webkit-transform .25s ease-out}div.dxp.dxp-faceted-filter-item .filter-label:before{top:1.5rem;right:1.9375rem;width:.125rem;height:1rem;margin-left:-.125rem}div.dxp.dxp-faceted-filter-item .filter-label:after{top:2.085rem;right:1.5rem;width:1rem;height:.09375rem;margin-top:-.125rem}div.dxp.dxp-faceted-filter-item .filter-bottom:after{top:2.085rem;right:1.5rem;width:1rem;height:.125rem;margin-top:-.125rem}div.dxp.dxp-faceted-filter-item .filter-bottom.active{border-bottom:none}div.dxp.dxp-faceted-filter-item .filter-content{max-height:0;overflow:hidden;-webkit-transition:max-height .2s ease-out;-o-transition:max-height .2s ease-out;transition:max-height .2s ease-out}div.dxp.dxp-faceted-filter-item[dir=rtl] .filter-label{padding:2rem 0}div.dxp.dxp-faceted-filter-item[dir=rtl] .filter-label:after{left:.375rem;right:auto}div.dxp.dxp-faceted-filter-item[dir=rtl] .filter-label:before{left:.96875rem;right:auto}div.dxp.dxp-faceted-filter-item[dir=rtl] .filter-label span{padding-left:2.5rem;padding-right:0}\@media (min-width:992px){div.dxp.dxp-faceted-filter-item .filter-label{padding:1rem 6.5rem 1rem 0}div.dxp.dxp-faceted-filter-item .filter-top{margin-top:.4375rem}div.dxp.dxp-faceted-filter-item .filter-item-select{margin-bottom:2.5rem}div.dxp.dxp-faceted-filter-item .filter-content p{padding:.5rem 1.85rem .5rem 0;margin-bottom:0}}\@media (max-width:575.9px){div.dxp.dxp-faceted-filter-item .filter-top{margin-top:1rem}div.dxp.dxp-faceted-filter-item .filter-label{padding:2rem 3.5rem 2rem 0;margin-bottom:0}div.dxp.dxp-faceted-filter-item .filter-label.active+div{padding-bottom:1rem}div.dxp.dxp-faceted-filter-item .filter-label:after{right:1.5rem}div.dxp.dxp-faceted-filter-item .filter-content{padding:0}}"; }
};

exports.dxp_checkbox = Checkbox;
exports.dxp_faceted_filter_item = FacetedFilterItem;
