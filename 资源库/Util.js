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


// ��̬�ű�
function loadScript(url){
var script = document.createElement("script");
script.type = "text/javascript";
script.src = url;
document.body.appendChild(script);
}
// ��̬��ʽ
function loadStyles(url){
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = url;
var head = document.getElementsByTagName("head")[0];
head.appendChild(link);
}
## virtualEle:domԪ�أ�tagName���Ǵ�д
if(virtualEle.nodeType === 1 && virtualEle.childNodes.length === 0 
	&& virtualEle.tagName === 'DIV'){
	this.el = $(String(scenicTemple(this.model.attributes)));
}

##
mouseleave : �뿪һ��Ԫ��ʱ֮����һ�Σ�����ʹ�ã�����mouserout ������㶯һ�¶������
mouseenter: ��mouseleave���á�����hover
1.��ȡ��������ڵĴ�С
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
1.1 ��ȡԪ�ؾ�����������ڵľ���
document.getBoundingClientRect().left/top/right/botton


2.����xhr
//������IE7 ֮ǰ�İ汾
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
                //����
            }
        }
    }
    return new ActiveXObject(arguments.callee.activeXString);
}

3.�����л�
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
            //�ֶμ�
        case "file":
            //�ļ�����
        case "submit":
            //�ύ��ť
        case "reset":
            //���ð�ť
        case "button":
            //�Զ��尴ť
            break;
        case "radio":
            //��ѡ��ť
        case "checkbox":
            //��ѡ��
            if (!field.checked) {
                break;
            }
            /* ִ��Ĭ�ϲ��� */
        default:
            //������û�����ֵı��ֶ�
            if (field.name.length) {
                parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
            }
        }
    }
    return parts.join("&");
}

// ��ȡҳ��ѡ����ı�
function getSelectedText(textbox) {
    if (typeof textbox.selectionStart == "number") {
        return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
        // ie8����
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
}

// ѡ��ҳ����ĳ���ı���Ĳ����ı�
function selectText(textbox, startIndex, stopIndex) {
    if (textbox.setSelectionRange) {
        textbox.setSelectionRange(startIndex, stopIndex);
    } else if (textbox.createTextRange) {
        var range = textbox.createTextRange(); // ie���ȴ���һ����Χ
        range.collapse(true); //collapse()����Χ�۵����ı���Ŀ�ʼλ��
        range.moveStart("character", startIndex);
        range.moveEnd("character", stopIndex - startIndex);
        range.select();
    }
    textbox.focus();
}

//String.fromCharCode(str)���ǽ�����������ַ�����ת��Ϊ�ַ��� 
'8' = String.fromCharCode('56');
'}' = String.fromCharCode('123');

// ���μ����ϵķ����ּ�����Щ�������������£��˸��Ҳ����keypress�¼�������charCode<=9������ЩӦ�ñ���
if (!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey) { //����ctrl+c/v��
    EventUtil.preventDefault(event);
}

// eventUtilԭ�������¼���װ
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
	},// ��ȡ���а��ϵ�ֵ
	getClipboardText: function(event){
		var clipboardData = (event.clipboardData || window.clipboardData);
		return clipboardData.getData("text");
	},
	// ���ü��а��ֵ
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
    //��ȡ����ֵ
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

// ���������������ÿһ��������ֵ�ﵽ���ʱ�������Զ��л�����һ�������
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

// ����һ��option����select����溢��
var newOption = new Option("Option text", "Option value");
selectbox.add(newOption, undefined); //��ѷ�����������������undefined��Ϊ���ڵ��±꼴�ɣ�����ie�£��ڶ�����������Ҫ������±�����������ѡ��undefined����ie����


//��ȡsearch�Ĳ�������json��
function getQueryStringArgs(){

	//ȡ�ò�ѯ�ַ�����ȥ����ͷ���ʺ�
	var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
	//�������ݵĶ���
	args = {},
	//ȡ��ÿһ��
	items = qs.length ? qs.split("&") : [],
	item = null,
	name = null,
	value = null,
	//��for ѭ����ʹ��
	i = 0,
	len = items.length;
	//�����ÿһ����ӵ�args ������
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

// ����ajax
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
					//����
				}
			}
		}
		return new ActiveXObject(arguments.callee.activeXString);
	} else {
		throw new Error("No XHR object available.");
	}
}
// ͬ�� ����status��״̬���жϼ���
xhr.open("get", "example.txt", false);
xhr.send(null);
if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
	alert(xhr.responseText);
} else {
	alert("Request was unsuccessful: " + xhr.status);
}

// �첽 ����readystatechange
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

// POST ����
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
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");// ģ��web���ύ�������ȡ���ݾͻ�ͬ���ύһ��ȡ
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
		//ֻȡ���������ݲ�����������
			result = xhr.responseText.substring(received);
			received += result.length;
			//����progress �ص�����
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
���createStreamingClient()������������������Ҫ���ӵ�URL���ڽ��յ�����ʱ���õĺ�
���Լ��ر�����ʱ���õĺ�����


�������������û������ַ������ű����������������桢ƽ̨��Windows ����ϵͳ���ƶ��豸
����Ϸϵͳ��
var client = function(){
//��������
var engine = {
ie: 0,
gecko: 0,
webkit: 0,
khtml: 0,
opera: 0,
//�����İ汾��
ver: null
};
//�����
var browser = {
//��Ҫ�����
ie: 0,
firefox: 0,
safari: 0,
konq: 0,
opera: 0,
chrome: 0,
//����İ汾��
ver: null
};
//ƽ̨���豸�Ͳ���ϵͳ
var system = {
win: false,
mac: false,
x11: false,
//�ƶ��豸
iphone: false,
ipod: false,
ipad: false,
ios: false,
android: false,
nokiaN: false,
winMobile: false,
//��Ϸϵͳ
wii: false,
ps: false
};
//����������������
var ua = navigator.userAgent;
if (window.opera){
engine.ver = browser.ver = window.opera.version();
engine.opera = browser.opera = parseFloat(engine.ver);
} else if (/AppleWebKit\/(\S+)/.test(ua)){
engine.ver = RegExp["$1"];
engine.webkit = parseFloat(engine.ver);
//ȷ����Chrome ����Safari
if (/Chrome\/(\S+)/.test(ua)){
browser.ver = RegExp["$1"];
browser.chrome = parseFloat(browser.ver);
} else if (/Version\/(\S+)/.test(ua)){
browser.ver = RegExp["$1"];
browser.safari = parseFloat(browser.ver);
} else {
//���Ƶ�ȷ���汾��
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
//ȷ���ǲ���Firefox
if (/Firefox\/(\S+)/.test(ua)){
browser.ver = RegExp["$1"];
browser.firefox = parseFloat(browser.ver);
}
} else if (/MSIE ([^;]+)/.test(ua)){
engine.ver = browser.ver = RegExp["$1"];
engine.ie = browser.ie = parseFloat(engine.ver);
}
//��������
browser.ie = engine.ie;
browser.opera = engine.opera;
//���ƽ̨
var p = navigator.platform;
system.win = p.indexOf("Win") == 0;
system.mac = p.indexOf("Mac") == 0;
system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
//���Windows ����ϵͳ
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
//�ƶ��豸
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
//���iOS �汾
if (system.mac && ua.indexOf("Mobile") > -1){
if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
system.ios = parseFloat(RegExp.$1.replace("_", "."));
} else {
system.ios = 2; //��������������������ֻ�ܲ²�
}
}
//���Android �汾
if (/Android (\d+\.\d+)/.test(ua)){
system.android = parseFloat(RegExp.$1);
}
//��Ϸϵͳ
system.wii = ua.indexOf("Wii") > -1;
system.ps = /playstation/i.test(ua);
//������Щ����
return {
engine: engine,
browser: browser,
system: system
};
}();

// ie7�ж�
var ua = navigator.userAgent, engine = window.engine || {};
	if (/MSIE ([^;]+)/.test(ua)) {
		engine.ver = RegExp["$1"];
		engine.ie = parseFloat(engine.ver);
		if (engine.ie <= 7) {
			otherCarbins.css({'display': 'inline','zoom': 1});
		}
	}
/////////////////
