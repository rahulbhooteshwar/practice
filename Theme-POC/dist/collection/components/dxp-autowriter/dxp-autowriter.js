import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
/** dxp-autowriter */
export class Autowriter {
    constructor() {
        /** variable for array objects */
        this.count = 0;
        /** variable text that gets displayed in loop as innerHTML */
        this.displayText = '';
        /** speed in milliseconds for interval to display next character */
        this.speed = 100;
        /** array text that needs to be displayed */
        this.textList = [];
    }
    /** calls function when value assigned to textList */
    textChange() {
        dxp.log.debug('Inside textChange');
        this.assignPlaceholderText();
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        if (this.textList.length > 0) {
            this.assignPlaceholderText();
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** method to clear intervals */
    async clearAutoWriterIntervals() {
        clearInterval(this._interval);
        clearInterval(this.interval);
    }
    /** reverse the direction of autowriter */
    alternatingWriterText() {
        // clear the interval of autowriter text
        clearInterval(this._interval);
        let counter2 = this.text.length;
        this.interval = setInterval(() => {
            counter2--;
            this._count = counter2;
            this.displayText = this.displayText.substring(0, this._count);
            if (this._count === -1) {
                this.assignPlaceholderText();
            }
        }, this.speed);
    }
    /** to assign all the objects of array */
    assignPlaceholderText() {
        if (this.count >= this.textList.length) {
            this.count = 0;
        }
        this.text = this.textList[this.count].text;
        this.count++;
        this.autowriterText();
    }
    /** to display the normal autowriter text */
    autowriterText() {
        // clear the interval of alternating text
        clearInterval(this.interval);
        this.counter = 0;
        this._interval = setInterval(() => {
            this.displayText += this.text.charAt(this.counter);
            this.counter++;
            // to display alternating text
            if (this.counter === this.text.length) {
                this.alternatingWriterText();
            }
        }, this.speed);
    }
    /** method to return autowriter dom with fix or moving cursor */
    renderAutowriter() {
        if (this.fixCursor) {
            return [
                h("span", { class: "blinking-cursor" }),
                h("span", { class: `display-text ${this.customStyleClass ? this.customStyleClass : ''}` }, this.displayText)
            ];
        }
        return [
            h("span", { class: `display-text ${this.customStyleClass ? this.customStyleClass : ''}` }, this.displayText),
            h("span", { class: "blinking-cursor" })
        ];
    }
    /** Render the autowriter */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-autowriter render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-autowriter.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            this.textList.length > 0 && this.renderAutowriter()));
    }
    static get is() { return "dxp-autowriter"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-autowriter.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-autowriter.css"]
    }; }
    static get properties() { return {
        "customStyleClass": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "''",
                "resolved": "\"\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "custom css class name if needed to be applied to display text"
            },
            "attribute": "custom-style-class",
            "reflect": false
        },
        "fixCursor": {
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
                "text": "to fix the cursor position at the start"
            },
            "attribute": "fix-cursor",
            "reflect": false
        },
        "speed": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "speed in milliseconds for interval to display next character"
            },
            "attribute": "speed",
            "reflect": false,
            "defaultValue": "100"
        },
        "textList": {
            "type": "unknown",
            "mutable": true,
            "complexType": {
                "original": "any[]",
                "resolved": "any[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "array text that needs to be displayed"
            },
            "defaultValue": "[]"
        }
    }; }
    static get states() { return {
        "dir": {},
        "displayText": {},
        "locale": {},
        "theme": {}
    }; }
    static get methods() { return {
        "clearAutoWriterIntervals": {
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
                "text": "method to clear intervals",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "element"; }
    static get watchers() { return [{
            "propName": "textList",
            "methodName": "textChange"
        }]; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
