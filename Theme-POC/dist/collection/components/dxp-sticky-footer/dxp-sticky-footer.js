import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
const TITLE_TEXT_CLASS = '.titleText';
const STICKY_CONTAINER_ID = '#stickyContainer';
/** dxp-sticky-footer */
export class FooterSticky {
    /** Listener that looks for cta object to be assigned/changed externally */
    ctaChangeHandler() {
        if (this.cta) {
            const footerprops = this.cta.map(it => (Object.assign(Object.assign({}, it), { footerType: this.footerType })));
            this.base.createNestedMarkup(this.ctaContainer, 'dxp-sticky-footer-cta', footerprops);
        }
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
    }
    /** actions to be performed after component loading */
    componentDidLoad() {
        // For supporting RTE, this code will work fine for the normal text too
        if (this.element && this.element.querySelector(TITLE_TEXT_CLASS)) {
            this.element.querySelector(TITLE_TEXT_CLASS).innerHTML = this.titleText;
        }
        else {
            if (this.element.querySelector(TITLE_TEXT_CLASS)) {
                this.element.querySelector(TITLE_TEXT_CLASS).innerHTML = this.titleText;
            }
        }
        this.ctaChangeHandler();
        setTimeout(() => {
            const stickyContainer = this.element.querySelectorAll(STICKY_CONTAINER_ID);
            if (this.footerType === 'sticky') {
                document.body.style.paddingBottom = `${stickyContainer[0]['offsetHeight'] + 50}px`;
            }
        }, 100);
    }
    /** Handle resize event */
    handleResize() {
        if (this.footerType === 'sticky') {
            const stickyContainer = this.element ? this.element.querySelectorAll(STICKY_CONTAINER_ID) : this.element.querySelectorAll(STICKY_CONTAINER_ID);
            document.body.style.paddingBottom = stickyContainer[0] && `${stickyContainer[0]['offsetHeight'] + 50}px`;
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Render the footer-sticky */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-sticky-footer render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-sticky-footer.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { id: "stickyContainer", class: this.footerType === 'sticky' ? 'sticky-footer' : 'non-sticky-footer' },
                h("div", { class: "dxp-text-center sticky-footer-cont" },
                    h("p", { class: "titleText sticky-footer-text" }, this.titleText),
                    h("div", { class: "btn-cont", ref: el => (this.ctaContainer = el) },
                        h("slot", { name: "footer-sticky-cta" }))))));
    }
    static get is() { return "dxp-sticky-footer"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-sticky-footer.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-sticky-footer.css"]
    }; }
    static get properties() { return {
        "footerType": {
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
                "text": "footer type on component level"
            },
            "attribute": "footer-type",
            "reflect": false
        },
        "titleText": {
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
                "text": "title Heading"
            },
            "attribute": "title-text",
            "reflect": false
        },
        "cta": {
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
                "text": "cta attributes"
            },
            "attribute": "cta",
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
            "propName": "cta",
            "methodName": "ctaChangeHandler"
        }]; }
    static get listeners() { return [{
            "name": "resize",
            "method": "handleResize",
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
