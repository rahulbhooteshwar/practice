import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import animator from './animation.utility';
import messages from './messages';
/** dxp-tab-item */
export class TabItem {
    constructor() {
        /** animation status */
        this.animationStatus = '';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Tabs', messages);
        this.setOrientation();
    }
    /** actions to be performed after component loading */
    async componentDidLoad() {
        // when this component is rendered inside slot of dxp-tabs
        let host = this.element.closest('dxp-tabs');
        // when this component is rendered inside shadow root of dxp-tabs
        host = host ? host : this.element['getRootNode']()['host'];
        const hostComponentRef = host && await host.componentOnReady();
        if (hostComponentRef) {
            await hostComponentRef.registerTab();
        }
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
    }
    /** close tab content */
    closeTabContentHandler(_e) {
        this.closeTabContent.emit(this.element);
    }
    /** set orientation */
    setOrientation() {
        // orientation vertical for view other than desktop
        this.orientationVertical = window.innerWidth < 992;
    }
    /** Render the tabs */
    render() {
        // set animator status
        animator.setStatus(this.animationStatus);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-tabs.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            (this.orientationVertical && this.verticalAlign && this.verticalContentPosition === 'accordion') ?
                h("dxp-tab-list", { active: this.active, "fixed-width": this.fixedWidth, "tab-icon-src": this.tabIconSrc, alt: this.alt, "tab-title": this.tabTitle, "vertical-align": this.verticalAlign, "icon-only-sm": this.iconOnlySm, "arrow-orientation": this.arrowOrientation }) : '',
            h("div", { tabindex: "-1", class: `${this.verticalAlign ? 'vertical' : 'horizontal'}
        ${(this.isDefaultView && this.verticalContentPosition !== 'accordion') ? 'default-view' : 'content-view'}
        tab-item-content ${this.active || (this.enableAnimation && this.isDefaultView && this.verticalContentPosition !== 'accordion') ? 'tab-item-active' : ''}
        ${(this.isDefault && this.verticalContentPosition !== 'accordion') ? 'tab-item-default' : ''}
        ${(this.isDefaultViewOn && this.verticalContentPosition !== 'accordion') ? 'default-view-on' : 'default-view-off'}
        ${this.orientationVertical && this.verticalAlign && this.verticalContentPosition === 'accordion' ? 'accordion-innerHeight' : ''}` },
                h("div", { tabindex: `${this.active ? 0 : -1}`, class: `${this.enableAnimation ? animator.getClass() : 'content-wrapper'}` },
                    this.content
                        ? h("div", { class: `${this.verticalAlign ? 'dxp-scrollable-container' : 'scrollable-container-horizontal'} ${this.isDefault ? 'default-scrollable-container' : ''}
              ${this.verticalContentPosition === 'accordion' ? 'accordion-scrollable-container' : ''}` },
                            h("div", { class: `${this.verticalAlign ? 'dxp-scrollable' : 'scrollable-horizontal'} ${this.isDefault ? 'default-scrollable' : ''}`, innerHTML: this.content }))
                        : h("div", { class: `${this.verticalAlign ? 'dxp-scrollable-container' : 'scrollable-container-horizontal'} ${this.isDefault ? 'default-scrollable-container' : ''}
          ${this.verticalContentPosition === 'accordion' ? 'accordion-scrollable-container' : ''}` },
                            h("div", { class: `${this.verticalAlign ? 'dxp-scrollable' : 'scrollable-horizontal'} ${this.isDefault ? 'default-scrollable' : ''}` },
                                h("slot", null))),
                    !this.isDefaultView && this.verticalContentPosition !== 'accordion' &&
                        h("button", { class: `button-container dxp-icon dxp-icon-close ${this.enableClose ? 'show' : 'hide'}`, onClick: e => { this.closeTabContentHandler(e); } }),
                    !this.isDefaultView && this.verticalContentPosition !== 'accordion' &&
                        h("div", { tabindex: "-1", class: `button-container bottom ${this.enableClose ? 'show' : 'hide'}` })))));
    }
    static get is() { return "dxp-tab-item"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-tab-item.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-tab-item.css"]
    }; }
    static get properties() { return {
        "active": {
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
                "text": "tab item status"
            },
            "attribute": "active",
            "reflect": false
        },
        "alt": {
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
                "text": "alt text for tab icon"
            },
            "attribute": "alt",
            "reflect": false
        },
        "animationStatus": {
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
                "text": "animation status"
            },
            "attribute": "animation-status",
            "reflect": false,
            "defaultValue": "''"
        },
        "arrowOrientation": {
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
                "text": "arrow orientation"
            },
            "attribute": "arrow-orientation",
            "reflect": false
        },
        "content": {
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
                "text": "tab item contents"
            },
            "attribute": "content",
            "reflect": false
        },
        "enableAnimation": {
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
                "text": "enable animation"
            },
            "attribute": "enable-animation",
            "reflect": false
        },
        "enableClose": {
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
                "text": "enable close"
            },
            "attribute": "enable-close",
            "reflect": false
        },
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
        "isDefault": {
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
                "text": "tab item is isDefault"
            },
            "attribute": "is-default",
            "reflect": false
        },
        "isDefaultView": {
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
                "text": "tab item is default view"
            },
            "attribute": "is-default-view",
            "reflect": false
        },
        "isDefaultViewOn": {
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
                "text": "is default view on"
            },
            "attribute": "is-default-view-on",
            "reflect": false
        },
        "tabIconSrc": {
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
                "text": "image url for tab icon"
            },
            "attribute": "tab-icon-src",
            "reflect": false
        },
        "tabTitle": {
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
                "text": "tab item title"
            },
            "attribute": "tab-title",
            "reflect": false
        },
        "verticalAlign": {
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
                "text": "vertical align"
            },
            "attribute": "vertical-align",
            "reflect": false
        },
        "verticalContentPosition": {
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
                "text": "vertical content position"
            },
            "attribute": "vertical-content-position",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "locale": {},
        "orientationVertical": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "closeTabContent",
            "name": "closeTabContent",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "emit close tab content event"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }, {
            "name": "resize",
            "method": "windowResize",
            "target": "window",
            "capture": false,
            "passive": true
        }]; }
}
