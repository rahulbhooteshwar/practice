/**
 * returns an element's theme, if any
 *
 * takes an element and reads all the way up the DOM tree looking for
 * any element with a class starting with "dxp-theme-";
 * returns first found class, or undefined
 * OR
 * base component class all DXP components instances should attach to get dir attribute
 * @recursive
 */
var getComponentAttribute = function (el, attr) {
    /* look for theme class recursively up the DOM tree */
    var findValue = function (elem) {
        var result = elem.getAttribute(attr);
        // istanbul ignore if
        if (result) {
            return result;
        }
        if (elem.parentElement) {
            return findValue(elem.parentElement);
        }
        if (attr === 'data-theme') {
            return "dxp-theme-white";
        }
        if (attr === 'dir') {
            return "ltr";
        }
        if (attr === 'data-dtm-url') {
            return undefined;
        }
    };
    return el ? findValue(el) : undefined;
};
/**
 * base component class all DXP components instances should attach
 */
var BaseComponent = /** @class */ (function () {
    function BaseComponent(component, dxp) {
        /** returns a component's theme, if any */
        this.getComponentTheme = getComponentAttribute; // tslint:disable-line
        /** returns a component's dir, if any */
        this.getComponentDir = getComponentAttribute; // tslint:disable-line
        this.component = component;
        this.dxp = dxp;
        // set component's initial theme
        var foundTheme = getComponentAttribute(this.component.element, 'data-theme');
        this.component.theme = foundTheme ? foundTheme : "dxp-theme-white";
        // set component's initial dir
        var foundDir = getComponentAttribute(this.component.element, 'dir');
        this.component.dir = foundDir ? foundDir : "ltr";
        // set component's initial dtmUrl
        var foundUrl = getComponentAttribute(this.component.element, 'data-dtm-url');
        this.component.dtmUrl = foundUrl ? foundUrl : dxp.config.get('DTM_URL');
    }
    /** returns common component CSS class list */
    BaseComponent.prototype.componentClass = function () {
        var classList = ['dxp'];
        if (this.component.theme) {
            classList.push(this.component.theme);
        }
        var componentClass = this.component.element ? this.component.element.tagName.toLowerCase() : '';
        // for FooList add class dxp-foo-list
        classList.push(componentClass);
        return classList.join(' ');
    };
    /**
     * initialize i18n
     * typically run from ComponentWillLoad to initialize i18n for the component
     */
    BaseComponent.prototype.i18Init = function (dxp, namespace, messages) {
        var _this = this;
        dxp.i18n.language = dxp.locale();
        dxp.i18n.languages = [];
        /** load resources for both language and locale (e.g. 'en' and 'en-US') */
        var loadResources = function (languageOrLocale) {
            var language = languageOrLocale;
            var locale;
            if (languageOrLocale.includes('-')) {
                language = languageOrLocale.split('-')[0];
                locale = languageOrLocale;
            }
            dxp.i18n.languages.push(language);
            dxp.i18n.addResourceBundle(language, namespace, messages[language]);
            if (locale) {
                dxp.i18n.languages.push(locale);
                dxp.i18n.addResourceBundle(locale, namespace, messages[locale]);
            }
        };
        this.component.locale = dxp.i18n.language;
        /** create the component namespace and load initial resources */
        dxp.i18n.loadNamespaces(namespace, function () {
            loadResources(dxp.i18n.language);
        });
        /** event handler for language change */
        dxp.i18n.on('languageChanged', function (language) {
            dxp.log.trace('dxp-base-component', 'loadResources()', "language changed: " + language);
            loadResources(language);
            _this.component.locale = language;
        });
    };
    /** to return the host elements inside or outside shadowRoot */
    BaseComponent.prototype.shadowRootQuerySelector = function (host, query, all) {
        if (all === void 0) { all = false; }
        if (all) {
            return host ? host.querySelectorAll(query) : host.querySelectorAll(query);
        }
        return host ? host.querySelector(query) : host.querySelector(query);
    };
    /**
     * Create nested markup for child elements
     * @param nestedTarget Target container where nesetd elements will be created
     * @param nestedSelector Selector of element to be created
     * @param data Array of values to be applied to custom nested elements
     */
    BaseComponent.prototype.createNestedMarkup = function (nestedTarget, nestedSelector, data) {
        var _this = this;
        var fragment = document.createDocumentFragment();
        var createdNestedElements = [];
        if (data && nestedSelector && nestedTarget) {
            data.forEach(function (item) {
                var ref = document.createElement(nestedSelector);
                // if keys of object is in kebabcase then it should be converted into camelcase
                var formattedItem = _this.formatDataObjectKeys(item);
                Object.assign(ref, formattedItem);
                fragment.appendChild(ref);
                createdNestedElements.push(ref);
            });
            nestedTarget.innerHTML = '';
            nestedTarget.appendChild(fragment);
        }
        return createdNestedElements;
    };
    /**
     * Create SEO Script for component
     */
    BaseComponent.prototype.createSeoSchema = function (dxp, componentElem, schemaObject) {
        dxp.seo(componentElem, schemaObject);
    };
    /** format data keys to camelCase */
    BaseComponent.prototype.formatDataObjectKeys = function (object) {
        var _this = this;
        var formattedObject = {};
        Object.keys(object)
            .forEach(function (key) {
            formattedObject[_this.dxp.util.kebabToCamelCase(key)] = object[key];
        });
        return formattedObject;
    };
    /**
     * Routing event callback
     * @param event click event object
     */
    BaseComponent.prototype.routingEventListener = function (event) {
        /*
         * Note: event.composedPath has cross browser compatibility issues, but we don't need a polyfill in StencilJS components as it is done by StencilJS
         * But...remember this is not Stencil component so we need it here. Don't remove it..never ever 😊
         */
        var composedPath = function (element) {
            var path = [];
            while (element) {
                path.push(element);
                if (element.tagName === 'HTML') {
                    path.push(document);
                    path.push(window);
                    return path;
                }
                element = element.parentElement;
            }
        };
        var pathTargets = (event.composedPath && event.composedPath()) || composedPath(event.target);
        if (pathTargets) {
            var clickedTarget = void 0;
            for (var _i = 0, pathTargets_1 = pathTargets; _i < pathTargets_1.length; _i++) {
                var target = pathTargets_1[_i];
                if (target instanceof HTMLAnchorElement) {
                    clickedTarget = target;
                    break;
                }
            }
            if (clickedTarget && clickedTarget.getAttribute('href')) {
                var href = clickedTarget.getAttribute('href') || '';
                var opensInNewTab = clickedTarget.getAttribute('target') === '_blank';
                var isAbsolute = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('www')
                    || href.startsWith('//') || href.startsWith('data:') || href.startsWith('mailto:');
                if (!opensInNewTab && !isAbsolute && window['navigateByRouting']) {
                    event.preventDefault();
                    window['navigateByRouting'](href);
                    return false;
                }
            }
        }
    };
    /** get device width type */
    BaseComponent.prototype.getDeviceWidthType = function () {
        var xl = window.matchMedia('screen and (min-width: 1200px)');
        var lg = window.matchMedia('screen and (min-width: 992px)');
        var md = window.matchMedia('screen and (min-width: 768px)');
        switch (true) {
            case xl.matches:
                return 'xl';
            case lg.matches:
                return 'lg';
            case md.matches:
                return 'md';
            default:
                return 'sm';
        }
    };
    /** return boolean value */
    BaseComponent.prototype.returnBooleanValue = function (element) {
        var boolValue = false;
        if (element) {
            boolValue = true;
        }
        return boolValue;
    };
    return BaseComponent;
}());

export { BaseComponent as B };
