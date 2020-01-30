import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-6d333681.js';

const PANEL_SUB_MENU = 'dxp-panel-sub-menu';
const PanelMenu = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "dxp-row" }, h("div", { class: "panel-control-group panel-vertical" }, this.nestedMenus.map(menuElement => h("div", { class: `panel-control ${menuElement['active'] ? 'panel-control-active' : ''} ${this.fixedWidth ? 'panel-fixed-width' : ''}`, onClick: () => this.activateMenu(menuElement) }, h("slot", { name: "top" }), h("div", { tabindex: "0", role: "button", class: "panel-title", onFocus: event => this.focusedControl = event.target }, h("div", { class: "dxp-row dxp-ml-0 dxp-mr-0 dxp-no-gutters" }, h("div", { class: `dxp-text-truncate ${menuElement['progressBar'] ? 'dxp-col-lg-6 dxp-col-md-8 dxp-col-sm-12' : 'dxp-col-12'}` }, h("div", { class: "panel-icon-wrapper" }, menuElement['menuIconSrc']
            ? h("img", { src: menuElement['menuIconSrc'], alt: menuElement['alt'] ? menuElement['alt'] : menuElement['menuTitle'] })
            : ''), h("span", { class: `${this.iconOnlySm ? 'icon-only-sm' : ''}`, title: menuElement['menuTitle'], innerHTML: menuElement['menuTitle'] })), menuElement['progressBar'] ?
            h("div", { class: "dxp-col-lg-6 dxp-col-md-4 dxp-col-sm-12" }, h("div", { class: "dxp-mt-3 dxp-ml-1" }, h("dxp-progressbar", { type: "linear", "background-color": "#F3F0EE", "progress-color": menuElement['progressColor'], "current-value": menuElement['currentValue'], "max-value": menuElement['maxValue'], "have-description": "false", height: "5px" })))
            : '')), (menuElement['subMenu'] && menuElement['subMenu'].split(',').length) ?
            h("div", { class: "subpanel-wrapper" }, menuElement['subMenu'].split(',').map(subMenu => menuElement['active'] ? h("p", { class: "sub-menus ", title: subMenu, "aria-label": subMenu }, subMenu) : ''))
            : '')), h("slot", { name: "bottom" })), h("div", { class: "item-wrapper item-wrapper-vertical dxp-col-12" }, h("div", null, this.menuItems
            ? this.menuItems.map(menuItem => h("dxp-panel-sub-menu", { active: menuItem['active'], "menu-title": menuItem['menuTitle'], content: menuItem['content'], "menu-icon-src": menuItem['menuIconSrc'], alt: menuItem['alt'], "progress-bar": menuItem['progressBar'], "progress-color": menuItem['progressColor'], "current-value": menuItem['currentValue'], "max-value": menuItem['maxValue'], "sub-menu": menuItem['subMenu'] }))
            : h("slot", null))))));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-panel-menu{width:100%;padding:1rem}div.dxp.dxp-panel-menu .panel-control-group{width:100%;display:-ms-flexbox;display:flex;overflow-x:auto}div.dxp.dxp-panel-menu .panel-control-group.panel-vertical{display:inline-block;width:25%;padding-right:2.5rem;float:left}div.dxp.dxp-panel-menu .panel-control{text-align:left;background-color:inherit;border:none;outline:none;cursor:pointer;min-width:6.1875rem;background:transparent;border-radius:0;padding:0 12px;font-size:.875rem}div.dxp.dxp-panel-menu .panel-control.panel-fixed-width{width:100%}div.dxp.dxp-panel-menu .panel-control .panel-icon-wrapper{display:inline-block}\@media (max-width:767.9px){div.dxp.dxp-panel-menu .panel-control .panel-icon-wrapper{display:block}}div.dxp.dxp-panel-menu .panel-control .panel-icon-wrapper img{width:1.5rem;height:1.5rem;margin-right:.5rem}div.dxp.dxp-panel-menu .panel-control.panel-control-active .panel-title{border-bottom-width:6px;border-bottom-style:solid;outline:none}div.dxp.dxp-panel-menu .panel-control.panel-control-active .subpanel-wrapper{padding:1rem 0}div.dxp.dxp-panel-menu .panel-control.panel-control-active .subpanel-wrapper .sub-menus{margin-bottom:.5rem}div.dxp.dxp-panel-menu .panel-control.panel-control-active .subpanel-wrapper .sub-menus:last-child{margin-bottom:0}div.dxp.dxp-panel-menu .panel-control .panel-title{padding:.75rem .0625rem;height:100%}\@media (max-width:767.9px){div.dxp.dxp-panel-menu .panel-control .panel-title .icon-only-sm{display:none}}div.dxp.dxp-panel-menu .panel-control:not(.panel-control-active) .panel-title:focus,div.dxp.dxp-panel-menu .panel-control:not(.panel-control-active) .panel-title:hover{border-bottom-width:2px;border-bottom-style:solid}div.dxp.dxp-panel-menu .item-wrapper.item-wrapper-vertical{padding:0 0 2rem 1rem;width:calc(75% - 1.5rem);display:inline-block}div.dxp.dxp-panel-menu .item-wrapper .item-container{padding:3rem 0;border-top-width:1px;border-top-style:solid}\@media (max-width:767px){div.dxp.dxp-panel-menu .panel-control{font-size:.75rem;min-width:9rem}div.dxp.dxp-panel-menu .panel-control.panel-control-active .panel-title{border-bottom-width:4px}div.dxp.dxp-panel-menu .panel-control .panel-icon-wrapper img{margin-bottom:.5rem}}"; }
};

export { PanelMenu as dxp_panel_menu };
