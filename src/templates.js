this["JST"] = this["JST"] || {};

this["JST"]["albums"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


	var albums = photos;
	var albumsCount = albums.length;
	// clone
	var albumsForDom = _.map(albums, function(album, index){ 
		album.index = index;
		return album;
	});
	var albumsTemp;
	if(albumsCount === 2){
		albumsForDom.reverse();
	} else if (albumsCount > 2){
		albumsForDom.unshift(albumsForDom.pop());
		albumsForDom.unshift(albumsForDom.pop());
	}
	albumsTemp = albumsForDom.concat();
	while(albumsForDom.length < 5){
		albumsForDom = albumsForDom.concat(albumsTemp);
	}
;
__p += '\r\n\t\t<ul class="albums-box">\r\n\t\t\t';

				_.each(albumsForDom, function(a){ 
			;
__p += '\r\n\t\t\t<li>\r\n\t\t\t\t<a href="#photos/' +
((__t = (a.id )) == null ? '' : __t) +
'/0">\r\n\t\t\t\t\t<img src="' +
((__t = (a.cover )) == null ? '' : __t) +
'" width="118px" height="151px" alt="' +
((__t = (a.name )) == null ? '' : __t) +
'" index="' +
((__t = (a.index )) == null ? '' : __t) +
'"/>\r\n\t\t\t\t\t<span class="album-name">' +
((__t = (a.name )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t</a>\r\n\t\t\t</li>\r\n\t\t\t';
 }); ;
__p += '\r\n\t\t</ul>\r\n\t\t<ul class="albums-index">\r\n\t\t\t';
 if(albumsCount > 0) { ;
__p += '\r\n\t\t\t<li class="current"></li>\r\n\t\t\t';
 } ;
__p += '\r\n\t\t\t';
 for(var i = 1; i < albumsCount; i++) { ;
__p += '\r\n\t\t\t<li></li>\r\n\t\t\t';
 } ;
__p += '\r\n\t\t</ul>';

}
return __p
};

this["JST"]["content"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


	var headphoto = 'background:url(' + logo + ') no-repeat; background-size:100% 100%;';
	var weddingDate = _.dateFromISOString(date);
	var weddingDateStr = _.strftime(weddingDate, '%Y年%m月%d日');
	var days = Math.round((weddingDate - new Date())/(1000*60*60*24));
	days = days < 0 ? 0 : days;
	weddingDateStr += ' 距今' + days + '天';
	var video_bak = 'background:url(' + video_cover + ') no-repeat; background-size:100% 100%;';
	var courses = course;
;
__p += '\r\n<div class="content-box fullwidth clearfix">\r\n\r\n\t<div class="content-title">\r\n\t\t<div class="content-headphoto" style="' +
((__t = (headphoto )) == null ? '' : __t) +
'">\r\n\t\t\t<a href="#cover/' +
((__t = (id)) == null ? '' : __t) +
'">\r\n\t\t\t\t<img src="images/logo_keeper.png" width="60px" height="60px" />\r\n\t\t\t</a>\r\n\t\t</div>\r\n\t\t<span class="content-titleword">' +
((__t = (title )) == null ? '' : __t) +
'</span>\r\n\t\t<!-- <span class="content-weddingdate">' +
((__t = (weddingDateStr )) == null ? '' : __t) +
'</span> -->\r\n\t\t<a href="javascript:void(0);" id="music_switch" class="on"></a>\r\n\t</div>\r\n\r\n\t<div class="content-albums clearfix">\r\n\r\n\t</div>\r\n\r\n\t<div class="content-date clearfix">\r\n\r\n\t</div>\r\n\r\n\t<iframe height="240px" width="100%" src="' +
((__t = (video)) == null ? '' : __t) +
'" frameborder=0 allowfullscreen></iframe>\r\n\t<!-- <div class="content-vedio" style="' +
((__t = (video_bak )) == null ? '' : __t) +
'">\r\n\t\t<a href="' +
((__t = (video )) == null ? '' : __t) +
'" target="_blank" class="content-vedio-play"></a>\r\n\t</div> -->\r\n<!-- \t<video src="' +
((__t = (video )) == null ? '' : __t) +
'" width="100%" height="240px"></video> -->\r\n\r\n\t\r\n\r\n\r\n\r\n\t<dl class="content-white clearfix">\r\n\t\t<dt class="desc">\r\n\t\t\t<span>新人介绍</span>\r\n\t\t</dt>\r\n\t\t<dd class="couple-info boy">\r\n\t\t\t<img src="' +
((__t = (boy_photo )) == null ? '' : __t) +
'" width="80px" height="80px" />\r\n\t\t\t<span class="title">' +
((__t = (boy_name )) == null ? '' : __t) +
'</span>\r\n\t\t\t<pre>' +
((__t = (boy_desc )) == null ? '' : __t) +
'</pre>\r\n\t\t</dd>\r\n\t\t<dd class="couple-info gril">\r\n\t\t\t<img src="' +
((__t = (gril_photo )) == null ? '' : __t) +
'" width="80px" height="80px" />\r\n\t\t\t<span class="title">' +
((__t = (gril_name )) == null ? '' : __t) +
'</span>\r\n\t\t\t<pre>' +
((__t = (gril_desc )) == null ? '' : __t) +
'</pre>\r\n\t\t</dd>\r\n\t</dl>\r\n\r\n\t<dl class="content-white clearfix">\r\n\t\t<dt class="course">\r\n\t\t\t<span>感情历程</span>\r\n\t\t</dt>\r\n\t\t';

			_.each(courses, function(c){ 
				var date = _.dateFromISOString(c.date);
				var bcolor = c.color;
		;
__p += '\r\n\t\t<dd class="course-info">\r\n\t\t\t<div class="date" style="background-color:' +
((__t = (bcolor)) == null ? '' : __t) +
'">\r\n\t\t\t\t<span class="day">' +
((__t = (_.strftime(date, '%b%d') )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t<span class="year">' +
((__t = (_.strftime(date, '%Y') )) == null ? '' : __t) +
'</span>\r\n\t\t\t</div>\r\n\t\t\t<span class="title">' +
((__t = (c.title )) == null ? '' : __t) +
'</span>\r\n\t\t\t<pre>' +
((__t = (c.desc )) == null ? '' : __t) +
'</pre>\r\n\t\t</dd>\r\n\t\t';
 }); ;
__p += '\r\n\t</dl>\r\n\r\n\t<dl class="content-white clearfix">\r\n\t\t<dt class="promise">\r\n\t\t\t<span>爱情宣言</span>\r\n\t\t</dt>\r\n\t\t<dd class="promise-info">\r\n\t\t\t<pre>' +
((__t = (promise )) == null ? '' : __t) +
'</pre>\r\n\t\t</dd>\r\n\t</dl>\r\n\r\n\t<dl class="content-white clearfix">\r\n\t\t<dt class="message">\r\n\t\t\t<span>友人寄语</span>\r\n\t\t\t<a href="#msg/' +
((__t = (id )) == null ? '' : __t) +
'"></a>\r\n\t\t</dt>\r\n\t\t';

			_.each(messages, function(m){
		;
__p += '\r\n\t\t<dd class="message-info">\r\n\t\t\t<img src="' +
((__t = (m.photo )) == null ? '' : __t) +
'" width="80px" height="80px" />\r\n\t\t\t<span class="title">' +
((__t = (m.name )) == null ? '' : __t) +
'</span>\r\n\t\t\t<pre>' +
((__t = (m.content )) == null ? '' : __t) +
'</pre>\r\n\t\t</dd>\r\n\t\t';
 }); ;
__p += '\r\n\t\t<dd class="btn-more-message">\r\n\t\t\t<a href="#msgs/' +
((__t = (id )) == null ? '' : __t) +
'">更多</a>\r\n\t\t</dd>\r\n\t</dl>\r\n\r\n\t<div class="footer">\r\n\r\n\t</div>\r\n</div>\r\n\r\n';

}
return __p
};

this["JST"]["contentDate"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


	var weddingDate = _.dateFromISOString(date);
	var weddingDateStr = _.strftime(weddingDate, '%Y年%m月%d日');
	var weddingTimeStr = _.strftime(weddingDate, '%H年%M月%S日');
	var days = Math.round((weddingDate - new Date())/(1000*60*60*24));
	days = days < 0 ? 0 : days;
	weddingCountdownStr = ' 距今' + days + '天';
;
__p += '\r\n\r\n\r\n\t<p>\r\n\t\t' +
((__t = (weddingDateStr )) == null ? '' : __t) +
'\r\n\t</p>\r\n\t<p>\r\n\t\t' +
((__t = (weddingCountdownStr )) == null ? '' : __t) +
'\r\n\t</p>\r\n\t<p>\r\n\t\t新人：' +
((__t = (boy_name )) == null ? '' : __t) +
'&amp;' +
((__t = (gril_name )) == null ? '' : __t) +
'\r\n\t</p>\r\n\t<p>\r\n\t\t正式结为夫妻\r\n\t</p>\r\n';

}
return __p
};

this["JST"]["cover"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


	var background = 'background:url(' + cover + ') no-repeat; background-size:100% 100%;';
;
__p += '\r\n<div class="full" style="' +
((__t = (background )) == null ? '' : __t) +
'">\r\n\t<a href="#content/' +
((__t = (id )) == null ? '' : __t) +
'" class="cover-heart">\r\n\t</a>\r\n</div>';

}
return __p
};

this["JST"]["footer"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\t\t<img src="' +
((__t = (studio_logo )) == null ? '' : __t) +
'" width="60px" height="60px" />\r\n\t\t<span class="title">本相册由<a href="' +
((__t = (studio_site )) == null ? '' : __t) +
'" target="_blank">巴黎婚纱</a>拍摄</span>\r\n\t\t<pre>巴黎婚纱，领导国际流行最前线的卓越名店，肆意挥洒世界时尚二十年</pre>\r\n\t\t<!-- <a href="weixin://profile/gh_204936aea56d">点击关注方倍工作室</a> -->\r\n\t\t<a href="javascript:void(0);" wechat="' +
((__t = (wechat)) == null ? '' : __t) +
'" class="wechat btn1">关注微信</a>';

}
return __p
};

this["JST"]["leaveMsg"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<form id="msg_form">\r\n\t<label for="msg">友人寄语</label>\r\n\t<textarea id="msg" name="msg"></textarea>\r\n\t<span class="validate"></span>\r\n\t<a href="javascript:void(0);" id="send" class="btn2 center">发送</a>\r\n</form>\r\n<a href="#content/' +
((__t = (id)) == null ? '' : __t) +
'" class="btn-back"></a>\r\n';

}
return __p
};

this["JST"]["messages"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="content-box fullwidth clearfix">\r\n\t<dl class="content-white clearfix">\r\n\t\t<dt class="message">\r\n\t\t\t<span>友人寄语</span>\r\n\t\t\t<a href="#msg/' +
((__t = (id )) == null ? '' : __t) +
'"></a>\r\n\t\t</dt>\r\n\t\t';

		_.each(messages, function(m){
		;
__p += '\r\n\t\t<dd class="message-info">\r\n\t\t\t<img src="' +
((__t = (m.photo )) == null ? '' : __t) +
'" width="80px" height="80px" />\r\n\t\t\t<span class="title">' +
((__t = (m.name )) == null ? '' : __t) +
'</span>\r\n\t\t\t<pre>' +
((__t = (m.content )) == null ? '' : __t) +
'</pre>\r\n\t\t</dd>\r\n\t\t';
 }); ;
__p += '\r\n\t</dl>\r\n\r\n\t<div class="footer">\r\n\r\n\t</div>\r\n</div>\r\n\r\n<a href="#content/' +
((__t = (id)) == null ? '' : __t) +
'" class="btn-back"></a>';

}
return __p
};

this["JST"]["photos"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


	var photosForDoms = photos.concat();
	var count = photosForDoms.length;
	var width = count * 70 + 62;
	var current = (currentIndex + count + 1) % count;
	var slice = (currentIndex + count - 1) % count;
	current = current === 0 ? count : current;
	photosForDoms = photosForDoms.slice(slice).concat(photosForDoms.slice(0, slice));
	// photosForDoms.unshift(photosForDoms.pop());
	
;
__p += '\r\n\t<ul class="photos-list">\r\n\t\t';
 _.each(photosForDoms, function(p, k){ ;
__p += '\r\n\t\t<li index="' +
((__t = (k )) == null ? '' : __t) +
'">\r\n\t\t\t<div class="photo-box">\r\n\t\t\t\t<img src="' +
((__t = (p.b )) == null ? '' : __t) +
'" alt="" />\r\n\t\t\t</div>\r\n\t\t</li>\r\n\t\t';
 }); ;
__p += '\r\n\t</ul>\r\n\t<div class="photos-bottom" id="photos_nav">\r\n\t\t<ul class="photos-nav" style="width: ' +
((__t = (width)) == null ? '' : __t) +
'px">\r\n\t\t\t';
 
				_.each(photos, function(photo, index){ 
					var className = index === currentIndex ? 'current' : '';
			;
__p += '\r\n\t\t\t<li class="' +
((__t = (className )) == null ? '' : __t) +
'">\r\n\t\t\t\t<a href="javascript:void(0)" to="#photos/' +
((__t = (id)) == null ? '' : __t) +
'/' +
((__t = (index)) == null ? '' : __t) +
'">\r\n\t\t\t\t\t<img src="' +
((__t = (photo.s )) == null ? '' : __t) +
'" alt="" width="60px" height="60px" />\r\n\t\t\t\t</a>\r\n\t\t\t</li>\r\n\t\t\t';
 }); ;
__p += '\r\n\t\t</ul>\r\n\t</div>\r\n\t<div class="photos-pageinfo">\r\n\t\t<span class="currentpage">第' +
((__t = (current )) == null ? '' : __t) +
'张</span>\r\n\t\t<span class="pagecount">共' +
((__t = (count )) == null ? '' : __t) +
'张</span>\r\n\t</div>\r\n\r\n\t<a href="#content/' +
((__t = (mainId)) == null ? '' : __t) +
'" class="btn-back"></a>';

}
return __p
};