import { r as registerInstance, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';
import { m as messages } from './messages-14b75d1c.js';

const IN_PAGE_NAV_ITEM = 'dxp-in-page-nav-item';
const IN_PAGE_NAV_CLASS = '.dxp-in-page-nav';
const IN_PAGE_NAV_ITEM_CLASS = '.dxp-in-page-nav-item';
const InPageNav = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /** inPageNavItemsData */
    dataChangeHandler() {
        this.base.createNestedMarkup(this.itemContainer, IN_PAGE_NAV_ITEM, this.inPageNavItemsData);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'InPageNav', messages);
        const shadow = this.element ? this.element : this.element;
        let href = ``;
        dxp.util.appendLinkElement(shadow, href);
        href = `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}.min.css`;
        dxp.util.appendLinkElement(shadow, href);
    }
    /** On component load */
    async componentDidLoad() {
        this.dataChangeHandler();
        const navBar = this.element ? this.element.querySelector(IN_PAGE_NAV_CLASS) : this.element.querySelector(IN_PAGE_NAV_CLASS);
        this.NAV_HEIGHT = this.clientHeight(navBar);
        this.NAV_OFFSET_TOP = navBar['offsetTop'];
        this.navItems = this.element.querySelectorAll(IN_PAGE_NAV_ITEM).length ?
            this.element.querySelectorAll(IN_PAGE_NAV_ITEM)
            :
                this.element.querySelectorAll(IN_PAGE_NAV_ITEM);
        await this.handleScroll();
    }
    /** listen to window scroll event */
    async handleScroll() {
        let tabActive;
        for (let index = 0; index < this.navItems.length; index++) {
            const isElemInViewport = (index === this.navItems.length - 1) ?
                this.checkViewPort(document.querySelector(await this.navItems[index].getHref()), undefined)
                :
                    this.checkViewPort(document.querySelector(await this.navItems[index].getHref()), document.querySelector(await this.navItems[index + 1].getHref()));
            if (isElemInViewport && !tabActive) {
                this.navItems[index].setAttribute('active', true);
                tabActive = true;
            }
            else {
                this.navItems[index].setAttribute('active', false);
            }
        }
        if (window.innerWidth < 767 && !tabActive) {
            await this.navItems[0].setActive();
        }
        const navbar = this.element ? this.element.querySelector('nav') : this.element.querySelector('nav');
        const navBarRoot = this.element ? this.element.querySelector(IN_PAGE_NAV_CLASS) : this.element.querySelector(IN_PAGE_NAV_CLASS);
        if (navbar) {
            if (window.pageYOffset > navbar.offsetTop) {
                navbar.classList.add('fixed');
                navBarRoot.classList.add('fixed');
            }
            if (window.pageYOffset <= this.NAV_OFFSET_TOP) {
                navbar.classList.remove('fixed');
                navBarRoot.classList.remove('fixed');
            }
        }
    }
    /** click listener for routing events on anchor tag */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** function to check if a given div is in viewport or not */
    checkViewPort(element, nextElement) {
        if (nextElement) {
            return ((element.getBoundingClientRect().top) < this.NAV_HEIGHT + (window.innerHeight / 2))
                && ((nextElement.getBoundingClientRect().top) > this.NAV_HEIGHT + (window.innerHeight / 2));
        }
        return ((element.getBoundingClientRect().top) < this.NAV_HEIGHT + (window.innerHeight / 2))
            && (Number.MAX_VALUE > this.NAV_HEIGHT + (window.innerHeight / 2));
    }
    /** method to calculate client height */
    clientHeight(elem) {
        return elem.clientHeight;
    }
    /** function to toggle nav dropdown on mobile devices */
    toggleNavDropdown() {
        if (window.innerWidth <= 767) {
            const caret = this.element.querySelector('.triangle') || this.element.querySelector('.triangle');
            if (caret.classList.contains('up')) {
                caret.classList.remove('up');
                caret.classList.add('down');
            }
            else {
                caret.classList.add('up');
                caret.classList.remove('down');
            }
            this.navItems.forEach(async (item) => {
                item.querySelector(IN_PAGE_NAV_ITEM_CLASS).classList.toggle('dxp-block');
                if (await item.getActive()) {
                    item.querySelector(IN_PAGE_NAV_ITEM_CLASS).classList.add('bg-white');
                }
                else {
                    item.querySelector(IN_PAGE_NAV_ITEM_CLASS).classList.remove('bg-white');
                }
            });
        }
    }
    /** Render in-page-nav */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-in-page-nav render() : ${"DEVELOPMENT"}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && (h("link", { rel: "stylesheet", href: `` }))],
            [this.theme && (h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-in-page-nav.min.css` }))]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, h("nav", null, h("ul", { class: "nav-list", role: "menu", onClick: () => this.toggleNavDropdown() }, h("div", { ref: el => (this.itemContainer = el) }, h("slot", null))), h("div", { class: "triangle down", onClick: () => this.toggleNavDropdown() }))));
    }
    get element() { return getElement(this); }
    static get watchers() { return {
        "inPageNavItemsData": ["dataChangeHandler"]
    }; }
    static get style() { return "div.dxp.dxp-in-page-nav{text-align:center;z-index:2}div.dxp.dxp-in-page-nav nav{width:100%;min-height:55px;z-index:1}div.dxp.dxp-in-page-nav nav .nav-list{margin:0}div.dxp.dxp-in-page-nav .fixed{position:fixed;top:0;left:0;-webkit-box-shadow:0 4px 6px 0 rgba(20,20,19,.1);box-shadow:0 4px 6px 0 rgba(20,20,19,.1);z-index:10}div.dxp.dxp-in-page-nav .triangle.down,div.dxp.dxp-in-page-nav .triangle.up{border-top:0}\@media screen and (min-width:320px) and (max-width:767px){div.dxp.dxp-in-page-nav{z-index:2}div.dxp.dxp-in-page-nav .triangle{display:inline-block;margin:0 5px;vertical-align:middle;position:absolute;right:20px;width:0;height:9px}div.dxp.dxp-in-page-nav .triangle.up{border-left:8px solid transparent;border-right:8px solid transparent;margin-top:24px}div.dxp.dxp-in-page-nav .triangle.down{border-left:8px solid transparent;border-right:8px solid transparent;margin-top:28px}div.dxp.dxp-in-page-nav nav{width:100%;min-height:55px;position:relative}div.dxp.dxp-in-page-nav nav .nav-list{width:100%;float:left;padding:0}div.dxp.dxp-in-page-nav.fixed{position:fixed;top:0;left:0}}"; }
};

export { InPageNav as dxp_in_page_nav };
