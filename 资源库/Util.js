//cookie
var CookieUtil = {
get: function (name){
var cookieName = encodeURIComponent(name) + "=",
cookieStart = document.cookie.indexOf(cookieName),
cookieValue = null;
if (cookieStart > -1){
var cookieEnd = document.cookie.indexOf(";", cookieStart);
if (cookieEnd == -1){
cookieEnd = document.cookie.length;
}
cookieValue = decodeURIComponent(document.cookie.substring(cookieStart
+ cookieName.length, cookieEnd));
}
return cookieValue;
},
set: function (name, value, expires, path, domain, secure) {
var cookieText = encodeURIComponent(name) + "=" +
encodeURIComponent(value);
if (expires instanceof Date) {
cookieText += "; expires=" + expires.toGMTString();
}
if (path) {
cookieText += "; path=" + path;
}
if (domain) {
cookieText += "; domain=" + domain;
}
if (secure) {
cookieText += "; secure";
}
document.cookie = cookieText;
},
unset: function (name, path, domain, secure){
this.set(name, "", new Date(0), path, domain, secure);
}
};


// 动态脚本
function loadScript(url){
var script = document.createElement("script");
script.type = "text/javascript";
script.src = url;
document.body.appendChild(script);
}
// 动态样式
function loadStyles(url){
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = url;
var head = document.getElementsByTagName("head")[0];
head.appendChild(link);
}
## virtualEle:dom元素，tagName总是大写
if(virtualEle.nodeType === 1 && virtualEle.childNodes.length === 0 
	&& virtualEle.tagName === 'DIV'){
	this.el = $(String(scenicTemple(this.model.attributes)));
}

##
mouseleave : 离开一个元素时之调用一次（建议使用），而mouserout 里面随便动一下都会调用
mouseenter: 与mouseleave合用。类似hover
1.获取浏览器窗口的大小
var pageWidth = window.innerWidth,
pageHeight = window.innerHeight;
if (typeof pageWidth != "number") {
    if (document.compatMode == "CSS1Compat") {
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    } else {
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
    }
}
1.1 获取元素距离浏览器窗口的距离
document.getBoundingClientRect().left/top/right/botton


2.创建xhr
//适用于IE7 之前的版本
function createXHR() {
    if (typeof arguments.callee.activeXString != "string") {
        var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
        i,
        len;
        for (i = 0, len = versions.length; i < len; i++) {
            try {
                new ActiveXObject(versions[i]);
                arguments.callee.activeXString = versions[i];
                break;
            } catch(ex) {
                //跳过
            }
        }
    }
    return new ActiveXObject(arguments.callee.activeXString);
}

3.表单序列化
function serialize(form) {
    var parts = [],
    field = null,
    i,
    len,
    j,
    optLen,
    option,
    optValue;
    for (i = 0, len = form.elements.length; i < len; i++) {
        field = form.elements[i];
        switch (field.type) {
        case "select-one":
        case "select-multiple":
            if (field.name.length) {
                for (j = 0, optLen = field.options.length; j < optLen; j++) {
                    option = field.options[j];
                    if (option.selected) {
                        optValue = "";
                        if (option.hasAttribute) {
                            optValue = (option.hasAttribute("value") ? option.value: option.text);
                        } else {
                            optValue = (option.attributes["value"].specified ? option.value: option.text);
                        }
                        parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
                    }
                }
            }
            break;
        case undefined:
            //字段集
        case "file":
            //文件输入
        case "submit":
            //提交按钮
        case "reset":
            //重置按钮
        case "button":
            //自定义按钮
            break;
        case "radio":
            //单选按钮
        case "checkbox":
            //复选框
            if (!field.checked) {
                break;
            }
            /* 执行默认操作 */
        default:
            //不包含没有名字的表单字段
            if (field.name.length) {
                parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
            }
        }
    }
    return parts.join("&");
}

// 获取页面选择的文本
function getSelectedText(textbox) {
    if (typeof textbox.selectionStart == "number") {
        return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
        // ie8以下
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
}

// 选择页面中某个文本框的部分文本
function selectText(textbox, startIndex, stopIndex) {
    if (textbox.setSelectionRange) {
        textbox.setSelectionRange(startIndex, stopIndex);
    } else if (textbox.createTextRange) {
        var range = textbox.createTextRange(); // ie中先创建一个范围
        range.collapse(true); //collapse()将范围折叠到文本框的开始位置
        range.moveStart("character", startIndex);
        range.moveEnd("character", stopIndex - startIndex);
        range.select();
    }
    textbox.focus();
}

//String.fromCharCode(str)就是将键盘输入的字符编码转化为字符串 
'8' = String.fromCharCode('56');
'}' = String.fromCharCode('123');

// 屏蔽键盘上的非数字键；有些浏览器会对向上下，退格键也触发keypress事件（他们charCode<=9），这些应该保留
if (!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey) { //保留ctrl+c/v等
    EventUtil.preventDefault(event);
}

// eventUtil原生代码事件封装
var EventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    getEvent: function(event) {
        return event ? event: window.event;
    },
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
	getCharCode: function(event){
		if (typeof event.charCode == "number"){
			return event.charCode;
		} else {
			return event.keyCode;
		}
	},// 获取剪切板上的值
	getClipboardText: function(event){
		var clipboardData = (event.clipboardData || window.clipboardData);
		return clipboardData.getData("text");
	},
	// 设置剪切板的值
	setClipboardText: function(event, value){
		if (event.clipboardData){
			return event.clipboardData.setData("text/plain", value);
		} else if (window.clipboardData){
			return window.clipboardData.setData("text", value);
		}
	},
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
	getRelateTarget: function(event){
        if(event.getRelateTarget){
            return event.getRelateTarget;
        }else if(event.toElement){
            return event.toElement;
        }else if(event.fromElement){
            return event.fromElement;
        }else{
            return null;
        }
    },
    getWheelDelta: function(event){
        if(event.getWheelDelta){
            return (client.engine.opera && client.engine.opera < 9.5 ?
                -event.getWheelDelta : event.getWheelDelta);
        }else{
            return -event.detail * 40;
        }
    },
    //获取鼠标键值
    getButton: function(event){
        if(document.implementation.hasFeature("MouseEvents", "2.0")){
            return event.button;
        }else{
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    }
};

// 假如有三个输入框，每一个的输入值达到最大时，焦点自动切换到下一个输入框
(function(){
	function tabForward(event){
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		
		if (target.value.length == target.maxLength){
			var form = target.form;
			for (var i=0, len=form.elements.length; i < len; i++) {
				if (form.elements[i] == target) {
					if (form.elements[i+1]){
						form.elements[i+1].focus();
					}
					return;
				}
			}
		}
	}
	var textbox1 = document.getElementById("txtTel1");
	var textbox2 = document.getElementById("txtTel2");
	var textbox3 = document.getElementById("txtTel3");
	EventUtil.addHandler(textbox1, "keyup", tabForward);
	EventUtil.addHandler(textbox2, "keyup", tabForward);
	EventUtil.addHandler(textbox3, "keyup", tabForward);
})();

// 创建一个option放在select最后面孩子
var newOption = new Option("Option text", "Option value");
selectbox.add(newOption, undefined); //最佳方案，如果不是最后，则undefined改为对于的下标即可，由于ie下，第二个参数必须要填，且是下标索引，索引选择undefined兼容ie以下


//获取search的参数放在json中
function getQueryStringArgs(){

	//取得查询字符串并去掉开头的问号
	var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
	//保存数据的对象
	args = {},
	//取得每一项
	items = qs.length ? qs.split("&") : [],
	item = null,
	name = null,
	value = null,
	//在for 循环中使用
	i = 0,
	len = items.length;
	//逐个将每一项添加到args 对象中
	for (i=0; i < len; i++){
		item = items[i].split("=");
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);
		if (name.length) {
			args[name] = value;
		}
	}
	return args;
}

// 创建ajax
function createXHR(){
	if (typeof XMLHttpRequest != "undefined"){
		return new XMLHttpRequest();
	} else if (typeof ActiveXObject != "undefined"){
		if (typeof arguments.callee.activeXString != "string"){
			var versions = [ "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
			"MSXML2.XMLHttp"],
			i, len;
			for (i=0,len=versions.length; i < len; i++){
				try {
				new ActiveXObject(versions[i]);
				arguments.callee.activeXString = versions[i];
				break;
				} catch (ex){
					//跳过
				}
			}
		}
		return new ActiveXObject(arguments.callee.activeXString);
	} else {
		throw new Error("No XHR object available.");
	}
}
// 同步 根据status的状态码判断即可
xhr.open("get", "example.txt", false);
xhr.send(null);
if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
	alert(xhr.responseText);
} else {
	alert("Request was unsuccessful: " + xhr.status);
}

// 异步 根据readystatechange
var xhr = createXHR();
xhr.onreadystatechange = function(){
	if (xhr.readyState == 4){
		if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
			alert(xhr.responseText);
		} else {
			alert("Request was unsuccessful: " + xhr.status);
		}
	}
};
xhr.open("get", "example.txt", true);
xhr.send(null);

// POST 请求
function submitData(){
	var xhr = createXHR();
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4){
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
				alert(xhr.responseText);
			} else {
				alert("Request was unsuccessful: " + xhr.status);
			}
		}
	};
	xhr.open("post", "postexample.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");// 模仿web表单提交，服务端取数据就会同表单提交一样取
	var form = document.getElementById("user-info");
	xhr.send(serialize(form));
}

// comet
function createStreamingClient(url, progress, finished){
	var xhr = new XMLHttpRequest(),
	received = 0;
	xhr.open("get", url, true);
	xhr.onreadystatechange = function(){
		var result;
		if (xhr.readyState == 3){
		//只取得最新数据并调整计数器
			result = xhr.responseText.substring(received);
			received += result.length;
			//调用progress 回调函数
			progress(result);
		} else if (xhr.readyState == 4){
			finished(xhr.responseText);
		}
	};
	xhr.send(null);
	return xhr;
}
var client = createStreamingClient("streaming.php", function(data){
alert("Received: " + data);
}, function(data){
alert("Done!");
});
HTTPStreamingExample01.htm
这个createStreamingClient()函数接收三个参数：要连接的URL、在接收到数据时调用的函
数以及关闭连接时调用的函数。


以下是完整的用户代理字符串检测脚本，包括检测呈现引擎、平台、Windows 操作系统、移动设备
和游戏系统。
var client = function(){
//呈现引擎
var engine = {
ie: 0,
gecko: 0,
webkit: 0,
khtml: 0,
opera: 0,
//完整的版本号
ver: null
};
//浏览器
var browser = {
//主要浏览器
ie: 0,
firefox: 0,
safari: 0,
konq: 0,
opera: 0,
chrome: 0,
//具体的版本号
ver: null
};
//平台、设备和操作系统
var system = {
win: false,
mac: false,
x11: false,
//移动设备
iphone: false,
ipod: false,
ipad: false,
ios: false,
android: false,
nokiaN: false,
winMobile: false,
//游戏系统
wii: false,
ps: false
};
//检测呈现引擎和浏览器
var ua = navigator.userAgent;
if (window.opera){
engine.ver = browser.ver = window.opera.version();
engine.opera = browser.opera = parseFloat(engine.ver);
} else if (/AppleWebKit\/(\S+)/.test(ua)){
engine.ver = RegExp["$1"];
engine.webkit = parseFloat(engine.ver);
//确定是Chrome 还是Safari
if (/Chrome\/(\S+)/.test(ua)){
browser.ver = RegExp["$1"];
browser.chrome = parseFloat(browser.ver);
} else if (/Version\/(\S+)/.test(ua)){
browser.ver = RegExp["$1"];
browser.safari = parseFloat(browser.ver);
} else {
//近似地确定版本号
var safariVersion = 1;
if (engine.webkit < 100){
safariVersion = 1;
} else if (engine.webkit < 312){
safariVersion = 1.2;
} else if (engine.webkit < 412){
safariVersion = 1.3;
} else {
safariVersion = 2;
}
browser.safari = browser.ver = safariVersion;
}
} else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
engine.ver = browser.ver = RegExp["$1"];
engine.khtml = browser.konq = parseFloat(engine.ver);
} else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
engine.ver = RegExp["$1"];
engine.gecko = parseFloat(engine.ver);
//确定是不是Firefox
if (/Firefox\/(\S+)/.test(ua)){
browser.ver = RegExp["$1"];
browser.firefox = parseFloat(browser.ver);
}
} else if (/MSIE ([^;]+)/.test(ua)){
engine.ver = browser.ver = RegExp["$1"];
engine.ie = browser.ie = parseFloat(engine.ver);
}
//检测浏览器
browser.ie = engine.ie;
browser.opera = engine.opera;
//检测平台
var p = navigator.platform;
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
//检测Windows 操作系统
if (system.win){
if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
if (RegExp["$1"] == "NT"){
switch(RegExp["$2"]){
case "5.0":
system.win = "2000";
break;
case "5.1":
system.win = "XP";
break;
case "6.0":
system.win = "Vista";
break;
case "6.1":
system.win = "7";
break;
default:
system.win = "NT";
break;
}
} else if (RegExp["$1"] == "9x"){
system.win = "ME";
} else {
system.win = RegExp["$1"];
}
}
}
//移动设备
system.iphone = ua.indexOf("iPhone") > -1;
system.ipod = ua.indexOf("iPod") > -1;
system.ipad = ua.indexOf("iPad") > -1;
system.nokiaN = ua.indexOf("NokiaN") > -1;
//windows mobile
if (system.win == "CE"){
system.winMobile = system.win;
} else if (system.win == "Ph"){
if(/Windows Phone OS (\d+.\d+)/.test(ua)){;
system.win = "Phone";
system.winMobile = parseFloat(RegExp["$1"]);
}
}
//检测iOS 版本
if (system.mac && ua.indexOf("Mobile") > -1){
if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
system.ios = parseFloat(RegExp.$1.replace("_", "."));
} else {
system.ios = 2; //不能真正检测出来，所以只能猜测
}
}
//检测Android 版本
if (/Android (\d+\.\d+)/.test(ua)){
system.android = parseFloat(RegExp.$1);
}
//游戏系统
system.wii = ua.indexOf("Wii") > -1;
system.ps = /playstation/i.test(ua);
//返回这些对象
return {
engine: engine,
browser: browser,
system: system
};
}();

// ie7判断
var ua = navigator.userAgent, engine = window.engine || {};
	if (/MSIE ([^;]+)/.test(ua)) {
		engine.ver = RegExp["$1"];
		engine.ie = parseFloat(engine.ver);
		if (engine.ie <= 7) {
			otherCarbins.css({'display': 'inline','zoom': 1});
		}
	}
/////////////////
