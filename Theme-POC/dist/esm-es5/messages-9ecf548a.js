/** Common methods  */
var CommonUtility = /** @class */ (function () {
    function CommonUtility() {
    }
    /** current page active link */
    CommonUtility.prototype.activeCurrentPage = function (links, i) {
        var parent = links[i].closest('dxp-nav-group');
        var mainMenu = parent.querySelector('.nav-level-one-link');
        var allNavGroups = parent.parentElement.querySelectorAll('dxp-nav-group');
        var isManualActive = Array.from(allNavGroups).map(function (e) { return e.getAttribute('is-active'); }).filter(function (word) { return word === 'true'; }).length;
        if (isManualActive < 1) {
            if (mainMenu) {
                mainMenu.classList.add('active');
            }
            links[i].classList.add('active');
            links[i].setAttribute('aria-current', 'page');
        }
    };
    /** Add the active class to Main menu & Sub menu link of current web page */
    CommonUtility.prototype.currentPageMenuLink = function (links) {
        for (var i = 0; i < links.length; i++) {
            // page url and menu items link highlight current page link
            if (window.location.pathname === links[i].getAttribute('href')) {
                this.activeCurrentPage(links, i);
            }
        }
    };
    /** Update prop value as true of 'dxp-nav-group' element */
    CommonUtility.prototype.parentMenuItem = function (navGroup) {
        navGroup.setAttribute('is-nested-menu', 'true');
    };
    /** Remove nav item more than max limit */
    CommonUtility.prototype.preventExtraMenuItems = function (navItems, maxNumItems) {
        for (var _i = 0, _a = Object.keys(navItems); _i < _a.length; _i++) {
            var i = _a[_i];
            if (Number(i) > maxNumItems) {
                navItems[i].remove();
            }
        }
    };
    /** set menu item position the number of menu items of accessibility compliance */
    CommonUtility.prototype.setPosNSize = function (menuItems) {
        for (var _i = 0, _a = Object.keys(menuItems); _i < _a.length; _i++) {
            var i = _a[_i];
            if (menuItems[i].classList.contains('mega-menu-link') || menuItems[i].classList.contains('mega-sub-menu-link')) {
                // Skip the overlay menu item
                if (i === '0') {
                    continue;
                }
                menuItems[i].setAttribute('aria-posinset', (i));
                menuItems[i].setAttribute('aria-setsize', (menuItems.length - 1));
            }
            else {
                menuItems[i].setAttribute('aria-posinset', (1 + Number(i)));
                menuItems[i].setAttribute('aria-setsize', (menuItems.length));
            }
        }
    };
    return CommonUtility;
}());
var messages = {
    'en': {
        closeIconTitle: 'Hamburger',
        ariaMenuText: 'Expand Sub Mega Menu'
    },
    'en-us': {
        closeIconTitle: 'Hamburger',
        ariaMenuText: 'Expand Sub Mega Menu'
    }
};
export { CommonUtility as C, messages as m };
