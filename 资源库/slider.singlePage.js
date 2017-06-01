/**
 * Created by wd14931 on 2015/12/23.
 */
/*! motion v0.0.0 | (c) 2015, 2015/08/27 | slide(push,flip) | motion Foundation, Inc. */
!function(){!function(){!function(){if(!window.Motion){var a={version:"1.1",add:function(a,b){for(var c=window,d=arguments.callee,e=null,f=(/^([\w\.]+)(?:\:([\w\.]+))?\s*$/.test(a),RegExp.$1.split(".")),g=RegExp.$2.split("."),a=f.pop(),h=/[A-Z]/.test(a.substr(0,1)),i=function(){var a=arguments.callee.prototype.init;"function"==typeof a&&arguments.callee.caller!=d&&a&&a.apply(this,arguments)},j=0;j<f.length;j++){var k=f[j];c=c[k]||(c[k]={})}if(""!=g[0]){e=window;for(var j=0;j<g.length;j++)if(e=e[g[j]],!e){e=null;break}}h&&"function"==typeof b?(e&&(i.prototype=new e,i.prototype.superClass=e),c[a]=i,i.prototype.constructor=i,b.call(c[a].prototype)):c[a]=b}};window.Motion=window.mo=a}}()}(),function(){Motion.add("mo.Base",function(){{var a=this;this.constructor}a.constructor=function(){},a.on=function(){return box=Zepto(this),box.on.apply(box,arguments)},a.off=function(){return box=Zepto(this),box.off.apply(box,arguments)},a.trigger=function(){var a=Zepto(this);return a.triggerHandler.apply(a,arguments)}})}(),function(){Motion.add("mo.Tab:mo.Base",function(){var a=this,b={},c=this.constructor;c.config={effect:"base",direction:"x",autoPlay:!1,playTo:0,switchTo:window.undefined,type:"touchend",currentClass:"current",link:!1,stay:2e3,delay:200,touchDis:20,lazy:window.undefined,circle:!1,degradation:"base",animateTime:300,event:{},easing:"ease",title:{delay:0},controlDisabed:!1},c.effect={},b.supportTouch="ontouchstart"in window,b.e={touchstart:b.supportTouch?"touchstart":"mousedown",touchmove:b.supportTouch?"touchmove":"mousemove",touchend:b.supportTouch?"touchend":"mouseup"},a.init=function(a){this.config=Zepto.extend(!0,{},c.config,a);var d=this,a=d.config,e=Zepto(a.target);if(this.constructor.instances?this.constructor.instances.push(this):this.constructor.instances=[this],Zepto.extend(d,{target:e,controller:null,prevPage:window.undefined,curPage:window.undefined,container:e.parent(),prevBtn:Zepto(a.prevBtn),nextBtn:Zepto(a.nextBtn),isPlaying:a.autoPlay,disabledPrevList:[],disabledNextList:[]}),!(e.length<=1)){a.disable!==window.undefined&&d.disable(a.disable),a.circle||(d.disable(0,"prev"),d.disable(d.target.length-1,"next"));for(var f in a){var g=/^on(.+)/.exec(f);g&&g[1]&&(a.event[g[1]]=a[f])}c.effect[a.effect].beforechange&&(c.effect[a.effect].mobeforechange=c.effect[a.effect].beforechange,delete c.effect[a.effect].beforechange),d.on(c.effect[a.effect]),d.on(a.event),d.trigger("beforeinit")!==!1&&(b.initDOM.call(d),b.attach.call(d),d.trigger("init")!==!1&&(d.switchTo(a.switchTo!==window.undefined?a.switchTo:a.playTo),a.autoPlay&&d.play()))}},b.initDOM=function(){var a=this,b=a.config;if(a.wrap=a.container,a.container=a.wrap.parent(),b.controller!==!1){if(b.controller=Zepto(b.controller),b.controller.length<1){for(var c=Zepto('<ul class="controller">'),d="",e=0;e<a.target.length;e++)d+="<li>"+(e+1)+"</li>";c.html(d),a.container.append(c),b.controller=c.children()}a.controller=b.controller}var f=a.target.find("script");f.each(function(a,b){b=Zepto(b),/^\s*document\.write\([^\)]+\)[\s;]*$/.test(b.html())&&b.remove()});var g=b.title.dataSrc||a.target,h=b.title.dataProp||"title",i=Zepto(b.title.dataWrap);g=Zepto(g),i.length>0&&g.attr(h)&&(a.titleWrap=i,a.titleData=[],g.each(function(b,c){a.titleData.push(Zepto(c).attr(h))})),a.cssPrefix="",a.propPrefix="";var j={webkit:"webkit",Moz:"moz",ms:"ms"},k=document.createElement("div");for(var l in j)if(void 0!==k.style[l+"Transform"]){a.cssPrefix="-"+j[l]+"-",a.propPrefix=l;break}},b.attach=function(){var a=this,c=a.config;a.controller&&Zepto.each(a.controller,function(d,e){var e=Zepto(e);e.on(c.type,function(){a.playTo(d)}),c.link||Zepto(e).on(b.e.touchstart,function(a){a.preventDefault()})}),a.nextBtn&&Zepto(a.nextBtn).on(b.e.touchend,function(b){a.next(),b.preventDefault()}),a.prevBtn&&Zepto(a.prevBtn).on(b.e.touchend,function(b){a.prev(),b.preventDefault()}),a.wrap.on(b.e.touchstart,function(){a.isPlaying&&b.clearTimer.call(a)}),Zepto("body").on(b.e.touchend,function(){a.isPlaying&&b.setTimer.call(a)}),c.touchMove&&b.touchMove.call(a)},a.playTo=function(a){if(a=parseInt(a),0/0!==a){{var c,d=this,e=d.config;d.curPage!==window.undefined}if(a===d.oriCurPage)return void d.trigger("mobeforechange");if(d._outBound=function(a){if(a>=d.target.length&&(a%=d.target.length),0>a){var b=a%d.target.length;a=0===b?0:b+d.target.length}return a},d.oriPrevPage=d.oriCurPage,d.oriCurPage=a,d.prevPage=d.curPage,c=d.curPage,a=d.curPage=d._outBound(a),d.controller&&a!==c){var f=d.controller[a],g=d.controller[c];f&&Zepto(f).addClass(d.config.currentClass),g&&Zepto(g).removeClass(d.config.currentClass)}a!==c&&(d.target.eq(a).addClass(d.config.currentClass),d.target.eq(c).removeClass(d.config.currentClass)),d.titleWrap&&window.setTimeout(function(){d.titleWrap.html(d.titleData[d.curPage]||"")},e.title.delay);var h=Zepto(d.target[d.curPage]);if(e.lazy===window.undefined){var i=h.children();1===i.length&&"textarea"==i[0].tagName.toLowerCase()&&(e.lazy=!0)}if(e.lazy===!0&&(h.length>0&&!h.data("parsed")&&b.lazyload(h),d._loaded===window.undefined&&(d._loaded=[]),-1===d._loaded.indexOf(a))){var j=d.target.eq(a),k=j.find("*");k=Zepto(k.concat(j)),k.each(function(a,b){b=Zepto(b);var c=b.data("src");c&&(/img|audio|video|link/i.test(b[0].tagName)?b.attr("src",c):b.css("background-image","url("+c+")"),b.removeAttr("data-src"))}),d._loaded.push(a)}if(d.trigger("beforechange",[d.curPage])!==!1){d.trigger("mobeforechange");var l=Zepto(e.arrow);l.length>0&&(console.log(d.curPage>=d.target.length-1),d.curPage>=d.target.length-1&&!e.circle||-1!=d.disabledNextList.indexOf(d.curPage)?l.css("display","none"):l.css("display","block"))}}},a.next=function(){this.playTo(this.oriCurPage+1)},a.prev=function(){this.playTo(this.oriCurPage-1)},b.setTimer=function(){var a=this,c=a.config;a.timer&&b.clearTimer.call(a),a.timer=window.setInterval(function(){var b=a.curPage+1;a.playTo(b)},c.stay)},b.clearTimer=function(){window.clearInterval(this.timer)},a.play=function(){var a=this;b.setTimer.call(a),a.isPlaying=!0,a.trigger("play")},a.stop=function(){var a=this;b.clearTimer.call(a),a.isPlaying=!1,a.trigger("stop")},a.disable=function(a,b){var c=this;b&&"prev"!=b||c.disabledPrevList.push(a),b&&"next"!=b||c.disabledNextList.push(a)},a.enable=function(a,b){var c=this;if(!b||"prev"==b){var d=c.disabledPrevList.indexOf(a);-1!==d&&c.disabledPrevList.splice(d,1)}if(!b||"next"==b){var d=c.disabledNextList.indexOf(a);-1!==d&&c.disabledNextList.splice(d,1)}},a.switchTo=function(a){var b=this,c=b.config.animateTime;b.config.animateTime=0,b.playTo(a),window.setTimeout(function(){b.config.animateTime=c},2)},c.extend=function(a,b){var d={};Zepto.isPlainObject(a)?d=a:d[a]=b,Zepto.extend(c.effect,d)},b.lazyload=function(a){var b=a.children("textarea");1===b.length&&(a.html(b.eq(0).val()),a.data("parsed",!0))},b.touchMove=function(){var a,c,d,e,f,g,h,i,j,k,l,m,n,o=this,p=o.config;p.touchMove&&o.wrap.on(b.e.touchstart,function(g){var h=g.touches?g.touches[0]:g;e=j=h.pageX,f=k=h.pageY,o.trigger("touchstart",[e,f])!==!1&&(o.wrap.on(b.e.touchmove,a),o.wrap.on(b.e.touchend,c),d="")}),a=function(a){var b=a.touches?a.touches[0]:a,c=b.pageX,q=b.pageY;g=c-e,h=q-f,l=c-j,m=q-k,j=c,k=q,"x"==p.direction?(i=g,n=l):(i=h,n=m),d||(d=Math.abs(g/h)>1?"x":"y"),p.direction==d&&(a.preventDefault(),a.stopPropagation(),o.trigger("touchmove",[i,n,b]))},c=function(){if(!(d&&p.direction!=d||void 0===i||isNaN(i)||0===i)){if(o.wrap.off(b.e.touchmove,a),o.wrap.off(b.e.touchend,c),o.trigger("touchend",[i])===!1)return void(i=0);var e=!0;if(!i||Math.abs(i)<p.touchDis||!e)return o.playTo(o.curPage),void(i=0);if(-1!==o.disabledPrevList.indexOf(o.curPage)&&i>0||-1!==o.disabledNextList.indexOf(o.curPage)&&0>i)return o.playTo(o.oriCurPage),void(i=0);var f=i>0?o.oriCurPage-1:o.oriCurPage+1;o.playTo(f),i=0}}},c.extend("base",{init:function(){var a=this;config=a.config,Zepto.each(a.target,function(b,c){a.target[config.playTo][0]!=c&&Zepto(c).hide()})},beforechange:function(){var a=this,b=a.prevPage===window.undefined?null:a.target[a.prevPage],c=a.target[a.curPage];b&&Zepto(b).hide(),Zepto(c).show(),a.trigger("change",[a.curPage])}})})}(),function(){Motion.add("mo.Slide:mo.Tab",function(){var a=this,b=this.constructor;a.init=function(a){this.config=Zepto.extend(!0,{},b.config,a),this.superClass.call(this,this.config)},b.config={touchMove:!0,direction:"y",effect:"slide",controller:!1},mo.Tab.extend("slide",{init:function(){var a=this,b=a.config;a.wrap.css({position:"relative",overflow:"hidden"}),a.wrap.css("-webkit-backface-visibility","hidden"),a.target.css({position:"absolute",top:"0",left:"0",visibility:"hidden"}),"x"==b.direction?(a.animProp="translateX",a.sizeProp="width",a.posProp=["left","right"]):(a.animProp="translateY",a.sizeProp="height",a.posProp=["top","bottom"])},touchmove:function(a,b,c){var d=this,e=d.target.eq(d.curPage);if(1!=d.moving){var f=!1;(-1!==d.disabledNextList.indexOf(d.curPage)&&0>b||-1!==d.disabledPrevList.indexOf(d.curPage)&&b>0)&&(f=!0);var g=/\(([\d-]*).*\)/.exec(e.css(d.propPrefix+"Transform")),h=g?1*g[1]:0,i={},j=h+c;f&&(j=b/6),i[d.cssPrefix+"transform"]=d.animProp+"("+j+"px)",d.target.css("visibility","hidden"),e.css(i).css("visibility","visible");var k,l,m={};b>0?(k=d.target.eq(d._outBound(d.curPage-1)),l=-k[d.sizeProp]()):(k=d.target.eq(d._outBound(d.curPage+1)),l=e[d.sizeProp]()),f||(d.target.css("visibility","hidden"),e.css("visibility","visible"),k.css("visibility","visible"),m[d.cssPrefix+"transform"]=d.animProp+"("+(h+c+l)+"px)",k.css(m))}},touchend:function(a,b){var c=this,d=c.target.eq(c.curPage),e=c.target[c.curPage].getBoundingClientRect(),f=$(window)[c.sizeProp];if(!(c.target.eq(c.curPage).offset()[c.sizeProp]<=c.container.offset()[c.sizeProp])&&(0>=b&&e[c.posProp[1]]>f||b>0&&e[c.posProp[0]]<0)){var g=/\(([\d-]*).*\)/.exec(d.css(c.propPrefix+"Transform")),h=g?1*g[1]:0,i={},j=h+b,k=d[c.sizeProp](),l=c.wrap[c.sizeProp]();return j=j>0?0:j,j=l-k>j?l-k:j,i[c.cssPrefix+"transform"]=c.animProp+"("+j+"px)",d.animate(i),!1}c.touchTrigger=!0},beforechange:function(){var a,b=this,c=b.config,d=b.prevPage,e=b.curPage,f=b.target.eq(d),g=b.target.eq(e),h={},i={},j={};a=b.oriCurPage>b.oriPrevPage?f[b.sizeProp]():-g[b.sizeProp](),i[b.cssPrefix+"transform"]=b.animProp+"("+a+"px)",h[b.cssPrefix+"transform"]=b.animProp+"("+-a+"px)",j[b.cssPrefix+"transform"]=b.animProp+"(0px)",b.touchTrigger||(g.css(i),b.touchTrigger=!1),b.target.css("visibility","hidden"),f.css("visibility","visible"),g.css("visibility","visible"),window.setTimeout(function(){f.animate(h,c.animateTime,c.easing,function(){b.target.eq(b.prevPage).css("visibility","hidden")}),b.moving=!0,g.animate(j,c.animateTime,c.easing,function(){g.css("visibility","visible"),b.moving=!1,b.trigger("change",[b.curPage])})},0)}})})}(),function(){mo.Tab.extend("push",{init:function(){var a=this,b=a.config,c=a.wrap.offset();a.wrap.css({position:"relative",overflow:"hidden"}),a.target.css({position:"absolute"}),"x"==b.direction?(a.animProp=function(a){return"translate3d("+a+"px,0px,0px)"},a.offset=c.width):(a.animProp=function(a){return"translate3d(0px, "+a+"px,0px)"},a.offset=c.height),a._launch=function(b){a.target.css("zIndex","1"),b.css("zIndex","3")}},touchmove:function(a,b,c){var d,e=this;if(1!=e.moving){var f=!1;(-1!==e.disabledNextList.indexOf(e.curPage)&&0>c||-1!==e.disabledPrevList.indexOf(e.curPage)&&c>0)&&(f=!0);var g,d,h={},i=b;f&&(i=b/12),0>b?(g=e.oriCurPage+1,h[e.cssPrefix+"transform"]=e.animProp(i+e.offset)):(g=e.oriCurPage-1,h[e.cssPrefix+"transform"]=e.animProp(i-e.offset)),d=e.target.eq(e._outBound(g)),e._launch(d),e.target.eq(e.curPage).css("zIndex","2"),d.css(h),e._targetPage=g}},beforechange:function(){var a=this,b=a.config,c=a.target.eq(a.curPage),d={};if(a.target.eq(a.curPage).css("zIndex","3"),a.target.eq(a.prevPage).css("zIndex","2"),a._targetPage!==a.oriCurPage){var e,f={},g=a.target.eq(a._outBound(a._targetPage));g.css("zIndex","4"),a._targetPage<a.curPage?e=-a.offset:a._targetPage>a.curPage&&(e=a.offset),f[a.cssPrefix+"transform"]=a.animProp(e),g.animate(f,b.animateTime,b.easing)}if(a._targetPage===window.undefined){var h,i={};h=a.oriCurPage<a.oriPrevPage?-a.offset:a.offset,i[a.cssPrefix+"transform"]=a.animProp(h),c.css(i)}d.translate3d="0px, 0px, 0px",c.animate(d,b.animateTime,b.easing,function(){a.moving=!1,a.trigger("change",[a.curPage])}),delete a._targetPage}})}(),function(){mo.Tab.extend("flip",{init:function(){var a=this,b=a.config,c=a.cssPrefix,d={position:"relative"};d[c+"perspective"]="200px",d[c+"backface-visibility"]="hidden",a.wrap.css(d);var e={position:"absolute",left:0,top:0,display:"none"};e[c+"transform-origin"]="50% 0%",a.target.css(e),"x"==b.direction?(a.translateProp="translateX",a.rotateProp="rotateY",a.size=a.wrap.width()):(a.translateProp="translateY",a.rotateProp="rotateX",a.size=a.wrap.height())},touchmove:function(a,b,c){var d=this;if(1!=d.moving){var e=!1;(-1!==d.disabledNextList.indexOf(d.curPage)&&0>c||-1!==d.disabledPrevList.indexOf(d.curPage)&&c>0)&&(e=!0),e&&(b/=12);var f,g,h={};0>b?(f=d.oriCurPage+1,h[d.cssPrefix+"transform"]=d.translateProp+"("+(b+d.size)+"px)",h[d.cssPrefix+"transform-origin"]="50% 0%"):(f=d.oriCurPage-1,h[d.cssPrefix+"transform"]=d.translateProp+"("+(b-d.size)+"px)",h[d.cssPrefix+"transform-origin"]="50% 100%"),g=d.target.eq(d._outBound(f)),d.target.css({zIndex:1,display:"none"}),d.target.eq(d.curPage).css({display:"block",zIndex:"2"}),g.css({display:"block",zIndex:"3"}),g.css(h),d._targetPage=f;var i={},j=-Math.abs(30*b/d.size);0>b?i[d.cssPrefix+"transform-origin"]="50% 0%":(i[d.cssPrefix+"transform-origin"]="50% 100%",j=-j),i[d.cssPrefix+"transform"]=d.rotateProp+"("+j+"deg)",d.target.eq(d.curPage).css(i)}},beforechange:function(){var a=this,b=a.config,c=a.target.eq(a.curPage);if(a.target.css({display:"none",zIndex:"1"}),c.css({display:"block",zIndex:"3"}),a.prevPage!==window.undefined){var d={},e=a.oriCurPage>a.oriPrevPage?-90:90;a.target.eq(a.prevPage).css({display:"block",zIndex:"2"}),d[a.cssPrefix+"transform"]=a.rotateProp+"("+e+"deg)",a.target.eq(a.prevPage).animate(d,b.animateTime,b.easing,function(){var b={};b[a.cssPrefix+"transform"]=a.rotateProp+"("+e+"deg)",a.target.eq(a.prevPage).css(b)})}if(a._targetPage!==a.oriCurPage){var f,g={},h=a.target.eq(a._outBound(a._targetPage));h.css({display:"block",zIndex:"4"}),f=a._targetPage<a.curPage?-a.size:a.size,g[a.cssPrefix+"transform"]=a.translateProp+"("+f+"px)",h.animate(g,b.animateTime,b.easing)}if(a._targetPage===window.undefined){var i,j={};i=a.oriCurPage<a.oriPrevPage?-a.size:a.size,j[a.cssPrefix+"transform"]=a.translateProp+"("+i+"px)",c.css(j)}var k={};k[a.cssPrefix+"transform"]=a.translateProp+"(0px)",c.animate(k,b.animateTime,b.easing,function(){a.moving=!1,a.trigger("change",[a.curPage])}),delete a._targetPage},change:function(){}})}()}();/*  |xGv00|b6c9a3bbcb5d13c80a0e91775d02d209 */