System.register(["./p-f4cc861d.system.js","./p-4b0c1219.system.js"],(function(e){"use strict";var t,o,n,r,i;return{setters:[function(e){t=e.r;o=e.d;n=e.h;r=e.g},function(e){i=e.B}],execute:function(){var s=e("dxp_flex_layout",function(){function e(e){t(this,e);this.layoutItems=[];this.reRender={}}e.prototype.componentWillLoad=function(){this.base=new i(this,o)};e.prototype.componentDidLoad=function(){this.layoutItems=Array.from(this.getLayoutItems())};e.prototype.windowResize=function(){this.reRender=Object.assign({},this.reRender)};e.prototype.componentDidRender=function(){o.log.debug(this.element.tagName,"componentDidRender()","dxp-Flex-layout");this.element.classList.add("hydrated")};e.prototype.getArrayFromNodeList=function(e){return[].slice.call(e)};e.prototype.getColumnClass=function(e){var t="dxp-col-12";if(e["columnWidthSm"]){t+=" dxp-col-sm-"+e["columnWidthSm"]}if(e["columnWidthMd"]){t+=" dxp-col-md-"+e["columnWidthMd"]}if(e["columnWidthLg"]){t+=" dxp-col-lg-"+e["columnWidthLg"]}if(e["columnWidthXl"]){t+=" dxp-col-xl-"+e["columnWidthXl"]}return t};e.prototype.getLayoutItems=function(){return this.getArrayFromNodeList(this.element.childNodes).filter((function(e){return e["tagName"]&&e["tagName"].toLowerCase()==="dxp-flex-layout-item"}))};e.prototype.isColumnReverseApplicable=function(){var e=this.base.getDeviceWidthType();return(e==="sm"||e==="md")&&this.columnReverse};e.prototype.render=function(){var e=this;o.log.debug(this.element.tagName,"render()","in dxp-flex-layout render() : "+"DEVELOPMENT");var t=[n("link",{rel:"stylesheet",href:""}),[this.theme&&n("link",{rel:"stylesheet",href:""})]];return n("div",{class:""+this.base.componentClass(),"data-theme":this.theme},t,n("div",{style:{border:this.borderStyle},class:"dxp-row "+(this.isColumnReverseApplicable()?"dxp-flex-column-reverse":"")},this.layoutItems.map((function(t,o){return n("div",{style:{border:t["borderStyle"]},class:""+e.getColumnClass(t)},n("slot",{name:"column-"+(o+1)}))}))))};Object.defineProperty(e.prototype,"element",{get:function(){return r(this)},enumerable:true,configurable:true});Object.defineProperty(e,"style",{get:function(){return"div.dxp.dxp-flex-layout .dxp-row,div.dxp.dxp-flex-layout [class*=dxp-col-]{margin:0;padding:0}\@media screen and (max-width:992px){div.dxp.dxp-flex-layout .layout-flex-column-reverse{-ms-flex-direction:column-reverse;flex-direction:column-reverse}}"},enumerable:true,configurable:true});return e}())}}}));