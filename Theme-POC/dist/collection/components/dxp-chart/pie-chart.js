/** class containing method's and interface's reference */
import dxp from '@mc-dxp/dxp-ui-core';
import Theme from './theme';
/** PieChart class for performing operations */
export default class PieChart {
    constructor() {
        this.pieGraphData = {
            $schema: dxp.config.get('VEGA_SCHEMA_JSON'),
            'width': 0,
            'height': 0,
            'autosize': '',
            'padding': 0,
            'data': [],
            'signals': [],
            'scales': [],
            'marks': [],
            'config': {},
            'legends': []
        };
        this.themeObj = new Theme();
    }
    /** Method to prepare data for axis for pie graph */
    async prepareData(data, spec) {
        /** setting theme */
        this.pieConfig = await this.themeObj.setTheme(spec);
        const objectKey = Object.keys(data);
        if (objectKey.length > 0 && objectKey.includes('values') && objectKey.includes('name')) {
            const pieDataKeys = Object.keys(data.values[0]);
            this.dataField = data.name;
            this.pieField = pieDataKeys[0];
            this.pieData = pieDataKeys[1];
            data['transform'] = [{
                    'type': 'pie',
                    'field': this.pieData
                }];
        }
        /** initializing graph data */
        this.setData();
        /** check for tool tip visibility */
        if (spec.showToolTip) {
            this.pieMarks[0].encode.enter['tooltip'] = { 'field': this.pieData };
        }
        /** checking graph sub type is donut */
        if (spec.chartType === 'donut') {
            this.pieMarks[0].encode.enter['innerRadius'] = { 'signal': 'innerRadius' };
        }
    }
    /** Method to return data for pie graph */
    setData() {
        this.pieLegends = [{
                'stroke': 'color',
                'title': 'Profession',
                'orient': 'top-right',
                'encode': {
                    'symbols': {
                        'update': {
                            'fill': { 'value': '' },
                            'strokeWidth': { 'value': 5 },
                            'size': { 'value': 24 }
                        }
                    }
                }
            }];
        this.signalValuePie =
            [{ 'name': 'startAngle', 'value': 0 },
                { 'name': 'endAngle', 'value': 6.29 },
                { 'name': 'padAngle', 'value': 0 },
                { 'name': 'innerRadius', 'value': 80 }
            ];
        this.pieScales = [
            {
                'name': 'color',
                'type': 'ordinal',
                'domain': { 'data': this.dataField, 'field': this.pieField },
                'range': this.pieConfig.pieColourScheme
            }
        ];
        this.pieMarks = [
            {
                'type': 'arc',
                'from': { 'data': this.dataField },
                'encode': {
                    'enter': {
                        'fill': { 'scale': 'color', 'field': this.pieField },
                        'x': { 'signal': 'width / 2' },
                        'y': { 'signal': 'height / 2' },
                        'startAngle': { 'field': 'startAngle' },
                        'endAngle': { 'field': 'endAngle' },
                        'padAngle': { 'signal': 'padAngle' },
                        'outerRadius': { 'signal': 'width / 4' }
                    }
                }
            }
        ];
    }
    /** Method to return data for pie graph */
    async getData(data, spec) {
        await this.prepareData(data, spec);
        this.pieGraphData.title = spec.title;
        this.pieGraphData.data = data;
        this.pieGraphData.width = 500;
        this.pieGraphData.height = 300;
        this.pieGraphData.padding = 5;
        this.pieGraphData.signals = this.signalValuePie;
        this.pieGraphData.scales = this.pieScales;
        this.pieGraphData.marks = this.pieMarks;
        this.pieGraphData.config = this.pieConfig;
        this.pieGraphData.legends = this.pieLegends;
        return this.pieGraphData;
    }
}
