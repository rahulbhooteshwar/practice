import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const PANEL_SUB_MENU = 'dxp-panel-sub-menu';
/** dxp-panel-menu */
export class PanelMenu {
    constructor() {
        /** Nested menu elements */
        this.nestedMenus = [];
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'PanelMenu', messages);
    }
    /** listen for key down on enter key to switch panel menus */
    keyDownHandler(event) {
        if (event.keyCode === 13 && this.focusedControl) {
            this.focusedControl.click();
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Following method will be called by child items to register items in sub-menus so that control group can be created */
    async registerMenu() {
        this.activateDefaultMenu();
        // re-render menu list by changing state
        this.nestedMenus = [...this.getRenderedMenuItems()];
    }
    /** activate default menu if not provided */
    activateDefaultMenu() {
        const activeMenus = this.getRenderedMenuItems() && this.getRenderedMenuItems().filter(menu => {
            return menu && menu['active'];
        });
        if (activeMenus && activeMenus.length === 0) {
            const firstMenu = this.getRenderedMenuItems()[0];
            if (firstMenu) {
                firstMenu['active'] = true;
            }
        }
    }
    /** activate default menu if not provided */
    activateMenu(menuElement) {
        for (const menu of this.nestedMenus) {
            menu['active'] = this.base.returnBooleanValue(menuElement.isEqualNode(menu));
        }
        // re-render menu controls by changing state
        this.nestedMenus = [...this.nestedMenus];
    }
    /** convert node list to array */
    getArrayFromNodeList(nodeList) {
        return [].slice.call(nodeList);
    }
    /** get array of rendered child sub-menu elements */
    getRenderedMenuItems() {
        // query select rendered items if child items are created within this component
        // querySelectorAll returns a NodeList, we can convert it to array using spread operator but that doesn't work on IE
        // so using array slicing workaround
        let renderedSubMenus = this.element ?
            this.getArrayFromNodeList(this.element.querySelectorAll(PANEL_SUB_MENU))
            :
                this.getArrayFromNodeList(this.element.querySelectorAll(PANEL_SUB_MENU));
        // if child items are not found within this component then search for slotted items (childNodes)
        renderedSubMenus = renderedSubMenus.length > 0 ? renderedSubMenus : this.getArrayFromNodeList(this.element.childNodes).filter(child => {
            return child['tagName'] && child['tagName'].toLowerCase() === PANEL_SUB_MENU;
        });
        return renderedSubMenus;
    }
    /** Render the panel-menu */
    render() {
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-panel-menu.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "dxp-row" },
                h("div", { class: "panel-control-group panel-vertical" },
                    this.nestedMenus.map(menuElement => h("div", { class: `panel-control ${menuElement['active'] ? 'panel-control-active' : ''} ${this.fixedWidth ? 'panel-fixed-width' : ''}`, onClick: () => this.activateMenu(menuElement) },
                        h("slot", { name: "top" }),
                        h("div", { tabindex: "0", role: "button", class: "panel-title", onFocus: event => this.focusedControl = event.target },
                            h("div", { class: "dxp-row dxp-ml-0 dxp-mr-0 dxp-no-gutters" },
                                h("div", { class: `dxp-text-truncate ${menuElement['progressBar'] ? 'dxp-col-lg-6 dxp-col-md-8 dxp-col-sm-12' : 'dxp-col-12'}` },
                                    h("div", { class: "panel-icon-wrapper" }, menuElement['menuIconSrc']
                                        ? h("img", { src: menuElement['menuIconSrc'], alt: menuElement['alt'] ? menuElement['alt'] : menuElement['menuTitle'] })
                                        : ''),
                                    h("span", { class: `${this.iconOnlySm ? 'icon-only-sm' : ''}`, title: menuElement['menuTitle'], innerHTML: menuElement['menuTitle'] })),
                                menuElement['progressBar'] ?
                                    h("div", { class: "dxp-col-lg-6 dxp-col-md-4 dxp-col-sm-12" },
                                        h("div", { class: "dxp-mt-3 dxp-ml-1" },
                                            h("dxp-progressbar", { type: "linear", "background-color": "#F3F0EE", "progress-color": menuElement['progressColor'], "current-value": menuElement['currentValue'], "max-value": menuElement['maxValue'], "have-description": "false", height: "5px" })))
                                    : '')),
                        (menuElement['subMenu'] && menuElement['subMenu'].split(',').length) ?
                            h("div", { class: "subpanel-wrapper" }, menuElement['subMenu'].split(',').map(subMenu => menuElement['active'] ? h("p", { class: "sub-menus ", title: subMenu, "aria-label": subMenu }, subMenu) : ''))
                            : '')),
                    h("slot", { name: "bottom" })),
                h("div", { class: "item-wrapper item-wrapper-vertical dxp-col-12" },
                    h("div", null, this.menuItems
                        ? this.menuItems.map(menuItem => h("dxp-panel-sub-menu", { active: menuItem['active'], "menu-title": menuItem['menuTitle'], content: menuItem['content'], "menu-icon-src": menuItem['menuIconSrc'], alt: menuItem['alt'], "progress-bar": menuItem['progressBar'], "progress-color": menuItem['progressColor'], "current-value": menuItem['currentValue'], "max-value": menuItem['maxValue'], "sub-menu": menuItem['subMenu'] }))
                        : h("slot", null))))));
    }
    static get is() { return "dxp-panel-menu"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-panel-menu.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-panel-menu.css"]
    }; }
    static get properties() { return {
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
        "menuItems": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "{\n    // tslint:disable-next-line: completed-docs\n    menuTitle: string,\n    // tslint:disable-next-line: completed-docs\n    active?: boolean,\n    // tslint:disable-next-line: completed-docs\n    content: string,\n    // tslint:disable-next-line: completed-docs\n    alt?: string,\n    // tslint:disable-next-line: completed-docs\n    menuIconSrc?: string,\n    // tslint:disable-next-line: completed-docs\n    subMenu?: any,\n    // tslint:disable-next-line: completed-docs\n    progressBar?: boolean,\n    // tslint:disable-next-line: completed-docs\n    currentValue?: number,\n    // tslint:disable-next-line: completed-docs\n    maxValue?: number\n    // tslint:disable-next-line: completed-docs\n    progressColor?: string\n  }[]",
                "resolved": "{ menuTitle: string; active?: boolean; content: string; alt?: string; menuIconSrc?: string; subMenu?: any; progressBar?: boolean; currentValue?: number; maxValue?: number; progressColor?: string; }[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Nested menu elements"
            }
        }
    }; }
    static get states() { return {
        "dir": {},
        "focusedControl": {},
        "locale": {},
        "nestedMenus": {},
        "theme": {}
    }; }
    static get methods() { return {
        "registerMenu": {
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
                "text": "Following method will be called by child items to register items in sub-menus so that control group can be created",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "keydown",
            "method": "keyDownHandler",
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
