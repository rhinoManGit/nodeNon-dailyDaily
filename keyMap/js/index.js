'use strict';

window.onload = function () {

	var team =  ["钱慧莉", "范欣", "周祥", "陆尧", "王舵", "郭营", "刘彩娟", "张仓巨","徐畅", "陈凯伦",
		"朱凯(大)", "刘彬", "肖振监", "白亚如","朱献奎", "徐旭", "邵力", "严晓军", "孙志红",
		"王永新", "赵娜", "王静雯", "袁露", "陆中泽","朱凯(小)", "杨益晨", "翟倩倩", "孙寒", "上官丹燕",
		"陈小飞","姜丽华", "陈冲", "张恒一", "朱益玲", "谈克", "张树琴", "何晶晶", "王伟伟", "洪丹丹", "单丽丽", "文江红", "何丹丹"];

	// 78
	var KEYMAP = {
			'BACKSPACE': 8,
			'TAB': 9,
			'ENTER': 13,
			'SHIFT': 16,
			'CTRL': 17,
			'ALT': 18,
			'CAPS': 20,
			'SPACE': 32,
			'PG_UP': 33,
			'PG_DN': 34,
			'END': 35,
			'HOME': 36,
			'ARROW_LEFT': 37,
			'ARROW_UP': 38,
			'ARROW_RIGHT': 39,
			'ARROW_DOWN': 40,
			'INS': 45,
			'DEL': 46,
			'NUM_0': 48,
			'NUM_1': 49,
			'NUM_2': 50,
			'NUM_3': 51,
			'NUM_4': 52,
			'NUM_5': 53,
			'NUM_6': 54,
			'NUM_7': 55,
			'NUM_8': 56,
			'NUM_9': 57,
			'A': 65,
			'B': 66,
			'C': 67,
			'D': 68,
			'E': 69,
			'F': 70,
			'G': 71,
			'H': 72,
			'I': 73,
			'J': 74,
			'K': 75,
			'L': 76,
			'M': 77,
			'N': 78,
			'O': 79,
			'P': 80,
			'Q': 81,
			'R': 82,
			'S': 83,
			'T': 84,
			'U': 85,
			'V': 86,
			'W': 87,
			'X': 88,
			'Y': 89,
			'Z': 90,
			'F1': 112,
			'F2': 113,
			'F3': 114,
			'F4': 115,
			'F5': 116,
			'F6': 117,
			'F7': 118,
			'F8': 119,
			'F9': 120,
			'F10': 121,
			'F11': 122,
			'F12': 123,
			'F13': 124,
			'F14': 125,
			'F15': 126,
			'SEMICOLON': 186,
			'EQUAL': 187,
			'COMMA': 188,
			'MINUS': 189,
			'PERIOD': 190,
			'SLASH': 191,
			'BRACKET_LEFT': 219,
			'BACKSLASH': 220,
			'BRACKET_RIGHT': 221,
			'QUOTE': 222
		},
		key_els = {},
		lucky = [];

	var rand = function rand() {
		var max = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
		var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

		var _int = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

		var gen = min + (max - min) * Math.random();
		return _int ? Math.round(gen) : gen;
	};

	var render = function(){

		var luckyEl = document.querySelector('.J-lucky');
			//sLucky  = '<li>' + lucky.join('</li><li>') + '</li>';
		var sLucky = '';

		lucky.forEach(function(el, i){
			sLucky+= '<li>' + (i+1) + '.' + el + '</li>';
		})

		luckyEl.innerHTML = sLucky;
	};

	var getSearch = function(){

		var aSearch = document.location.search.replace('?','').split('&'),
			obj = {};

		aSearch.forEach(function(el){

			var a = el.split('=');
			obj[a[0]] = a[1]
		});

		return obj;
	};

	(function init() {
		var a3d = document.querySelector('.a3d'),
			f = document.createDocumentFragment(),
			lims = [33, 41, 47, 58, 91, 127, 146],
			len = lims.length,
			unit = 360 / (len + 1),
			j = 0;

		for (var p in KEYMAP) {
			j++;

			var rot = document.createElement('div'),
				key = document.createElement('div');

			key.dataset.name = p.replace('NUM_', '');
			key.dataset.code = KEYMAP[p];
			key.classList.add('key');
			key.title = team[j % team.length] // 73 ：键盘数，

			for (var i = 0; i < len; i++) {
				if (KEYMAP[p] < lims[i]) {
					var hue = rand((i + .8) * unit, (i + .2) * unit, 1);
					key.style.color = 'hsl(' + hue + ',100%,65%)';
					break;
				}
			}

			rot.classList.add('rot');

			key_els[p] = key;
			rot.appendChild(key);
			f.appendChild(rot);
		}

		a3d.appendChild(f);

		document.querySelector('.J-total').innerHTML = getSearch()['total'];
	})();

	addEventListener('keydown', function (e) {
		e.preventDefault();

		for (var p in KEYMAP) {
			if (e.keyCode === KEYMAP[p]) {
				if (!key_els[p].classList.contains('vis')) key_els[p].classList.add('vis');

				change(key_els[p].title);

				lucky.indexOf(key_els[p].title) < 0 && lucky.push(key_els[p].title);
				lucky.length > getSearch()['total'] && lucky.shift();

				return;
			}
		}
	}, false);

	addEventListener('keyup', function (e) {
		e.preventDefault();

		render();
	}, false);

	addEventListener('animationend', function (e) {
		var t = e.target;
		if (e.animationName === 'hl') t.classList.remove('vis');
	}, false);
};