import { h, r as registerInstance, c as createEvent, d as dxp, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { a as animator } from './animation.utility-b70cc14f.js';
import { m as messages } from './messages-0abf6702.js';

/* tslint:disable */
const viewTabsVertical = {
    render(styles) {
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            this.isOtherDeviceVerticalView() && this.verticalContentPosition === 'bottom' &&
                h("div", { class: `dxp-row vertical other-device` },
                    h("div", { class: "tab-wrapper-vertical dxp-col-lg-4 dxp-col-12" },
                        this.renderTabsHeader(),
                        this.renderTabsEyebrowText(),
                        this.renderTabs(this.nestedTabs, 'down'),
                        this.renderCTA()),
                    this.renderTabsContent(this.tabItems)),
            this.isOtherDeviceVerticalView() && this.verticalContentPosition === 'top' &&
                h("div", { class: `dxp-row vertical other-device` },
                    this.renderTabsContent(this.tabItems),
                    h("div", { class: "tab-wrapper-vertical dxp-col-lg-4 dxp-col-12" },
                        this.renderTabsHeader(),
                        this.renderTabsEyebrowText(),
                        this.renderTabs(this.nestedTabs, 'up'),
                        this.renderCTA())),
            this.isOtherDeviceVerticalView() && this.verticalContentPosition === 'accordion' &&
                h("div", { class: `dxp-row vertical other-device` },
                    this.renderTabsEyebrowText(),
                    this.renderTabsContent(this.tabItems),
                    h("div", { class: `dxp-row accordion` }, this.renderCTA())),
            !this.isOtherDeviceVerticalView() &&
                h("div", { class: `dxp-row vertical` },
                    h("div", { class: "tab-wrapper-vertical dxp-col-lg-4 dxp-col-12 dxp-col-offset-lg-1" },
                        this.renderTabsHeader(),
                        this.renderTabsEyebrowText(),
                        this.renderTabs(this.nestedTabs, 'next'),
                        this.renderCTA()),
                    this.renderTabsContent(this.tabItems))));
    }
};

const TAB_ITEM = 'dxp-tab-item';
const TAB_TITLE_CLASS = '.tab-title';
const ANIMATION_CLASS = '.animation';
const RELATIVE_CLASS = 'pos-relative';
const Tabs = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.analyticsDataEmitter = createEvent(this, "dxp_comp", 7);
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
        return (h("span", { class: "arrow-container" }, h("span", { class: `arrow ${arrowOrientation}` })));
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
        return (h("div", { class: `tab-control ${tabItemElement['active'] ? 'tab-control-active' : ''} ${this.fixedWidth ? 'tab-fixed-width' : ''}`, onClick: () => this.activateTab(tabItemElement, false, true) }, h("div", { tabindex: `${tabItemElement['active'] ? 0 : -1}`, role: "button", class: "tab-title", onFocus: event => this.focusedControl = event.target }, this.renderTabIcon(tabItemElement), this.renderTabTitleText(tabItemElement), this.renderArrow(arrowOrientation))));
    }
    /** render tab icon */
    renderTabIcon(tabItem) {
        if (!tabItem['tabIconSrc']) {
            return '';
        }
        return (h("div", { class: "tab-icon-wrapper" }, h("img", { src: tabItem['tabIconSrc'], alt: tabItem['alt'] ? tabItem['alt'] : tabItem['tabTitle'] })));
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
        ${this.isDefaultTabActive ? 'default-tab-active' : ''}` }, h("div", { class: `${this.verticalAlign ? 'item-content' : 'item-container'}` }, this.renderTabItems(tabItems))));
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
        return (h("div", { class: "tabs-header-container tabs-title dxp-col-12" }, this.tabsTitle &&
            h("h1", { tabindex: "0" }, this.tabsTitle), this.tabsTitle && this.tabsDescription &&
            h("div", { class: "seperator" }, "\u00A0"), this.tabsDescription &&
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
            dxp.log.debug(this.element.tagName, 'render()', `call in dxp-tabs-vertical render() : ${"DEVELOPMENT"}`);
            return viewTabsVertical.render.call(this, styles);
        }
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-tabs render() : ${"DEVELOPMENT"}`);
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "dxp-row horizontal" }, this.renderTabsHeader(), this.renderTabsEyebrowText(), this.renderTabs(this.nestedTabs), this.renderTabsContent(this.tabItems))));
    } // render
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-tabs{width:100%}div.dxp.dxp-tabs .dxp-row.horizontal{margin:0}div.dxp.dxp-tabs .dxp-row.horizontal .item-wrapper{width:100%}div.dxp.dxp-tabs .dxp-row .tab-control-group{display:-ms-flexbox;display:flex;overflow-x:auto}div.dxp.dxp-tabs .dxp-row .tab-control-group .tab-control{text-align:center;background-color:inherit;border:none;outline:none;cursor:pointer;min-width:6.1875rem;background:transparent;border-radius:0;padding:0 12px;font-size:.875rem}div.dxp.dxp-tabs .dxp-row .tab-control-group .tab-control.tab-fixed-width{width:100%}div.dxp.dxp-tabs .dxp-row .tab-control-group .tab-control .tab-icon-wrapper{display:inline-block}\@media (max-width:767.9px){div.dxp.dxp-tabs .dxp-row .tab-control-group .tab-control .tab-icon-wrapper{display:block}}div.dxp.dxp-tabs .dxp-row .tab-control-group .tab-control .tab-icon-wrapper img{width:1.5rem;height:1.5rem;margin-right:.5rem}div.dxp.dxp-tabs .dxp-row .tab-control-group .tab-control.tab-control-active .tab-title{border-bottom-width:6px;border-bottom-style:solid;padding:16px 1px 12px}div.dxp.dxp-tabs .dxp-row .tab-control-group .tab-control .tab-title{padding:16px 1px 18px;height:100%}\@media (max-width:767.9px){div.dxp.dxp-tabs .dxp-row .tab-control-group .tab-control .tab-title .icon-only-sm{display:none}}div.dxp.dxp-tabs .dxp-row .tab-control-group .tab-control:not(.tab-control-active) .tab-title:focus,div.dxp.dxp-tabs .dxp-row .tab-control-group .tab-control:not(.tab-control-active) .tab-title:hover{padding:16px 1px 16px;border-bottom-width:2px;border-bottom-style:solid}div.dxp.dxp-tabs .dxp-row .tabs-title{margin-bottom:20px}div.dxp.dxp-tabs .dxp-row .tabs-title h1{margin-bottom:0;line-height:2.625rem;font-weight:300}div.dxp.dxp-tabs .dxp-row .tabs-title .separator{padding-top:16px}div.dxp.dxp-tabs .dxp-row .tabs-title .tabs-description{line-height:1.625rem}div.dxp.dxp-tabs .dxp-row .tabs-eyebrow-text{padding-bottom:20px;margin:0;text-transform:uppercase}\@media (min-width:768px){div.dxp.dxp-tabs .dxp-row .tabs-title{margin-bottom:30px}}div.dxp.dxp-tabs .dxp-row .item-wrapper{overflow:hidden}div.dxp.dxp-tabs .dxp-row .item-wrapper .item-container{border-top-width:1px;border-top-style:solid}div.dxp.dxp-tabs .dxp-row .item-wrapper .button-container{position:relative;padding-bottom:8px;line-height:32px;height:32px;width:100%;margin-top:auto;vertical-align:middle;text-align:right}\@media (max-width:991px){div.dxp.dxp-tabs .dxp-row .item-wrapper .item-container .button-container{margin-bottom:40px}}\@media (max-width:767px){div.dxp.dxp-tabs .dxp-row .tab-control{font-size:.75rem;min-width:9rem}div.dxp.dxp-tabs .dxp-row .tab-control.tab-control-active .tab-title{border-bottom-width:4px}div.dxp.dxp-tabs .dxp-row .tab-control .tab-icon-wrapper img{margin-bottom:.5rem}div.dxp.dxp-tabs .dxp-row .tabs-title h1{margin-bottom:0;line-height:2.25rem;font-weight:300}div.dxp.dxp-tabs .dxp-row .tabs-title .separator{padding-top:8px}div.dxp.dxp-tabs .dxp-row .tabs-title .tabs-description{line-height:1.5rem}div.dxp.dxp-tabs .dxp-row .item-wrapper .item-container .button-container{margin-bottom:16px}}div.dxp.dxp-tabs .dxp-row.horizontal .content-wrapper,div.dxp.dxp-tabs .dxp-row.horizontal .tab-control-group,div.dxp.dxp-tabs .dxp-row.horizontal .tabs-header-container{padding:0}div.dxp.dxp-tabs .dxp-row.horizontal .tab-control:first-child{padding-left:0}div.dxp.dxp-tabs .dxp-row.horizontal .tab-control:last-child{padding-right:0}div.dxp.dxp-tabs .dxp-row.vertical{margin:0}div.dxp.dxp-tabs .dxp-row.vertical .arrow{display:inline-block;position:relative;width:8px;height:8px;background:transparent;text-indent:-9999px;border-top:1px solid;border-left:1px solid;text-decoration:none;color:transparent}div.dxp.dxp-tabs .dxp-row.vertical .arrow.next{-webkit-transform:rotate(135deg);transform:rotate(135deg);right:0}div.dxp.dxp-tabs .dxp-row.vertical .tab-wrapper-vertical{padding:0;padding-top:88px;padding-bottom:88px;position:relative}div.dxp.dxp-tabs .dxp-row.vertical .tab-wrapper-vertical .tabs-title{padding:0}div.dxp.dxp-tabs .dxp-row.vertical .item-wrapper.item-wrapper-vertical{position:relative;display:block;min-height:20vh;max-height:95vh;-webkit-transition:height 1s ease;transition:height 1s ease;overflow:hidden}div.dxp.dxp-tabs .dxp-row.vertical .item-wrapper.item-wrapper-vertical .item-content{display:block;position:relative;top:0;left:0;width:100%;height:100%}div.dxp.dxp-tabs .dxp-row.vertical .item-wrapper.item-wrapper-vertical .button-container{cursor:pointer;position:absolute;top:48px;right:46px}div.dxp.dxp-tabs .dxp-row.vertical .item-wrapper.default-tab-active,div.dxp.dxp-tabs .dxp-row.vertical .item-wrapper.default-tab-active .item-content{padding:0}div.dxp.dxp-tabs .dxp-row.vertical .item-wrapper.default-tab-active .tab-item-content{display:inline}div.dxp.dxp-tabs .dxp-row.vertical .tab-control-group{display:block;padding-right:1.875rem;float:left}div.dxp.dxp-tabs .dxp-row.vertical .tab-control-group.tab-vertical{margin-top:auto;margin-bottom:auto;padding:0 0 32px 0}div.dxp.dxp-tabs .dxp-row.vertical .tab-control-group.tab-vertical .tab-control{min-height:56px;height:auto;padding:0;text-align:left}div.dxp.dxp-tabs .dxp-row.vertical .tab-control-group.tab-vertical .tab-control.tab-control-active .tab-title,div.dxp.dxp-tabs .dxp-row.vertical .tab-control-group.tab-vertical .tab-control.tab-control-active .tab-title:focus{border-bottom-width:1px}div.dxp.dxp-tabs .dxp-row.vertical .tab-control-group.tab-vertical .tab-control.tab-control-active .tab-title .arrow-container,div.dxp.dxp-tabs .dxp-row.vertical .tab-control-group.tab-vertical .tab-control.tab-control-active .tab-title:focus .arrow-container{background-position:100%}div.dxp.dxp-tabs .dxp-row.vertical .tab-control-group.tab-vertical .tab-control.tab-control-active .tab-title:not(:focus) .arrow-container{text-align:center}div.dxp.dxp-tabs .dxp-row.vertical .tab-control-group.tab-vertical .tab-control:not(.tab-control-active) .tab-title:focus,div.dxp.dxp-tabs .dxp-row.vertical .tab-control-group.tab-vertical .tab-control:not(.tab-control-active) .tab-title:hover{padding:16px 1px 16px;border-bottom-width:1px;border-bottom-style:solid}div.dxp.dxp-tabs .dxp-row.vertical .tab-control-group.tab-vertical .tab-control .tab-title{vertical-align:middle;margin-top:auto;margin-bottom:auto;padding:16px 0;overflow:hidden;display:-ms-flexbox;display:flex}div.dxp.dxp-tabs .dxp-row.vertical .tab-control-group.tab-vertical .tab-control .tab-title:focus .arrow-container,div.dxp.dxp-tabs .dxp-row.vertical .tab-control-group.tab-vertical .tab-control .tab-title:hover .arrow-container{text-align:right;background-position:100%}div.dxp.dxp-tabs .dxp-row.vertical .tab-control-group.tab-vertical .tab-control .tab-title .tab-icon-wrapper{display:inline-block}div.dxp.dxp-tabs .dxp-row.vertical .tab-control-group.tab-vertical .tab-control .tab-title .tab-icon-wrapper img{margin-bottom:0;margin-top:-4px}div.dxp.dxp-tabs .dxp-row.vertical .tab-control-group.tab-vertical .tab-control .tab-title .tab-title-text{width:100%;text-transform:capitalize}div.dxp.dxp-tabs .dxp-row.vertical .tab-control-group.tab-vertical .tab-control .tab-title .arrow-container{float:right;margin:auto;vertical-align:middle;text-align:center;background-position:50%;padding-left:24px;width:48px;height:24px;line-height:24px;margin-right:2px;-webkit-transition:text-align 5s linear;transition:text-align 5s linear}div.dxp.dxp-tabs .dxp-row.vertical.other-device .tab-vertical{width:100%;padding-right:0;padding-bottom:32px}div.dxp.dxp-tabs .dxp-row.vertical.other-device .item-wrapper.item-wrapper-vertical{padding:40px 0 26px;width:100%}\@media (max-width:991px){div.dxp.dxp-tabs .dxp-row.vertical .item-wrapper.item-wrapper-vertical{padding:0}div.dxp.dxp-tabs .dxp-row.vertical .item-wrapper.item-wrapper-vertical .item-content{position:relative;padding:0}div.dxp.dxp-tabs .dxp-row.vertical .item-wrapper.item-wrapper-vertical .item-content .tab-items-container{height:100%}div.dxp.dxp-tabs .dxp-row.vertical.other-device .tab-wrapper-vertical{padding:45px 36px 56px 36px}div.dxp.dxp-tabs .dxp-row.vertical.other-device .item-wrapper.item-wrapper-vertical.item-wrapper-vertical{padding:0}div.dxp.dxp-tabs .dxp-row.vertical.other-device .item-wrapper.item-wrapper-vertical .button-container{margin-bottom:42px}}\@media (max-width:767px){div.dxp.dxp-tabs .dxp-row.vertical.other-device.tab-control-active .tab-title{border-bottom-width:1px}div.dxp.dxp-tabs .dxp-row.vertical.other-device .tabs-title h1{margin-bottom:10px}div.dxp.dxp-tabs .dxp-row.vertical.other-device .tab-wrapper-vertical{padding:35px 36px 48px 36px}div.dxp.dxp-tabs .dxp-row.vertical.other-device .tab-vertical{padding-bottom:32px}div.dxp.dxp-tabs .dxp-row.vertical.other-device .item-wrapper.item-wrapper-vertical{padding:16px 0 20px}div.dxp.dxp-tabs .dxp-row.vertical.other-device .item-wrapper.item-wrapper-vertical .button-container{margin-bottom:16px}}\@media screen and (min-width:992px){div.dxp.dxp-tabs .dxp-row.vertical .dxp-col-lg-6{padding-right:0;padding-left:0}div.dxp.dxp-tabs .dxp-row.vertical .tabs-title{margin-bottom:40px}}\@media (max-width:991px){div.dxp.dxp-tabs .dxp-row.vertical{height:100vh}div.dxp.dxp-tabs .dxp-row.vertical.other-device{height:100%}div.dxp.dxp-tabs .dxp-row.vertical.other-device .tab-vertical{padding-bottom:40px}div.dxp.dxp-tabs .dxp-row.accordion{padding:32px 36px 0 36px}}\@media (max-width:767px){div.dxp.dxp-tabs .dxp-row.vertical.other-device .tab-vertical{padding-bottom:32px}}"; }
};

export { Tabs as dxp_tabs };
