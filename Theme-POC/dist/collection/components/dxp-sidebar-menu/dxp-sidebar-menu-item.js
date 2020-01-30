import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
/** dxp-accordion-item */
export class SidebarMenuItem {
    /** life cycle hook runs before loading the component */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Sidebar-Menu-Item', messages);
    }
    /** render dxp-accordion item(s) */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-sidebar-menu-item render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-sidebar-menu.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("a", { tabindex: "0", "aria-label": this.subMenuTitle, href: this.subMenuHref, target: this.openInNewTab ? '_blank' : '_self', title: this.subMenuTitle, class: "sub-menu-item", role: "sub-menu" },
                h("span", { class: "sub-item-icon dxp-flex" },
                    h("img", { src: this.subMenuSrc, alt: this.subMenuAlt })),
                h("span", { class: "sub-item-label" }, this.subMenuTitle))));
    }
    static get is() { return "dxp-sidebar-menu-item"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-sidebar-menu-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-sidebar-menu-item.css"]
    }; }
    static get properties() { return {
        "openInNewTab": {
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
                "text": "Link target.  Set to true to open in an new window."
            },
            "attribute": "open-in-new-tab",
            "reflect": false
        },
        "subMenuAlt": {
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
            "attribute": "sub-menu-alt",
            "reflect": false
        },
        "subMenuHref": {
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
                "text": "sets link for sub-menu-logo to display"
            },
            "attribute": "sub-menu-href",
            "reflect": false
        },
        "subMenuIcon": {
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
            "attribute": "sub-menu-icon",
            "reflect": false
        },
        "subMenuSrc": {
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
            "attribute": "sub-menu-src",
            "reflect": false
        },
        "subMenuTitle": {
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
            "attribute": "sub-menu-title",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
}
