import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-4cd0c3dc.js';
var ACCORDION_CONTENT_CLASS = '.acc-content';
var ACCORDION_ITEM = 'dxp-accordion-item';
var ACCORDION_LABEL_CLASS = '.acc-label';
var ACC_ITEM_SELECT = 'acc-item-select';
var Accordion = /** @class */ (function () {
    function Accordion(hostRef) {
        registerInstance(this, hostRef);
        /** holds the child element count */
        this.childElementCount = 0;
        /** sets the accordion heading */
        this.heading = '';
        /** sets whether header is required */
        this.isHeaderRequired = true;
    }
    /** Listener that looks for accordion items object to be assigned/changed externally */
    Accordion.prototype.accordionChangeHandler = function () {
        this.base.createNestedMarkup(this.accItemContainer, 'dxp-accordion', this.items);
    };
    /** actions to be performed prior to component loading */
    Accordion.prototype.componentWillLoad = function () {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Accordion', messages);
        if (this.items && typeof this.items === 'string') {
            this.items = JSON.parse(this.items);
        }
    };
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    Accordion.prototype.componentDidLoad = function () {
        if (this.items) {
            var expandAll = this.element.querySelectorAll('.expand-all');
            var collapseAll = this.element.querySelectorAll('.collapse-all');
            this.expandAndCollapse(this.element, expandAll, collapseAll);
        }
        var shadowEle = this.element.querySelectorAll(ACCORDION_ITEM) && this.element.querySelectorAll(ACCORDION_ITEM).length;
        var childElement = shadowEle ? this.element.querySelectorAll(ACCORDION_ITEM) : this.element.querySelectorAll(ACCORDION_ITEM);
        // to get the last child of accordion and add class to it
        var lastChild = childElement[childElement.length - 1];
        if (lastChild && lastChild) {
            lastChild.querySelector(ACCORDION_LABEL_CLASS).classList.add('acc-bottom');
        }
        if (childElement && childElement.length > 0) {
            this.childElementCount = childElement.length;
        }
    };
    /** action to be performed when state variable gets updates */
    Accordion.prototype.componentDidUpdate = function () {
        var expandAll = this.element.querySelectorAll('.expand-all');
        var collapseAll = this.element.querySelectorAll('.collapse-all');
        this.expandAndCollapse(this.element, expandAll, collapseAll);
    };
    /** action to be perform on keyup event */
    Accordion.prototype.expandCollapse = function (e) {
        var accLabelArray = this.getElementsByClass(ACCORDION_LABEL_CLASS);
        var accLabel = Array.prototype.slice.call(accLabelArray);
        var accContent;
        var activeElement;
        var currentAccLabel;
        var defaultPrevent = [32, 38, 40];
        var keyCode = e.keyCode;
        activeElement = e.target ? e.target.activeElement : e.target;
        /** This prevents the page scrolling when space bar or arrows keys use to navigate the menu items */
        if (defaultPrevent.indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
        if (keyCode === 9) {
            activeElement.classList.remove('dxp-no-outline');
        }
        accContent = this.getElementsByClass(ACCORDION_CONTENT_CLASS);
        currentAccLabel = this.getElementsByClass(ACCORDION_LABEL_CLASS);
        // expand all child elements
        if (activeElement.classList.contains('expand-all') && (keyCode === 32 || keyCode === 13)) {
            for (var i = 0; i < currentAccLabel.length; i++) {
                currentAccLabel[i].classList.add('active');
                currentAccLabel[i].parentElement.classList.add(ACC_ITEM_SELECT);
                accContent[i].classList.remove('dxp-none');
                accContent[i].style.maxHeight = accContent[i].scrollHeight + accContent[i].offsetHeight + "px";
            }
        }
        if (activeElement.classList.contains('collapse-all') && (keyCode === 32 || keyCode === 13)) {
            this.collapseAll(accLabel, currentAccLabel, accContent);
        }
    };
    /**
     * click listener for routing events on anchor tag
     */
    Accordion.prototype.routingHandler = function (event) {
        this.base.routingEventListener(event);
    };
    /** collapse all on keyup */
    Accordion.prototype.collapseAll = function (accLabel, currentAccLabel, accContent) {
        for (var i = 0; i < accLabel.length; i++) {
            accLabel[i].classList.remove('active');
            if (accContent[i]) {
                accContent[i].removeAttribute('style');
                currentAccLabel[i].parentElement.classList.remove(ACC_ITEM_SELECT);
                currentAccLabel[i].classList.remove('active');
                accContent[i].classList.add('dxp-none');
            }
        }
    };
    /** This function is responsible for attaching click listener and adding/removing relevant class */
    Accordion.prototype.expandAndCollapse = function (element, expandAll, collapseAll) {
        var _this = this;
        var accContent;
        var accLabels;
        if (element && element.querySelectorAll('.toggle')) {
            // Get all expandAll buttons
            for (var i = 0; i < expandAll.length; i++) {
                expandAll[i].addEventListener('click', function () {
                    accContent = _this.getElementsByClass(ACCORDION_CONTENT_CLASS);
                    accLabels = _this.getElementsByClass(ACCORDION_LABEL_CLASS);
                    for (var j = 0; j < accContent.length; j += 1) {
                        accLabels[j].parentElement.classList.add(ACC_ITEM_SELECT);
                        accLabels[j].classList.add('active');
                        accContent[j].classList.remove('dxp-none');
                        accContent[j].style.maxHeight = accContent[j].scrollHeight + accContent[j].offsetHeight + "px";
                    }
                });
                collapseAll[i].addEventListener('click', function () {
                    accContent = _this.getElementsByClass(ACCORDION_CONTENT_CLASS);
                    accLabels = _this.getElementsByClass(ACCORDION_LABEL_CLASS);
                    for (var j = 0; j < accContent.length; j += 1) {
                        accLabels[j].parentElement.classList.remove(ACC_ITEM_SELECT);
                        accLabels[j].classList.remove('active');
                        accContent[j].removeAttribute('style');
                        accContent[j].classList.remove('acc-top');
                        accContent[j].classList.add('dxp-none');
                    }
                });
            }
        }
    };
    /** private method checks for slot or items array and accordingly fetch the accordion-item element by class name */
    Accordion.prototype.getElementsByClass = function (cssClassName) {
        var elements = new Array();
        var slot = this.element.querySelector('slot');
        if (slot) {
            slot.assignedNodes().filter(function (node) {
                if (node.nodeName !== '#text') {
                    var accordionItemElm = node.querySelector(cssClassName);
                    elements.push(accordionItemElm);
                }
            });
        }
        else {
            var accordionItems = this.element.querySelectorAll(ACCORDION_ITEM);
            for (var _i = 0, accordionItems_1 = accordionItems; _i < accordionItems_1.length; _i++) {
                var item = accordionItems_1[_i];
                elements.push(item.querySelector(cssClassName));
            }
        }
        return elements;
    };
    /** Render the accordion */
    Accordion.prototype.render = function () {
        var _this = this;
        dxp.log.debug(this.element.tagName, 'render()', "in dxp-accordion render() : " + "DEVELOPMENT");
        var styles = [
            h("link", { rel: "stylesheet", href: "" }),
            [h("link", { rel: "stylesheet", href: dxp.config.get('DXP_STYLE_BASE_URL') + "/themes/" + this.theme + "/dxp-accordion.min.css" })],
            [this.theme && h("link", { rel: "stylesheet", href: "" })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "toggle" }, h("div", { class: "dxp-row" }, this.isHeaderRequired &&
            h("div", { class: "dxp-col-12" }, h("p", { class: "title-wrapper" }, h("span", { class: "dxp-text-eyebrow dxp-col-sm-6 dxp-col-12" }, this.heading), ((this.childElementCount > 1) || (this.items && this.items.length > 1)) ?
                h("span", { class: "dxp-col-sm-6 dxp-col-12" }, h("span", { tabindex: "0", class: "expand-all dxp-no-outline", role: "button" }, dxp.i18n.t('Accordion:expandAll')), h("span", { class: "pipe-separator" }), h("span", { tabindex: "0", class: "collapse-all dxp-no-outline", role: "button" }, dxp.i18n.t('Accordion:collapseAll'))) : ''))), this.items ? this.items.map(function (item) {
            return (h("dxp-accordion-item", { "item-title": item.title, "item-subtitle": item.subtitle, "item-description": item.description, "show-expanded": item.showExpanded }));
        }) :
            h("div", { ref: function (el) { return _this.accItemContainer = el; } }, h("slot", null)))));
    };
    Object.defineProperty(Accordion.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion, "watchers", {
        get: function () {
            return {
                "items": ["accordionChangeHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Accordion, "style", {
        get: function () { return "div.dxp.dxp-accordion dxp-accordion-item{display:block;width:100%}div.dxp.dxp-accordion .toggle .title-wrapper{padding-bottom:1.5rem;margin-bottom:2rem;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}div.dxp.dxp-accordion .toggle .title-wrapper>span{padding:0}div.dxp.dxp-accordion .toggle .title-wrapper>span:last-child{text-align:right}div.dxp.dxp-accordion .toggle .title-wrapper>span:only-child{text-align:left}div.dxp.dxp-accordion .toggle .expand-all{cursor:pointer}div.dxp.dxp-accordion .toggle .collapse-all{cursor:pointer;margin-left:.5625rem}div.dxp.dxp-accordion .pipe-separator:after{content:\"|\";padding-left:.75rem}\@media (max-width:575px){div.dxp.dxp-accordion .toggle .title-wrapper{border:none;margin-bottom:1rem}div.dxp.dxp-accordion .toggle .title-wrapper>span:first-child{padding-bottom:2rem}}div.dxp.dxp-accordion[dir=rtl] .toggle .title-wrapper>span:last-child{text-align:left}div.dxp.dxp-accordion[dir=rtl] .toggle .title-wrapper>span:only-child{text-align:right}"; },
        enumerable: true,
        configurable: true
    });
    return Accordion;
}());
export { Accordion as dxp_accordion };
