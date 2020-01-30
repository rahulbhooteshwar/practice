import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
const IN_PAGE_NAV_ITEM = 'dxp-in-page-nav-item';
const IN_PAGE_NAV_CLASS = '.dxp-in-page-nav';
const IN_PAGE_NAV_ITEM_CLASS = '.dxp-in-page-nav-item';
/** dxp-in-page-nav */
export class InPageNav {
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-in-page-nav render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && (h("link", { rel: "stylesheet", href: `` }))],
            [this.theme && (h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-in-page-nav.min.css` }))]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("nav", null,
                h("ul", { class: "nav-list", role: "menu", onClick: () => this.toggleNavDropdown() },
                    h("div", { ref: el => (this.itemContainer = el) },
                        h("slot", null))),
                h("div", { class: "triangle down", onClick: () => this.toggleNavDropdown() }))));
    }
    static get is() { return "dxp-in-page-nav"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-in-page-nav.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-in-page-nav.css"]
    }; }
    static get properties() { return {
        "inPageNavItemsData": {
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
                "text": "inPageNavItemsData"
            },
            "attribute": "in-page-nav-items-data",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "inPageNavItemsData",
            "methodName": "dataChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "scroll",
            "method": "handleScroll",
            "target": "window",
            "capture": false,
            "passive": true
        }, {
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
