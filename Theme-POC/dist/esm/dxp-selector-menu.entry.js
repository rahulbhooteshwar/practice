import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

/** Enum user to define menu */
var MenuType;
(function (MenuType) {
    MenuType[MenuType["LinkSelector"] = 0] = "LinkSelector";
    MenuType[MenuType["DefaultSelector"] = 1] = "DefaultSelector";
    MenuType[MenuType["OptionWithDetailsSelector"] = 2] = "OptionWithDetailsSelector";
    MenuType[MenuType["SearchableSelector"] = 3] = "SearchableSelector";
})(MenuType || (MenuType = {}));

const messages = {
    'en': {
        hello: 'Hello World!'
    },
    'en-US': {
        hello: 'Hello World! en-US'
    },
    'es': {
        hello: 'Hola Mundo!'
    },
    'es-ES': {
        hello: 'Hola Mundo! es-ES'
    }
};

/** common XMLHttpRequest for handling fetch request */
// currently using this XMLHttpRequest in search component to fetch the data
let xmlApi;
// Create the XHR request
const request = new XMLHttpRequest();
const fetchRequest = (url, params) => {
    // Return it as a Promise
    return new Promise((resolve, reject) => {
        // Setup our listener to process compeleted requests
        request.onreadystatechange = () => {
            // Only run if the request is complete
            if (request.readyState !== 4) {
                return;
            }
            // Process the response
            if (request.status >= 200 && request.status < 300) {
                // If successful
                resolve(request);
            }
            else {
                // If failed
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        };
        // If error
        request.onerror = () => {
            reject({
                status: request.status,
                statusText: request.statusText
            });
        };
        // Setup our HTTP request
        request.open(params.method, url, true);
        // Setup our HTTP request headers
        if (params.headers) {
            Object.keys(params.headers).forEach(key => {
                request.setRequestHeader(key, params.headers[key]);
            });
        }
        // Send the request
        request.send(params.body);
    });
};
xmlApi = {
    // exporting XMLHttpRequest object to use in search component to abort the previous fetch calls
    request,
    fetchRequest
};
const xmlApi$1 = xmlApi;

const DISABLED_CLASS = 'disabled';
const HAS_ERROR = 'has-error';
const ROTATE_ICON = 'rotate-icon';
const ENTER = 'Enter';
const DOWNARROW = 'ArrowDown';
const DOWN = 'Down';
const UPARROW = 'ArrowUp';
const UP = 'Up';
const SelectorMenu = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        this.apiCallCompleted = createEvent(this, "apiCallCompleted", 7);
        this.clearValue = createEvent(this, "clearValue", 7);
        this.searchEmitter = createEvent(this, "searchEmitter", 7);
        this.selectedItemChanged = createEvent(this, "selectedItemChanged", 7);
        this.toggleEmitter = createEvent(this, "toggleEmitter", 7);
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
            if (xmlApi$1.request) {
                xmlApi$1.request.abort();
            }
            const json = xmlApi$1.fetchRequest(apiUrl + encodeURI(query) + this.additionalParams, opts)
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
        return (h("div", { class: "selector-button-wrapper" }, h("button", { tabindex: `${this.disabled ? -1 : 0}`, id: this.selectorId, title: this.value, disabled: this.disabled, class: `default-selector selector-button dxp-text-truncate ${this.disabled ? DISABLED_CLASS : ''} ${this.isValid ? '' : HAS_ERROR}
        ${this.value ? 'more-padding' : 'has-placeholder'}`, onClick: () => this.toggleComponent() }, !this.value ?
            this.placeholder
            : this.value, h("span", { class: `select-caret ${this.toggle ? ROTATE_ICON : ''} ${this.disabled ? DISABLED_CLASS : ''}` }, h("i", { class: `${this.iconSprite} caret-down-sm-b` }))), h("button", { role: "button", tabindex: `${this.disabled ? -1 : 0}`, class: `clear-search-btn ${!this.value ? 'dxp-none' : ''} ${this.disabled ? DISABLED_CLASS : ''}`, onClick: event => this.clearSelectorMenu(event), "aria-label": "Clear selected value" }, h("i", { class: "dxp-icon dxp-icon-close" }))));
    }
    /** render list item */
    renderItem(item) {
        if (item.status) {
            return (h("div", { class: "has-icon" }, this.renderListItem(item), this.renderListItemIcon(item.status)));
        }
        return (this.renderListItem(item));
    }
    /** render label */
    renderLabel() {
        return (h("label", { class: `dxp-input-label ${this.disabled ? 'dxp-disabled' : ''} ${!this.isValid && !this.isOptional ? 'dxp-error' : ''}` }, this.label, " ", this.isOptional ? h("span", { class: "dxp-optional" }, " (optional)") : ''));
    }
    /** Render Link Selector menu */
    renderLinkSelector() {
        return (h("button", { role: "button", tabindex: `${this.disabled ? -1 : 0}`, id: this.selectorId, class: `btn-link selector-button ff-medium dxp-text-truncate ${(this.disabled ? DISABLED_CLASS : '')}`, onClick: () => this.toggleComponent() }, !this.value ?
            this.placeholder
            : this.value, h("span", { class: `select-caret ${this.toggle ? ROTATE_ICON : ''} ${this.disabled ? DISABLED_CLASS : ''}` }, h("i", { class: `${this.iconSprite} arrow-down-xs-o` }))));
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
        return h("span", { class: 'icon-wrapper' }, h("i", { class: `${this.iconSprite} ${iconStatus}` }));
    }
    /** Render Detaile Selector menu */
    renderOptionWithDetailsSelector() {
        return (h("button", { role: "button", id: this.selectorId, tabindex: `${this.disabled ? -1 : 0}`, class: `option-with-details-button selector-button ${(this.disabled ? DISABLED_CLASS : '')}`, onClick: () => this.toggleComponent() }, h("p", { class: "option-with-details-name dxp-text-truncate", title: this.value }, this.value, !this.toggle ? h("i", { class: `${this.iconSprite} arrow-down-xs-lo` }) : ''), h("p", { class: `option-with-details-location dxp-text-truncate ${this.toggle ? 'p-r-24' : ''}`, title: this.additionalValue }, this.additionalValue), this.toggle ? h("span", { class: "close-selector-menu" }, h("i", { class: "dxp-icon dxp-icon-close" })) : ''));
    }
    /** Render spinner */
    renderProgressbarSpinner() {
        const target = this.element.querySelector('.list-wrapper');
        const pos = target.scrollTop;
        const spinnerPos = this.element.querySelector('.spinner-wrapper');
        if (spinnerPos && target) {
            spinnerPos.style.top = `${pos}px`;
        }
        return (h("div", { class: "spinner-wrapper" }, h("dxp-progressspinner", { "stroke-width": "1", fill: "rgba(255,255,255,0)", "animation-duration": "2", "stroke-color": "#25836D" })));
    }
    /** Render Searchable Selector menu */
    renderSearchableSelector() {
        this.validationMessage = this.validationMessage === '' ? 'There are no records that match your result. Please try again.' : this.validationMessage;
        return (h("div", { class: "selector-button-wrapper search-container", "aria-haspopup": "listbox", "aria-owns": this.selectorId, "aria-expanded": this.toggle }, h("input", { type: "text", class: `input-search dxp-text-truncate
          ${!this.isValid ? HAS_ERROR : ''} ${this.searchTerm.length > 0 || this.optionSelected ? 'more-padding' : ''}`, "aria-autocomplete": "list", "aria-controls": this.selectorId, "aria-invalid": !this.isValid, "aria-label": this.accessibilityText, "aria-required": !this.isOptional ? 'false' : 'true', autofocus: this.autofocus, disabled: this.disabled, id: this.selectorId, maxlength: this.maxSearchCharLength, placeholder: this.placeholder, tabindex: `${this.disabled ? -1 : 0}`, value: this.value ? this.value : this.searchTerm, onFocus: event => this.onSearch(event), onInput: event => this.onSearch(event) }), h("span", { class: `select-caret ${this.toggle ? ROTATE_ICON : ''} ${this.disabled ? DISABLED_CLASS : ''}` }, h("i", { class: `${this.iconSprite} caret-down-sm-b` })), h("button", { tabindex: `${this.disabled ? -1 : 0}`, role: "button", class: `clear-search-btn ${this.disabled ? DISABLED_CLASS : ''} ${this.searchTerm.length > 0 || this.value.length > 0 ? '' : 'dxp-none'}`, onClick: () => this.clearSearchBox(), "aria-label": "Clear searchbox" }, h("i", { class: "dxp-icon dxp-icon-close" })), !this.isValid ? h("div", { class: "dxp-error", id: "errMsg", "aria-label": this.validationMessage }, this.validationMessage) : ''));
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-selector-menu render() : ${"DEVELOPMENT"}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-selector-menu.min.css` })]
        ];
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme }, styles, this.label ?
            this.renderLabel()
            : '', h("div", { class: "selector-menu-wrapper" }, this.renderSelectorType(), h("div", { class: `item-container ${this.toggle ? 'dxp-block' : 'dxp-none'}` }, h("slot", { name: "item-container-slot" }), h("ul", { "aria-label": "Selector dropdown", class: `list-wrapper ${this.isLoading ? 'no-scroll' : ''}`, style: { width: this.width ? `${this.width}rem` : '100%' }, role: "listbox", "aria-labelledby": this.selectorId, onScroll: event => this.onListboxScroll(event) }, this.isLoading ? this.renderProgressbarSpinner() : '', h("slot", { name: "list-wrapper-slot" }), !this.disabled && this.items && this.items.length ?
            this.items.map((item, index) => h("li", { tabindex: "-1", class: "list-item", "data-index": index, id: `listItem-${index}`, role: "option", onClick: () => this.selectItem(item) }, this.renderItem(item)))
            : '')))));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-selector-menu{line-height:unset}div.dxp.dxp-selector-menu .btn-link{border:none;display:inline-block;padding:.125rem 1.5rem .125rem 0;cursor:pointer;vertical-align:middle;border-radius:.375rem;position:relative;overflow:hidden}div.dxp.dxp-selector-menu .btn-link:focus,div.dxp.dxp-selector-menu .btn-link:hover{outline:none;text-decoration:underline}div.dxp.dxp-selector-menu .btn-link.disabled{cursor:not-allowed;text-decoration:none;opacity:.5}div.dxp.dxp-selector-menu .btn-link.disabled:focus{-webkit-box-shadow:none;box-shadow:none}div.dxp.dxp-selector-menu .btn-link .select-caret{position:absolute;top:.25rem;right:0;width:1rem;height:1rem}div.dxp.dxp-selector-menu .btn-link .select-caret.rotate-icon{-webkit-transform:scaleY(-1);transform:scaleY(-1)}div.dxp.dxp-selector-menu .option-with-details-button{text-align:left;cursor:pointer;height:4rem;width:100%;display:inline-block;outline:none;padding:.9375rem 1.5rem;border:none;border-radius:0}div.dxp.dxp-selector-menu .option-with-details-button .option-with-details-name{margin-bottom:0;display:inline-block;padding-right:1.5rem;position:relative}div.dxp.dxp-selector-menu .option-with-details-button .option-with-details-name i{height:1rem;width:1rem;display:inline-block;position:absolute;right:0;top:0}div.dxp.dxp-selector-menu .option-with-details-button .option-with-details-location{margin-bottom:0;display:block}div.dxp.dxp-selector-menu .option-with-details-button .option-with-details-location.p-r-24{padding-right:1.5rem}div.dxp.dxp-selector-menu .option-with-details-button .close-selector-menu{position:absolute;right:1.25rem;top:1.25rem;width:1.5rem;height:1.5rem;text-align:center}div.dxp.dxp-selector-menu .option-with-details-button.disabled{cursor:not-allowed;opacity:.7}div.dxp.dxp-selector-menu .selector-button-wrapper{position:relative}div.dxp.dxp-selector-menu .selector-button-wrapper .default-selector,div.dxp.dxp-selector-menu .selector-button-wrapper input[type=text]{display:block;width:100%;height:2.5rem;padding:.5rem 1rem;background-image:none;background-clip:padding-box;border-radius:.25rem;-webkit-box-sizing:border-box;box-sizing:border-box;border:1px solid transparent;padding-right:1.625rem}div.dxp.dxp-selector-menu .selector-button-wrapper .default-selector::-ms-clear,div.dxp.dxp-selector-menu .selector-button-wrapper .default-selector::-ms-reveal,div.dxp.dxp-selector-menu .selector-button-wrapper input[type=text]::-ms-clear,div.dxp.dxp-selector-menu .selector-button-wrapper input[type=text]::-ms-reveal{display:none;width:0;height:0}div.dxp.dxp-selector-menu .selector-button-wrapper .default-selector:focus,div.dxp.dxp-selector-menu .selector-button-wrapper input[type=text]:focus{outline:none}div.dxp.dxp-selector-menu .selector-button-wrapper .default-selector.more-padding,div.dxp.dxp-selector-menu .selector-button-wrapper input[type=text].more-padding{padding-right:3.125rem}div.dxp.dxp-selector-menu .selector-button-wrapper .default-selector.disabled,div.dxp.dxp-selector-menu .selector-button-wrapper .default-selector:disabled,div.dxp.dxp-selector-menu .selector-button-wrapper input[type=text].disabled,div.dxp.dxp-selector-menu .selector-button-wrapper input[type=text]:disabled{cursor:not-allowed}div.dxp.dxp-selector-menu .selector-button-wrapper .default-selector{cursor:pointer;text-align:left;position:relative;overflow:hidden}div.dxp.dxp-selector-menu .selector-button-wrapper .clear-search-btn{z-index:9;top:.75rem;right:1.875rem;position:absolute;width:1rem;height:1rem;display:inline-block;text-align:center;border:none;background:transparent;border-radius:0;cursor:pointer}div.dxp.dxp-selector-menu .selector-button-wrapper .clear-search-btn .dxp-icon-close{vertical-align:middle}div.dxp.dxp-selector-menu .selector-button-wrapper .clear-search-btn.disabled{pointer-events:none}div.dxp.dxp-selector-menu .selector-button-wrapper .select-caret{position:absolute;top:.75rem;right:.375rem;width:1rem;height:1rem}div.dxp.dxp-selector-menu .selector-button-wrapper .select-caret.rotate-icon{-webkit-transform:scaleY(-1);transform:scaleY(-1)}div.dxp.dxp-selector-menu .selector-button-wrapper .select-caret.disabled{opacity:.5}div.dxp.dxp-selector-menu .selector-menu-wrapper{position:relative;width:100%}div.dxp.dxp-selector-menu .list-wrapper{list-style:none;position:absolute;left:0;z-index:10;border-radius:.25rem;padding:0;width:100%;max-height:29rem;overflow:hidden;overflow-y:auto}div.dxp.dxp-selector-menu .list-wrapper li{padding:.5625rem 1rem;outline:none;position:relative;cursor:pointer}div.dxp.dxp-selector-menu .list-wrapper li p{margin:0;word-break:break-word}\@media (-ms-high-contrast:none),screen and (-ms-high-contrast:active){div.dxp.dxp-selector-menu .list-wrapper li p{word-break:break-all}}div.dxp.dxp-selector-menu .list-wrapper li .icon-wrapper{position:absolute;top:.75rem;right:1rem}div.dxp.dxp-selector-menu .list-wrapper li .has-icon{padding-right:2rem}div.dxp.dxp-selector-menu .list-wrapper.no-scroll{overflow:hidden}div.dxp.dxp-selector-menu .spinner-wrapper{position:absolute;left:0;top:0;width:100%;height:100%;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;z-index:9}div.dxp.dxp-selector-menu[dir=rtl] .btn-link{padding:.125rem 0 .125rem 1.5rem}div.dxp.dxp-selector-menu[dir=rtl] .btn-link .select-caret{right:auto;left:.25rem}div.dxp.dxp-selector-menu[dir=rtl] .option-with-details-button{text-align:right}div.dxp.dxp-selector-menu[dir=rtl] .option-with-details-button .option-with-details-name{padding-left:1.5rem;padding-right:0}div.dxp.dxp-selector-menu[dir=rtl] .option-with-details-button .option-with-details-name i{left:0;right:auto}div.dxp.dxp-selector-menu[dir=rtl] .option-with-details-button .option-with-details-location.p-r-24{padding-left:1.5rem;padding-right:0}div.dxp.dxp-selector-menu[dir=rtl] .option-with-details-button .close-selector-menu{right:auto;left:1.25rem}div.dxp.dxp-selector-menu[dir=rtl] .selector-button-wrapper .default-selector,div.dxp.dxp-selector-menu[dir=rtl] .selector-button-wrapper input[type=text]{text-align:right;padding-right:1rem;padding-left:1.625rem}div.dxp.dxp-selector-menu[dir=rtl] .selector-button-wrapper .default-selector.more-padding,div.dxp.dxp-selector-menu[dir=rtl] .selector-button-wrapper input[type=text].more-padding{padding-right:.75rem;padding-left:3.125rem}div.dxp.dxp-selector-menu[dir=rtl] .selector-button-wrapper .clear-search-btn{right:auto;left:1.875rem}div.dxp.dxp-selector-menu[dir=rtl] .selector-button-wrapper .select-caret{right:auto;left:.375rem}div.dxp.dxp-selector-menu[dir=rtl] .list-wrapper{left:auto;right:0}div.dxp.dxp-selector-menu[dir=rtl] .list-wrapper li .icon-wrapper{right:auto;left:1rem}div.dxp.dxp-selector-menu[dir=rtl] .list-wrapper li .has-icon{padding-right:0;padding-left:2rem}"; }
};

export { SelectorMenu as dxp_selector_menu };
