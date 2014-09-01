_.strftime.i18n.en = {
  fullMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  fullWeekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortWeekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ampm: ['AM', 'PM'],
  dateTimeFormat: '%a %b %e %H:%M:%S %Y',
  dateFormat: '%m/%d/%y',
  timeFormat: '%H:%M:%S'
};

// var $YiChaMeiTu = $YiChaMeiTu || {};
// $YiChaMeiTu = $.extend(true, $YiChaMeiTu, {
// 	config: {
// 		// ajaxDomain: 'http://192.168.1.32:8098',
// 		// ajaxDataType: 'jsonp',
//   //   download: 'http://192.168.1.22:8080/meitu-html5/downpic?url=',
//     ajaxDomain: '/meitu-data-ws/',
//     ajaxDataType: 'json',
//     download: '/sti2/downpic?url=',
// 		favorStorageKey: 'localStorage:favor',
// 		likeStorageKey: 'localStorage:like',
// 		pageSize: 10,
// 		shareUrl: 'http://mm.yicha.cn/sti2/'    
// 	},
// 	device: {
// 		isIpad: (/ipad/gi).test(navigator.appVersion),
// 		isIphone: (/iphone/gi).test(navigator.appVersion),
//     isSafari: (/safari/gi).test(navigator.appVersion),
//     iosVersion: (/iphone/gi).test(navigator.appVersion) ? parseInt((/iPhone\sOS\s([\w]+)\slike\sMac\sOS\sX/).exec(navigator.userAgent)[1].replace(/\_/ig, '.')) : 0,
// 		isAndroid: (/android/gi).test(navigator.userAgent),
//     isChromeOniPhone: (/iphone/gi).test(navigator.appVersion) && (/CriOS/gi).test(navigator.appVersion),
// 		isOrientationAware: ("onorientationchange" in window),
// 		isHashChangeAware: ("onhashchange" in window),
// 		isTouchable: ("ontouchstart" in window),
// 		isUC: (/UCBrowser/gi).test(navigator.userAgent),
//     isMi: (/MiuiBrowser/gi).test(navigator.userAgent),
//     isQQ: (/MQQBrowser/gi).test(navigator.userAgent),
//     isWeiChat: (/MicroMessenger/gi).test(navigator.userAgent),
// 		androidVersion: (/android/gi).test(navigator.userAgent) ? parseFloat((/Android[\/\s]+([\d\.]+)/).exec(navigator.userAgent)[1]) : 0,
// 		qvodVersion: ((/QvodPlayerBrowser/gi).test(navigator.userAgent)) ? (/QvodPlayerBrowser\:+([\d\.]+)/).exec(navigator.userAgent)[1] : 0,
// 		ucVersion: (/UCBrowser/gi).test(navigator.userAgent) ? parseFloat((/UCBrowser\/+([\d\.]+)/).exec(navigator.userAgent)[1]) : 0,
// 		compareVersion: function(v1,v2) {
// 			var arrV1 = v1.split('.'),
// 				arrV2 = v2.split('.'),
// 				len = (arrV1.length >= arrV2.length) ? arrV2.length : arrV1.length,
// 				result = (arrV1.length > arrV2.length) ? true :false,
// 				i;
// 			for (i = 0; i < len; i++){
// 				if (parseInt(arrV1[i]) != parseInt(arrV2[i])) {
// 					result = (parseInt(arrV1[i]) > parseInt(arrV2[i])) ? true : false;
// 					break;
// 				};
// 			};
// 			i++;
// 			return result;
// 		},

// 		getOrient: function() {
// 			if (window.orientation != undefined) {
// 				return window.orientation % 180 == 0 ? "portrait" : "landscape";
// 			} else {
// 				return (window.innerWidth > window.innerHeight) ? "landscape" : "portrait";
// 			};
// 		}
// 	},
// 	request: function(name) {
// 		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
// 		var r = decodeURI(window.location.search.substr(1)).match(reg);
// 		if (r != null) return decodeURI(unescape(r[2]));
// 		return null;
// 	},
// 	clientSize: function() {
// 		var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
// 		var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

// 		return {
// 			"width": width,
// 			"height": height
// 		};
// 	},
//   getRandom: function(n){
//     return Math.ceil(Math.random()*n) - 1;
//   }
// });

// $.ajaxSetup({
//   cache: false
// });

// $YiChaMeiTu.StorageUtil = function(){
//   var _win              = window,
//       _doc              = _win.document,
//       _localstorage     = (function () {
//           var api               = {},
//               localStorageName  = 'localStorage',
//               globalStorageName = 'globalStorage',
//               storage;

//           api.set    = function (key, value) {};
//           api.get    = function (key)        {};
//           api.remove = function (key)        {};
//           api.clear  = function ()           {};

//           if (localStorageName in _win && _win[localStorageName]) {
//               storage    = _win[localStorageName];
//               api.set    = function (key, val) { storage.setItem(key, val); };
//               api.get    = function (key)      { return storage.getItem(key) };
//               api.remove = function (key)      { storage.removeItem(key) };
//               api.clear  = function ()         { storage.clear() };

//           } else if (globalStorageName in _win && _win[globalStorageName]) {
//               storage    = _win[globalStorageName][_win.location.hostname];
//               api.set    = function (key, val) { storage[key] = val };
//               api.get    = function (key)      { return storage[key] && storage[key].value };
//               api.remove = function (key)      { delete storage[key] };
//               api.clear  = function ()         { for (var key in storage ) { delete storage[key] } };

//           } else if (_doc.documentElement.addBehavior) {
//               function getStorage() {
//                   if (storage) { return storage }
//                   storage = _doc.body.appendChild(_doc.createElement('div'));
//                   storage.style.display = 'none';
//                   // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
//                   // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
//                   storage.addBehavior('#default#userData');
//                   storage.load(localStorageName);
//                   return storage;
//               }
//               api.set = function (key, val) {
//                   var storage = getStorage();
//                   storage.setAttribute(key, val);
//                   storage.save(localStorageName);
//               };
//               api.get = function (key) {
//                   var storage = getStorage();
//                   return storage.getAttribute(key);
//               };
//               api.remove = function (key) {
//                   var storage = getStorage();
//                   storage.removeAttribute(key);
//                   storage.save(localStorageName);
//               }
//               api.clear = function () {
//                   var storage = getStorage();
//                   var attributes = storage.XMLDocument.documentElement.attributes;;
//                   storage.load(localStorageName);
//                   for (var i=0, attr; attr = attributes[i]; i++) {
//                       storage.removeAttribute(attr.name);
//                   }
//                   storage.save(localStorageName);
//               }
//           }
//           return api;
//       })(),
//       _sessionStorage = (function () {
//           var api               = {},
//               sessionStorageName  = 'sessionStorage',
//               storage;

//           api.set    = function (key, value) {};
//           api.get    = function (key)        {};
//           api.remove = function (key)        {};
//           api.clear  = function ()           {};

//           if (sessionStorageName in _win && _win[sessionStorageName]) {
//               storage    = _win[sessionStorageName];
//               api.set    = function (key, val) { storage.setItem(key, val) };
//               api.get    = function (key)      { return storage.getItem(key) };
//               api.remove = function (key)      { storage.removeItem(key) };
//               api.clear  = function ()         { storage.clear() };
//           }
//           return api;
//       })();
//   return {
//       localStorage:_localstorage,
//       sessionStorage:_sessionStorage
//   }
// }();


// iScroll.prototype.scrollToElementCenter = function(el, time){
//   var that = this, pos, offsetLeft, offsetTop;
//   el = el.nodeType ? el : that.scroller.querySelector(el);
//   if (!el) return;

//   pos = that._offset(el);
//   pos.left += that.wrapperOffsetLeft;
//   pos.top += that.wrapperOffsetTop;
//   offsetLeft = (that.wrapperW - el.offsetWidth) / 2; 
//   offsetTop = (that.wrapperH - el.offsetHeight) / 2;
//   pos.left += offsetLeft;
//   pos.top += offsetTop;

//   pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
//   pos.top = pos.top > that.minScrollY ? that.minScrollY : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
//   time = time === undefined ? m.max(m.abs(pos.left)*2, m.abs(pos.top)*2) : time;

//   that.scrollTo(pos.left, pos.top, time);
// };