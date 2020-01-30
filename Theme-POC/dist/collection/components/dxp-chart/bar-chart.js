/** Class containing method's and interface's reference */
import dxp from '@mc-dxp/dxp-ui-core';
import Theme from './theme';
/** BarChart class for performing operations */
export default class BarChart {
    constructor() {
        this.barGraphData = {
            $schema: dxp.config.get('VEGA_SCHEMA_JSON'),
            title: {},
            config: {},
            padding: 0,
            autosize: {},
            data: [],
            signals: [],
            scales: [],
            axes: [],
            marks: [],
            legends: []
        };
        this.themeObj = new Theme();
    }
    /** Method to prepare data for axis for bar graph */
    async prepareData(data, spec) {
        /** setting theme */
        this.barConfig = await this.themeObj.setTheme(spec);
        const objectKey = Object.keys(data);
        if (objectKey.length > 0 && objectKey.includes('values') && objectKey.includes('name')) {
            const axisFields = Object.keys(data.values[0]);
            if (axisFields[0]) {
                this.xAxisField = axisFields[0];
            }
            if (axisFields[1]) {
                this.yAxisField = axisFields[1];
            }
            if (axisFields[2]) {
                this.valueField = axisFields[2];
            }
            this.dataField = data.name;
        }
        /** setting data */
        this.setData(spec);
        switch (spec.chartType) {
            case 'basic': {
                this.prepareBasicBarGraph(spec, data);
                break;
            }
            case 'stacked': {
                this.prepareStackedBarGraph(spec, data);
                break;
            }
            case 'group': {
                this.prepareGroupedBarGraph(spec, data);
                break;
            }
            default:
                break;
        }
    }
    /** Method to return data for bar graph */
    async getData(data, spec) {
        await this.prepareData(data, spec);
        if (spec.width) {
            this.barGraphData.width = spec.width;
        }
        else {
            this.barGraphData.signals = [{
                    'name': 'width',
                    'init': 'isFinite(containerSize()[0]) ? containerSize()[0] : 200',
                    'on': [
                        {
                            'update': 'isFinite(containerSize()[0]) ? containerSize()[0] : 200',
                            'events': 'window:resize'
                        }
                    ]
                }];
        }
        this.barGraphData.title = spec.title;
        this.barGraphData.height = spec.height;
        this.barGraphData.padding = 5;
        this.barGraphData.scales = this.barScales;
        this.barGraphData.marks.push(this.barMarks);
        this.barGraphData.axes = this.barAxes;
        this.barGraphData.config = this.barConfig;
        this.barGraphData.legends = this.barLegend;
        /** settings for responsive */
        this.barGraphData.autosize = { 'type': 'fit', 'contains': 'padding' };
        return this.barGraphData;
    }
    /** Method to set data for bar graph */
    setData(spec) {
        /** config object for font tye and font size */
        this.barScales = [
            {
                'name': 'xscale',
                'type': 'band',
                'domain': { 'data': this.dataField, 'field': this.xAxisField },
                'range': 'width',
                'paddingOuter': 0.2,
                'paddingInner': 0.1,
                'round': true
            },
            {
                'name': 'yscale',
                'domain': { 'data': this.dataField, 'field': this.yAxisField },
                'nice': true,
                'range': 'height'
            },
            {
                'name': 'color',
                'type': 'ordinal',
                'domain': [spec.xaxis],
                'range': [this.barConfig.barColourScheme[0]]
            }
        ];
        this.barAxes = [
            { 'orient': 'bottom', 'scale': 'xscale', 'title': spec.xaxis },
            { 'orient': 'left', 'scale': 'yscale', 'title': spec.yaxis, 'grid': true }
        ];
        this.barMarks = {
            'type': 'rect',
            'from': { 'data': this.dataField },
            'encode': {
                'update': {
                    'fill': { 'value': this.barConfig.barColourScheme[0] },
                    'fillOpacity': { 'value': 1 },
                    'x': { 'scale': 'xscale', 'field': this.xAxisField },
                    'width': { 'scale': 'xscale', 'band': 1 },
                    'y': { 'scale': 'yscale', 'field': this.yAxisField },
                    'y2': { 'scale': 'yscale', 'value': 0 }
                },
                'hover': {
                    'fillOpacity': { 'value': 0.7 }
                }
            }
        };
    }
    /** Method to prepare basic graph data */
    prepareBasicBarGraph(spec, data) {
        /** Basic graph tool tip visibility check */
        if (spec.showToolTip) {
            if (this.barMarks && this.barMarks.encode && this.barMarks.encode.update) {
                this.barMarks.encode.update['tooltip'] = {
                    'signal': `{\"${this.xAxisField}\": ''+datum[\"${this.xAxisField}\"], \"${this.yAxisField}\": format(datum[\"${this.yAxisField}\"], \"\")}`
                };
            }
        }
        /** Basic graph legend check */
        if (spec.showLegend) {
            this.barLegend = [{
                    'title': spec.legendTitle,
                    'orient': spec.legendOrient,
                    'direction': spec.legendDirection,
                    'fill': 'color',
                    'gradientLength': { 'signal': 'clamp(height, 64, 200)' },
                    'symbolType': 'square'
                }];
        }
        /** Basic graph tool tip orientation check */
        if (spec.orientation === 'horizontal') {
            this.barScales = [
                {
                    'name': 'yscale',
                    'type': 'band',
                    'domain': { 'data': this.dataField, 'field': this.xAxisField },
                    'range': 'height',
                    'paddingOuter': 0.2,
                    'paddingInner': 0.1,
                    'reverse': true
                },
                {
                    'name': 'xscale',
                    'domain': { 'data': this.dataField, 'field': this.yAxisField },
                    'nice': true,
                    'range': [0, { 'signal': 'width' }],
                },
                {
                    'name': 'color',
                    'type': 'ordinal',
                    'domain': [spec.xaxis],
                    'range': [this.barConfig.barColourScheme[0]]
                }
            ];
            this.barAxes = [
                { 'orient': 'bottom', 'scale': 'xscale', 'title': spec.xaxis, 'grid': true },
                { 'orient': 'left', 'scale': 'yscale', 'title': spec.yaxis }
            ];
            this.barMarks = {
                'type': 'rect',
                'from': { 'data': this.dataField },
                'encode': {
                    'update': {
                        'fill': { 'value': this.barConfig.barColourScheme[0] },
                        'fillOpacity': { 'value': 1 },
                        'y': { 'scale': 'yscale', 'field': this.xAxisField },
                        'height': { 'scale': 'yscale', 'band': 1 },
                        'x': { 'scale': 'xscale', 'field': this.yAxisField },
                        'x2': { 'scale': 'xscale', 'value': 0 }
                    },
                    'hover': {
                        'fillOpacity': { 'value': 0.7 }
                    }
                }
            };
            if (spec.showToolTip) {
                if (this.barMarks && this.barMarks.encode && this.barMarks.encode.update) {
                    this.barMarks.encode.update['tooltip'] = {
                        'signal': `{\"${this.xAxisField}\": ''+datum[\"${this.xAxisField}\"], \"${this.yAxisField}\": format(datum[\"${this.yAxisField}\"], \"\")}`
                    };
                }
            }
        }
        this.barGraphData.data = data;
    }
    /** Method to prepare stacked graph data */
    prepareStackedBarGraph(spec, data) {
        this.barMarks = {
            'type': 'rect',
            'from': { 'data': this.dataField },
            'encode': {
                'update': {
                    'x': { 'scale': 'xscale', 'field': this.xAxisField },
                    'width': { 'scale': 'xscale', 'band': 1, 'offset': -1 },
                    'y': { 'scale': 'yscale', 'field': 'y0' },
                    'y2': { 'scale': 'yscale', 'field': 'y1' },
                    'fill': { 'scale': 'color', 'field': this.valueField },
                    'fillOpacity': { 'value': 1 }
                },
                'hover': {
                    'fillOpacity': { 'value': 0.7 }
                }
            }
        };
        /** stack graph legend check */
        if (spec.showLegend) {
            this.barLegend = [{
                    'title': spec.legendTitle,
                    'orient': spec.legendOrient,
                    'direction': spec.legendDirection,
                    'fill': 'color',
                    'gradientLength': { 'signal': 'clamp(height, 64, 200)' },
                    'symbolType': 'square'
                }];
        }
        /** stack graph tooltip check */
        if (spec.showToolTip) {
            if (this.barMarks && this.barMarks.encode && this.barMarks.encode.update) {
                this.barMarks.encode.update['tooltip'] = {
                    'signal': `{\"${this.xAxisField}\": ''+datum[\"${this.xAxisField}\"], \"${this.yAxisField}\": format(datum[\"${this.yAxisField}\"], \"\")}`
                };
            }
        }
        this.barScales = [
            {
                'name': 'xscale',
                'type': 'band',
                'paddingOuter': 0.2,
                'paddingInner': 0.1,
                'range': 'width',
                'domain': { 'data': this.dataField, 'field': this.xAxisField }
            },
            {
                'name': 'yscale',
                'type': 'linear',
                'range': 'height',
                'nice': true, 'zero': true,
                'domain': { 'data': this.dataField, 'field': 'y1' }
            },
            {
                'name': 'color',
                'type': 'ordinal',
                'range': this.barConfig.barColourScheme,
                'domain': { 'data': this.dataField, 'field': this.valueField }
            }
        ];
        this.barGraphData.data = data;
        this.barGraphData.data['transform'] = [{
                'type': 'stack',
                'groupby': [this.xAxisField],
                'sort': { 'field': this.valueField },
                'field': this.yAxisField
            }];
    }
    /** Method to prepare grouped graph data */
    prepareGroupedBarGraph(spec, data) {
        /** Grouped Bar Chart Legend check */
        if (spec.showLegend) {
            this.barLegend = [
                {
                    'title': spec.legendTitle,
                    'orient': spec.legendOrient,
                    'direction': spec.legendDirection,
                    'fill': 'color',
                    'gradientLength': { 'signal': 'clamp(child_height, 64, 200)' },
                    'symbolType': 'square'
                }
            ];
        }
        this.barAxes = [
            { 'orient': 'left', 'scale': 'yscale', 'tickSize': 0, 'labelPadding': 8, 'zindex': 1, 'title': spec.yaxis },
            { 'orient': 'bottom', 'scale': 'xscale', 'grid': true, 'title': spec.xaxis }
        ];
        this.barScales = [
            {
                'name': 'yscale',
                'type': 'band',
                'domain': { 'data': this.dataField, 'field': this.xAxisField },
                'range': 'height',
                'padding': 0.2
            },
            {
                'name': 'xscale',
                'type': 'linear',
                'domain': { 'data': this.dataField, 'field': this.valueField },
                'range': 'width'
            },
            {
                'name': 'color',
                'type': 'ordinal',
                'domain': { 'data': this.dataField, 'field': this.yAxisField },
                'range': { 'scheme': this.barConfig.barColourScheme }
            }
        ];
        this.barMarks = {
            'type': 'group',
            'from': {
                'facet': {
                    'data': this.dataField,
                    'name': 'facet',
                    'groupby': this.xAxisField
                }
            },
            'encode': {
                'enter': {
                    'y': { 'scale': 'yscale', 'field': this.xAxisField }
                }
            },
            'signals': [
                { 'name': 'height', 'update': 'bandwidth(\'yscale\')' }
            ],
            'scales': [
                {
                    'name': 'pos',
                    'type': 'band',
                    'range': 'height',
                    'domain': { 'data': 'facet', 'field': this.yAxisField }
                }
            ],
            'marks': [
                {
                    'name': 'bars',
                    'from': { 'data': 'facet' },
                    'type': 'rect',
                    'encode': {
                        'update': {
                            'y': { 'scale': 'pos', 'field': this.yAxisField },
                            'height': { 'scale': 'pos', 'band': 1 },
                            'x': { 'scale': 'xscale', 'field': this.valueField },
                            'x2': { 'scale': 'xscale', 'value': 0 },
                            'fill': { 'scale': 'color', 'field': this.yAxisField },
                            'fillOpacity': { 'value': 1 }
                        },
                        'hover': {
                            'fillOpacity': { 'value': 0.7 }
                        }
                    }
                }
            ]
        };
        /** Grouped Bar Chart tooltip check */
        if (spec.showToolTip) {
            if (this.barMarks && this.barMarks.marks && this.barMarks.marks[0].encode.update) {
                this.barMarks.marks[0].encode.update['tooltip'] = {
                    'signal': `{\"${this.xAxisField}\": ''+datum[\"${this.xAxisField}\"], \"${this.yAxisField}\": format(datum[\"${this.yAxisField}\"], \"\")}`
                };
            }
        }
        this.barGraphData.data = data;
    }
}
