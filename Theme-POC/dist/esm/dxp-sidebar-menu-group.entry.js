import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-f17494bc.js';

const SIDEBAR_MENU_ITEM = 'dxp-sidebar-menu-item';
const SidebarMenuGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** value to check for child side-menu-items */
        this.hasChildMenuItems = true;
        this.toggleEmitter = createEvent(this, "toggleEmitter", 7);
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
        return (h("div", { class: `child-menu dxp-scrollable ${(this.viewPopup && this.toggle) ? 'tool' : this.toggle ? 'dxp-block' : 'dxp-none'}`, style: { 'max-height': this.menuItemsListMaxHeight } }, this.viewPopup && this.toggle && h("span", { class: "caret-icon" }), h("div", { class: "sub-menu-wrapper" }, this.viewPopup && h("span", { class: "item-heading dxp-flex" }, this.menuTitle), h("div", { ref: el => this.subMenuContainer = el }, h("slot", null)))));
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-sidebar-menu-group render() : ${"DEVELOPMENT"}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-sidebar-menu.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "item-wrapper dxp-scrollable-container" }, h("div", null, h("a", { tabindex: "0", title: this.menuTitle, onClick: () => this.toggleMenu(), class: `menu-item ${(this.toggle && this.menuHref) ? 'active' : ''} ${(this.toggle && this.hasChildMenuItems) ? 'item-expanded active' : ''}`, "aria-expanded": (this.toggle && this.hasChildMenuItems) ? 'true' : 'false' }, h("span", { class: "item-icon dxp-flex" }, h("img", { src: this.menuSrc, class: "menu-icon-image", alt: this.menuAlt })), h("span", { class: `item-label ${this.viewPopup ? 'dxp-none' : 'dxp-flex'}` }, this.menuTitle, this.hasChildMenuItems && h("i", { class: "caret-icon" })))), this.hasChildMenuItems && this.renderMenuItems()), h("dxp-line", { type: "solid", "border-color": "#d0d0d0", "background-color": "transparent", "height-xl": "1", "height-lg": "1", "height-md": "1", "height-sm": "1" })));
    }
    get element() { return getElement(this); }
    static get watchers() { return {
        "child": ["subMenuChangeHandler"]
    }; }
    static get style() { return "div.dxp.dxp-sidebar-menu-group .item-wrapper .child-menu{overflow-y:scroll}div.dxp.dxp-sidebar-menu-group .tool{-webkit-transform:translate3d(3.5rem,-3.25rem,6.25rem);transform:translate3d(3.5rem,-3.25rem,6.25rem);position:absolute;display:inline-block;padding-left:.5rem}div.dxp.dxp-sidebar-menu-group .tool .caret-icon{position:absolute;left:0;top:1rem}div.dxp.dxp-sidebar-menu-group .tool .sub-menu-wrapper{display:inline-block;min-width:10rem}div.dxp.dxp-sidebar-menu-group .tool .sub-menu-wrapper .item-heading{padding:.75rem 1.2rem}div.dxp.dxp-sidebar-menu-group .menu-item{padding:1.2rem;display:-ms-flexbox;display:flex;cursor:pointer}div.dxp.dxp-sidebar-menu-group .menu-item .item-icon{width:1.5rem;background-size:contain}div.dxp.dxp-sidebar-menu-group .menu-item .item-icon img{width:100%;height:100%}div.dxp.dxp-sidebar-menu-group .menu-item .item-label{padding-left:.88rem;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}div.dxp.dxp-sidebar-menu-group .menu-item .item-label .caret-icon{width:.5rem;height:1rem;-webkit-transition:-webkit-transform .2s ease-in;transition:-webkit-transform .2s ease-in;transition:transform .2s ease-in;transition:transform .2s ease-in,-webkit-transform .2s ease-in;margin-left:auto}div.dxp.dxp-sidebar-menu-group .menu-item.item-expanded .caret-icon{-webkit-transform:rotate(90deg);transform:rotate(90deg)}div.dxp.dxp-sidebar-menu-group .item-label{padding-left:.93rem;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex:1 1 auto;flex:1 1 auto}"; }
};

export { SidebarMenuGroup as dxp_sidebar_menu_group };
