import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import animator from './animation.utility';
import viewTabsVertical from './dxp-tabs-vertical.markup';
import messages from './messages';
const TAB_ITEM = 'dxp-tab-item';
const TAB_TITLE_CLASS = '.tab-title';
const ANIMATION_CLASS = '.animation';
const RELATIVE_CLASS = 'pos-relative';
/** dxp-tabs */
export class Tabs {
    constructor() {
        /** selector tabs control */
        this.selectorTabsControl = 'tab-control';
        /** selector tabs control */
        this.selectorTabTitle = 'tab-title';
        /** selector for vertical container */
        this.selectorVContainer = 'item-wrapper-vertical';
        /** selector for tab item content */
        this.selectorVTabContent = 'tab-item-content';
        /** slector for tab item default content */
        this.selectorVTabDefault = 'tab-item-default';
        /** Nested tab elements */
        this.nestedTabs = [];
        /** vertical content position */
        this.verticalContentPosition = 'top';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Tabs', messages);
        this.setOrientation();
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        this.getRenderedTabItems().filter(item => {
            if (item['active']) {
                this.dtmTabTitle = item['tabTitle'];
                this.emitAnalyticsData();
            }
        });
    }
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    componentDidUpdate() {
        this.setTabIndexForTabControl();
        this.animationReadyToActivate(this.activeTab);
    }
    /** activate tab content */
    activateTabs(e) {
        this.activateTab(e.detail, true, true);
    }
    /** focus tabs */
    focusTabs(event) {
        this.handleMoveOnKeyPress(event);
        // activate tab content on enter and tab if tab has focus
        if ((event.keyCode === 13 || event.keyCode === 32) && this.focusedControl) {
            this.focusedControl.click();
        }
    }
    /** listen for key down on enter key to switch tabs */
    keyDownHandler(event) {
        this.handleMoveOnKeyPress(event);
        // activate tab content on enter and tab if tab has focus
        if ((event.keyCode === 13 || event.keyCode === 32) && this.focusedControl) {
            this.focusedControl.click();
        }
    }
    /** close tab content event */
    onCloseTabContent(e) {
        this.closeTabContent(e);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** window resize event */
    windowResize() {
        this.setOrientation();
        this.animationReadyToActivate(this.activeTab);
    }
    /** Following method will be called by child items to register items in tabs so that control group can be created */
    async registerTab() {
        this.setDefaultTabElement();
        if (this.getDefaultTabElement()) {
            this.activateTab(this.getDefaultTabElement());
        }
        else {
            this.activateDefaultTab();
        }
        // re-render tab list by changing state
        this.nestedTabs = [...this.getRenderedTabItems()];
        if (this.verticalAlign && this.verticalContentPosition === 'accordion') {
            for (const element of this.nestedTabs) {
                element['verticalContentPosition'] = this.verticalContentPosition;
            }
        }
    }
    /** activate default tab if not provided */
    activateDefaultTab() {
        const activeTabs = this.getRenderedTabItems().filter(item => {
            return item && item['active'];
        });
        if (activeTabs.length === 0) {
            const firstTab = this.getRenderedTabItems()[0];
            if (firstTab) {
                this.activateTab(firstTab);
            }
        }
        else {
            this.activateTab(activeTabs[0]);
        }
    }
    /** activate default tab if not provided */
    activateTab(tabItemElement, isAccordion = false, isTabClicked = false) {
        this.animationReadyToActivate(tabItemElement);
        for (const item of this.nestedTabs) {
            this.isDefaultTabActive = this.base.returnBooleanValue(this.isDefaultTabElement(tabItemElement));
            {
                const isItemActive = !this.base.returnBooleanValue(item['active']);
                isAccordion ? item['active'] = tabItemElement && tabItemElement.isEqualNode(item.querySelector('.dxp-tab-item').querySelector('dxp-tab-list')) ?
                    isItemActive : false : item['active'] = this.base.returnBooleanValue(tabItemElement && tabItemElement.isEqualNode(item));
            }
            if (item['active']) {
                this.dtmTabTitle = item['tabTitle'];
                if (isTabClicked) {
                    this.emitAnalyticsData();
                }
                this.activeTab = item;
            }
            item['verticalAlign'] = this.verticalAlign;
            item['isDefaultView'] = this.base.returnBooleanValue(this.isDefaultTabElement(item));
            item['isDefaultViewOn'] = this.base.returnBooleanValue(this.getDefaultTabElement());
            item['enableClose'] = this.enableCloseButton();
            item['enableAnimation'] = this.animationEnabled();
            this.animationAddStatus(item);
        }
        this.animationUpdateStatus(tabItemElement);
    }
    /** animation add status */
    animationAddStatus(item) {
        let status = animator.options.none;
        if (this.animationEnabled()) {
            if (!item['active']) {
                status = animator.options.init;
            }
            if (item['active']) {
                status = this.animationStatus === animator.options.left ? animator.options.fadein : animator.options.left;
            }
            if (this.isDefaultTabElement(item)) {
                status = (this.animationStatus === animator.options.left || this.animationStatus === animator.options.fadein) ? animator.options.hide :
                    (!this.animationStatus ? animator.options.init : animator.options.initabsolute);
            }
        }
        item['animationStatus'] = status;
    }
    /** animation after close */
    animationAfterClose() {
        this.resetVContainer();
    }
    /** animation close */
    animationClose(tabItemElement, callback, duration) {
        for (const item of this.nestedTabs) {
            if (tabItemElement.isEqualNode(item)) {
                item['animationStatus'] = animator.options.right;
            }
        }
        this.animationUpdateStatus(tabItemElement, true);
        setTimeout(() => {
            this.animationAfterClose();
            callback.call(this);
        }, duration);
    }
    /** check is animation enabled */
    animationEnabled() {
        return (this.verticalAlign && this.verticalContentPosition !== 'accordion' && (this.base.returnBooleanValue(this.getDefaultTabElement())));
    }
    /** animation ready to activate */
    animationReadyToActivate(tabItemElement) {
        this.setElementProperties(tabItemElement);
    }
    /** animation ready to close */
    animationReadyToClose() {
        if (this.animationEnabled()) {
            // set default view visible before content transition for close runs
            if (this.getDefaultTabElement()) {
                const eleC = this.getDefaultTabElement() ? this.getDefaultTabElement().querySelector(ANIMATION_CLASS) :
                    this.getDefaultTabElement().querySelector(ANIMATION_CLASS);
                if (eleC) {
                    eleC.style.position = 'unset';
                    eleC.classList.remove('hide');
                }
            }
        }
    }
    /** animation upstate status */
    animationUpdateStatus(tabItemElement, reset = false) {
        if (!this.animationEnabled() || reset) {
            // animation status set to undefined, used to decide animation class from init or initabsolute
            this.animationStatus = undefined;
            return;
        }
        if (!this.animationStatus && !this.isDefaultTabElement(tabItemElement)) {
            this.animationStatus = animator.options.left;
        }
    }
    /** close tab content */
    closeTabContent(e) {
        const tabItemElement = e.detail;
        this.animationReadyToClose();
        this.activeTab = undefined;
        this.animationClose(tabItemElement, this.initDefaultTab, (this.animationEnabled() ? animator.durationReset : 0));
    }
    /** emit analytic data */
    emitAnalyticsData() {
        const analyticsInfoObj = {
            'di_comp_name': this.element.tagName,
            'di_comp_cta': this.dtmTabTitle,
            'di_comp_title': this.tabsTitle
        };
        this.analyticsDataEmitter.emit(analyticsInfoObj);
        dxp.log.info(this.element.tagName, 'emitAnalyticsData()', analyticsInfoObj);
    }
    /** enable close button */
    enableCloseButton() {
        return (!this.getIsDefaultTabActive() && (this.base.returnBooleanValue(this.getDefaultTabElement())));
    }
    /** convert nodelist to array */
    getArrayFromNodeList(nodeList) {
        return [].slice.call(nodeList);
    }
    /** get current index of tab control */
    getCurrentIndexTabControl(target) {
        let ele;
        let cindex = 0;
        let currentIndex = -1;
        const tabsControl = this.getElementsBySelector(this.selectorTabsControl);
        const tabs = this.getArrayFromNodeList(tabsControl);
        tabs.map(tabControl => {
            ele = tabControl.querySelector(TAB_TITLE_CLASS);
            if (ele.isEqualNode(target)) {
                currentIndex = cindex;
            }
            cindex = cindex + 1;
        });
        return currentIndex;
    }
    /** get default tab element */
    getDefaultTabElement() {
        if (!this.defaultTabElement) {
            this.setDefaultTabElement();
        }
        return this.verticalContentPosition !== 'accordion' ? this.defaultTabElement : undefined;
    }
    /** get elements by selector */
    getElementsBySelector(selector) {
        const ele = this.element ? this.element : this.element;
        return ele.querySelectorAll(`.${selector}`);
    }
    /** get if default tab is active */
    getIsDefaultTabActive() {
        return this.isDefaultTabActive;
    }
    /** get array of rendered child tab elements */
    getRenderedTabItems() {
        // query select rendered items if child items are created within this component
        // querySelectorAll returns a NodeList, we can convert it to array using spread operator but that doesn't work on IE
        // so using array slicing workaround
        let renderedTabItems = this.element ?
            this.getArrayFromNodeList(this.element.querySelectorAll(TAB_ITEM))
            :
                this.getArrayFromNodeList(this.element.querySelectorAll(TAB_ITEM));
        // if child items are not found within this component then search for slotted items (childNodes)
        renderedTabItems = renderedTabItems.length > 0 ? renderedTabItems : this.getArrayFromNodeList(this.element.childNodes).filter(child => {
            return child['tagName'] && child['tagName'].toLowerCase() === TAB_ITEM;
        });
        return renderedTabItems;
    }
    /** handle move on key press */
    handleMoveOnKeyPress(event) {
        const target = (event.target && event.target) ? event.target.activeElement : event.target;
        const keycode = event.keyCode;
        if (!target || !keycode) {
            return false;
        }
        if (!this.verticalAlign) {
            // handle move left
            if (target.classList.contains(this.selectorTabTitle) && (keycode === 37)) {
                this.setFocusTabControl(target, -1);
            }
            // handle move right
            if (target.classList.contains(this.selectorTabTitle) && (keycode === 39)) {
                this.setFocusTabControl(target, 1);
            }
        }
        if (this.verticalAlign) {
            // handle move up
            if (target.classList.contains(this.selectorTabTitle) && (keycode === 38)) {
                this.setFocusTabControl(target, -1);
            }
            // handle move down
            if (target.classList.contains(this.selectorTabTitle) && (keycode === 40)) {
                this.setFocusTabControl(target, 1);
            }
        }
    }
    /** init default tab */
    initDefaultTab() {
        this.setDefaultTabElement();
        if (this.activeTab) {
            this.activateTab(this.activeTab);
        }
        else if (this.getDefaultTabElement()) {
            this.activateTab(this.getDefaultTabElement());
        }
        else {
            this.activateDefaultTab();
        }
    }
    /** check if element is default tab element */
    isDefaultTabElement(element) {
        return (this.base.returnBooleanValue(element && this.defaultTabElement && this.defaultTabElement.isEqualNode(element)));
    }
    /** check if view is vertical and device is other than desktop */
    isOtherDeviceVerticalView() {
        return (this.verticalAlign && this.orientationVertical);
    }
    /** render arrow */
    renderArrow(arrowOrientation) {
        return (h("span", { class: "arrow-container" },
            h("span", { class: `arrow ${arrowOrientation}` })));
    }
    /** render CTA */
    renderCTA() {
        return (this.enableCta ?
            (this.cta ?
                h("dxp-cta", { "button-type": this.cta.linkType, "icon-align": this.cta.iconAlign, text: this.cta.text, type: this.cta.type, src: this.cta.src, "aria-label": this.cta.ariaLabel, href: this.cta.href })
                :
                    h("slot", { name: "cta-list" })) : '');
    }
    /** render tab control */
    renderTabControl(tabItemElement, arrowOrientation) {
        return (h("div", { class: `tab-control ${tabItemElement['active'] ? 'tab-control-active' : ''} ${this.fixedWidth ? 'tab-fixed-width' : ''}`, onClick: () => this.activateTab(tabItemElement, false, true) },
            h("div", { tabindex: `${tabItemElement['active'] ? 0 : -1}`, role: "button", class: "tab-title", onFocus: event => this.focusedControl = event.target },
                this.renderTabIcon(tabItemElement),
                this.renderTabTitleText(tabItemElement),
                this.renderArrow(arrowOrientation))));
    }
    /** render tab icon */
    renderTabIcon(tabItem) {
        if (!tabItem['tabIconSrc']) {
            return '';
        }
        return (h("div", { class: "tab-icon-wrapper" },
            h("img", { src: tabItem['tabIconSrc'], alt: tabItem['alt'] ? tabItem['alt'] : tabItem['tabTitle'] })));
    }
    /** render tab items */
    renderTabItems(tabItems) {
        return (h("div", { class: "tab-items-container" }, tabItems
            ? tabItems.map(tabItem => h("dxp-tab-item", { active: tabItem['active'], "is-default": tabItem['isDefault'], "is-default-view": tabItem['isDefaultView'], "is-default-view-on": this.base.returnBooleanValue(this.getDefaultTabElement()), "vertical-align": this.verticalAlign, "enable-close": this.enableCloseButton(), "enable-animation": this.animationEnabled(), "animation-status": tabItem['animationStatus'], "tab-title": tabItem['tabTitle'], content: tabItem['content'], "tab-icon-src": tabItem['tabIconSrc'], alt: tabItem['alt'], "vertical-content-position": this.verticalContentPosition }))
            : h("slot", null)));
    }
    /** render tabs control */
    renderTabs(tabItems, arrowOrientation = '') {
        return (h("div", { class: `tab-control-group ${this.verticalAlign ? '' : 'dxp-col-12'} ${this.verticalAlign ? 'tab-vertical' : ''} ${this.verticalAlign ? 'dxp-col-12' : ''}` }, tabItems.filter(item => !this.isDefaultTabElement(item)).map(tabItemElement => this.renderTabControl(tabItemElement, arrowOrientation))));
    }
    /** render tabs content */
    renderTabsContent(tabItems) {
        return (h("div", { class: `item-wrapper ${this.getDefaultTabElement() ? 'default-view-on' : 'default-view-off'}
       ${this.verticalAlign ? 'item-wrapper-vertical dxp-col-lg-6 dxp-col-offset-lg-1 default-view-container' : ''}
        ${this.isDefaultTabActive ? 'default-tab-active' : ''}` },
            h("div", { class: `${this.verticalAlign ? 'item-content' : 'item-container'}` }, this.renderTabItems(tabItems))));
    }
    /** render tabs eyebrow text */
    renderTabsEyebrowText() {
        if (this.eyebrowText) {
            return (h("p", { class: "tabs-eyebrow-text dxp-title-eyebrow dxp-font-size-sm" }, this.eyebrowText));
        }
    }
    /** render tabs header */
    renderTabsHeader() {
        if (!this.tabsTitle && !this.tabsDescription) {
            return '';
        }
        return (h("div", { class: "tabs-header-container tabs-title dxp-col-12" },
            this.tabsTitle &&
                h("h1", { tabindex: "0" }, this.tabsTitle),
            this.tabsTitle && this.tabsDescription &&
                h("div", { class: "seperator" }, "\u00A0"),
            this.tabsDescription &&
                h("div", { tabindex: "0", class: "tabs-description" }, this.tabsDescription)));
    }
    /** render tabs title */
    renderTabTitleText(tabItem) {
        return (h("span", { class: `tab-title-text ${this.iconOnlySm && !this.verticalAlign ? 'icon-only-sm' : ''}`, innerHTML: tabItem['tabTitle'] }));
    }
    /** reset wrapper */
    resetVContainer() {
        // reset vertical container, height set back to auto
        const ele = this.element ? this.element.querySelector(`.${this.selectorVContainer}`)
            : this.element.querySelector(`.${this.selectorVContainer}`);
        if (ele) {
            ele.style.height = 'auto';
        }
    }
    /** set default tab element */
    setDefaultTabElement() {
        if (this.defaultTabElement) {
            return;
        }
        const elements = this.getRenderedTabItems();
        if (!elements) {
            return;
        }
        elements.forEach(element => {
            if (!this.defaultTabElement && element['isDefault']) {
                this.defaultTabElement = element;
                return;
            }
        });
    }
    /** set element properties */
    setElementProperties(tabItemElement) {
        // return, if not vertical
        if (!this.verticalAlign) {
            return;
        }
        // return, if small screen devices
        if (window.innerWidth <= 731) {
            return;
        }
        const isDefaultElement = this.isDefaultTabElement(tabItemElement);
        const marginHeight = 0;
        let eleC;
        let eleHeight;
        let eleHeightDefault;
        // get default element height
        if (this.getDefaultTabElement()) {
            const eleD = this.getDefaultTabElement() ? this.getDefaultTabElement().querySelector(`.${this.selectorVTabDefault}`) :
                this.getDefaultTabElement().querySelector(`.${this.selectorVTabDefault}`);
            if (eleD) {
                // set default view to position relative and height to 100% to get its content's height
                eleD.classList.add(RELATIVE_CLASS);
                eleD.style.height = '100%';
                const isHidden = eleD.querySelector(ANIMATION_CLASS) ? eleD.querySelector(ANIMATION_CLASS).classList.contains('hide') : false;
                // need to remove hide class to get the correct height
                if (isHidden) {
                    eleD.querySelector(ANIMATION_CLASS).classList.remove('hide');
                }
                eleHeightDefault = window.getComputedStyle(eleD).getPropertyValue('height');
                // add back hide class to keep it in hidden state
                if (isHidden) {
                    eleD.querySelector(ANIMATION_CLASS).classList.add('hide');
                }
                // keeping default to absolute status for transition
                eleD.style.position = 'absolute';
            }
        }
        // get element height
        if (this.getDefaultTabElement() && !isDefaultElement && tabItemElement) {
            eleC = tabItemElement ? tabItemElement.querySelector(`.${this.selectorVTabContent}`)
                :
                    tabItemElement.querySelector(`.${this.selectorVTabContent}`);
            if (eleC) {
                let elementPosition;
                // get and hold current postion of the element
                elementPosition = window.getComputedStyle(eleC).getPropertyValue('position');
                // add position relative to get correct height of the content
                eleC.classList.add(RELATIVE_CLASS);
                if (elementPosition) {
                    // need to override inline position of the content
                    eleC.style.position = 'relative';
                }
                // get height of the content
                eleHeight = window.getComputedStyle(eleC).getPropertyValue('height');
                eleC.classList.remove(RELATIVE_CLASS);
                if (elementPosition) {
                    // set back the position of the content
                    eleC.style.position = elementPosition;
                }
            }
        }
        // check if content have valid height
        if (parseFloat(eleHeight)) {
            // check if default content is larger than the content
            // in this case need to consider height of the default content
            if (parseFloat(eleHeightDefault) && parseFloat(eleHeight) && (parseFloat(eleHeightDefault) > parseFloat(eleHeight))) {
                eleHeight = parseFloat(eleHeightDefault);
            }
            // set height to the vertical container
            const ele = this.element ? this.element.querySelector(`.${this.selectorVContainer}`)
                : this.element.querySelector(`.${this.selectorVContainer}`);
            if (ele) {
                // if don't have default view, then set container height to auto
                if (!this.getDefaultTabElement()) {
                    ele.style.height = 'auto';
                }
                else {
                    // if have default view, then need to set height on vertical container
                    if (parseFloat(eleHeight) <= 100 || eleHeightDefault === undefined) {
                        // set height to auto
                        // if element height is not valid or is in <=100 percentage
                        // or default content height is not defined
                        ele.style.height = 'auto';
                    }
                    else {
                        // set height to the vertical container in px
                        ele.style.height = `${parseFloat(eleHeight) + marginHeight}px`;
                    }
                }
            }
        }
        // set content element position to absolute
        // if element is not default element
        // and set default element visible
        if (this.getDefaultTabElement() && !isDefaultElement && tabItemElement) {
            // set vertical tab content to absolute postion
            const eleContent = tabItemElement ? tabItemElement.querySelector(`.${this.selectorVTabContent}`)
                : tabItemElement.querySelector(`.${this.selectorVTabContent}`);
            if (eleContent) {
                this.verticalContentPosition === 'accordion' ? eleContent.style.position = 'relative' : eleContent.style.position = 'absolute';
            }
            // set default view to absolute position with visible state
            const eleDefault = this.getDefaultTabElement() ? this.getDefaultTabElement().querySelector(`.${this.selectorVTabDefault}`) :
                this.getDefaultTabElement().querySelector(`.${this.selectorVTabDefault}`);
            if (eleDefault) {
                eleDefault.style.position = 'absolute';
                eleDefault.classList.remove('hide');
            }
        }
        // set default element position to relative for other device vertical view
        if (this.getDefaultTabElement() && (this.isOtherDeviceVerticalView() || isDefaultElement)) {
            const eleD = this.getDefaultTabElement() ? this.getDefaultTabElement().querySelector(`.${this.selectorVTabDefault}`) :
                this.getDefaultTabElement().querySelector(`.${this.selectorVTabDefault}`);
            if (eleD) {
                eleD.style.position = 'relative';
            }
        }
        // fix - reset tab-wrapper-vertical height
        const eleTW = this.element ? this.element.querySelector('.tab-wrapper-vertical') : this.element.querySelector('.tab-wrapper-vertical');
        if (eleTW) {
            eleTW.style.height = 'auto';
        }
    }
    /** set focus control */
    setFocusTabControl(target, position) {
        let ele;
        let newIndex = -1;
        let currentIndex = -1;
        let cindex = 0;
        const tabsControl = this.getElementsBySelector(this.selectorTabsControl);
        const tabs = this.getArrayFromNodeList(tabsControl);
        const lastIndex = tabs.length ? tabs.length - 1 : 0;
        currentIndex = this.getCurrentIndexTabControl(target);
        if (currentIndex === 0 && position === -1) {
            newIndex = lastIndex;
        }
        else if (currentIndex === lastIndex && position === 1) {
            newIndex = 0;
        }
        else {
            newIndex = currentIndex + position;
        }
        // set focus
        tabs.map(tabControl => {
            ele = tabControl.querySelector(TAB_TITLE_CLASS);
            if (ele && newIndex >= 0 && cindex === newIndex) {
                ele.focus();
            }
            cindex = cindex + 1;
        });
    }
    /** set orientation */
    setOrientation() {
        // orientation vertical for view other than desktop
        this.orientationVertical = window.innerWidth < 992;
    }
    /** set tab index for tab control */
    setTabIndexForTabControl() {
        let ele;
        let tabindexSet;
        const tabsControl = this.getElementsBySelector(this.selectorTabsControl);
        this.getArrayFromNodeList(tabsControl).map(tabControl => {
            ele = tabControl.querySelector(TAB_TITLE_CLASS);
            ele.setAttribute('tabindex', '-1');
            if (!tabindexSet && ele && this.isDefaultTabActive) {
                ele.setAttribute('tabindex', '0');
                tabindexSet = true;
            }
            if (!tabindexSet && ele && tabControl.classList.contains('tab-control-active')) {
                ele.setAttribute('tabindex', '0');
                tabindexSet = true;
            }
        });
    }
    /** Render the tabs */
    render() {
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-tabs.min.css` })]
        ];
        if (this.verticalAlign) {
            dxp.log.debug(this.element.tagName, 'render()', `call in dxp-tabs-vertical render() : ${process.env.MODE}`);
            return viewTabsVertical.render.call(this, styles);
        }
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-tabs render() : ${process.env.MODE}`);
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "dxp-row horizontal" },
                this.renderTabsHeader(),
                this.renderTabsEyebrowText(),
                this.renderTabs(this.nestedTabs),
                this.renderTabsContent(this.tabItems))));
    } // render
    static get is() { return "dxp-tabs"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-tabs.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-tabs.css"]
    }; }
    static get properties() { return {
        "cta": {
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
                "text": "cta data for child components"
            },
            "attribute": "cta",
            "reflect": false
        },
        "enableCta": {
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
                "text": "isCTA Present"
            },
            "attribute": "enable-cta",
            "reflect": false
        },
        "eyebrowText": {
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
                "text": "eyebrow text for tabs"
            },
            "attribute": "eyebrow-text",
            "reflect": false
        },
        "fixedWidth": {
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
                "text": "Enable adaptive or fixed width designs"
            },
            "attribute": "fixed-width",
            "reflect": false
        },
        "iconOnlySm": {
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
                "text": "Enable icon only labels on mobile devices"
            },
            "attribute": "icon-only-sm",
            "reflect": false
        },
        "tabItems": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "{\n    /** holds the title of a tab item */\n    tabTitle: string,\n    /** determines if a given item is active or not */\n    active?: boolean,\n    /** determines which tab is the default one */\n    isDefault?: boolean,\n    /** determines if tab is the default view */\n    isDefaultView?: boolean,\n    /** determines if close is enabled */\n    enableClose?: boolean,\n    /** determines if animation is enabled */\n    enableAnimation?: boolean,\n    /** holds the animation status */\n    animationStatus?: boolean,\n    /** holds the content of a tab item */\n    content: string,\n    /** holds the alt text for a tab title */\n    alt?: string,\n    /** holds the link of icon for tab item title */\n    tabIconSrc?: string }[]",
                "resolved": "{ tabTitle: string; active?: boolean; isDefault?: boolean; isDefaultView?: boolean; enableClose?: boolean; enableAnimation?: boolean; animationStatus?: boolean; content: string; alt?: string; tabIconSrc?: string; }[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Nested tab elements"
            }
        },
        "tabsDescription": {
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
                "text": "Tabs Description"
            },
            "attribute": "tabs-description",
            "reflect": false
        },
        "tabsTitle": {
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
                "text": "Tabs Title"
            },
            "attribute": "tabs-title",
            "reflect": false
        },
        "verticalAlign": {
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
                "text": "Enable vertical alignment of tabs"
            },
            "attribute": "vertical-align",
            "reflect": false
        },
        "verticalContentPosition": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'top' | 'bottom' | 'accordion'",
                "resolved": "\"accordion\" | \"bottom\" | \"top\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "vertical content position"
            },
            "attribute": "vertical-content-position",
            "reflect": false,
            "defaultValue": "'top'"
        }
    }; }
    static get states() { return {
        "activeTab": {},
        "animationStatus": {},
        "defaultTabElement": {},
        "dir": {},
        "focusedControl": {},
        "isDefaultTabActive": {},
        "locale": {},
        "nestedTabs": {},
        "orientationVertical": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "analyticsDataEmitter",
            "name": "dxp_comp",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "analytics data emitter"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "registerTab": {
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
                "text": "Following method will be called by child items to register items in tabs so that control group can be created",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "activateTabs",
            "method": "activateTabs",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "focusTabs",
            "method": "focusTabs",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "keyDownHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "closeTabContent",
            "method": "onCloseTabContent",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "resize",
            "method": "windowResize",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
