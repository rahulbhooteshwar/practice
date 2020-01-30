/** Common methods  */
class CommonUtility {
    /** current page active link */
    activeCurrentPage(links, i) {
        const parent = links[i].closest('dxp-nav-group');
        const mainMenu = parent.querySelector('.nav-level-one-link');
        const allNavGroups = parent.parentElement.querySelectorAll('dxp-nav-group');
        const isManualActive = Array.from(allNavGroups).map(e => e.getAttribute('is-active')).filter(word => word === 'true').length;
        if (isManualActive < 1) {
            if (mainMenu) {
                mainMenu.classList.add('active');
            }
            links[i].classList.add('active');
            links[i].setAttribute('aria-current', 'page');
        }
    }
    /** Add the active class to Main menu & Sub menu link of current web page */
    currentPageMenuLink(links) {
        for (let i = 0; i < links.length; i++) {
            // page url and menu items link highlight current page link
            if (window.location.pathname === links[i].getAttribute('href')) {
                this.activeCurrentPage(links, i);
            }
        }
    }
    /** Update prop value as true of 'dxp-nav-group' element */
    parentMenuItem(navGroup) {
        navGroup.setAttribute('is-nested-menu', 'true');
    }
    /** Remove nav item more than max limit */
    preventExtraMenuItems(navItems, maxNumItems) {
        for (const i of Object.keys(navItems)) {
            if (Number(i) > maxNumItems) {
                navItems[i].remove();
            }
        }
    }
    /** set menu item position the number of menu items of accessibility compliance */
    setPosNSize(menuItems) {
        for (const i of Object.keys(menuItems)) {
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
    }
}

const messages = {
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
