import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

const messages = {
    'en': {
        placeholder: 'All Location',
        searchIconAccessibilityText: 'Click search icon',
        listText: 'Select search item from list',
        clear: 'Click to clear search box',
        close: 'Click to close search popup',
        closeText: 'Close',
        customMessage: 'Please enter search keyword. Autosuggestions will be shown after 3 characters',
        noResultFound: 'No result found'
    },
    'es': {
        placeholder: 'Buscar',
        searchIconAccessibilityText: 'Haga clic en el icono de búsqueda',
        listText: 'Seleccione el elemento de búsqueda de la lista',
        selectedItem: 'Seleccionado actualmente {{item}}',
        close: 'Haga clic para cerrar la ventana emergente de búsqueda',
        closeText: 'Cerrar',
        clearText: 'Claro',
        customMessage: 'Por favor introduzca la palabra clave de búsqueda. Se mostrarán autosugestiones después de 3 caracteres'
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

const LocationSelector = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** filterItemsJson - to get the response from api */
        this.filterItemsJson = [];
        /** searchValue - to hold the search value */
        this.searchValue = '';
        /** showSearchBoxArrows - to show/hide the search Arrow */
        this.showDownArrow = true;
        this.searchLocationChanged = createEvent(this, "searchLocationChanged", 7);
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
            if (xmlApi$1.request) {
                xmlApi$1.request.abort();
            }
            return xmlApi$1.fetchRequest(endPointUrl, opts)
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
        const apiCurrentLocation = `${"https://maps.googleapis.com/maps/api/geocode/json?latlng="}${latitude},${longitude}&key=${this.apiKey}`;
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
            const apiEndpoint = `${"https://maps.googleapis.com/maps/api/place/autocomplete/json?key="}${this.apiKey}&types=(${this.searchType})&language=${dxp.i18n.languages[0]}&input=${this.searchValue}`;
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
       ${(this.showSearchBoxList) ? ' dxp-block' : 'dxp-none'}` }, h("ul", { class: `dxp-suggestion-list ${!this.searchValue.length ? 'current-location' : ''}`, "aria-label": dxp.i18n.t('LocationSelector:listText') }, (this.filterItemsJson && this.filterItemsJson.length) ? this.filterItemsJson.map(suggestTerm => ([
            h("li", { tabIndex: -1, class: "dxp-dropdown-list-item" }, !this.searchValue.length && !this.responseFlag && h("p", { class: "dxp-font-size-sm dxp-pb-3" }, " Your location"), h("p", { class: "current-location-data", onClick: this.selectSuggestion.bind(this) }, !this.searchValue.length && !this.responseFlag && h("span", { class: "dxp-icon dxp-icon-current-location", tabIndex: 0, "aria-label": dxp.i18n.t('LocationSelector:searchIconAccessibilityText') }), suggestTerm.description)),
            !this.searchValue.length && !this.responseFlag && h("li", { class: "dxp-dropdown-list-item" }, "All location")
        ]))
            :
                h("li", { tabIndex: -1, class: "dxp-dropdown-list-item no-result-found", "aria-label": dxp.i18n.t('LocationSelector:noResultFound') }, h("p", null, dxp.i18n.t('LocationSelector:noResultFound'))))));
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
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-location-selector render() : ${"DEVELOPMENT"}`);
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-location-selector.min.css` })]
        ];
        return (h("div", { role: "application", class: `${this.base.componentClass()} search-wrapper simple-search search-box-container`, dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "search-box-container" }, h("div", { class: "wrapper" }, h("input", { type: "search", "aria-haspopup": "listbox", name: "searchbox", "aria-label": dxp.i18n.t('LocationSelector:customMessage'), class: `dxp-form-control searchbox ${(this.showSearchBoxList && this.filterItemsJson && this.filterItemsJson.length) ? 'dxp-border-radius' : ''}`, placeholder: `${this.searchLocationData ? this.searchLocationData[0].placeholder : 'All Location'}`, onInput: event => { this.onTextInput(event); }, onClick: () => this.toggleCurrentLocation() }), h("span", { class: "dxp-icon dxp-icon-sm dxp-icon-globe search-text", tabIndex: 0, "aria-label": dxp.i18n.t('LocationSelector:searchIconAccessibilityText') }), !this.searchValue.length && h("span", { class: `dxp-icon dxp-icon-sm ${this.showDownArrow ? 'dxp-icon-caret-down' : 'dxp-icon-caret-up'}`, tabIndex: 0, "aria-label": dxp.i18n.t('LocationSelector:searchIconAccessibilityText'), onClick: () => this.toggleCurrentLocation() }), h("span", { class: `dxp-icon dxp-icon-sm dxp-icon-close dxp-icon-clear ${this.filterItemsJson && this.searchValue.length >= 1 ? ' dxp-block' : ' dxp-none'}`, "aria-label": dxp.i18n.t('LocationSelector:clear'), tabIndex: 0, onClick: () => this.clearSearchBox() })), this.renderLocationValues())));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-location-selector.search-wrapper{padding:0}div.dxp.dxp-location-selector.search-wrapper.simple-search{background-color:transparent;width:100%}div.dxp.dxp-location-selector.search-wrapper .search-box-container,div.dxp.dxp-location-selector.search-wrapper .wrapper{position:relative}div.dxp.dxp-location-selector.search-wrapper input{line-height:2rem;padding:8px 65px 8px 47px;border-radius:19px}div.dxp.dxp-location-selector.search-wrapper .dxp-icon:focus,div.dxp.dxp-location-selector.search-wrapper input:focus{outline:none}div.dxp.dxp-location-selector.search-wrapper .searchbox.dxp-border-radius{border-bottom:0;border-bottom-left-radius:0;border-bottom-right-radius:0}div.dxp.dxp-location-selector.search-wrapper .dxp-icon-globe{position:absolute;padding:0;cursor:pointer;left:20px;top:10px}div.dxp.dxp-location-selector.search-wrapper .dxp-icon-caret-up,div.dxp.dxp-location-selector.search-wrapper .dxp-icon.dxp-icon-caret-down{position:absolute;right:16px;top:10px}div.dxp.dxp-location-selector.search-wrapper .dxp-icon-close{position:absolute;top:11px;right:16px;margin:0;padding:0;cursor:pointer}div.dxp.dxp-location-selector.search-wrapper .dxp-location-list-container{position:absolute;left:0;right:0;z-index:1;border-top:0;border-bottom-right-radius:19px;border-bottom-left-radius:19px}div.dxp.dxp-location-selector.search-wrapper .dxp-suggestion-list{list-style:none;border-bottom-left-radius:19px;border-bottom-right-radius:19px;padding:0}div.dxp.dxp-location-selector.search-wrapper .dxp-suggestion-list li{padding:10px 40px;padding-bottom:10px;position:relative}div.dxp.dxp-location-selector.search-wrapper .dxp-suggestion-list li p{margin:0}div.dxp.dxp-location-selector.search-wrapper .dxp-suggestion-list li:before{display:block;height:1px;position:absolute;top:0;width:calc(100% - 70px)}div.dxp.dxp-location-selector.search-wrapper .dxp-suggestion-list li:first-child:before{content:\"\"}div.dxp.dxp-location-selector.search-wrapper .current-location li p{margin:0}div.dxp.dxp-location-selector.search-wrapper .current-location li:before{content:\"\"}div.dxp.dxp-location-selector.search-wrapper .current-location-data{display:-ms-flexbox;display:flex}div.dxp.dxp-location-selector.search-wrapper .dxp-icon-current-location{position:relative;top:2px;margin-right:8px;width:16px;height:18px;display:block}\@media (max-width:767px){div.dxp.dxp-location-selector.search-wrapper .cta{padding-top:24px}}div.dxp.dxp-location-selector.search-wrapper[dir=rtl] .dxp-icon-globe{right:20px;left:auto}div.dxp.dxp-location-selector.search-wrapper[dir=rtl] .dxp-icon-caret-up,div.dxp.dxp-location-selector.search-wrapper[dir=rtl] .dxp-icon-close,div.dxp.dxp-location-selector.search-wrapper[dir=rtl] .dxp-icon.dxp-icon-caret-down{left:16px;right:auto}"; }
};

export { LocationSelector as dxp_location_selector };
