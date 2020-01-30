/* tslint:disable */
import { h } from "@stencil/core";
export default {
    render(styles) {
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            styles,
            this.isOtherDeviceVerticalView() && this.verticalContentPosition === 'bottom' &&
                h("div", { class: `dxp-row vertical other-device` },
                    h("div", { class: "tab-wrapper-vertical dxp-col-lg-4 dxp-col-12" },
                        this.renderTabsHeader(),
                        this.renderTabsEyebrowText(),
                        this.renderTabs(this.nestedTabs, 'down'),
                        this.renderCTA()),
                    this.renderTabsContent(this.tabItems)),
            this.isOtherDeviceVerticalView() && this.verticalContentPosition === 'top' &&
                h("div", { class: `dxp-row vertical other-device` },
                    this.renderTabsContent(this.tabItems),
                    h("div", { class: "tab-wrapper-vertical dxp-col-lg-4 dxp-col-12" },
                        this.renderTabsHeader(),
                        this.renderTabsEyebrowText(),
                        this.renderTabs(this.nestedTabs, 'up'),
                        this.renderCTA())),
            this.isOtherDeviceVerticalView() && this.verticalContentPosition === 'accordion' &&
                h("div", { class: `dxp-row vertical other-device` },
                    this.renderTabsEyebrowText(),
                    this.renderTabsContent(this.tabItems),
                    h("div", { class: `dxp-row accordion` }, this.renderCTA())),
            !this.isOtherDeviceVerticalView() &&
                h("div", { class: `dxp-row vertical` },
                    h("div", { class: "tab-wrapper-vertical dxp-col-lg-4 dxp-col-12 dxp-col-offset-lg-1" },
                        this.renderTabsHeader(),
                        this.renderTabsEyebrowText(),
                        this.renderTabs(this.nestedTabs, 'next'),
                        this.renderCTA()),
                    this.renderTabsContent(this.tabItems))));
    }
};
