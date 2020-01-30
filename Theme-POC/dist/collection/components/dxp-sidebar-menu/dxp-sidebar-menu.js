import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const SIDEBAR_MENU_GROUP = 'dxp-sidebar-menu-group';
const SIDEBAR_EXPANDED = 'sidebar-expanded';
const SIDEBAR_COLLAPSED = 'sidebar-collapsed';
/** dxp-sidebar-menu */
export class SidebarMenu {
    constructor() {
        /** To display collapse in header/footer */
        this.expandCollapseIconPosition = 'footer';
    }
    /** Listener that looks for menu items object to be assigned/changed externally */
    menuChangeHandler() {
        this.base.createNestedMarkup(this.menuContainer, SIDEBAR_MENU_GROUP, this.menuItems);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'SidebarMenu', messages);
        if (this.expandOnHover) {
            this.showExpanded = false;
        }
    }
    /** actions to be performed after component loaded */
    async componentDidLoad() {
        this.menuChangeHandler();
        if (!this.showExpanded) {
            await this.collapse();
        }
        else {
            await this.expand();
        }
    }
    /** Listener for action to perform for keyup event */
    async handleKeyEvents(event) {
        const keys = [32, 37, 38, 39, 40];
        const eventKey = event.key || event.keyCode;
        const target = event.target ? event.composedPath()[0] : event.target;
        // collapse/expand sidebar menu panel
        if (target.classList.contains('collapse-icon')) {
            if ((eventKey === 32 || eventKey === 13)) {
                await this.collapseExpandSidebar();
            }
        }
        // This prevents the page scrolling when space bar or arrows keys use to navigate the menu items
        this.preventDefaultAction(event, keys);
    }
    /** click listener for routing events on anchor tag */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** function to collapse sidebar */
    async collapse() {
        const parentContainer = this.base.shadowRootQuerySelector(this.element, 'nav', false);
        parentContainer.classList.add(SIDEBAR_COLLAPSED);
        parentContainer.classList.remove(SIDEBAR_EXPANDED);
        this.setAndCollapse(true);
        this.collapsed.emit({ action: 'collapsed' });
    }
    /** To collapse/expand sidebar menu panel */
    async collapseExpandSidebar() {
        const parentContainer = this.base.shadowRootQuerySelector(this.element, 'nav', false);
        if (parentContainer && parentContainer.classList.contains(SIDEBAR_EXPANDED)) {
            parentContainer.classList.add(SIDEBAR_COLLAPSED);
            parentContainer.classList.remove(SIDEBAR_EXPANDED);
            this.setAndCollapse(true);
            this.collapsed.emit({ action: 'collapsed' });
        }
        else {
            parentContainer.classList.add(SIDEBAR_EXPANDED);
            parentContainer.classList.remove(SIDEBAR_COLLAPSED);
            this.setAndCollapse(false);
            this.expanded.emit({ action: 'expanded' });
        }
    }
    /**  function to expnd sidebar */
    async expand() {
        const parentContainer = this.base.shadowRootQuerySelector(this.element, 'nav', false);
        parentContainer.classList.add(SIDEBAR_EXPANDED);
        parentContainer.classList.remove(SIDEBAR_COLLAPSED);
        this.setAndCollapse(false);
        this.expanded.emit({ action: 'expanded' });
    }
    /** to return all sidebar menu group elements */
    getAllMenuGroupElements() {
        const menuGroups = this.base.shadowRootQuerySelector(this.element, SIDEBAR_MENU_GROUP, true);
        return menuGroups && menuGroups.length > 0 ? menuGroups : this.element.querySelectorAll(SIDEBAR_MENU_GROUP);
    }
    /** This prevents the page scrolling when space bar or arrows keys use to navigate the menu items */
    preventDefaultAction(event, keys) {
        const eventKey = event.key || event.keyCode;
        if (keys.indexOf(eventKey) > -1) {
            event.preventDefault();
        }
    }
    /** collapsing all opened sidebar menu groups on collapse/expand of sidebar menu panel */
    setAndCollapse(shouldShowView) {
        const elem = this.getAllMenuGroupElements();
        for (const i of Object.keys(elem)) {
            elem[i].viewPopup = shouldShowView;
            this.showExpanded = shouldShowView;
            elem[i].collapse();
        }
    }
    /** Render the sidebar-menu */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-sidebar-menu render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-sidebar-menu.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("nav", { class: `${this.expandCollapseIconPosition === 'footer' ? 'column-reverse' : ''}`, role: "navigation" },
                !this.expandOnHover && this.showExpandCollapseIcon && h("div", { class: "expand-collapse-icon" },
                    h("a", { class: "collapse-nav" },
                        h("span", { tabindex: "0", class: "collapse-icon tooltip-on-hover", onClick: async () => { await this.collapseExpandSidebar(); } },
                            h("span", { class: "tooltip" },
                                h("span", { class: "caret-icon" }),
                                h("div", { class: "sub-menu-wrapper" },
                                    h("span", { class: "dxp-flex icon-heading" }, this.showExpanded ? dxp.i18n.t('SidebarMenu:expandTxt') : dxp.i18n.t('SidebarMenu:collapseTxt'))))))),
                h("div", { class: "menu-wrapper" },
                    h("header", { class: 'header-order-one' },
                        h("slot", { name: "header" })),
                    h("div", { class: "sidebar", onMouseEnter: () => this.expandOnHover && this.expand(), onMouseLeave: () => this.expandOnHover && this.collapse() },
                        h("div", { class: "nav nav-sidebar", ref: el => this.menuContainer = el },
                            h("slot", null)))))));
    }
    static get is() { return "dxp-sidebar-menu"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-sidebar-menu.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-sidebar-menu.css"]
    }; }
    static get properties() { return {
        "expandCollapseIconPosition": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'header' | 'footer'",
                "resolved": "\"footer\" | \"header\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "To display collapse in header/footer"
            },
            "attribute": "expand-collapse-icon-position",
            "reflect": false,
            "defaultValue": "'footer'"
        },
        "expandOnHover": {
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
                "text": "prop to determine wherther to expand sidebar on hover or not"
            },
            "attribute": "expand-on-hover",
            "reflect": false
        },
        "showExpandCollapseIcon": {
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
                "text": "To toggle side panel collapse"
            },
            "attribute": "show-expand-collapse-icon",
            "reflect": false
        },
        "showExpanded": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "To toggle side panel collapse"
            },
            "attribute": "show-expanded",
            "reflect": false
        },
        "menuItems": {
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
            "attribute": "menu-items",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "collapsed",
            "name": "collapsed",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "event to be emitted when sidebar is collapsed"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "expanded",
            "name": "expanded",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "event to be emitted when sidebar is expanded"
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
                "text": "function to collapse sidebar",
                "tags": []
            }
        },
        "collapseExpandSidebar": {
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
                "text": "To collapse/expand sidebar menu panel",
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
                "text": "function to expnd sidebar",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "menuItems",
            "methodName": "menuChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "keypress",
            "method": "handleKeyEvents",
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
