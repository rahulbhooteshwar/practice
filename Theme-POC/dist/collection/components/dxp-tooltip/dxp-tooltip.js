import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
const SHOW_TOOLTIP = 'dxp-show-tooltip';
const SLOT_TOOLTIP_CONTENT = '[slot="tooltip-content"]';
const HIDE_TOOLTIP = 'dxp-hide-tooltip';
const INSIDE_SHADOW = 'inside-shadow';
const SELECTOR_ID = 'selector-id';
/** dxp-tooltip */
export class Tooltip {
    constructor() {
        /** placement of tooltip */
        this.placement = 'bottom';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
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
        linkTheme.href = `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-tooltip.min.css`;
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-tooltip render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-tooltip.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { role: "tooltip", class: "dxp-tooltip-container" },
                h("div", { class: "tooltip-header" }, this.tooltipTitle !== undefined ?
                    h("h3", { class: "text", innerHTML: this.tooltipTitle }) :
                    h("slot", { name: "tooltip-title" })),
                h("div", { class: "tooltip-content" }, this.content !== undefined ?
                    h("p", { class: "text", innerHTML: this.content }) :
                    h("slot", { name: "tooltip-content" })))));
    }
    static get is() { return "dxp-tooltip"; }
    static get properties() { return {
        "content": {
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
                "text": "tool tip content"
            },
            "attribute": "content",
            "reflect": false
        },
        "insideShadow": {
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
                "text": "is used as nested element or document level element"
            },
            "attribute": "inside-shadow",
            "reflect": false
        },
        "placement": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'top' | 'top-right' | 'top-left' |\n    'right' | 'right-top' | 'right-bottom' |\n    'bottom' | 'bottom-right' | 'bottom-left' |\n    'left' | 'left-top' | 'left-bottom'",
                "resolved": "\"bottom\" | \"bottom-left\" | \"bottom-right\" | \"left\" | \"left-bottom\" | \"left-top\" | \"right\" | \"right-bottom\" | \"right-top\" | \"top\" | \"top-left\" | \"top-right\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "placement of tooltip"
            },
            "attribute": "placement",
            "reflect": false,
            "defaultValue": "'bottom'"
        },
        "selectorId": {
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
                "text": "host Element ID"
            },
            "attribute": "selector-id",
            "reflect": false
        },
        "tooltipTitle": {
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
                "text": "Title of tooltip"
            },
            "attribute": "tooltip-title",
            "reflect": false
        },
        "trigger": {
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
                "text": "comma separated list of event to trigger tooltip on host Element"
            },
            "attribute": "trigger",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get methods() { return {
        "createTooltip": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "HTMLElement": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Create tooltip",
                "tags": []
            }
        },
        "destroyTooltip": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Destroy tooltip",
                "tags": []
            }
        },
        "hideTooltip": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Method to open modal",
                "tags": []
            }
        },
        "showTooltip": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Method to open modal",
                "tags": []
            }
        },
        "toggleTooltip": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Method to open modal",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
