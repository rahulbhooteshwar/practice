import{r as t,d as i,h as s,g as n}from"./p-8188e849.js";import{B as e}from"./p-16d6f0ca.js";import{C as a}from"./p-0661f61b.js";const o={en:{closeIcon:"Close navigation Menu"},"en-US":{closeIcon:"Close navigation Menu"},es:{closeIcon:"Hola Mundo"},"es-ES":{closeIcon:"Hola Mundo"}},c=class{constructor(i){t(this,i)}navigationDataHandler(){this.base.createNestedMarkup(this.navigationContainer,"dxp-nav-menu",this.navData.navigationData)}async componentWillLoad(){if(this.base=new e(this,i),this.apiUrl)try{this.navData=await i.api(this.apiUrl)}catch(n){i.log.error(this.element.tagName,"componentWillLoad()",`fetch failed for ${this.apiUrl}`,n)}this.utility=new a,this.base.i18Init(i,"Nav",o);const t=this.element;let s="";i.util.appendLinkElement(t,s),i.util.appendLinkElement(t,s=""),s=`${i.config.get("DXP_STYLE_BASE_URL")}/themes/${this.theme}/dxp-nav.min.css`,i.util.appendLinkElement(t,s)}componentDidLoad(){this.base=new e(this,i),this.nav=this.element.querySelector("nav"),this.overlay=this.element.querySelector(".overlay"),this.navData&&this.navigationDataHandler()}childEventHandler(t){this.currentChild=t.detail,this.closeOverlayHandler()}documentClickEventHandler(t){const i=(this.element.querySelector(".in"),this.element.querySelector(".in"));i&&!t.target.closest("dxp-nav")&&this.utility.closeOverlay(i,this.element)}hideMenuWithKeys(t){(t.target?t.composedPath()[0]:t.target).classList.contains("dxp-icon-close")&&(32!==t.keyCode&&40!==t.keyCode&&13!==t.keyCode||this.utility.closeOverlay(this.currentNav,this.element))}keyDownEventHandler(t){const i=t.keyCode,s=t.target?t.composedPath()[0]:t.target;if(s&&s.classList.contains("dxp-icon-close")){const s=(this.element.querySelector(".expanded"),this.element.querySelector(".expanded")),n=s.querySelectorAll("dxp-nav-item-content");let e=s.querySelectorAll("dxp-cta");if(!e.length){const t=s.querySelector("dxp-cta-list");e=t&&t?t.querySelectorAll("dxp-cta"):t&&t.querySelectorAll("dxp-cta")}if(t.preventDefault(),38===i||37===i){if(n&&n.length>0){const t=n[n.length-1].querySelector(".sub-nav-item");return void this.focusElement(t)}if(e&&e.length>0){const t=e[e.length-1].querySelector("a");this.focusElement(t)}}if(9===i||40===i||39===i){if(e&&e.length>0){const t=e[0].querySelector("a");return void this.focusElement(t)}if(n&&n.length>0){const t=n[0].querySelector(".sub-nav-item");return void this.focusElement(t)}}32!==i&&13!==i||this.closeIconClickHandler()}}navHeaderHandler(t){this.currentNav=t.detail}routingHandler(t){this.base.routingEventListener(t)}closeIconClickHandler(){this.overlay&&this.utility.closeOverlay(this.currentNav,this.element)}closeOverlayHandler(){return!(this.currentChild.classList.contains("nav-item")||"DXP-CTA-LIST"===this.currentChild.nodeName||this.currentChild.closest("dxp-cta-list")||this.currentNav.closest(".nav-item-li"))&&!this.currentChild.parentElement.parentElement.classList.contains("quick-links-container")&&!this.currentChild.parentElement.parentElement.parentElement.parentElement.classList.contains("group-container")&&void this.utility.closeOverlay(this.currentNav,this.element)}focusElement(t){t.focus()}render(){return i.log.debug(this.element.tagName,"render()","in dxp-nav render() : DEVELOPMENT"),s("nav",{class:`${this.base.componentClass()}`,dir:this.dir,"data-theme":this.theme,role:"application"},s("ul",{class:"nav-ul",ref:t=>this.navigationContainer=t},s("slot",null)),s("span",{role:"button",tabindex:"-1",class:"dxp-none dxp-icon dxp-icon-close","aria-label":i.i18n.t("Nav:closeIcon"),onClick:()=>{this.closeIconClickHandler()}}),s("div",{class:"overlay overlay-container",onClick:()=>{this.closeIconClickHandler()}},s("span",{class:"overlay-bg-img"}),s("span",{class:"overlay-bg-opacity"})))}get element(){return n(this)}static get watchers(){return{navData:["navigationDataHandler"]}}static get style(){return"nav.dxp.dxp-nav{display:block;margin:0;padding:0;background:none}nav.dxp.dxp-nav .overlay-container{opacity:0;z-index:-1}nav.dxp.dxp-nav .overlay,nav.dxp.dxp-nav .overlay-bg-img,nav.dxp.dxp-nav .overlay-bg-opacity,nav.dxp.dxp-nav .overlay-container{position:fixed;height:100vh;top:0;right:0;bottom:0;left:0;pointer-events:none}nav.dxp.dxp-nav .overlay-bg-img{background-size:cover;background-repeat:no-repeat;background-position:50%}nav.dxp.dxp-nav .expanded{opacity:1;height:auto;pointer-events:all;visibility:visible}nav.dxp.dxp-nav .nav-ul{width:100%;left:0;margin-bottom:0}\@media (min-width:992px){nav.dxp.dxp-nav .dxp-icon-close{position:absolute;cursor:pointer;padding:.4375rem;border:.0625rem solid transparent;margin-top:5.4rem}nav.dxp.dxp-nav .nav-ul{width:auto;margin-top:0}nav.dxp.dxp-nav ::slotted(dxp-nav-menu){margin-right:1.6rem}nav.dxp.dxp-nav .dxp-nav-menu{margin-right:1.87rem}}\@media (max-width:767px){nav.dxp.dxp-nav .nav-ul{padding:12px 12px 16px 0}}\@media (max-width:991px){nav.dxp.dxp-nav .dxp-icon-close,nav.dxp.dxp-nav .overlay-container{display:none}}\@media (max-width:767px){nav.dxp.dxp-nav[dir=rtl] .nav-ul{padding:12px 0 16px 12px}}"}};export{c as dxp_nav};