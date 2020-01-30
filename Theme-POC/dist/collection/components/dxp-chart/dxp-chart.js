import { BaseComponent } from '@mc-dxp/dxp-ui-base-component';
import dxp from '@mc-dxp/dxp-ui-core';
import { h } from "@stencil/core";
// tslint:disable-next-line:no-import-side-effect
import 'core-js';
import embed from 'vega-embed';
import BarChart from './bar-chart';
import messages from './messages';
import PieChart from './pie-chart';
/** dxp-chart */
export class Chart {
    /** actions to be performed prior to component loading */
    async componentWillLoad() {
        this.base = new BaseComponent(this, dxp);
        this.base.i18Init(dxp, 'Chart', messages);
        this.chartSpec = this.fillChartSpec();
        if (this.apiUrl) {
            try {
                // data to be returned from API
                this.data = await dxp.api(this.apiUrl);
            }
            catch (err) {
                dxp.log.error(`fetch failed for ${this.apiUrl}`, err);
            }
        }
        else {
            this.data = typeof this.data === 'string' ? JSON.parse(this.data) : this.data;
        }
        this.chartSchemaData = await this.fillChartData(this.chart, this.data, this.chartSpec);
    }
    /** actions to be performed after to component loading */
    componentDidLoad() {
        /** drawing chart after data fetched */
        this.drawChart(this.chartHtmlRef, this.chartSchemaData);
    }
    /**
     * click listener for routing events on anchor tag
     */
    routingHandler(event) {
        this.base.routingEventListener(event);
    }
    /** Method to draw chart */
    drawChart(chartObj, chartData) {
        embed(chartObj, chartData, { 'actions': false, 'renderer': 'svg' }).then((result) => result.view);
    }
    /** Method to fill data of chart according to chart type */
    async fillChartData(chart, data, spec) {
        let chartData;
        switch (chart) {
            case 'bar': {
                this.barChartObj = new BarChart();
                chartData = await this.barChartObj.getData(data, spec);
                break;
            }
            case 'pie': {
                this.pieChartObj = new PieChart();
                chartData = await this.pieChartObj.getData(data, spec);
                break;
            }
            default:
                dxp.log.error('chart value not passed');
                break;
        }
        return chartData;
    }
    /** fill chart spec passed */
    fillChartSpec() {
        return { title: this.chartTitle,
            xaxis: this.xAxis,
            yaxis: this.yAxis,
            showToolTip: this.showTooltip,
            chartType: this.chartType,
            orientation: this.orientation,
            theme: this.theme,
            showLegend: this.showLegend,
            legendTitle: this.legendTitle,
            legendOrient: this.legendOrient,
            legendDirection: this.legendDirection,
            height: this.height,
            width: this.width };
    }
    /** Render the chart */
    render() {
        dxp.log.debug(`in dxp-chart render() : ${process.env.MODE}`);
        return (h("div", { class: this.base.componentClass(), dir: this.dir, "data-theme": this.theme },
            h("div", { class: "chart-container", ref: element => this.chartHtmlRef = element })));
    }
    static get is() { return "dxp-chart"; }
    static get originalStyleUrls() { return {
        "$": ["dxp-chart.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dxp-chart.css"]
    }; }
    static get properties() { return {
        "apiUrl": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "api url for chart"
            },
            "attribute": "api-url",
            "reflect": false
        },
        "chart": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'bar' | 'pie'",
                "resolved": "\"bar\" | \"pie\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "holds chart category"
            },
            "attribute": "chart",
            "reflect": false
        },
        "chartTitle": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "''",
                "resolved": "\"\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "holds chart title"
            },
            "attribute": "chart-title",
            "reflect": false
        },
        "chartType": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'basic' | 'doughnut' | 'stacked' | 'group'",
                "resolved": "\"basic\" | \"doughnut\" | \"group\" | \"stacked\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "holds sub type of chart"
            },
            "attribute": "chart-type",
            "reflect": false
        },
        "data": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "contains chart data array"
            },
            "attribute": "data",
            "reflect": false
        },
        "height": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "holds height of chart"
            },
            "attribute": "height",
            "reflect": false
        },
        "legendDirection": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'vertical' | 'horizontal'",
                "resolved": "\"horizontal\" | \"vertical\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "holds legend direction"
            },
            "attribute": "legend-direction",
            "reflect": false
        },
        "legendOrient": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'top' | 'bottom' | 'left' | 'right'",
                "resolved": "\"bottom\" | \"left\" | \"right\" | \"top\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "holds legend orientation"
            },
            "attribute": "legend-orient",
            "reflect": false
        },
        "legendTitle": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "''",
                "resolved": "\"\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "holds legend title"
            },
            "attribute": "legend-title",
            "reflect": false
        },
        "orientation": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "'vertical' | 'horizontal'",
                "resolved": "\"horizontal\" | \"vertical\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Chart orientation"
            },
            "attribute": "orientation",
            "reflect": false
        },
        "showLegend": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "true | false",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "holds legend visibility"
            },
            "attribute": "show-legend",
            "reflect": false
        },
        "showTooltip": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "true | false",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "holds tool tip"
            },
            "attribute": "show-tooltip",
            "reflect": false
        },
        "width": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "holds width of chart"
            },
            "attribute": "width",
            "reflect": false
        },
        "xAxis": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "''",
                "resolved": "\"\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "holds x axis label"
            },
            "attribute": "x-axis",
            "reflect": false
        },
        "yAxis": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "''",
                "resolved": "\"\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "holds y axis label"
            },
            "attribute": "y-axis",
            "reflect": false
        }
    }; }
    static get states() { return {
        "dir": {},
        "theme": {}
    }; }
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "click",
            "method": "routingHandler",
            "target": undefined,
            "capture": true,
            "passive": false
        }]; }
}
