var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, d as dxp, g as getElement } from './core-cdc608e2.js';
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
var isCustomElement = function (element) {
    if (customElements) {
        return !customElements.get(element.tagName.toLowerCase());
    }
    dxp.log.error(element.tagName, 'isCustomElement()', 'expected customElements API');
    return false;
};
var Container = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /** track if we only provide content to added dom elements */
        this.initialAssignmentDone = false;
        this.srcFailed = createEvent(this, "srcFailed", 7);
        this.srcLoaded = createEvent(this, "srcLoaded", 7);
    }
    /**
     * if src is set post-load, trigger content loading and assignment.
     * note that you can only set SRC once, it cannot be changed to
     * modify content again.
     *
     * @param {string} newSrc - new value for prop src
     * @param {string} oldSrc - previous value of src
     */
    class_1.prototype.srcChanged = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.srcAssigned) {
                            dxp.log.debug(this.container.tagName, 'isCustomElement()', 'cannot change src after initially assigned');
                            this.srcFailed.emit({ src: this.src });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.fetchContent()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** fetch content and apply mutation observer on load */
    // content fetch and apply only happens once, onload
    class_1.prototype.componentWillLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.src) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchContent()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.initObserver(); // track dom changes to re-apply content
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * for each element, set html attributes for any normal properties,
     * and use the setter for any object/array properties
     * @param {Element} element - html element to apply attributes to
     * @param {Object.<string, obj>} obj - attributes to apply to element
     */
    class_1.prototype.applyAttributes = function (element, obj) {
        var _this = this;
        // properties collects keys/values if values are of type array or object
        var properties = {};
        Object.keys(obj).forEach(function (key) {
            if (!key.startsWith('dxp-')) {
                if (Array.isArray(obj[key]) || (typeof obj[key] === 'object')) {
                    properties[key] = obj[key];
                }
                else {
                    element.setAttribute(_this.formatAttributeName(key), obj[key]);
                }
            }
            else {
                if (Array.isArray(obj[key])) {
                    obj[key].forEach(function (object) {
                        var elem = document.createElement(key);
                        element.appendChild(elem);
                        _this.applyAttributes(elem, object);
                    });
                }
                else {
                    var contentId = '';
                    if (key.indexOf('@') > 0) {
                        contentId = key.split('@')[1];
                        key = key.split('@')[0];
                        var elem = document.createElement(key);
                        elem.setAttribute('content-id', contentId);
                        element.appendChild(elem);
                        _this.applyAttributes(elem, obj[key + "@" + contentId]);
                    }
                    else {
                        var elem = document.createElement(key);
                        elem.setAttribute('content-id', contentId);
                        element.appendChild(elem);
                        _this.applyAttributes(elem, obj[key]);
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
    };
    /**
     * iterate through cms json and apply those data to any matching
     * content-id'd element
     */
    class_1.prototype.assignContent = function () {
        var _this = this;
        if (typeof this.data !== 'object') {
            dxp.log.error(this.container.tagName, 'assignContent()', 'cms data is not object');
            return;
        }
        dxp.log.trace(this.container.tagName, 'assignContent()', 'dxp-container: assigning content');
        Object.keys(this.data).forEach(function (key) {
            // match the container-id in json with our container's id
            if (key.toLowerCase() === _this.containerId.toLowerCase()) {
                // iterate the object inside a matched container
                Object.keys(_this.data[key].components).forEach(function (contentId) {
                    // find all tags with content-id matching cms data property name
                    var selectorAndId = contentId.split('@');
                    var targets = Array.from(_this.container.querySelectorAll("[content-id=" + selectorAndId[1] + "]"));
                    targets.forEach(function (target) {
                        // apply attribute and create content
                        _this.applyAttributes(target, _this.data[key].components[contentId]);
                    });
                });
            }
        });
        this.initialAssignmentDone = true;
        this.srcLoaded.emit({ src: this.src });
    };
    /** fetch cms json based on url provided */
    class_1.prototype.fetchContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.srcAssigned = true;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, dxp.api(this.src)];
                    case 2:
                        _a.data = _b.sent();
                        this.assignContent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        dxp.log.error(this.container.tagName, 'fetchContent()', "cms fetch failed for " + this.src, e_1);
                        this.srcFailed.emit({ src: this.src });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /** uppercase dashed attribute names */
    class_1.prototype.formatAttributeName = function (attr) {
        return attr.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
    };
    /**
     * watch for any nodes added with a content-id property,
     * and if so see if we need to assign content to them
     */
    class_1.prototype.initObserver = function () {
        var _this = this;
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                var addedNodes = Array.from(mutation.addedNodes);
                addedNodes.forEach(function (addedNode) {
                    if (_this.initialAssignmentDone && addedNode['nodeType'] === Node.ELEMENT_NODE) {
                        var contentId = addedNode['getAttribute']('content-id');
                        if (contentId && _this.data[contentId]) {
                            _this.applyAttributes(addedNode, _this.data[contentId]);
                        }
                    }
                });
            });
        });
        observer.observe(this.container, { childList: true, subtree: true });
    };
    /** Render does nothing, as this is a non-visible component */
    class_1.prototype.render = function () {
        return '';
    };
    Object.defineProperty(class_1.prototype, "container", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "src": ["srcChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
export { Container as dxp_container };
