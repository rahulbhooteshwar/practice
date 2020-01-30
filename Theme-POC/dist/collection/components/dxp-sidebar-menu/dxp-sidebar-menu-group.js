import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const SIDEBAR_MENU_ITEM = 'dxp-sidebar-menu-item';
/** dxp-sidebar-menu */
export class SidebarMenuGroup {
    constructor() {
        /** value to check for child side-menu-items */
        this.hasChildMenuItems = true;
    }
    /** Listener that looks for messageTexts object to be assigned/changed externally */
    subMenuChangeHandler() {
        this.base.createNestedMarkup(this.subMenuContainer, SIDEBAR_MENU_ITEM, this.child);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'SidebarMenuGroup', messages);
    }
    /** actions to be performed after component loaded */
    componentDidLoad() {
        this.subMenuChangeHandler();
        const shadowEle = this.base.shadowRootQuerySelector(this.element, SIDEBAR_MENU_ITEM, true);
        const childElement = shadowEle && shadowEle.length ? shadowEle : this.element.querySelectorAll(SIDEBAR_MENU_ITEM);
        this.hasChildMenuItems = childElement.length > 0;
    }
    /** Actions to perform after component update */
    componentDidUpdate() {
        this.subMenuChangeHandler();
    }
    /** for mouse click outside of component */
    clickOutsideComponentEvent(e) {
        if ((e.target || e.target) && e.composedPath()[0]) {
            this.toggle = e.composedPath()[0].className === 'menu-item' || e.composedPath()[0].classList.contains('collapse-icon')
                || e.composedPath()[0].className === 'caret-icon' || e.composedPath()[0].classList.contains('item-label')
                || e.composedPath()[0].classList.contains('item-icon') || e.composedPath()[0].classList.contains('menu-icon-image')
                || (e.composedPath()[0].classList.contains('sub-item-label')) ? this.toggle : false;
        }
    }
    /** show and hide overlay */
    handleKeyPress(event) {
        const keys = [32, 37, 38, 39, 40];
        // handle expand/collapse menu-item
        const eventKey = event.key || event.keyCode;
        if ((eventKey === ' ' || eventKey === 32) || (eventKey === 'Enter' || eventKey === 13)) {
            this.toggleMenu();
        }
        // This prevents the page scrolling when space bar or arrows keys use to navigate the menu items
        this.preventDefaultAction(event, keys);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** to collapse sideMenu group from parent component */
    async collapse() {
        this.toggle = false;
    }
    /** to expand sideMenu group from parent component */
    async expand() {
        this.toggle = true;
    }
    /** This prevents the page scrolling when space bar or arrows keys use to navigate the menu items */
    preventDefaultAction(event, keys) {
        const eventKey = event.key || event.keyCode;
        if (keys.indexOf(eventKey) > -1) {
            event.preventDefault();
        }
    }
    /** Sub-menu item container */
    renderMenuItems() {
        return (h("div", { class: `child-menu dxp-scrollable ${(this.viewPopup && this.toggle) ? 'tool' : this.toggle ? 'dxp-block' : 'dxp-none'}`, style: { 'max-height': this.menuItemsListMaxHeight } },
            this.viewPopup && this.toggle && h("span", { class: "caret-icon" }),
            h("div", { class: "sub-menu-wrapper" },
                this.viewPopup && h("span", { class: "item-heading dxp-flex" }, this.menuTitle),
                h("div", { ref: el => this.subMenuContainer = el },
                    h("slot", null)))));
    }
    /** Action for toggle component */
    toggleMenu() {
        const menuGroup = this.base.shadowRootQuerySelector(this.element, 'a', false);
        if (!this.hasChildMenuItems && this.menuHref) {
            menuGroup.setAttribute('href', this.menuHref);
            menuGroup.setAttribute('target', '_blank');
        }
        this.toggleEmitter.emit();
        this.toggle = !this.toggle;
    }
    /** Render the sidebar-menu */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-sidebar-menu-group render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-sidebar-menu.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "item-wrapper dxp-scrollable-container" },
                h("div", null,
                    h("a", { tabindex: "0", title: this.menuTitle, onClick: () => this.toggleMenu(), class: `menu-item ${(this.toggle && this.menuHref) ? 'active' : ''} ${(this.toggle && this.hasChildMenuItems) ? 'item-expanded active' : ''}`, "aria-expanded": (this.toggle && this.hasChildMenuItems) ? 'true' : 'false' },
                        h("span", { class: "item-icon dxp-flex" },
                            h("img", { src: this.menuSrc, class: "menu-icon-image", alt: this.menuAlt })),
                        h("span", { class: `item-label ${this.viewPopup ? 'dxp-none' : 'dxp-flex'}` },
                            this.menuTitle,
                            this.hasChildMenuItems && h("i", { class: "caret-icon" })))),
                this.hasChildMenuItems && this.renderMenuItems()),
            h("dxp-line", { type: "solid", "border-color": "#d0d0d0", "background-color": "transparent", "height-xl": "1", "height-lg": "1", "height-md": "1", "height-sm": "1" })));
    }
    static get is() { return "dxp-sidebar-menu-group"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-sidebar-menu-group.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-sidebar-menu-group.css"]
    }; }
    static get properties() { return {
        "menuAlt": {
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
                "text": "sets logo alt"
            },
            "attribute": "menu-alt",
            "reflect": false
        },
        "menuHref": {
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
                "text": "sets link for menu-logo to display"
            },
            "attribute": "menu-href",
            "reflect": false
        },
        "menuItem": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "sets the menu items to be display"
            },
            "attribute": "menu-item",
            "reflect": false
        },
        "menuItemsListMaxHeight": {
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
                "text": "sets max height for the list of child elements inside a menu group"
            },
            "attribute": "menu-items-list-max-height",
            "reflect": false
        },
        "menuSrc": {
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
                "text": "sets route link"
            },
            "attribute": "menu-src",
            "reflect": false
        },
        "menuTitle": {
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
                "text": "Navigation text will display in browser"
            },
            "attribute": "menu-title",
            "reflect": false
        },
        "viewPopup": {
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
                "text": "toggle variable to display popup"
            },
            "attribute": "view-popup",
            "reflect": false
        },
        "child": {
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
                "text": "sets the menu items to be display"
            },
            "attribute": "child",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "hasChildMenuItems": {},
        "locale": {},
        "theme": {},
        "toggle": {}
    }; }
    static get events() { return [{
            "method": "toggleEmitter",
            "name": "toggleEmitter",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emit toggle change"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "collapse": {
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
                "text": "to collapse sideMenu group from parent component",
                "tags": []
            }
        },
        "expand": {
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
                "text": "to expand sideMenu group from parent component",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "child",
            "methodName": "subMenuChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "clickOutsideComponentEvent",
            "target": "document",
            "capture": false,
            "passive": false
        }, {
            "name": "keypress",
            "method": "handleKeyPress",
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
