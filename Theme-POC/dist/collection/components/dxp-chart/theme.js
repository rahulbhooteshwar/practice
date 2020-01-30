import dxp from '@mc-dxp/dxp-ui-core';
/** Theme class for performing operations related to styling */
export default class Theme {
    /** Setting theme for component */
    async setTheme(spec) {
        const themeUrl = `${dxp.config.get('DXP_STYLE_BASE_URL')}/json/${spec.theme}/dxp-chart.json`;
        try {
            // data to be returned from API
            this.config = await dxp.api(themeUrl);
        }
        catch (err) {
            dxp.log.error(`fetch failed for ${themeUrl}`, err);
        }
        return this.config;
    }
}
