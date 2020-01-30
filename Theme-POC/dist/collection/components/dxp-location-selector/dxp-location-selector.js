import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
import messages from './messages';
import xmlApi from './xml-api';
/** dxp-location-selector */
export class LocationSelector {
    constructor() {
        /** filterItemsJson - to get the response from api */
        this.filterItemsJson = [];
        /** searchValue - to hold the search value */
        this.searchValue = '';
        /** showSearchBoxArrows - to show/hide the search Arrow */
        this.showDownArrow = true;
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'LocationSelector', messages);
    }
    /** for mouse click outside of component */
    clickEvent(e) {
        /** close search dropdown list on mouse click outside of search */
        const target = e.target ? e.composedPath()[0] : e.target;
        if (!target.classList.contains('dxp-dropdown-list-item') && !target.classList.contains('searchbox') && !target.classList.contains('dxp-icon')) {
            this.showSearchBoxList = false;
            this.showDownArrow = true;
        }
    }
    /** Method to clear the searchbox value */
    async clearSearchBox() {
        this.clearInputFieldValue();
        this.filterItemsJson = [];
        this.showSearchBoxList = false;
        this.showDownArrow = true;
    }
    /** Clear input box field value */
    clearInputFieldValue() {
        /** HTMLInputElement : To make the element as HTMLInputElement and  provides special properties and methods for manipulating the layout and presentation of input elements  */
        const inputElement = this.getInputElement();
        if (inputElement) {
            inputElement.value = '';
            this.searchValue = '';
            this.showSearchBoxList = !this.showSearchBoxList;
        }
    }
    /** find result */
    findResult(results, name) {
        let temp;
        results.forEach(obj => {
            if (obj.types[0] === name && obj.types[1] === 'political') {
                temp = obj;
            }
        });
        return temp ? temp.long_name : undefined;
    }
    /** get current location */
    getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.getLocationCity(position.coords.latitude, position.coords.longitude).then(val => {
                    this.filterItemsJson.push(val);
                    this.filterItemsJson = [...this.filterItemsJson];
                    this.showDownArrow = !this.showDownArrow;
                    this.showSearchBoxList = !this.showSearchBoxList;
                    this.responseFlag = false;
                })
                    .catch(error => {
                    dxp.log.debug(this.element.tagName, 'getLocation()', `current location location notfound : ${JSON.stringify(error)}`);
                });
            });
        }
        else {
            dxp.log.debug(this.element.tagName, 'getLocation()', `Sorry, your browser does not support HTML5 geolocation`);
        }
    }
    /** Get method to fetch the service data */
    getData(endPointUrl) {
        const opts = {
            method: 'GET'
        };
        try {
            // aborting the previous xhr request call
            if (xmlApi.request) {
                xmlApi.request.abort();
            }
            return xmlApi.fetchRequest(endPointUrl, opts)
                .then(data => {
                dxp.log.debug(this.element.tagName, 'getData()', `xhr request success`);
                return JSON.parse(data['response']);
            })
                .catch(error => {
                dxp.log.debug(this.element.tagName, 'getData()', `xhr request cancelled/failed : ${JSON.stringify(error)}`);
            });
        }
        catch (e) {
            dxp.log.error(this.element.tagName, 'getData()', `fetch failed`, e);
        }
    }
    /** method to return input element reference  */
    getInputElement() {
        return this.element
            ? this.element.querySelector('.searchbox')
            : this.element.querySelector('.searchbox');
    }
    /** api call for fetch current cities */
    async getLocationCity(latitude, longitude) {
        this.filterItemsJson = [];
        const apiCurrentLocation = `${process.env.GOOGLE_GEO_CODE_URL}${latitude},${longitude}&key=${this.apiKey}`;
        const filterItemsJson = await dxp.api(apiCurrentLocation);
        const currentCountryLocation = filterItemsJson.results[1].address_components;
        const city = this.findResult(currentCountryLocation, 'locality');
        const state = this.findResult(currentCountryLocation, 'administrative_area_level_1');
        const country = this.findResult(currentCountryLocation, 'country');
        const currentLocationSearch = {};
        currentLocationSearch['description'] = `${city}, ${state}, ${country}`;
        return currentLocationSearch;
    }
    /** on li item selection emit event */
    onListItemSelection(text) {
        /** HTMLInputElement : To make the element as HTMLInputElement and  provides special properties and methods for manipulating the layout and presentation of input elements  */
        const inputElement = this.getInputElement();
        inputElement.value = text;
        this.showSearchBoxList = false;
        this.searchLocationChanged.emit({ 'searchTerm': inputElement.value });
        dxp.log.debug(this.element.tagName, 'onListItemSelection()', `event emit for SPA`);
    }
    /** handler method for input change */
    onTextInput(event) {
        this.searchValue = event.target.value;
        if (this.searchValue.trim().length >= 1) {
            this.showSearchBoxList = true;
            const apiEndpoint = `${process.env.GOOGLE_PLACE_API_URL}${this.apiKey}&types=(${this.searchType})&language=${dxp.i18n.languages[0]}&input=${this.searchValue}`;
            this.getData(apiEndpoint).then(async (data) => {
                if (data) {
                    this.filterItemsJson = data;
                    if (this.filterItemsJson['predictions']) {
                        this.filterItemsJson = this.filterItemsJson['predictions'];
                    }
                    if (this.filterItemsJson.length) {
                        this.responseFlag = true;
                    }
                }
            });
        }
        if (this.showSearchBoxList === false) {
            this.showSearchBoxList = !this.showSearchBoxList;
        }
    }
    /** renderLocationValues */
    renderLocationValues() {
        return (h("div", { class: `dxp-location-list-container  ${this.filterItemsJson && this.filterItemsJson.length ? ' with-result ' : ''}
       ${(this.showSearchBoxList) ? ' dxp-block' : 'dxp-none'}` },
            h("ul", { class: `dxp-suggestion-list ${!this.searchValue.length ? 'current-location' : ''}`, "aria-label": dxp.i18n.t('LocationSelector:listText') }, (this.filterItemsJson && this.filterItemsJson.length) ? this.filterItemsJson.map(suggestTerm => ([
                h("li", { tabIndex: -1, class: "dxp-dropdown-list-item" },
                    !this.searchValue.length && !this.responseFlag && h("p", { class: "dxp-font-size-sm dxp-pb-3" }, " Your location"),
                    h("p", { class: "current-location-data", onClick: this.selectSuggestion.bind(this) },
                        !this.searchValue.length && !this.responseFlag && h("span", { class: "dxp-icon dxp-icon-current-location", tabIndex: 0, "aria-label": dxp.i18n.t('LocationSelector:searchIconAccessibilityText') }),
                        suggestTerm.description)),
                !this.searchValue.length && !this.responseFlag && h("li", { class: "dxp-dropdown-list-item" }, "All location")
            ]))
                :
                    h("li", { tabIndex: -1, class: "dxp-dropdown-list-item no-result-found", "aria-label": dxp.i18n.t('LocationSelector:noResultFound') },
                        h("p", null, dxp.i18n.t('LocationSelector:noResultFound'))))));
    }
    /** on li selection populate on searchbox */
    selectSuggestion(e, key) {
        if (key && e.target && e.target.activeElement.tagName === 'LI') {
            this.onListItemSelection(e.target.activeElement.innerText);
        }
        else if (e.target.tagName === 'P') {
            this.onListItemSelection(e.target.innerText);
        }
    }
    /** toggle when click on input search */
    toggleCurrentLocation() {
        if (!this.filterItemsJson || this.filterItemsJson.length === 0) {
            this.getCurrentLocation();
        }
        else {
            this.showDownArrow = !this.showDownArrow;
            this.showSearchBoxList = !this.showSearchBoxList;
        }
    }
    /** Render the location-selector */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-location-selector render() : ${process.env.MODE}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-location-selector.min.css` })]
        ];
        return (h("div", { role: "application", class: `${this.base.componentClass()} search-wrapper simple-search search-box-container`, dir: this.dir, "data-theme": this.theme },
            styles,
            h("div", { class: "search-box-container" },
                h("div", { class: "wrapper" },
                    h("input", { type: "search", "aria-haspopup": "listbox", name: "searchbox", "aria-label": dxp.i18n.t('LocationSelector:customMessage'), class: `dxp-form-control searchbox ${(this.showSearchBoxList && this.filterItemsJson && this.filterItemsJson.length) ? 'dxp-border-radius' : ''}`, placeholder: `${this.searchLocationData ? this.searchLocationData[0].placeholder : 'All Location'}`, onInput: event => { this.onTextInput(event); }, onClick: () => this.toggleCurrentLocation() }),
                    h("span", { class: "dxp-icon dxp-icon-sm dxp-icon-globe search-text", tabIndex: 0, "aria-label": dxp.i18n.t('LocationSelector:searchIconAccessibilityText') }),
                    !this.searchValue.length && h("span", { class: `dxp-icon dxp-icon-sm ${this.showDownArrow ? 'dxp-icon-caret-down' : 'dxp-icon-caret-up'}`, tabIndex: 0, "aria-label": dxp.i18n.t('LocationSelector:searchIconAccessibilityText'), onClick: () => this.toggleCurrentLocation() }),
                    h("span", { class: `dxp-icon dxp-icon-sm dxp-icon-close dxp-icon-clear ${this.filterItemsJson && this.searchValue.length >= 1 ? ' dxp-block' : ' dxp-none'}`, "aria-label": dxp.i18n.t('LocationSelector:clear'), tabIndex: 0, onClick: () => this.clearSearchBox() })),
                this.renderLocationValues())));
    }
    static get is() { return "dxp-location-selector"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-location-selector.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-location-selector.css"]
    }; }
    static get properties() { return {
        "apiKey": {
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
                "text": "api-key for url to search offer"
            },
            "attribute": "api-key",
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
                "text": "placeholder text for search box"
            },
            "attribute": "placeholder",
            "reflect": false
        },
        "searchLocationData": {
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
                "text": "search location data for script support"
            },
            "attribute": "search-location-data",
            "reflect": false
        },
        "searchType": {
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
                "text": "searchType for search offer by cities,region ex"
            },
            "attribute": "search-type",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "filterItemsJson": {},
        "locale": {},
        "responseFlag": {},
        "searchValue": {},
        "showDownArrow": {},
        "showSearchBoxList": {},
        "theme": {}
    }; }
    static get events() { return [{
            "method": "searchLocationChanged",
            "name": "searchLocationChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "if search location changed"
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "clearSearchBox": {
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
                "text": "Method to clear the searchbox value",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "clickEvent",
            "target": "document",
            "capture": false,
            "passive": false
        }]; }
}
