import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import CommonUtility from './common-utility';
import messages from './messages';
const NAV_GROUP = 'dxp-nav-group';
const ARIA_EXPANDED_TRUE = '[aria-expanded="true"]';
const BLOCK_CLASS = '.dxp-block';
const NAV_ITEM = 'dxp-nav-item';
const NAV_SUB_ITEM = 'dxp-nav-sub-item';
const ACTIVE_LINK = 'active-link';
const MAX_HEIGHT_NONE = 'max-height-none';
const ARIA_EXPANDED = 'aria-expanded';
const NAV_ONE_LINK_CLASS = '.nav-level-one-link';
/** dxp-navigation */
export class Navigation {
    /** life cycle hook runs before loading the component */
    async componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Navigation', messages);
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-navigation.min.css`;
        dxp.util.appendLinkElement(shadow, href);
        this.utility = new CommonUtility();
        // Data form CMS root path
        if (this.apiUrl) {
            try {
                this.navData = await dxp.api(this.apiUrl);
            }
            catch (err) {
                dxp.log.error(this.element.tagName, 'componentWillLoad()', `fetch failed for ${this.apiUrl}`, err);
            }
        }
    }
    /** Actions to perform after component load */
    componentDidLoad() {
        const levelOneMenuItems = this.element.querySelectorAll(NAV_GROUP).length ? this.element.querySelectorAll(NAV_GROUP) : this.element.querySelectorAll(NAV_GROUP);
        // Remove nav item more than 6
        this.utility.preventExtraMenuItems(levelOneMenuItems, 5);
        // accessibility compliance
        // Work for Nested element implementation
        this.defaultActions();
    }
    /** Actions to perform after component update */
    componentDidUpdate() {
        // accessibility compliance
        // Work for JSON or API data
        this.defaultActions();
    }
    /** Click events */
    handleClickEvent(e) {
        this.base.routingEventListener(e);
        const target = e.target ? e.composedPath()[0] : e.target;
        const expandedItems = this.element.querySelectorAll('.down').length ? this.element.querySelectorAll('.down') : this.element.querySelectorAll('.down');
        const expandedMainMenu = target ? target.closest('.in') : undefined;
        const nextSibling = target ? target.nextElementSibling : undefined;
        // Mobile menu/sub menu expand and collapse
        this.menuItemsHandler(target, nextSibling, expandedItems, expandedMainMenu);
    }
    /** Document click event handler */
    handleDocumentClick(e) {
        const dxpNav = e.target.closest('dxp-navigation');
        const ariaExpanded = this.element.querySelector(ARIA_EXPANDED_TRUE) || this.element.querySelector(ARIA_EXPANDED_TRUE);
        const expandedMenus = this.element.querySelector(BLOCK_CLASS) || this.element.querySelector(BLOCK_CLASS);
        // Collapse expanded menu item on click in web page anywhere
        this.collapseExpandedNav(dxpNav, ariaExpanded, expandedMenus);
    }
    /** Key down events */
    handleKeydownEvents(e) {
        const keys = [32, 37, 38, 39, 40];
        const keycode = e.keyCode;
        const target = e.target ? e.target.activeElement : e.target;
        // Expanded level two menu item
        const expandedNavItem = this.element.querySelector(BLOCK_CLASS);
        let isLevelOne;
        let nestedItem;
        let isNavItem;
        let subItems;
        let isSubItem;
        let nextItem;
        let prevItem;
        let nextSubItem;
        let prevSubItem;
        let isExpanded;
        if (target) {
            isLevelOne = target.classList.contains('nav-level-one-link');
            nestedItem = target.parentElement.querySelector('.mega-menu-container');
            isNavItem = target.classList.contains('mega-menu-link');
            subItems = target.parentElement.querySelector('.mega-sub-menu');
            isSubItem = target.classList.contains('mega-sub-menu-link');
            nextItem = target.closest(NAV_ITEM) ? target.closest(NAV_ITEM).nextElementSibling : false;
            prevItem = target.closest(NAV_ITEM) ? target.closest(NAV_ITEM).previousElementSibling : false;
            nextSubItem = target.closest(NAV_SUB_ITEM) ? target.closest(NAV_SUB_ITEM).nextElementSibling : false;
            prevSubItem = target.closest(NAV_SUB_ITEM) ? target.closest(NAV_SUB_ITEM).previousElementSibling : false;
        }
        // This prevents the page scrolling when space bar or arrows keys use to navigate the menu items
        this.preventDefaultAction(e, keys);
        // Hide expanded nav item (level 2) if the tab key pressed on first level menu item
        this.hideNavItem(target, isLevelOne, expandedNavItem, keycode);
        // Check the level-2 menu item is expanded. Get 'true' if expanded
        if (nestedItem) {
            isExpanded = nestedItem.classList.contains('dxp-block');
        }
        // show/hide the nested menu items
        // Space bar key can show and hide the dropdown menu items
        // Down arrow key only expand menu items
        this.showHideMenuWithKeys(target, keycode, nestedItem, isExpanded);
        // Select Level 2 first menu item with down arrow key
        this.selectNestedMenuItem(nestedItem, keycode, isExpanded);
        // Navigate expanded menu items
        this.navigateInExpandedMenu(isNavItem, keycode, subItems, nextItem);
        // Navigate in nav-sub-menu items
        this.navigateSubItems(isSubItem, nextSubItem, keycode, prevSubItem);
        // Select previous nav item
        this.selectParentNavItem(target, prevSubItem, isSubItem, keycode);
        // Select previous nav sub item (nav sub item) OR nav item (level-2)
        this.selectPrevNavItem(isNavItem, prevItem, keycode);
        // Select next nav item (level 2) from nav sub item (Level 3)
        this.selectNextNavItem(isSubItem, nextSubItem, nextItem, keycode);
    }
    /** key up events */
    handleUpkeyEvents(e) {
        const target = e.target ? e.target.activeElement : e.target;
        const keycode = e.keyCode;
        const expandedNavItem = e.target ? this.element.querySelector(BLOCK_CLASS) : this.element.querySelector(BLOCK_CLASS);
        const ariaExpanded = e.target ? this.element.querySelector(ARIA_EXPANDED_TRUE) : this.element.querySelector(ARIA_EXPANDED_TRUE);
        const expandedMenus = e.target ? this.element.querySelector(BLOCK_CLASS) : this.element.querySelector(BLOCK_CLASS);
        let isLevelOne;
        if (target) {
            isLevelOne = target.classList.contains('nav-level-one-link');
        }
        // Collapse expanded menu items
        // * if menu item looses the focus (with Tab key)
        // * collapse expanded menu items on Esc key
        this.hideMenuItemsOnKeyPress(target, keycode, isLevelOne, expandedNavItem, expandedMenus, ariaExpanded);
    }
    /** window resize event */
    onWindowResize() {
        const navOverlay = document.querySelector('.nav-overlay');
        const windowWidth = window.innerWidth;
        // Hide nav overlay if lG & XL breakpoint
        if (navOverlay) {
            windowWidth >= 992 ? navOverlay.style.display = 'none' : navOverlay.style.display = 'block';
        }
    }
    /** Collapse all level menu items */
    collapseAllMenus(expandedItems) {
        for (const i of Object.keys(expandedItems)) {
            // Prevent the set time out execution
            clearTimeout(this.clearSetTimeout);
            expandedItems[i].classList.remove('down');
            expandedItems[i].previousElementSibling.classList.remove(ACTIVE_LINK);
            expandedItems[i].nextElementSibling.classList.remove('in');
            expandedItems[i].nextElementSibling.classList.remove(MAX_HEIGHT_NONE);
        }
    }
    /** Collapse expanded menu item on click in web page anywhere */
    collapseExpandedNav(dxpNav, ariaExpanded, expandedMenus) {
        if (!dxpNav && expandedMenus) {
            ariaExpanded.setAttribute(ARIA_EXPANDED, 'false');
            expandedMenus.classList.remove('dxp-block');
        }
    }
    /** handled the accessibility compliance  */
    defaultActions() {
        const menuItems = this.element.querySelectorAll(NAV_ONE_LINK_CLASS).length ?
            this.element.querySelectorAll(NAV_ONE_LINK_CLASS)
            :
                this.element.querySelectorAll(NAV_ONE_LINK_CLASS);
        // set the position of first level menu-items and the number of menu items of accessibility compliance
        // Work for nested element implementation
        this.utility.setPosNSize(menuItems);
    }
    /** method to focus input element  */
    focusElement(elem) {
        elem.focus();
    }
    /** Collapse expanded menu items with key up event */
    hideMenuItemsOnKeyPress(target, keycode, isLevelOne, expandedNavItem, expandedMenus, ariaExpanded) {
        // Collapse expanded menu items if menu item looses the focus (with Tab key)
        if (isLevelOne && expandedNavItem && keycode === 9) {
            target.setAttribute(ARIA_EXPANDED, 'false');
            expandedNavItem.classList.remove('dxp-block');
        }
        // Collapse expanded menu items on Esc key
        if (expandedMenus && keycode === 27) {
            this.focusElement(ariaExpanded);
            ariaExpanded.setAttribute(ARIA_EXPANDED, 'false');
            expandedMenus.classList.remove('dxp-block');
        }
    }
    /** Hide entire navigation in mobile with hamburger (close button) */
    hideNav(nav, target, expandedItems) {
        const overlay = document.querySelector('.nav-overlay');
        nav.classList.remove('nav-height');
        nav.classList.remove('overflow-y-auto');
        target.classList.remove('nav-close');
        target.classList.add('hamburger-btn');
        // Collapse all expanded menu items
        this.collapseAllMenus(expandedItems);
        // Remove navigation overlay background
        if (overlay) {
            setTimeout(() => {
                overlay.remove();
            }, 200);
        }
    }
    /** Hide expanded nav item (level 2) if the tab key pressed on first level menu item */
    hideNavItem(target, isLevelOne, expandedNavItem, keycode) {
        if (isLevelOne && expandedNavItem && keycode === 9) {
            target.setAttribute(ARIA_EXPANDED, 'false');
            expandedNavItem.classList.remove('dxp-block');
        }
    }
    /** Hide expanded sibling sub items */
    hideSubMenu(expandedSubItems) {
        // Prevent the set time out execution
        clearTimeout(this.clearSetTimeout);
        expandedSubItems.previousElementSibling.classList.remove(ACTIVE_LINK);
        expandedSubItems.classList.remove('down');
        expandedSubItems.nextElementSibling.classList.remove('in');
        expandedSubItems.nextElementSibling.classList.remove(MAX_HEIGHT_NONE);
    }
    /** Mobile menu/sub menu expand and collapse */
    menuItemsHandler(target, itemContainer, expandedItems, expandedMainMenu) {
        const expandedSubItems = expandedMainMenu ? expandedMainMenu.querySelector('.down') : undefined;
        if (target && target.classList.contains('caret')) {
            // Expand collapse menu items
            if (!target.classList.contains('down')) {
                // Before expand current nested menu items.
                // It hides all previous expanded menu & sub menu items
                if (expandedItems && !expandedMainMenu) {
                    this.collapseAllMenus(expandedItems);
                }
                // Hide expanded sibling sub items before new will expand
                if (expandedMainMenu && expandedSubItems) {
                    this.hideSubMenu(expandedSubItems);
                }
                // Expand nested menu/sub menu items
                target.previousElementSibling.classList.add(ACTIVE_LINK);
                target.classList.add('down');
                itemContainer.classList.add('in');
                this.clearSetTimeout = setTimeout(() => {
                    itemContainer.classList.add(MAX_HEIGHT_NONE);
                }, 600);
            }
            else if (expandedMainMenu && expandedSubItems) {
                // Hide expanded sub menu item clicking on same already expanded sub menu item
                this.hideSubMenu(expandedSubItems);
            }
            else {
                this.collapseAllMenus(expandedItems);
            }
        }
    }
    /** Navigate expanded menu items */
    navigateInExpandedMenu(isNavItem, keycode, subItems, nextItem) {
        if (isNavItem && (keycode === 39 || keycode === 40)) {
            // Select first link of nav sub item
            if (subItems) {
                const links = subItems.querySelectorAll('a');
                this.focusElement(links[1]);
            }
            // Select next nav item (level-2)
            if (!subItems && nextItem) {
                nextItem.querySelector('.mega-menu-content a').focus();
            }
        }
    }
    /** Navigate in nav-sub-menu items */
    navigateSubItems(isSubItem, nextSubItem, keycode, prevSubItem) {
        // Next
        if (isSubItem && nextSubItem && (keycode === 39 || keycode === 40)) {
            nextSubItem.querySelector('a').focus();
        }
        // Previous
        if (isSubItem && prevSubItem && (keycode === 37 || keycode === 38)) {
            prevSubItem.querySelector('a').focus();
        }
    }
    /** This prevents the page scrolling when space bar or arrows keys use to navigate the menu items */
    preventDefaultAction(event, keys) {
        if (keys.indexOf(event.keyCode) > -1) {
            event.preventDefault();
        }
    }
    /** Select Level two's first menu item with down arrow key */
    selectNestedMenuItem(nestedItem, keycode, isExpanded) {
        if (nestedItem && (keycode === 39 || keycode === 40) && isExpanded) {
            const menuItem = nestedItem.querySelector('.mega-menu-content');
            const link = menuItem.querySelector('a');
            this.focusElement(link);
        }
    }
    /** Select next nav item (level 2) from nav sub item (Level 3) */
    selectNextNavItem(isSubItem, nextSubItem, nextItem, keycode) {
        if (isSubItem && !nextSubItem && nextItem && (keycode === 39 || keycode === 40)) {
            nextItem.querySelector('.mega-menu-content a').focus();
        }
    }
    /** Select parent nav item with up arrow key (if first sub menu item is already selected) */
    selectParentNavItem(target, prevSubItem, isSubItem, keycode) {
        // Previous nav item
        if (isSubItem && !prevSubItem && (keycode === 37 || keycode === 38)) {
            const navItem = target.closest('.mega-menu-content').querySelector('.mega-menu-link');
            this.focusElement(navItem);
        }
    }
    /** select previous nav sub item (nav sub item) OR nav item (level-2) */
    selectPrevNavItem(isNavItem, prevItem, keycode) {
        if (isNavItem && prevItem && (keycode === 37 || keycode === 38)) {
            const lastSubItem = prevItem.querySelectorAll('.mega-sub-menu-link');
            // Select last nav sub link of previous nav-item
            if (lastSubItem.length) {
                this.focusElement(lastSubItem[lastSubItem.length - 1]);
            }
            else {
                this.focusElement(prevItem.querySelector('.mega-menu-link'));
            }
        }
    }
    /**
     * Show/hide the nested menu items
     * Space bar key can show and hide the dropdown menu items
     * Down arrow key only expand menu items
     */
    showHideMenuWithKeys(target, keycode, nestedItem, isExpanded) {
        if ((keycode === 32 || keycode === 39 || keycode === 40) && nestedItem) {
            // Space bar key
            if (keycode !== 39 && keycode !== 40 && isExpanded) {
                target.setAttribute(ARIA_EXPANDED, 'false');
                nestedItem.classList.remove('dxp-block');
            }
            else {
                target.setAttribute(ARIA_EXPANDED, 'true');
                nestedItem.classList.add('dxp-block');
            }
        }
    }
    /** Render the navigation */
    render() {
        dxp.log.debug(`in dxp-navigation render() : ${process.env.MODE}`);
        return (h("nav", { dir: this.dir, "data-theme": this.theme, class: `${this.base.componentClass()} nav-primary`, role: "navigation" },
            h("ul", { class: "nav", role: "menu" }, this.navData && this.navData.navigationData
                ? this.navData.navigationData.map(navItem => h("dxp-nav-group", { "link-title": navItem['linkTitle'], "navigation-title": navItem['navigationTitle'], "menu-route-link": navItem['menuRouteLink'], "accessibility-text": navItem['accessibilityText'], child: navItem['child'] }))
                : h("slot", null))));
    }
    static get is() { return "dxp-navigation"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-navigation.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-navigation.css"]
    }; }
    static get properties() { return {
        "apiUrl": {
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
                "text": "api url for navigation"
            },
            "attribute": "api-url",
            "reflect": false
        },
        "navData": {
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
                "text": "Navigation items"
            },
            "attribute": "nav-data",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "handleClickEvent",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "click",
            "method": "handleDocumentClick",
            "target": "document",
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "handleKeydownEvents",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keyup",
            "method": "handleUpkeyEvents",
            "target": "document",
            "capture": false,
            "passive": false
        }, {
            "name": "resize",
            "method": "onWindowResize",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
