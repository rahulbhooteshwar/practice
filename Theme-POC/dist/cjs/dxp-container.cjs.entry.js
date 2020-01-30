'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core$1 = require('./core-ad292530.js');

/**
 *  simple method to determine if an element is a custom element ... it would
 *  probably be more useful / appropriate if we could instead have an
 *  `isStencilElement` ... since we thus far only use this method for making
 *  sure the `hydrated` class sticks around for Stencil components
 *
 *  @param {HTMLElement} element - target element
 *
 *  @todo handle IE11
 *  @todo break out in to shared code lib?
 */
const isCustomElement = element => {
    if (customElements) {
        return !customElements.get(element.tagName.toLowerCase());
    }
    core$1.dxp.log.error(element.tagName, 'isCustomElement()', 'expected customElements API');
    return false;
};
const Container = class {
    constructor(hostRef) {
        core$1.registerInstance(this, hostRef);
        /** track if we only provide content to added dom elements */
        this.initialAssignmentDone = false;
        this.srcFailed = core$1.createEvent(this, "srcFailed", 7);
        this.srcLoaded = core$1.createEvent(this, "srcLoaded", 7);
    }
    /**
     * if src is set post-load, trigger content loading and assignment.
     * note that you can only set SRC once, it cannot be changed to
     * modify content again.
     *
     * @param {string} newSrc - new value for prop src
     * @param {string} oldSrc - previous value of src
     */
    async srcChanged() {
        if (this.srcAssigned) {
            core$1.dxp.log.debug(this.container.tagName, 'isCustomElement()', 'cannot change src after initially assigned');
            this.srcFailed.emit({ src: this.src });
            return;
        }
        await this.fetchContent();
    }
    /** fetch content and apply mutation observer on load */
    // content fetch and apply only happens once, onload
    async componentWillLoad() {
        if (this.src) {
            await this.fetchContent();
        }
        this.initObserver(); // track dom changes to re-apply content
    }
    /**
     * for each element, set html attributes for any normal properties,
     * and use the setter for any object/array properties
     * @param {Element} element - html element to apply attributes to
     * @param {Object.<string, obj>} obj - attributes to apply to element
     */
    applyAttributes(element, obj) {
        // properties collects keys/values if values are of type array or object
        const properties = {};
        Object.keys(obj).forEach(key => {
            if (!key.startsWith('dxp-')) {
                if (Array.isArray(obj[key]) || (typeof obj[key] === 'object')) {
                    properties[key] = obj[key];
                }
                else {
                    element.setAttribute(this.formatAttributeName(key), obj[key]);
                }
            }
            else {
                if (Array.isArray(obj[key])) {
                    obj[key].forEach(object => {
                        const elem = document.createElement(key);
                        element.appendChild(elem);
                        this.applyAttributes(elem, object);
                    });
                }
                else {
                    let contentId = '';
                    if (key.indexOf('@') > 0) {
                        contentId = key.split('@')[1];
                        key = key.split('@')[0];
                        const elem = document.createElement(key);
                        elem.setAttribute('content-id', contentId);
                        element.appendChild(elem);
                        this.applyAttributes(elem, obj[`${key}@${contentId}`]);
                    }
                    else {
                        const elem = document.createElement(key);
                        elem.setAttribute('content-id', contentId);
                        element.appendChild(elem);
                        this.applyAttributes(elem, obj[key]);
                    }
                }
            }
            // don't stomp on the 'hydrated' class of Stencil components that
            // dxp-container might wrap; else the components won't be visible
            //
            // @note this exposes a potential issue - if an element AND the JSON
            // dxp-container applies to an element both contain overlapping keys /
            // attribute names, who wins? In other words, if the element has a
            // `class` attribute, but the JSON for the element ALSO has a `class`
            // key, the value for which is to be assigned to the element ... what
            // ends up as the value for `class` up on the element?
            if (key === 'class' && !element.classList.contains('hydrated') &&
                isCustomElement(element)) {
                element.classList.add('hydrated');
            }
        });
        // no, I really want to return the element, not a new object
        // tslint:disable-next-line:prefer-object-spread
        return Object.assign(element, properties);
    }
    /**
     * iterate through cms json and apply those data to any matching
     * content-id'd element
     */
    assignContent() {
        if (typeof this.data !== 'object') {
            core$1.dxp.log.error(this.container.tagName, 'assignContent()', 'cms data is not object');
            return;
        }
        core$1.dxp.log.trace(this.container.tagName, 'assignContent()', 'dxp-container: assigning content');
        Object.keys(this.data).forEach(key => {
            // match the container-id in json with our container's id
            if (key.toLowerCase() === this.containerId.toLowerCase()) {
                // iterate the object inside a matched container
                Object.keys(this.data[key].components).forEach(contentId => {
                    // find all tags with content-id matching cms data property name
                    const selectorAndId = contentId.split('@');
                    const targets = Array.from(this.container.querySelectorAll(`[content-id=${selectorAndId[1]}]`));
                    targets.forEach(target => {
                        // apply attribute and create content
                        this.applyAttributes(target, this.data[key].components[contentId]);
                    });
                });
            }
        });
        this.initialAssignmentDone = true;
        this.srcLoaded.emit({ src: this.src });
    }
    /** fetch cms json based on url provided */
    async fetchContent() {
        this.srcAssigned = true;
        try {
            this.data = await core$1.dxp.api(this.src);
            this.assignContent();
        }
        catch (e) {
            core$1.dxp.log.error(this.container.tagName, 'fetchContent()', `cms fetch failed for ${this.src}`, e);
            this.srcFailed.emit({ src: this.src });
        }
    }
    /** uppercase dashed attribute names */
    formatAttributeName(attr) {
        return attr.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
    }
    /**
     * watch for any nodes added with a content-id property,
     * and if so see if we need to assign content to them
     */
    initObserver() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                const addedNodes = Array.from(mutation.addedNodes);
                addedNodes.forEach(addedNode => {
                    if (this.initialAssignmentDone && addedNode['nodeType'] === Node.ELEMENT_NODE) {
                        const contentId = addedNode['getAttribute']('content-id');
                        if (contentId && this.data[contentId]) {
                            this.applyAttributes(addedNode, this.data[contentId]);
                        }
                    }
                });
            });
        });
        observer.observe(this.container, { childList: true, subtree: true });
    }
    /** Render does nothing, as this is a non-visible component */
    render() {
        return '';
    }
    get container() { return core$1.getElement(this); }
    static get watchers() { return {
        "src": ["srcChanged"]
    }; }
};

exports.dxp_container = Container;
