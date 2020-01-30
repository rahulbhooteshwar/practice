import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import { MenuType } from './dxp-selector-menu-constants';
import messages from './messages';
import xmlApi from './xml-api';
const DISABLED_CLASS = 'disabled';
const HAS_ERROR = 'has-error';
const ROTATE_ICON = 'rotate-icon';
const ENTER = 'Enter';
const DOWNARROW = 'ArrowDown';
const DOWN = 'Down';
const UPARROW = 'ArrowUp';
const UP = 'Up';
/** dxp-selector-menu */
export class SelectorMenu {
    constructor() {
        /** Array of icons URLS */
        this.iconsUrls = [];
        /** Enum used for different type of menu */
        this.menuType = MenuType.LinkSelector;
        /** a boolean used when enableLazyLoading is set to true to detect if there are more items available  */
        this.hasMoreItems = true;
        /** show/hide spinner */
        this.isLoading = false;
        /** checks if component is valid or not */
        this.isValid = true;
        /** element index of each element in the listbox */
        this.listIndex = -1;
        /** preserves the state of the current offset/page that is fetched when enableLazyLoading is set to true */
        this.offset = 0;
        /** responseData - service response data */
        this.responseData = [];
        /** holds the value entered in the searchbox */
        this.searchTerm = '';
        /** shows additional value for option with details selector type */
        this.additionalValue = '';
        /** Array provide for the user  */
        this.items = [];
        /** set id attribute for selector component */
        this.selectorId = '';
        /** set the value of selector menu */
        this.value = '';
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'SelectorMenu', messages);
        this.menuType = this.setEnumFromString(this.type);
        this.iconSprite = (this.theme === 'dxp-theme-b2b') ? 'b2b-sprite' : 'icons-sprite';
    }
    /** hook that is triggered after the component is loaded */
    componentDidLoad() {
        this.inputSearchBox = this.base.shadowRootQuerySelector(this.element, '.input-search');
    }
    /** triggered when the component is updated. */
    componentDidUpdate() {
        if (this.isLoading && this.element.querySelector('.spinner-wrapper')) {
            this.renderProgressbarSpinner();
        }
    }
    /** for mouse click outside of component */
    detectingClickOutside(e) {
        if (e.target && e.target && e.composedPath()[0]) {
            this.toggle = e.composedPath()[0].classList.contains('dxp-text-truncate')
                || e.composedPath()[0].classList.contains('selector-button') ? this.toggle : false;
        }
        else {
            this.toggle = false;
        }
    }
    /** listen to the access */
    handleKeyboardA11y(event) {
        const target = event.target
            ? event.target.activeElement
            : event.target;
        if (target === this.inputSearchBox) {
            this.listItemElements = target.closest('div').nextElementSibling.querySelectorAll('.list-item');
        }
        if (!this.listItemElements && !this.toggle) {
            return;
        }
        switch (event.key) {
            case ENTER:
                this.listItemElements[this.listIndex].click();
                break;
            case DOWNARROW:
            case DOWN:
                if (this.listIndex >= this.listItemElements.length - 1 || !this.toggle) {
                    break;
                }
                this.listIndex++;
                this.listItemElements[this.listIndex].focus();
                break;
            case UPARROW:
            case UP:
                if (this.listIndex <= 0 || !this.toggle) {
                    if (this.inputSearchBox) {
                        this.inputSearchBox.focus();
                        this.listIndex = -1;
                    }
                    break;
                }
                this.listIndex--;
                this.listItemElements[this.listIndex].focus();
                break;
            default:
                return;
        }
        this.activeListEl = this.listItemElements[this.listIndex];
        event.preventDefault();
    }
    /** for accessibility implementation */
    handleKeyUp(e) {
        const keycode = e.keyCode;
        const target = e.target
            ? e.target.activeElement
            : e.target;
        if (target && target.class === 'list-item') {
            if ((keycode === 13 || keycode === 32)) {
                this.toggle = false;
                this.toggleEmitter.emit({ visible: this.toggle });
            }
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** hides the loader */
    async hideSpinner() {
        this.isLoading = false;
    }
    /** shows the loader overlay in the center of the dropdown. */
    async showSpinner() {
        this.isLoading = true;
    }
    /** this method will be used to update isValid flag to show/hide validation message */
    async updateValidationState(isValid) {
        this.isValid = isValid;
    }
    /** sets the searchbox value to null */
    clearSearchBox() {
        if (!this.inputSearchBox) {
            return;
        }
        this.searchTerm = this.inputSearchBox.value = this.value = '';
        this.inputSearchBox.focus();
        this.isValid = true;
        this.closeDropdown();
        this.optionSelected = false;
        this.activeListEl = undefined;
        this.clearValue.emit();
    }
    /** clear selected option */
    clearSelectorMenu(event) {
        this.value = '';
        this.toggle = false;
        this.optionSelected = false;
        event.stopImmediatePropagation();
        event.preventDefault();
        this.clearValue.emit();
    }
    /** Closes the dropdown */
    closeDropdown() {
        this.toggle = false;
    }
    /** Get method to fetch the service data */
    async getData(apiUrl, query, offset, limit) {
        const opts = {
            method: 'GET',
            headers: this.apiHeaders ? JSON.parse(this.apiHeaders) : { 'Content-Type': 'application/json' }
        };
        this.additionalParams = this.setAdditionalParams(offset, limit);
        try {
            // aborting the previous xhr request call
            if (xmlApi.request) {
                xmlApi.request.abort();
            }
            const json = xmlApi.fetchRequest(apiUrl + encodeURI(query) + this.additionalParams, opts)
                .then((data) => {
                dxp.log.debug(this.element.tagName, 'getData()', `xhr request success`);
                this.apiCallCompleted.emit(data);
                this.searchEmitter.emit(query);
                return JSON.parse(data['response']);
            })
                .catch(error => {
                this.apiCallCompleted.emit(error);
                this.searchEmitter.emit(query);
                dxp.log.debug(this.element.tagName, 'getData()', `xhr request cancelled/failed : ${JSON.stringify(error)}`);
            });
            this.responseData = json;
            return this.responseData;
        }
        catch (e) {
            dxp.log.error(this.element.tagName, 'getData()', `fetch failed`, e);
        }
    }
    /** method to fetch the search suggester data */
    async handleChange(e) {
        this.searchTerm = e.trim();
        if (this.searchTerm.length >= this.minSearchCharLength) {
            this.isLoading = true;
            this.toggleComponent(true);
            await this.getData(this.apiUrl, this.searchTerm).then(data => {
                this.items = [];
                this.handleSuccess(data);
            });
        }
        else {
            this.closeDropdown();
            this.isValid = true;
            this.isLoading = false;
        }
    }
    /** handle success */
    handleSuccess(data) {
        const newArr = this.transformData ? this.transformData(data) : data;
        if (newArr.length < 1) {
            this.isValid = false;
            this.isLoading = false;
            this.closeDropdown();
            return;
        }
        this.items = this.items.concat(...newArr);
        this.isLoading = false;
        this.isValid = true;
        this.pageCount = this.enableLazyLoading ? data[this.totalPagesKeyName] : 0;
        this.hasMoreItems = this.pageCount > this.offset + 1;
    }
    /** event callback to the scroll event in the listbox */
    async onListboxScroll(e) {
        if (!this.enableLazyLoading) {
            return;
        }
        const target = e.target;
        const max = target.scrollHeight - target.offsetHeight;
        const pos = target.scrollTop;
        if (!this.hasMoreItems || this.isLoading) {
            return;
        }
        if (pos === max) {
            this.offset++;
            this.isLoading = true;
            await this.getData(this.apiUrl, this.searchTerm, this.offset, this.limit).then((data) => {
                target.scrollTop = max - target.clientHeight;
                this.handleSuccess(data);
            });
        }
    }
    /** emits an event with the search keyword entered in the textbox */
    onSearch(event) {
        if (this.toggle && event.type === 'focus') {
            return;
        }
        this.listIndex = -1;
        this.offset = 0;
        this.handleChange(event.target.value)
            .then(() => dxp.log.info(this.element.tagName, 'onTextInput()', `in handleChange`))
            .catch(err => dxp.log.error(this.element.tagName, 'onTextInput()', `in handleChange :${err}`));
    }
    /** Render default selector menu */
    renderDefaultSelector() {
        return (h("div", { class: "selector-button-wrapper" },
            h("button", { tabindex: `${this.disabled ? -1 : 0}`, id: this.selectorId, title: this.value, disabled: this.disabled, class: `default-selector selector-button dxp-text-truncate ${this.disabled ? DISABLED_CLASS : ''} ${this.isValid ? '' : HAS_ERROR}
        ${this.value ? 'more-padding' : 'has-placeholder'}`, onClick: () => this.toggleComponent() },
                !this.value ?
                    this.placeholder
                    : this.value,
                h("span", { class: `select-caret ${this.toggle ? ROTATE_ICON : ''} ${this.disabled ? DISABLED_CLASS : ''}` },
                    h("i", { class: `${this.iconSprite} caret-down-sm-b` }))),
            h("button", { role: "button", tabindex: `${this.disabled ? -1 : 0}`, class: `clear-search-btn ${!this.value ? 'dxp-none' : ''} ${this.disabled ? DISABLED_CLASS : ''}`, onClick: event => this.clearSelectorMenu(event), "aria-label": "Clear selected value" },
                h("i", { class: "dxp-icon dxp-icon-close" }))));
    }
    /** render list item */
    renderItem(item) {
        if (item.status) {
            return (h("div", { class: "has-icon" },
                this.renderListItem(item),
                this.renderListItemIcon(item.status)));
        }
        return (this.renderListItem(item));
    }
    /** render label */
    renderLabel() {
        return (h("label", { class: `dxp-input-label ${this.disabled ? 'dxp-disabled' : ''} ${!this.isValid && !this.isOptional ? 'dxp-error' : ''}` },
            this.label,
            " ",
            this.isOptional ? h("span", { class: "dxp-optional" }, " (optional)") : ''));
    }
    /** Render Link Selector menu */
    renderLinkSelector() {
        return (h("button", { role: "button", tabindex: `${this.disabled ? -1 : 0}`, id: this.selectorId, class: `btn-link selector-button ff-medium dxp-text-truncate ${(this.disabled ? DISABLED_CLASS : '')}`, onClick: () => this.toggleComponent() },
            !this.value ?
                this.placeholder
                : this.value,
            h("span", { class: `select-caret ${this.toggle ? ROTATE_ICON : ''} ${this.disabled ? DISABLED_CLASS : ''}` },
                h("i", { class: `${this.iconSprite} arrow-down-xs-o` }))));
    }
    /** render list item of list wrapper */
    renderListItem(item) {
        let value;
        if (item && this.dataSourceKeyName) {
            value = typeof (item[this.dataSourceKeyName]) === 'string' ? item[this.dataSourceKeyName] : this.setArrayValues(item[this.dataSourceKeyName]);
        }
        return value;
    }
    /** Set icon on the cell for predefine StatusType */
    renderListItemIcon(iconStatus) {
        if (iconStatus === undefined) {
            return;
        }
        return h("span", { class: 'icon-wrapper' },
            h("i", { class: `${this.iconSprite} ${iconStatus}` }));
    }
    /** Render Detaile Selector menu */
    renderOptionWithDetailsSelector() {
        return (h("button", { role: "button", id: this.selectorId, tabindex: `${this.disabled ? -1 : 0}`, class: `option-with-details-button selector-button ${(this.disabled ? DISABLED_CLASS : '')}`, onClick: () => this.toggleComponent() },
            h("p", { class: "option-with-details-name dxp-text-truncate", title: this.value },
                this.value,
                !this.toggle ? h("i", { class: `${this.iconSprite} arrow-down-xs-lo` }) : ''),
            h("p", { class: `option-with-details-location dxp-text-truncate ${this.toggle ? 'p-r-24' : ''}`, title: this.additionalValue }, this.additionalValue),
            this.toggle ? h("span", { class: "close-selector-menu" },
                h("i", { class: "dxp-icon dxp-icon-close" })) : ''));
    }
    /** Render spinner */
    renderProgressbarSpinner() {
        const target = this.element.querySelector('.list-wrapper');
        const pos = target.scrollTop;
        const spinnerPos = this.element.querySelector('.spinner-wrapper');
        if (spinnerPos && target) {
            spinnerPos.style.top = `${pos}px`;
        }
        return (h("div", { class: "spinner-wrapper" },
            h("dxp-progressspinner", { "stroke-width": "1", fill: "rgba(255,255,255,0)", "animation-duration": "2", "stroke-color": "#25836D" })));
    }
    /** Render Searchable Selector menu */
    renderSearchableSelector() {
        this.validationMessage = this.validationMessage === '' ? 'There are no records that match your result. Please try again.' : this.validationMessage;
        return (h("div", { class: "selector-button-wrapper search-container", "aria-haspopup": "listbox", "aria-owns": this.selectorId, "aria-expanded": this.toggle },
            h("input", { type: "text", class: `input-search dxp-text-truncate
          ${!this.isValid ? HAS_ERROR : ''} ${this.searchTerm.length > 0 || this.optionSelected ? 'more-padding' : ''}`, "aria-autocomplete": "list", "aria-controls": this.selectorId, "aria-invalid": !this.isValid, "aria-label": this.accessibilityText, "aria-required": !this.isOptional ? 'false' : 'true', autofocus: this.autofocus, disabled: this.disabled, id: this.selectorId, maxlength: this.maxSearchCharLength, placeholder: this.placeholder, tabindex: `${this.disabled ? -1 : 0}`, value: this.value ? this.value : this.searchTerm, onFocus: event => this.onSearch(event), onInput: event => this.onSearch(event) }),
            h("span", { class: `select-caret ${this.toggle ? ROTATE_ICON : ''} ${this.disabled ? DISABLED_CLASS : ''}` },
                h("i", { class: `${this.iconSprite} caret-down-sm-b` })),
            h("button", { tabindex: `${this.disabled ? -1 : 0}`, role: "button", class: `clear-search-btn ${this.disabled ? DISABLED_CLASS : ''} ${this.searchTerm.length > 0 || this.value.length > 0 ? '' : 'dxp-none'}`, onClick: () => this.clearSearchBox(), "aria-label": "Clear searchbox" },
                h("i", { class: "dxp-icon dxp-icon-close" })),
            !this.isValid ? h("div", { class: "dxp-error", id: "errMsg", "aria-label": this.validationMessage }, this.validationMessage) : ''));
    }
    /** Define the selector menu type */
    renderSelectorType() {
        switch (this.menuType) {
            case MenuType.DefaultSelector: {
                return this.renderDefaultSelector();
            }
            case MenuType.LinkSelector: {
                return this.renderLinkSelector();
            }
            case MenuType.OptionWithDetailsSelector: {
                return this.renderOptionWithDetailsSelector();
            }
            case MenuType.SearchableSelector: {
                return this.renderSearchableSelector();
            }
            default: {
                break;
            }
        }
    }
    /** Trigger action on the item selection. It will check if the selected item is of type array then first index is mapped to value & second index to additionalValue. */
    selectItem(item) {
        this.toggle = false;
        this.toggleEmitter.emit({ visible: this.toggle });
        this.value = Array.isArray(item[this.dataSourceKeyName]) ? item[this.dataSourceKeyName][0] : item[this.dataSourceKeyName];
        this.additionalValue = Array.isArray(item[this.dataSourceKeyName])
            ? (item[this.dataSourceKeyName][1]
                ? item[this.dataSourceKeyName][1]
                : this.additionalValue)
            : this.additionalValue;
        this.selectedItemChanged.emit({ 'optionSelected': item });
        this.optionSelected = true;
        this.isValid = true;
        this.listItemElements = [];
        if (this.inputSearchBox) {
            this.inputSearchBox.value = Array.isArray(item[this.dataSourceKeyName])
                ? item[this.dataSourceKeyName][0]
                : item[this.dataSourceKeyName];
        }
        this.searchTerm = '';
    }
    /** set additionalParams */
    setAdditionalParams(offset, limit) {
        this.additionalParams = '';
        return this.enableLazyLoading && offset && limit ? `&${this.offsetKeyName}=${offset}&${this.limitKeyName}=${limit}` : '';
    }
    /** set the array elements in the list box  */
    setArrayValues(items) {
        return items.reduce((acc, cur, i) => {
            if (this.menuType === MenuType.LinkSelector && items.length === 1) {
                acc.push(h("p", { innerHTML: cur }));
            }
            else {
                if (i === 0) {
                    acc.push(h("p", { class: "ff-medium", innerHTML: cur }));
                }
                else {
                    acc.push(h("p", { innerHTML: cur }));
                }
            }
            return acc;
        }, []);
    }
    /** Method used to convert string on the menutype enum  */
    setEnumFromString(typeString) {
        const menuEnumType = MenuType[typeString];
        if (menuEnumType === undefined) {
            return MenuType.LinkSelector;
        }
        return menuEnumType;
    }
    /** Action for toggle component */
    toggleComponent(openState) {
        if (!this.disabled) {
            this.toggle = openState ? openState : !this.toggle;
            this.toggleEmitter.emit({ visible: this.toggle });
            this.listItemElements = Array.from(this.element.querySelectorAll('.list-item'));
            this.listIndex = -1;
        }
    }
    /** Render the selector-menu */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-selector-menu render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-selector-menu.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            this.label ?
                this.renderLabel()
                : '',
            h("div", { class: "selector-menu-wrapper" },
                this.renderSelectorType(),
                h("div", { class: `item-container ${this.toggle ? 'dxp-block' : 'dxp-none'}` },
                    h("slot", { name: "item-container-slot" }),
                    h("ul", { "aria-label": "Selector dropdown", class: `list-wrapper ${this.isLoading ? 'no-scroll' : ''}`, style: { width: this.width ? `${this.width}rem` : '100%' }, role: "listbox", "aria-labelledby": this.selectorId, onScroll: event => this.onListboxScroll(event) },
                        this.isLoading ? this.renderProgressbarSpinner() : '',
                        h("slot", { name: "list-wrapper-slot" }),
                        !this.disabled && this.items && this.items.length ?
                            this.items.map((item, index) => h("li", { tabindex: "-1", class: "list-item", "data-index": index, id: `listItem-${index}`, role: "option", onClick: () => this.selectItem(item) }, this.renderItem(item)))
                            : '')))));
    }
    static get is() { return "dxp-selector-menu"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-selector-menu.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-selector-menu.css"]
    }; }
    static get properties() { return {
        "accessibilityText": {
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
                "text": "accessibility text for the searchbox"
            },
            "attribute": "accessibility-text",
            "reflect": false
        },
        "additionalValue": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "shows additional value for option with details selector type"
            },
            "attribute": "additional-value",
            "reflect": false,
            "defaultValue": "''"
        },
        "apiHeaders": {
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
                "text": "apiUrl - headers for API url"
            },
            "attribute": "api-headers",
            "reflect": false
        },
        "apiUrl": {
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
                "text": "apiUrl - suggest data API url"
            },
            "attribute": "api-url",
            "reflect": false
        },
        "autofocus": {
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
                "text": "set autofocus for searchable type component"
            },
            "attribute": "autofocus",
            "reflect": false
        },
        "dataSourceKeyName": {
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
                "text": "set dataSourceKeyName for configurable key name while pass data"
            },
            "attribute": "data-source-key-name",
            "reflect": false
        },
        "disabled": {
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
                "text": "state of button"
            },
            "attribute": "disabled",
            "reflect": false
        },
        "enableLazyLoading": {
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
                "text": "enable/disable lazy loading for the content loaded in the dropdown."
            },
            "attribute": "enable-lazy-loading",
            "reflect": false
        },
        "isOptional": {
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
                "text": "make selector menu optional"
            },
            "attribute": "is-optional",
            "reflect": false
        },
        "items": {
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
                "text": "Array provide for the user"
            },
            "defaultValue": "[]"
        },
        "label": {
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
                "text": "label for selector menu"
            },
            "attribute": "label",
            "reflect": false
        },
        "limit": {
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
                "text": "maximum record limit per page to enable lazy loading"
            },
            "attribute": "limit",
            "reflect": false
        },
        "limitKeyName": {
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
                "text": "number of records key name for each api call when enableLazyLoading is true"
            },
            "attribute": "limit-key-name",
            "reflect": false
        },
        "maxSearchCharLength": {
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
                "text": "maximum characters allowed in the searchbox"
            },
            "attribute": "max-search-char-length",
            "reflect": false
        },
        "minSearchCharLength": {
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
                "text": "minimum search character length"
            },
            "attribute": "min-search-char-length",
            "reflect": false
        },
        "offsetKeyName": {
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
                "text": "page number / offset key name when enableLazyLoading is true"
            },
            "attribute": "offset-key-name",
            "reflect": false
        },
        "placeholder": {
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
                "text": "placeholder of selector menu"
            },
            "attribute": "placeholder",
            "reflect": false
        },
        "selectorId": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "set id attribute for selector component"
            },
            "attribute": "selector-id",
            "reflect": false,
            "defaultValue": "''"
        },
        "totalPagesKeyName": {
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
                "text": "total number of pages key name when enableLazyLoading is true"
            },
            "attribute": "total-pages-key-name",
            "reflect": false
        },
        "transformData": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "(data: any[]) => {}",
                "resolved": "(data: any[]) => {}",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "method implemented in parent to to transform the data fetched from the APi"
            }
        },
        "type": {
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
                "text": "selector menu type"
            },
            "attribute": "type",
            "reflect": false
        },
        "validationMessage": {
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
                "text": "validation message"
            },
            "attribute": "validation-message",
            "reflect": false
        },
        "value": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "set the value of selector menu"
            },
            "attribute": "value",
            "reflect": false,
            "defaultValue": "''"
        },
        "width": {
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
                "text": "width of the menu box"
            },
            "attribute": "width",
            "reflect": false
        }
    }; }
    static get states() { return {
        "activeListEl": {},
        "additionalParams": {},
        "dir": {},
        "hasMoreItems": {},
        "inputSearchBox": {},
        "isLoading": {},
        "isValid": {},
        "listIndex": {},
        "listItemElements": {},
        "locale": {},
        "offset": {},
        "pageCount": {},
        "responseData": {},
        "searchTerm": {},
        "theme": {},
        "toggle": {}
    }; }
    static get events() { return [{
            "method": "apiCallCompleted",
            "name": "apiCallCompleted",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emit after the api call is completed"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "clearValue",
            "name": "clearValue",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "emits when the search box is cleared"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "searchEmitter",
            "name": "searchEmitter",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emit current value in the searchbox"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "selectedItemChanged",
            "name": "selectedItemChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emit selected item"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "toggleEmitter",
            "name": "toggleEmitter",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emit toggle change"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "hideSpinner": {
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
                "text": "hides the loader",
                "tags": []
            }
        },
        "showSpinner": {
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
                "text": "shows the loader overlay in the center of the dropdown.",
                "tags": []
            }
        },
        "updateValidationState": {
            "complexType": {
                "signature": "(isValid: boolean) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "this method will be used to update isValid flag to show/hide validation message",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "detectingClickOutside",
            "target": "document",
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "handleKeyboardA11y",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "keydown",
            "method": "handleKeyUp",
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
