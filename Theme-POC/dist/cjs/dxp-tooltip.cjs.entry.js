'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-ad292530.js');
const baseComponent_esm = require('./base-component.esm-1dd4e54c.js');

const SHOW_TOOLTIP = 'dxp-show-tooltip';
const SLOT_TOOLTIP_CONTENT = '[slot="tooltip-content"]';
const HIDE_TOOLTIP = 'dxp-hide-tooltip';
const INSIDE_SHADOW = 'inside-shadow';
const SELECTOR_ID = 'selector-id';
const Tooltip = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        /** placement of tooltip */
        this.placement = 'bottom';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new baseComponent_esm.BaseComponent(this, core.dxp);
    }
    /** actions to be performed prior to component loading */
    async componentDidLoad() {
        await this.createTooltip();
    }
    /** actions to be performed after component is updated */
    async componentDidUpdate() {
        await this.createTooltip();
    }
    /** actions to be performed after component is unloaded */
    async componentDidUnload() {
        await this.destroyTooltip();
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Create tooltip */
    async createTooltip() {
        const currentElement = this.element ? this.element : this.element;
        // Bind Selector events
        let selectorElement = document.getElementById(this.element.getAttribute(SELECTOR_ID));
        if (this.element.hasAttribute(INSIDE_SHADOW) && selectorElement === null) {
            // find selector element in parent shadow dom
            const parent = this.element.parentElement;
            selectorElement = parent.querySelector(`#${this.element.getAttribute(SELECTOR_ID)}`);
        }
        if (selectorElement && this.trigger) {
            const triggerArray = this.trigger.split(',');
            for (const eventName of triggerArray) {
                selectorElement.addEventListener(eventName.trim(), this.eventHandler);
            }
        }
        // Create dynamic tooltip
        if (selectorElement && document.getElementById(`tooltip-${selectorElement.id}`)) {
            await this.destroyTooltip();
        }
        /** Create outer Div -tooltip container */
        const iDiv = document.createElement('div');
        iDiv.id = `tooltip-${selectorElement.id}`;
        iDiv.className += [this.base.componentClass(), 'tool-tip', this.placement, HIDE_TOOLTIP].join(' ');
        iDiv.setAttribute('dir', this.dir);
        iDiv.setAttribute('data-theme', this.theme);
        iDiv.setAttribute('placement', this.placement);
        iDiv.setAttribute('role', 'tooltip');
        iDiv.setAttribute('aria-hidden', 'true');
        if (this.element.hasAttribute(INSIDE_SHADOW)) {
            iDiv.setAttribute(INSIDE_SHADOW, `${this.element.hasAttribute(INSIDE_SHADOW)}`);
        }
        const toolTipContainer = document.createElement('div');
        toolTipContainer.id = `tooltip-container-${selectorElement.id}`;
        toolTipContainer.className += ['dxp-tooltip-container'].join(' ');
        toolTipContainer.setAttribute('dir', this.dir);
        const arrow = document.createElement('div');
        arrow.id = `tooltip-arrow-'${selectorElement.id}`;
        arrow.className += ['arrow', 'shadow', this.placement].join(' ');
        iDiv.appendChild(arrow);
        this.setTooltipHeader(selectorElement, toolTipContainer);
        const toolTipcontent = document.createElement('div');
        toolTipcontent.id = `tooltip-content-${selectorElement.id}`;
        toolTipcontent.className += ['tooltip-content'].join(' ');
        toolTipcontent.setAttribute('dir', this.dir);
        toolTipcontent.setAttribute('placement', this.placement);
        // Find Content in slot
        if (this.content) {
            // copy inner html
            const contentData = currentElement.querySelector('.tooltip-content').innerHTML;
            toolTipcontent.innerHTML = contentData;
            toolTipContainer.appendChild(toolTipcontent);
        }
        else {
            // Find and copy Slot content
            const contentSlot = this.element.querySelector(SLOT_TOOLTIP_CONTENT) ?
                this.element.querySelector(SLOT_TOOLTIP_CONTENT).cloneNode(true)
                :
                    undefined; // don't use current Element
            if (contentSlot) {
                toolTipcontent.appendChild(contentSlot);
                toolTipContainer.appendChild(toolTipcontent);
            }
        }
        const linkTheme = document.createElement('link');
        linkTheme.rel = 'stylesheet';
        linkTheme.type = 'text/css';
        linkTheme.href = ``;
        iDiv.appendChild(linkTheme);
        linkTheme.href = `${core.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-tooltip.min.css`;
        iDiv.appendChild(linkTheme);
        iDiv.appendChild(toolTipContainer);
        let offsetParent = this.getOffsetParent(selectorElement);
        if (offsetParent === null) {
            offsetParent = selectorElement.ownerDocument.getElementById('body')[0];
            // document.getElementsByTagName('body')[0].appendChild(iDiv) // For Future reference
        }
        // append vTooltip to offset parent to calculate correct position
        offsetParent.appendChild(iDiv);
        // Hide tooltip element's content
        if (!currentElement.querySelector('.dxp-tooltip-container').classList.contains(HIDE_TOOLTIP)) {
            currentElement.querySelector('.dxp-tooltip-container').classList.add(HIDE_TOOLTIP);
        }
    }
    /** Set tooltip header */
    setTooltipHeader(selectorElement, toolTipContainer) {
        const currentElement = this.element ? this.element : this.element;
        const toolTipHeader = document.createElement('div');
        toolTipHeader.id = `tooltip-container-${selectorElement.id}`;
        toolTipHeader.className += ['tooltip-header'].join(' ');
        toolTipHeader.setAttribute('dir', this.dir);
        // Find Header Content in slot
        if (this.tooltipTitle) {
            // copy inner html
            const headerData = currentElement.querySelector('.tooltip-header').innerHTML;
            toolTipHeader.innerHTML = headerData;
            toolTipContainer.appendChild(toolTipHeader);
        }
        else {
            // Find and copy Slot content
            const headerSlot = this.element.querySelector('[slot="tooltip-title"]') ?
                this.element.querySelector('[slot="tooltip-title"]').cloneNode(true)
                :
                    undefined; // don't use current Element
            if (headerSlot) {
                toolTipHeader.appendChild(headerSlot);
                toolTipContainer.appendChild(toolTipHeader);
            }
        }
    }
    /** Destroy tooltip */
    async destroyTooltip() {
        const vTooltipId = `tooltip-${this.element.getAttribute(SELECTOR_ID)}`;
        const vToolTip = document.getElementById(vTooltipId);
        vToolTip.parentNode.removeChild(vToolTip);
    }
    /** Method to open modal */
    async hideTooltip() {
        this.actionEventHandler();
    }
    /** Method to open modal */
    async showTooltip() {
        this.actionEventHandler();
    }
    /** Method to open modal */
    async toggleTooltip() {
        this.actionEventHandler();
    }
    /** call event handler on action */
    actionEventHandler() {
        const selectorElement = document.getElementById(this.element.getAttribute(SELECTOR_ID));
        const event = {
            'target': selectorElement
        };
        this.eventHandler(event);
    }
    /** Click Handler */
    eventHandler(event) {
        const selectorEl = event.target;
        const vTooltipId = `tooltip-${selectorEl.id}`;
        if (!selectorEl.id) {
            return;
        } // return if selector Id is not found
        const vToolTip = document.getElementById(vTooltipId);
        let toolTip = document.querySelector(`[selector-id=${selectorEl.id}]`);
        if (vToolTip && vToolTip.hasAttribute(INSIDE_SHADOW) && toolTip === null) {
            toolTip = selectorEl.parentElement.querySelector(`[selector-id=${selectorEl.id}]`);
        }
        if (vToolTip.classList.contains(SHOW_TOOLTIP)) {
            // copy back tooltip content to slot
            selectorEl.removeAttribute('aria-describedby', vTooltipId);
            const vTooltipContent = vToolTip.querySelector(SLOT_TOOLTIP_CONTENT);
            if (vTooltipContent) {
                // tslint:disable-next-lines
                const toolTipContent = toolTip.querySelector(SLOT_TOOLTIP_CONTENT);
                // replace element
                if (toolTipContent) {
                    toolTipContent.parentNode.replaceChild(vTooltipContent.cloneNode(true), toolTipContent);
                }
            }
            vToolTip.classList.remove(SHOW_TOOLTIP);
            vToolTip.classList.add(HIDE_TOOLTIP);
            vToolTip.removeAttribute('style');
        }
        else {
            /* tslint:disable */
            vToolTip.classList.remove(HIDE_TOOLTIP); // IMP To calculate and get offsetHeight/width
            const placement = vToolTip.getAttribute('placement') === null ? 'right' : vToolTip.getAttribute('placement');
            // Set top and left to 0,0
            // compute centerX and centerY to calculate transform params
            let translateX;
            let translateY;
            const translateZ = 100; // 3-D
            const offsetValue = 10;
            let arrowStyle;
            const vToolTipH = parseFloat(window.getComputedStyle(vToolTip).getPropertyValue('height'));
            const vToolTipW = parseFloat(window.getComputedStyle(vToolTip).getPropertyValue('width'));
            const arrowH = parseFloat(window.getComputedStyle(vToolTip.getElementsByClassName('arrow')[0]).getPropertyValue('height'));
            const arrowW = parseFloat(window.getComputedStyle(vToolTip.getElementsByClassName('arrow')[0]).getPropertyValue('width'));
            switch (placement.toLowerCase()) {
                case 'top':
                    arrowStyle = {
                        'left': `${(vToolTipW / 2) - (arrowW / 2)}px`,
                        'bottom': `-${arrowW / 2}px`
                    };
                    translateX = (selectorEl.offsetLeft) + (selectorEl.offsetWidth / 2) - (vToolTip.offsetWidth / 2);
                    translateY = selectorEl.offsetTop - vToolTip.offsetHeight - offsetValue;
                    break;
                case 'top-left':
                    arrowStyle = {
                        'right': `${arrowW / 2 + (offsetValue / 2)}px`,
                        'bottom': `-${arrowW / 2}px`
                    };
                    translateX = (selectorEl.offsetLeft) + (selectorEl.offsetWidth) - (vToolTip.offsetWidth);
                    translateY = selectorEl.offsetTop - vToolTip.offsetHeight - offsetValue;
                    break;
                case 'top-right':
                    arrowStyle = {
                        'left': `${arrowW / 2 + (offsetValue / 2)}px`,
                        'bottom': `-${arrowW / 2}px`
                    };
                    translateX = (selectorEl.offsetLeft);
                    translateY = selectorEl.offsetTop - vToolTip.offsetHeight - offsetValue;
                    break;
                case 'right':
                    arrowStyle = {
                        'top': `${(vToolTipH / 2) - (arrowH / 2)}px`,
                        'left': `-${arrowW / 2}px`
                    };
                    translateX = selectorEl.offsetLeft + selectorEl.offsetWidth + offsetValue;
                    translateY = ((selectorEl.offsetTop) + (selectorEl.offsetHeight / 2)) - (vToolTip.offsetHeight / 2);
                    break;
                case 'right-top':
                    arrowStyle = {
                        'bottom': `${(arrowH / 2) + (offsetValue / 2)}px`,
                        'left': `-${arrowW / 2}px`
                    };
                    translateX = selectorEl.offsetLeft + selectorEl.offsetWidth + offsetValue;
                    translateY = ((selectorEl.offsetTop) + (selectorEl.offsetHeight)) - (vToolTip.offsetHeight);
                    break;
                case 'right-bottom':
                    arrowStyle = {
                        'top': `${(arrowH / 2) + (offsetValue / 2)}px`,
                        'left': `-${arrowW / 2}px`
                    };
                    translateX = selectorEl.offsetLeft + selectorEl.offsetWidth + offsetValue;
                    translateY = (selectorEl.offsetTop);
                    break;
                case 'left':
                    arrowStyle = {
                        'top': `${(vToolTipH / 2) - (arrowH / 2)}px`,
                        'right': `-${arrowW / 2}px`
                    };
                    translateX = Math.sign(selectorEl.offsetLeft - vToolTip.offsetWidth) === -1 ?
                        ((-vToolTip.offsetWidth + selectorEl.offsetLeft) - offsetValue) : ((selectorEl.offsetLeft - vToolTip.offsetWidth) - offsetValue);
                    translateY = ((selectorEl.offsetTop) + (selectorEl.offsetHeight / 2)) - (vToolTip.offsetHeight / 2);
                    break;
                case 'left-top':
                    arrowStyle = {
                        'bottom': `${(arrowH / 2) + (offsetValue / 2)}px`,
                        'right': `-${arrowW / 2}px`
                    };
                    translateX = Math.sign(selectorEl.offsetLeft - vToolTip.offsetWidth) === -1 ?
                        ((-vToolTip.offsetWidth + selectorEl.offsetLeft) - offsetValue) : ((selectorEl.offsetLeft - vToolTip.offsetWidth) - offsetValue);
                    translateY = ((selectorEl.offsetTop) + (selectorEl.offsetHeight)) - (vToolTip.offsetHeight);
                    break;
                case 'left-bottom':
                    arrowStyle = {
                        'top': `${(arrowH / 2) + (offsetValue / 2)}px`,
                        'right': `-${arrowW / 2}px`
                    };
                    translateX = Math.sign(selectorEl.offsetLeft - vToolTip.offsetWidth) === -1 ?
                        ((-vToolTip.offsetWidth + selectorEl.offsetLeft) - offsetValue) : ((selectorEl.offsetLeft - vToolTip.offsetWidth) - offsetValue);
                    translateY = (selectorEl.offsetTop);
                    break;
                case 'bottom':
                    arrowStyle = {
                        'left': `${(vToolTipW / 2) - (arrowW / 2)}px`,
                        'top': `-${arrowW / 2}px`
                    };
                    translateX = (selectorEl.offsetLeft) + (selectorEl.offsetWidth / 2) - (vToolTip.offsetWidth / 2);
                    translateY = selectorEl.offsetTop + selectorEl.offsetHeight + offsetValue;
                    break;
                case 'bottom-left':
                    arrowStyle = {
                        'right': `${0 + (arrowW / 2) + (offsetValue / 2)}px`,
                        'top': `-${arrowW / 2}px`
                    };
                    translateX = (selectorEl.offsetLeft) + (selectorEl.offsetWidth) - (vToolTip.offsetWidth);
                    translateY = selectorEl.offsetTop + selectorEl.offsetHeight + offsetValue;
                    break;
                case 'bottom-right':
                    arrowStyle = {
                        'left': `${0 + (arrowW / 2) + (offsetValue / 2)}px`,
                        'top': `-${arrowW / 2}px`
                    };
                    translateX = (selectorEl.offsetLeft);
                    translateY = selectorEl.offsetTop + selectorEl.offsetHeight + offsetValue;
                    break;
            }
            const style = {
                'will-change': 'transform',
                'top': '0px',
                'left': '0px',
                'position': 'absolute',
                'visibility': 'visible',
                'transform': `translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`,
            };
            /** convert style json to style string */
            function getStyleString(styleJson) {
                /* tslint:disable */
                return Object.entries(styleJson).reduce((styleString, [propName, propValue]) => {
                    return `${styleString}${propName}:${propValue};`;
                }, '');
            }
            vToolTip.classList.add(SHOW_TOOLTIP);
            vToolTip.classList.remove(HIDE_TOOLTIP);
            vToolTip.setAttribute('aria-hidden', 'false');
            vToolTip.setAttribute('style', getStyleString(style));
            vToolTip.querySelector('.arrow').setAttribute('style', getStyleString(arrowStyle));
            selectorEl.setAttribute('aria-describedby', vTooltipId);
        }
    }
    /** getOffsetParent */
    getOffsetParent(element) {
        if (!element) {
            return document.documentElement;
        }
        // tslint:disable-next-line
        const noOffsetParent = null;
        // NOTE: 1 DOM access here
        // tslint:disable-next-line
        let offsetParent = element.offsetParent || null;
        // Skip hidden elements which don't have an offsetParent
        while (offsetParent === noOffsetParent && element.nextElementSibling) {
            offsetParent = (element = element.nextElementSibling).offsetParent;
        }
        const nodeName = offsetParent && offsetParent.nodeName;
        if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
            return element ? element.ownerDocument.documentElement : document.documentElement;
        }
        // .offsetParent will return the closest TH, TD or TABLE in case
        // no offsetParent is present, I hate this job...
        if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 &&
            this.getStyleComputedProperty(offsetParent, 'position') === 'static') {
            return this.getOffsetParent(offsetParent);
        }
        return offsetParent;
    }
    /** getStyleComputedProperty out of style */
    getStyleComputedProperty(element, property) {
        if (element.nodeType !== 1) {
            return [];
        }
        // NOTE: 1 DOM access here
        const window = element.ownerDocument.defaultView;
        // tslint:disable-next-line
        const css = window.getComputedStyle(element, null);
        return property ? css[property] : css;
    }
    /** Insert DOM element after referenceNode */
    insertAfter(el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
    }
    /** Insert DOM element Before referenceNode */
    insertBefore(el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode);
    }
    /** Render the tooltip */
    render() {
        core.dxp.log.debug(this.element.tagName, 'render()', `in dxp-tooltip render() : ${"DEVELOPMENT"}`);
        const styles = [
            core.h("link", { rel: "stylesheet", href: `` }),
            [this.theme && core.h("link", { rel: "stylesheet", href: `` })],
            [this.theme && core.h("link", { rel: "stylesheet", href: `${core.dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-tooltip.min.css` })]
        ];
        return (core.h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, core.h("div", { role: "tooltip", class: "dxp-tooltip-container" }, core.h("div", { class: "tooltip-header" }, this.tooltipTitle !== undefined ?
            core.h("h3", { class: "text", innerHTML: this.tooltipTitle }) :
            core.h("slot", { name: "tooltip-title" })), core.h("div", { class: "tooltip-content" }, this.content !== undefined ?
            core.h("p", { class: "text", innerHTML: this.content }) :
            core.h("slot", { name: "tooltip-content" })))));
    }
    get element() { return core.getElement(this); }
};

exports.dxp_tooltip = Tooltip;
