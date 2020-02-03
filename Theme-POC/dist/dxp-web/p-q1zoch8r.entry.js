import{r as t,c as i,d as s,h as e,g as h}from"./p-8188e849.js";import{B as l}from"./p-16d6f0ca.js";import{m as d}from"./p-7eaf9cd8.js";const c=class{constructor(s){t(this,s),this.cellType="text",this.dxpDataGridEvents=i(this,"dxpDataGridEvents",7),this.toggleFilterEvent=i(this,"toggleFilterEvent",7)}componentWillLoad(){this.base=new l(this,s),this.base.i18Init(s,"DataGridCell",d)}componentDidLoad(){if("cta"===this.cellType){let t=this.data.celldata.cta;const i=this.data.row,s=this.data.celldata.cta.ctaList.map(t=>Object.entries(t)).map(t=>t.reduce((t,s)=>{const e=s[1],h=s[0];let l={};if(e){const s=["src","text","disabled"].includes(h)?i[e]:e;l=Object.assign(Object.assign({},t),{[h]:s})}else l=t;return l},{}));t=Object.assign(Object.assign({},t),{ctaList:s}),this.base.createNestedMarkup(this.cellElement,"dxp-cta-list",[t])}else"text"===this.cellType?this.content&&(this.cellElement.innerHTML=this.content):"checkbox"===this.cellType&&this.cellTypeCheckBox();this.isHeader&&this.cellKey&&(this.base.createNestedMarkup(this.filterWrapperElement,"dxp-data-grid-filter",[{cellKey:this.cellKey,cellOptions:this.cellOptions}]),this.setSortFilterIcon(),this.element.children[0].querySelector('span[div-id="data-grid-cell"]').setAttribute("tabindex","0"),this.element.children[0].querySelector('span[div-id="data-grid-cell"]').setAttribute("role","button"))}buttonClicked(t){if("filterButton"===t.target.getAttribute("btn-id"))return!1;this.dxpDataGridEvents.emit({actionName:this.data.header.column_action||"ctaClickEvent",row:this.data.row,details:t.detail})}checkboxClicked(t){this.dxpDataGridEvents.emit({actionName:this.data.header.column_action||"checkboxData",row:this.data.row,details:t.detail})}handleKeyEvents(t){this.enableFilter&&this.toggleFilters(t)}routingHandler(t){this.base.routingEventListener(t)}cellTypeCheckBox(){this.base.createNestedMarkup(this.cellElement,"dxp-checkbox",[this.data.celldata])[0].componentOnReady().then(t=>{t.querySelector(".dxp-checkbox").style.background="transparent";const i=this.data.header.column_key,s="function"==typeof i?i(this.data.row):i;void 0!==i&&t.setChecked("boolean"==typeof s?s:this.data.row[s]),"select"===this.data.celldata.value&&t.setAttribute("dxpgrid","select"),"selectall"===this.data.celldata.value&&(t.setAttribute("dxpgrid","selectall"),t.setChecked(this.data.celldata.selected))})}setSortFilterIcon(){this.cellOptions&&this.cellOptions.sortOptions&&this.cellOptions.sortOptions[this.cellKey]&&(this.sortIcon=this.cellOptions.sortOptions[this.cellKey]),this.cellOptions.filterOptions&&this.cellOptions.filterOptions[this.cellKey]&&(this.filterIcon=this.cellOptions.filterOptions[this.cellKey].filterAction)}toggleFilters(t){this.cellKey&&"data-grid-cell"===t.target.getAttribute("div-id")&&this.isHeader&&!this.showFilters&&this.toggleFilterEvent.emit(this.cellKey)}render(){return e("div",{"div-id":"data-grid-cell",class:`${this.base.componentClass()} grid-cell ${this.enableFilter&&this.isHeader&&this.cellKey?"is-clickable":""}\n      ${this.showFilters?"is-selected":""}`,"data-theme":this.theme,style:{width:this.width||"250px"},onClick:t=>this.enableFilter?this.toggleFilters(t):""},e("span",{"div-id":"data-grid-cell",ref:t=>{this.cellElement=t}},e("slot",null)),this.sortIcon&&e("i",{"div-id":"data-grid-cell",class:`sort-icon ${this.sortIcon}`}),this.filterIcon&&e("i",{"div-id":"data-grid-cell",class:"filter-icon"}),this.isHeader&&this.cellKey&&e("div",{class:`filter-wrapper ${this.showFilters?"dxp-block":"dxp-none"}`,ref:t=>{this.filterWrapperElement=t}}))}get element(){return h(this)}static get style(){return"div.dxp.dxp-data-grid-cell{background:none;word-break:break-word;word-wrap:break-word;padding:1rem 0 1rem .625rem;display:-ms-flexbox;display:flex}div.dxp.dxp-data-grid-cell.data-grid-cell{text-align:left;line-height:26px}div.dxp.dxp-data-grid-cell .filter-wrapper{position:relative;left:-100%}div.dxp.dxp-data-grid-cell span{padding-right:.625rem;-ms-flex:1;flex:1;max-width:100%}div.dxp.dxp-data-grid-cell .filter-icon,div.dxp.dxp-data-grid-cell .sort-icon{height:1.5rem;width:1rem;margin-right:.5rem}"}};export{c as dxp_data_grid_cell};