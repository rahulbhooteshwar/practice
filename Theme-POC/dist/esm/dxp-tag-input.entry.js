import { r as registerInstance, c as createEvent, d as dxp, h, g as getElement } from './core-cdc608e2.js';
import { B as BaseComponent } from './base-component.esm-d926764b.js';

const messages = {
    'en': {
        listText: 'Select search item from list',
        selectedItem: 'Current selected {{item}}',
        close: 'Press delete or backspace to remove selected item',
        closeText: 'Close'
    },
    'es': {
        listText: 'Seleccione el elemento de búsqueda de la lista',
        selectedItem: 'Seleccionado actualmente {{item}}',
        close: 'Presione eliminar o retroceder para eliminar el elemento seleccionado',
        closeText: 'Cerrar'
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

const LIST_CLASS = 'dxp-dropdown-list-item';
const LOG_EMIT = 'tag items changed event emit: ';
const TagInput = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** keysArray - key fields to display in dropdown */
        this.keysArray = [];
        /** responseData - service response data */
        this.responseData = [];
        /** searchValue - to hold the search value */
        this.searchValue = '';
        /** showSearchBoxList - to show/hide the search items list */
        this.showSearchBoxList = false;
        /** suggestData - dropdown suggester data */
        this.suggestData = [];
        /** tagsArray - tagsArray data to display as pills/tags */
        this.tagsArray = [];
        /** tagsTempArray - tagsTempArray data to display as pills/tags */
        this.tagsTempArray = [];
        this.tagItemsChanged = createEvent(this, "tagItemsChanged", 7);
    }
    /** actions to be performed prior to component loading */
    componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'TagInput', messages);
        if (this.keysToDisplay) {
            this.keysArray = this.keysToDisplay.split(',');
        }
        if (this.tagsData && typeof this.tagsData === 'string') {
            this.tagsData = JSON.parse(this.tagsData);
        }
    }
    /** life cycle hook called after render method when any state variable changes it's state or after force call of render */
    componentDidUpdate() {
        /* to dynamically set the position of dropdown list*/
        const list = this.element
            ? this.element.querySelector('.dxp-list-container')
            : this.element.querySelector('.dxp-list-container');
        if (this.clientHeight() >= 66) {
            list['style'].setProperty('top', '68px');
        }
        else if (this.clientHeight() === 64) {
            list['style'].setProperty('top', '66px');
        }
        else if (this.clientHeight() <= 40) {
            list['style'].setProperty('top', '42px');
        }
    }
    /** for mouse click outside of  component */
    clickEvent(e) {
        if (!e.target.classList.contains('dxp-list-container')) {
            this.showSearchBoxList = false;
        }
    }
    /** for accessibility implementation */
    handleKeyUp(e) {
        const target = e.target
            ? e.target.activeElement
            : e.target;
        const searchBox = target.classList.contains('searchbox');
        const parentLi = target.classList.contains(LIST_CLASS);
        const nextEl = target.nextElementSibling;
        const prevEl = target.previousElementSibling;
        const keycode = e.keyCode;
        const targetDiv = target.closest('div');
        const nextSibling = targetDiv.nextElementSibling;
        const prevSibling = targetDiv.previousElementSibling;
        const tags = target.classList.contains('tags');
        /** handle keys */
        if (keycode === 8) {
            /** on backspace key, remove last selected pills/tag */
            this.OnBackspaceKey(target, searchBox, tags);
        }
        else if (keycode === 40) {
            /** for down arrow key */
            this.onDownArrowKey(e, searchBox, nextSibling, parentLi, nextEl);
        }
        else if (keycode === 38) {
            /** for up arrow key */
            this.onUpArrowKey(e, prevSibling, parentLi, prevEl);
        }
        else if ((keycode === 13 || keycode === 32)) {
            /** on enter and space key, select suggestions */
            this.OnEnterAndSpaceKey(target, parentLi);
        }
        else if (keycode === 37) {
            /** for left arrow key */
            this.onLeftArrowKey(target, searchBox, tags, prevEl);
        }
        else if (keycode === 39) {
            /** for right arrow key */
            this.onRightArrowKey(tags, nextEl);
        }
        else if (keycode === 46) {
            /** for delete key */
            this.onDeleteKey(target, tags);
        }
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** on tags remove clear item from tags list */
    clearItem(id) {
        const tagsTempArray = this.tagsArray;
        const filteredArray = tagsTempArray.filter(item => {
            return item.id !== id;
        });
        this.tagsArray = filteredArray;
        this.showSearchBoxList = false;
        this.focusInput();
        this.tagItemsChanged.emit({ 'tagItems': this.tagsArray });
        dxp.log.debug(this.element.tagName, 'clearItem()', LOG_EMIT, this.tagsArray);
    }
    /** method to calculate client height */
    clientHeight() {
        const ele = this.element
            ? this.element.querySelector('.tag-div')
            : this.element.querySelector('.tag-div');
        return ele.clientHeight;
    }
    /** method to filter tags data based on user type string  */
    filterTagsData(query) {
        const lowSearch = query.toLowerCase();
        return this.responseData[this.dataKey].filter(item => {
            return this.keysArray.some(key => {
                return item[key].toLowerCase().includes(lowSearch);
            });
        });
    }
    /** method to focus input element  */
    focusElement(elem) {
        elem.focus();
    }
    /** method to return input element reference  */
    focusInput() {
        /** HTMLInputElement : To make the element as HTMLInputElement and  provides special properties and methods for manipulating the layout and presentation of input elements  */
        const inputElement = this.getInputElement();
        if (inputElement) {
            inputElement.focus();
            inputElement.style.minWidth = 'auto';
        }
    }
    /** Get method to fetch the service data */
    async getData(apiUrl, query) {
        const opts = {
            method: 'GET',
            headers: this.apiHeaders ? JSON.parse(this.apiHeaders) : { 'Content-Type': 'application/json' }
        };
        try {
            // aborting the previous xhr request call
            if (xmlApi$1.request) {
                xmlApi$1.request.abort();
            }
            const json = xmlApi$1.fetchRequest(apiUrl + query, opts)
                .then(data => {
                dxp.log.debug(this.element.tagName, 'getData()', `xhr request success`);
                return JSON.parse(data['response']);
            })
                .catch(error => {
                dxp.log.debug(this.element.tagName, 'getData()', `xhr request cancelled/failed : ${JSON.stringify(error)}`);
            });
            this.responseData = json;
            return this.responseData;
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
    /** method to return search dropdown reference  */
    getSearchListElement() {
        return this.element
            ? this.element.querySelector(`.${LIST_CLASS}`)
            : this.element.getElementsByClassName(LIST_CLASS)[0];
    }
    /** Group the data by groupByField */
    groupDataByField() {
        this.suggestData = this.suggestData.reduce((r, a) => {
            r[a[this.groupByField]] = r[a[this.groupByField]] || [];
            r[a[this.groupByField]].push(a);
            return r;
        }, Object.create({}));
        if (this.tagsArray.length) {
            // remove already added item from suggestion list
            const idsArray = [];
            this.tagsArray.forEach(item => idsArray.push(item.id));
            Object.keys(this.suggestData).forEach(key => {
                this.suggestData[key] = this.suggestData[key].filter(itemObj => {
                    return idsArray.indexOf(itemObj.id) === -1;
                });
            });
        }
    }
    /** Grouping of search suggester data */
    groupSearchSuggestData() {
        if (this.tagsArray.length) {
            const idsArray = [];
            this.tagsArray.forEach(item => idsArray.push(item.id));
            this.suggestData = this.suggestData.filter(itemObj => {
                return idsArray.indexOf(itemObj.id) === -1;
            });
        }
    }
    /** method to fetch the search suggester data */
    async handleChange(e) {
        const query = e.trim();
        this.searchValue = e.trim();
        this.suggestData = [];
        this.responseData = [];
        if (query.length >= 3) {
            this.apiUrl ?
                this.responseData = await this.getData(this.apiUrl, query)
                : this.responseData = this.tagsData;
            if (this.responseData) {
                this.responseData = this.apiUrl ? this.responseData[this.dataKey]
                    : this.filterTagsData(query);
                this.suggestData = this.responseData;
                this.suggestData = dxp.util.removeDuplicates(this.suggestData);
                if (this.groupByField) {
                    // to group the data by groupByField
                    this.groupDataByField();
                }
                else {
                    this.groupSearchSuggestData();
                }
            }
            this.responseData && this.responseData.length > 0
                ? this.showSearchBoxList = true
                : this.showSearchBoxList = false;
        }
        else {
            this.showSearchBoxList = false;
        }
    }
    /** method to check the suggester data */
    isSuggestData() {
        let isData = false;
        for (const key of Object.keys(this.suggestData)) {
            if (this.suggestData[key].length) {
                isData = true;
            }
        }
        return isData;
    }
    /** Handle on backspace key */
    OnBackspaceKey(target, searchBox, tags) {
        if (searchBox && this.tagsArray.length && (target.selectionStart === 0)) {
            this.tagsTempArray = this.tagsArray.pop();
            this.tagItemsChanged.emit({ 'tagItems': this.tagsArray });
            dxp.log.debug(this.element.tagName, 'handleKeyUp()', LOG_EMIT, this.tagsArray);
        }
        else if (tags) {
            const id = target.id;
            this.clearItem(id);
        }
    }
    /** Handle on delete key */
    onDeleteKey(target, tags) {
        if (tags) {
            const id = target.id;
            this.clearItem(id);
        }
    }
    /** Handle on down arrow key */
    onDownArrowKey(e, searchBox, nextSibling, parentLi, nextEl) {
        e.preventDefault();
        if (searchBox) {
            const nextLi = nextSibling.querySelector('li');
            if (nextLi) {
                this.focusElement(nextLi);
            }
        }
        else if (parentLi) {
            if (nextEl && !searchBox) {
                this.focusElement(nextEl);
            }
            else if (nextSibling && !nextEl && !searchBox) {
                const nextLi = nextSibling.querySelector('li');
                if (nextLi) {
                    this.focusElement(nextLi);
                }
            }
        }
    }
    /** Handle on enter and space key */
    OnEnterAndSpaceKey(target, parentLi) {
        if (parentLi) {
            /**
             * HTMLInputElement : To make the element as HTMLInputElement and  provides special properties
             * and methods for manipulating the layout and presentation of input elements
             */
            {
                target.click();
            }
        }
    }
    /** Handle on left arrow key */
    onLeftArrowKey(target, searchBox, tags, prevEl) {
        if (searchBox && (target.selectionStart === 0)) {
            if (prevEl && prevEl.nodeName === 'SPAN') {
                this.showSearchBoxList = false;
                this.focusElement(prevEl);
            }
        }
        else if (tags) {
            if (prevEl && prevEl.nodeName === 'SPAN') {
                this.focusElement(prevEl);
            }
        }
    }
    /** on suggestion item selection emit event */
    onListItemSelection(item) {
        /** HTMLInputElement : To make the element as HTMLInputElement and  provides special properties and methods for manipulating the layout and presentation of input elements  */
        const inputElement = this.getInputElement();
        inputElement.value = '';
        this.showSearchBoxList = false;
        this.tagsArray = [
            ...this.tagsArray,
            item
        ];
        this.tagItemsChanged.emit({ 'tagItems': this.tagsArray });
        dxp.log.debug(this.element.tagName, 'onListItemSelection()', LOG_EMIT, this.tagsArray);
    }
    /** Handle on right arrow key */
    onRightArrowKey(tags, nextEl) {
        if (tags) {
            if (nextEl && nextEl.nodeName === 'SPAN') {
                this.focusElement(nextEl);
            }
            else if (nextEl && nextEl.nodeName === 'INPUT') {
                this.focusElement(nextEl);
            }
        }
    }
    /** handler method for input change */
    onTextInput(event) {
        event.target.style.minWidth = `${((event.target.value.length + 1) * 7)}px`;
        this.handleChange(event.target.value)
            .then(() => dxp.log.info(this.element.tagName, 'onTextInput()', `in handleChange`))
            .catch(err => dxp.log.error(this.element.tagName, 'onTextInput()', `in handleChange :${err}`));
    }
    /** Handle on up arrow key */
    onUpArrowKey(e, prevSibling, parentLi, prevEl) {
        e.preventDefault();
        if (parentLi && prevEl && prevEl.nodeName !== 'SPAN') {
            this.focusElement(prevEl);
        }
        else if (prevSibling && parentLi && prevEl.nodeName === 'SPAN') {
            const li = prevSibling.querySelectorAll('li');
            this.focusElement(li[li.length - 1]);
        }
    }
    /** Render suggestion data */
    renderSuggestionData(key) {
        return (h("div", null, this.suggestData[key].length ? h("span", { class: `title-font list-element ${LIST_CLASS}` }, key) : undefined, this.suggestData[key].map((data) => {
            return (h("li", { tabindex: "0", class: `list-element ${LIST_CLASS}`, "aria-label": dxp.i18n.t('TagInput:selectedItem', { item: data[this.keysArray[0]] }), onClick: () => this.selectSuggestion(data) }, h("span", null, data[this.keysArray[0]]), this.keysArray[1] && h("span", { class: "subtitle" }, data[this.keysArray[1]])));
        })));
    }
    /** on li selection populate on searchbox */
    selectSuggestion(item) {
        this.onListItemSelection(item);
        this.focusInput();
    }
    /** Render the tag-input */
    render() {
        dxp.log.debug(this.element.tagName, 'render()', `in dxp-tag-input render() : ${"DEVELOPMENT"}`);
        if ((!this.apiUrl && !this.tagsData) || !this.keysToDisplay || !this.dataKey) {
            dxp.log.debug(this.element.tagName, 'render()', `component not rendered : check mandatory fields`);
            return;
        }
        const styles = [
            h("link", { rel: "stylesheet", href: `` }),
            [this.theme && h("link", { rel: "stylesheet", href: `` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-tag-input.min.css` })],
            [this.theme && h("link", { rel: "stylesheet", href: `${dxp.config.get('DXP_STYLE_BASE_URL')}/themes/${this.theme}/dxp-input.min.css` })]
        ];
        const showContainer = ((this.suggestData.length || this.isSuggestData()) && this.showSearchBoxList && this.searchValue.length >= 3);
        return (h("div", { class: `${this.base.componentClass()} search-container `, dir: this.dir, "data-theme": this.theme }, styles, h("div", { class: "tag-div", onClick: () => this.focusInput() }, this.tagsArray.map(item => h("span", { class: "tags", tabindex: "0", id: item.id }, item[this.keysArray[0]], " ", h("a", { class: "dxp-icon dxp-icon-small dxp-icon-close icon-close", title: dxp.i18n.t('TagInput:closeText'), "aria-label": dxp.i18n.t('TagInput:close'), onClick: () => this.clearItem(item.id) }))), h("input", { type: "text", "aria-haspopup": "listbox", name: "searchbox", "aria-label": this.placeholder, id: "tagInput", class: 'dxp-form-control searchbox ', placeholder: !this.tagsArray.length && this.placeholder, onInput: event => { this.onTextInput(event); } })), h("div", { class: `dxp-list-container ${showContainer ? 'dxp-block' : ''}` }, h("ul", { class: "dxp-dropdown-list", id: "transactioncurrency", "aria-label": dxp.i18n.t('TagInput:listText') }, this.groupByField ?
            Object.keys(this.suggestData).map(key => {
                return this.renderSuggestionData(key);
            })
            :
                h("div", null, this.suggestData.map((data) => {
                    return (h("li", { tabindex: "0", class: `list-element ${LIST_CLASS}`, "aria-label": dxp.i18n.t('TagInput:selectedItem', { item: data[this.keysArray[0]] }), onClick: () => this.selectSuggestion(data) }, h("span", { class: "title-font" }, data[this.keysArray[0]]), this.keysArray[1] && h("span", { class: "subtitle" }, data[this.keysArray[1]])));
                }))))));
    }
    get element() { return getElement(this); }
    static get style() { return "div.dxp.dxp-tag-input{position:relative}div.dxp.dxp-tag-input input.searchbox{padding:0;height:auto;width:auto;display:inline-block;border:none}div.dxp.dxp-tag-input input.searchbox:focus{-webkit-box-shadow:none;box-shadow:none}div.dxp.dxp-tag-input .tag-div{min-height:40px;max-height:68px;border-radius:4px;padding:7px 10px;overflow-y:auto;overflow-x:hidden}div.dxp.dxp-tag-input .tag-div .tag-block{display:inline-block}div.dxp.dxp-tag-input .tags{padding:3px 30px 3px 11px;border-radius:19.5px;position:relative;display:inline-block;margin-right:5px}div.dxp.dxp-tag-input .tags .icon-close{position:absolute;top:7px;right:5px;cursor:pointer}div.dxp.dxp-tag-input .dxp-list-container{border-radius:5px;border:none;margin:auto;top:42px;left:0;right:0}div.dxp.dxp-tag-input .dxp-list-container .dxp-dropdown-list{margin:0;padding:8px 0 20px 0}div.dxp.dxp-tag-input .dxp-list-container .dxp-dropdown-list .dxp-dropdown-list-item span{display:block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}div.dxp.dxp-tag-input .dxp-list-container .dxp-dropdown-list div>span:first-of-type{padding-left:17px;cursor:default}div.dxp.dxp-tag-input .dxp-list-container .dxp-dropdown-list li{height:auto;line-height:normal;padding:4.5px 34px 7.5px 19px;margin-top:6px}div.dxp.dxp-tag-input .dxp-list-container .dxp-dropdown-list li:after{border-top:none;border-bottom:none}div.dxp.dxp-tag-input .dxp-list-container .dxp-dropdown-list .group-title{padding-left:17px;cursor:default}div.dxp.dxp-tag-input[dir=rtl] .dxp-list-container .dxp-dropdown-list li{padding:4px 19px 5px 34px}div.dxp.dxp-tag-input[dir=rtl] .dxp-list-container .dxp-dropdown-list div>span:first-of-type{padding-left:0;padding-right:17px;cursor:default}div.dxp.dxp-tag-input[dir=rtl] .tags{padding:3px 11px 3px 30px}div.dxp.dxp-tag-input[dir=rtl] .tags .icon-close{right:auto;left:5px}"; }
};

export { TagInput as dxp_tag_input };
