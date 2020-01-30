var ARIA_EXPANDED = 'aria-expanded';
var ICON_CLOSE_CLASS = '.dxp-icon-close';
/** Common methods  */
var CommonUtility = /** @class */ (function () {
    function CommonUtility() {
    }
    /** Open Overlay */
    CommonUtility.prototype.openOverlay = function (link, menuBgContainer) {
        var parent = link.parentNode.parentElement.parentElement;
        var childContent = link.querySelector('.sub-nav-child-container');
        var overlay = parent.querySelector('.overlay') ? parent.querySelector('.overlay') : link.parentElement.parentElement.querySelector('.overlay');
        var overlayBg = parent.querySelector('.overlay-container') ? parent.querySelector('.overlay-bg-img')
            : link.parentElement.parentElement.querySelector('.overlay-bg-img');
        var closeIcon = parent.querySelector('.overlay') ? parent.querySelector(ICON_CLOSE_CLASS) : link.parentElement.parentElement.querySelector(ICON_CLOSE_CLASS);
        // toggle functionality
        if (link.classList.contains('in')) {
            link.classList.remove('in');
            link.querySelector('.nav-item').removeAttribute(ARIA_EXPANDED);
            if (overlay) {
                overlay.classList.remove('expanded');
                closeIcon.classList.add('dxp-none');
            }
            childContent.classList.remove('expanded');
            childContent.classList.remove('show');
        }
        else {
            var expanded = parent.querySelector('.in');
            if (expanded) {
                var navItem = expanded.querySelector('.nav-item');
                navItem.removeAttribute(ARIA_EXPANDED);
                navItem.nextElementSibling.classList.remove('expanded');
                navItem.nextElementSibling.classList.remove('show');
                expanded.classList.remove('in');
            }
            link.classList.add('in');
            link.querySelector('.nav-item').setAttribute(ARIA_EXPANDED, 'true');
            if (overlay) {
                if (menuBgContainer) {
                    overlay.classList.remove('overlay-bg-color');
                    overlayBg.style.backgroundImage = "url(" + menuBgContainer + ")";
                }
                else {
                    overlayBg.style.backgroundImage = 'none';
                    overlay.classList.add('overlay-bg-color');
                }
                overlay.classList.add('expanded');
                closeIcon.classList.remove('dxp-none');
            }
            childContent.classList.add('show');
            childContent.classList.add('expanded');
        }
    };
    /** close overlay */
    CommonUtility.prototype.closeOverlay = function (link, currentParent) {
        var childContent = this.getElement(link, '.sub-nav-child-container');
        var overlay = this.getElement(currentParent, '.overlay');
        link.classList.remove('in');
        link.querySelector('.nav-item').removeAttribute(ARIA_EXPANDED);
        link.querySelector('.nav-item').focus();
        childContent.classList.remove('expanded');
        childContent.classList.remove('show');
        overlay.classList.remove('expanded');
        var closeIcon = currentParent ? currentParent.querySelector(ICON_CLOSE_CLASS) : currentParent.querySelector(ICON_CLOSE_CLASS);
        closeIcon.classList.add('dxp-none');
    };
    /** find element  */
    CommonUtility.prototype.getElement = function (item, className) {
        return item.querySelector(className) ? item.querySelector(className) : item.querySelector(className);
    };
    /** set menu item position the number of menu items of accessibility compliance */
    CommonUtility.prototype.setPosNSize = function (menuItems) {
        for (var _i = 0, _a = Object.keys(menuItems); _i < _a.length; _i++) {
            var i = _a[_i];
            if (menuItems[i] !== null) {
                if (menuItems[i].classList.contains('nav-item-li')) {
                    // Skip the overlay menu item
                    menuItems[i].querySelector('.nav-item').setAttribute('aria-posinset', (1 + Number(i)));
                    menuItems[i].querySelector('.nav-item').setAttribute('aria-setsize', (menuItems.length));
                    var subNavItems = menuItems[i].querySelectorAll('.sub-nav-item');
                    var menuDescriptionItems = menuItems[i].querySelectorAll('.menu-description');
                    for (var _b = 0, _c = Object.keys(subNavItems); _b < _c.length; _b++) {
                        var j = _c[_b];
                        if (menuDescriptionItems[j]) {
                            menuDescriptionItems[j].setAttribute('id', "menu-description-" + (1 + Number(i)) + "-" + (1 + Number(j)));
                        }
                        subNavItems[j].setAttribute('aria-describedby', "menu-description-" + (1 + Number(i)) + "-" + (1 + Number(j)));
                        subNavItems[j].setAttribute('aria-posinset', (1 + Number(j)));
                        subNavItems[j].setAttribute('aria-setsize', (subNavItems.length));
                    }
                }
            }
        }
    };
    return CommonUtility;
}());
export { CommonUtility as C };
