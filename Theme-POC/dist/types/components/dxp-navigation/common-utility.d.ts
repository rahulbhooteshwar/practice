/** Common methods  */
export default class CommonUtility {
    /** current page active link */
    activeCurrentPage(links: any, i: any): void;
    /** Add the active class to Main menu & Sub menu link of current web page */
    currentPageMenuLink(links: any): void;
    /** Update prop value as true of 'dxp-nav-group' element */
    parentMenuItem(navGroup: any): void;
    /** Remove nav item more than max limit */
    preventExtraMenuItems(navItems: any, maxNumItems: any): void;
    /** set menu item position the number of menu items of accessibility compliance */
    setPosNSize(menuItems: any): void;
}
