var __awaiter=this&&this.__awaiter||function(e,t,n,r){function s(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,i){function a(e){try{l(r.next(e))}catch(t){i(t)}}function o(e){try{l(r["throw"](e))}catch(t){i(t)}}function l(e){e.done?n(e.value):s(e.value).then(a,o)}l((r=r.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var n={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},r,s,i,a;return a={next:o(0),throw:o(1),return:o(2)},typeof Symbol==="function"&&(a[Symbol.iterator]=function(){return this}),a;function o(e){return function(t){return l([e,t])}}function l(a){if(r)throw new TypeError("Generator is already executing.");while(n)try{if(r=1,s&&(i=a[0]&2?s["return"]:a[0]?s["throw"]||((i=s["return"])&&i.call(s),0):s.next)&&!(i=i.call(s,a[1])).done)return i;if(s=0,i)a=[a[0]&2,i.value];switch(a[0]){case 0:case 1:i=a;break;case 4:n.label++;return{value:a[1],done:false};case 5:n.label++;s=a[1];a=[0];continue;case 7:a=n.ops.pop();n.trys.pop();continue;default:if(!(i=n.trys,i=i.length>0&&i[i.length-1])&&(a[0]===6||a[0]===2)){n=0;continue}if(a[0]===3&&(!i||a[1]>i[0]&&a[1]<i[3])){n.label=a[1];break}if(a[0]===6&&n.label<i[1]){n.label=i[1];i=a;break}if(i&&n.label<i[2]){n.label=i[2];n.ops.push(a);break}if(i[2])n.ops.pop();n.trys.pop();continue}a=t.call(e,n)}catch(o){a=[6,o];s=0}finally{r=i=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:true}}};System.register(["./p-f4cc861d.system.js","./p-4b0c1219.system.js"],(function(e){"use strict";var t,n,r,s,i;return{setters:[function(e){t=e.r;n=e.d;r=e.h;s=e.g},function(e){i=e.B}],execute:function(){var a={en:{alt:"Logo Image",nextbtnlabel:"Move to next tweet",previousbtnlabel:"Move to previous tweet"},es:{alt:"Logo Image",nextbtnlabel:"Move to next tweet",previousbtnlabel:"Move to previous tweet"}};var o=e("dxp_twitter_banner",function(){function e(e){t(this,e);this.currentTweetIndex=0;this.twitterUrl="https://twitter.com/"}e.prototype.componentWillLoad=function(){return __awaiter(this,void 0,void 0,(function(){var e,t,r;return __generator(this,(function(s){switch(s.label){case 0:this.base=new i(this,n);this.base.i18Init(n,"TwitterBanner",a);this.tweetJsonUrl=this.getTweetUrl(this.handleType);r=this;return[4,this.getTweets()];case 1:r.tweets=s.sent();if(!this.maxCount){this.maxCount=this.tweets&&this.tweets.length}if(this.tweets&&this.tweets.length){if(this.maxCount>this.tweets.length){this.maxCount=this.tweets.length}this.currentName=this.tweets[this.currentTweetIndex].userName;this.tweets.forEach((function(n){e=n.formattedTwitterText.match(/#[a-z\d]+/gi);if(e){e.forEach((function(r,s){t=new RegExp(e[s],"g");r=r.replace("#","<span class='dxp-sr-only'>hashtag</span><span aria-hidden=\"true\">#</span>");n.formattedTwitterText=n.formattedTwitterText.replace(t,""+r)}))}}))}else{n.log.error(this.element.tagName,"componentWillLoad()","Please check entered Handle")}return[2]}}))}))};e.prototype.componentDidLoad=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(e){if(this.tweets&&this.tweets.length){this.element?this.element.querySelectorAll(".slides")[0].classList.remove("dxp-none"):this.element.querySelectorAll(".slides")[0].classList.remove("dxp-none");Array.from(this.element.querySelectorAll(".slides a")).forEach((function(e){e.classList.add("sc-dxp-twitter-banner")}))}return[2]}))}))};e.prototype.routingHandler=function(e){this.base.routingEventListener(e)};e.prototype.appendHashtags=function(e){this.hashtag=this.handle.split(",");this.hashtag.forEach((function(e,t,n){e=e.trim();n[t]=e.startsWith("#")?e:"#"+e}));e=e+this.hashtag.join();return e};e.prototype.getTweets=function(){return __awaiter(this,void 0,void 0,(function(){var e;return __generator(this,(function(t){switch(t.label){case 0:t.trys.push([0,2,,3]);this.tweetJsonUrl=this.tweetJsonUrl&&this.tweetJsonUrl.replace(/#/g,"");return[4,n.api(this.tweetJsonUrl)];case 1:return[2,t.sent()];case 2:e=t.sent();n.log.error("fetch failed for "+this.tweetJsonUrl,e);return[3,3];case 3:return[2]}}))}))};e.prototype.getTweetUrl=function(e){var t="";var n=e&&e.toLowerCase();var r={screenname:"timeline?screenName=",hashtag:"hashtag?hashtag="};t=this.twitterApiEndPoint+r[n];t=n==="hashtag"?this.appendHashtags(t):t+this.handle;if(this.maxCount){t=t+"&count="+this.maxCount}return t};e.prototype.nextTweet=function(){if(this.element&&this.element){this.element.querySelectorAll(".slides")[this.currentTweetIndex].classList.add("dxp-none")}if(this.currentTweetIndex===this.maxCount-1){this.currentTweetIndex=-1}this.currentTweetIndex=this.currentTweetIndex+1;this.setTweetAndScreenName(this.currentTweetIndex)};e.prototype.prevTweet=function(){if(this.element&&this.element){this.element.querySelectorAll(".slides")[this.currentTweetIndex].classList.add("dxp-none")}if(this.currentTweetIndex===0){this.currentTweetIndex=this.maxCount}this.currentTweetIndex=this.currentTweetIndex-1;this.setTweetAndScreenName(this.currentTweetIndex)};e.prototype.setTweetAndScreenName=function(e){if(this.element&&this.element){this.element.querySelectorAll(".slides")[this.currentTweetIndex].classList.remove("dxp-none");this.element.querySelectorAll(".slides")[this.currentTweetIndex].classList.add("fade")}this.currentName=this.tweets[e].userName;this.currentTweet=this.tweets[e].formattedTwitterText};e.prototype.render=function(){var e=this;n.log.debug(this.element.tagName,"render()","in dxp-twitter-banner render() : "+"DEVELOPMENT");var t=[r("link",{rel:"stylesheet",href:""}),[this.theme&&r("link",{rel:"stylesheet",href:""})],[this.theme&&r("link",{rel:"stylesheet",href:n.config.get("DXP_STYLE_BASE_URL")+"/themes/"+this.theme+"/dxp-twitter-banner.min.css"})]];return r("div",{class:this.base.componentClass(),dir:this.dir,"data-theme":this.theme},t,r("div",{class:"dxp-row"},r("div",{class:"dxp-col-xl-12 twitter-carousel"},r("div",{class:"dxp-col-md-12 dxp-col-sm-10 dxp-col-9"},r("p",{class:"dxp-col-push-lg-1 dxp-col-lg-11 dxp-col-push-md-2 dxp-col-md-10 dxp-push-col-0 logo-wrapper"},r("a",{"aria-haspopup":this.target?"true":undefined,class:"twitter-logo-link",href:""+this.twitterUrl+(this.currentName?this.currentName.replace(/\s/g,""):"")+"#",target:this.target},r("img",{title:n.i18n.t("TwitterBanner:alt"),class:"twitter-logo",src:this.src,alt:n.i18n.t("TwitterBanner:alt")})),r("a",{"aria-label":"@"+this.currentName,"aria-haspopup":this.target?"true":undefined,class:"twitter-link",href:""+this.twitterUrl+(this.currentName?this.currentName.replace(/\s/g,""):""),target:this.target},"@",this.currentName))),r("div",{class:"dxp-col-lg-1 dxp-col-sm-2 dxp-col-3"},r("p",{class:"btn-wrapper"},r("button",{title:n.i18n.t("TwitterBanner:previousbtnlabel"),onClick:function(){e.prevTweet()}},r("span",{class:"prev prev-icon"})),r("button",{title:n.i18n.t("TwitterBanner:nextbtnlabel"),onClick:function(){e.nextTweet()}},r("span",{class:"next next-icon"})))),r("div",{class:"dxp-col-lg-11 dxp-col-md-10 dxp-col-12"},r("ul",{class:"slideshow-container"},this.tweets&&this.tweets.length?this.tweets.map((function(e){return r("li",{class:"slides h5 dxp-none",innerHTML:e.formattedTwitterText})})):"")))))};Object.defineProperty(e.prototype,"element",{get:function(){return s(this)},enumerable:true,configurable:true});Object.defineProperty(e,"style",{get:function(){return"div.dxp.dxp-twitter-banner .twitter-logo-link{padding-right:0;display:block}div.dxp.dxp-twitter-banner .twitter-carousel .slides{font-size:21px;line-height:32px}div.dxp.dxp-twitter-banner .twitter-carousel .slides.fade{-webkit-animation-name:fadein;animation-name:fadein;-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}div.dxp.dxp-twitter-banner .twitter-carousel .slides a{word-wrap:break-word;text-decoration:none;padding:0;margin:0;font-size:21px;line-height:32px}div.dxp.dxp-twitter-banner .twitter-carousel .slides a:after,div.dxp.dxp-twitter-banner .twitter-carousel .slides a:before,div.dxp.dxp-twitter-banner .twitter-carousel .slides a:hover:after,div.dxp.dxp-twitter-banner .twitter-carousel .slides a:hover:before{background:none}div.dxp.dxp-twitter-banner .twitter-carousel .logo-wrapper{padding:0}div.dxp.dxp-twitter-banner .twitter-carousel .logo-wrapper a{-ms-flex-item-align:center;align-self:center;margin:0}div.dxp.dxp-twitter-banner .twitter-carousel .logo-wrapper a:last-child{display:inline-block;margin-top:16px}div.dxp.dxp-twitter-banner .twitter-carousel .logo-wrapper .twitter-logo{height:64px;width:64px;display:block}div.dxp.dxp-twitter-banner .twitter-carousel .logo-wrapper .btn-link{display:block;margin-top:16px}div.dxp.dxp-twitter-banner .twitter-carousel .next{cursor:pointer;height:32px;width:16px;background-size:100%;float:right}div.dxp.dxp-twitter-banner .twitter-carousel .prev{cursor:pointer;height:32px;width:16px;background-size:100%;float:left}div.dxp.dxp-twitter-banner .twitter-carousel .btn-wrapper{margin-top:12px;padding-right:15px}div.dxp.dxp-twitter-banner .twitter-carousel .btn-wrapper button{display:inline-block;width:50%;background-color:transparent;border:none}\@media (min-width:768px){div.dxp.dxp-twitter-banner .twitter-carousel .slides,div.dxp.dxp-twitter-banner .twitter-carousel .slides a{font-size:30px;line-height:48px}}\@media (min-width:576px){div.dxp.dxp-twitter-banner .logo-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}div.dxp.dxp-twitter-banner .logo-wrapper .twitter-link{padding-left:24px}div.dxp.dxp-twitter-banner .logo-wrapper a:last-child{margin-top:0}}\@-webkit-keyframes fadein{0%{opacity:0}to{opacity:1}}\@keyframes fadein{0%{opacity:0}to{opacity:1}}div.dxp.dxp-twitter-banner[dir=rtl] .twitter-carousel .prev{float:right}div.dxp.dxp-twitter-banner[dir=rtl] .twitter-carousel .next{float:left}div.dxp.dxp-twitter-banner[dir=rtl] .twitter-carousel .btn-wrapper{padding-right:0;padding-left:15px}div.dxp.dxp-twitter-banner[dir=rtl] .logo-wrapper .twitter-link{padding-left:32px}\@media (min-width:576px){div.dxp.dxp-twitter-banner[dir=rtl] .logo-wrapper .twitter-link{padding-right:24px;padding-left:32px}}\@media (max-width:991px){div.dxp.dxp-twitter-banner[dir=rtl] .twitter-carousel>div:first-child p{left:0}}"},enumerable:true,configurable:true});return e}())}}}));