System.register([],(function(t){"use strict";return{execute:function(){var e=function(){function t(){this.status="";this.durationReset=2e3;this.options={left:"left",fadein:"fadein",right:"right",init:"init",initabsolute:"initabsolute",hide:"hide",none:""}}t.prototype.getStatus=function(){return this.status};t.prototype.setStatus=function(t){this.status=this.options[t]?this.options[t]:this.options.none};t.prototype.getClass=function(){var t="";var e="animation content-overlay";var i="animation content-overlay absolute";var n="animation content-overlay hide";var a="animation content-overlay right-to-left-animation";var o="animation content-overlay left-fix fade-in";var r="animation content-overlay left-to-right-animation";var s;switch(this.status){case"left":s=a;break;case"fadein":s=o;break;case"right":s=r;break;case"init":s=e;break;case"initabsolute":s=i;break;case"hide":s=n;break;default:s=t;break}return s};return t}();var i=t("a",new e)}}}));