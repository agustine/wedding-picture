iScroll.prototype.scrollToElementCenter = function (el, time, offset) {
    var that = this, pos, offsetLeft, offsetTop;
    var m = m || Math;
    offset = offset || {left: 0, top: 0}
    el = el.nodeType ? el : that.scroller.querySelector(el);
    if (!el) return;

    pos = that._offset(el);
    pos.left += that.wrapperOffsetLeft;
    pos.top += that.wrapperOffsetTop;
    offsetLeft = (that.wrapperW - el.offsetWidth) / 2;
    offsetTop = (that.wrapperH - el.offsetHeight) / 2;
    pos.left += offsetLeft + (offset.left || 0);
    pos.top += offsetTop + (offset.top || 0);

    pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
    pos.top = pos.top > that.minScrollY ? that.minScrollY : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
    time = time === undefined ? m.max(m.abs(pos.left) * 2, m.abs(pos.top) * 2) : time;

    that.scrollTo(pos.left, pos.top, time);
};

var MainData = Backbone.Model.extend({});
var PhotosData = Backbone.Model.extend({});
var BaseView = Backbone.View.extend({
    renderFooter: function () {
        this.$('.footer').html(window.JST.footer(this.model.attributes));
    },
    focusWechat: function (e) {
        var hint = $('.watch-hint');
        var hide = function () {
            hint.removeClass('show');
        };
        hint.addClass('show');
        setTimeout(hide, 3000);
    },
    initScroll: function () {
        var view = this;
        var timeout = null;
        var wrapperId = this.$el.attr('id');
        var init = function () {
            if ('ScrollerMain' in view) {
                view.ScrollerMain.refresh();
            } else {
                view.ScrollerMain = new iScroll(wrapperId, {
                    hScroll: false,
                    vScroll: true,
                    hScrollbar: false,
                    vScrollbar: false,
                    onBeforeScrollMove: function (e) {
                        e.preventDefault();
                    },
                    onScrollEnd: function () {
                    }
                });
            }
            timeout && clearTimeout(timeout);
        };
        setTimeout(init, 300);
    }
});
var CoverView = Backbone.View.extend({
    el: $('#view_cover'),
    template: window.JST.cover,
    initialize: function () {
        this.render();
    },
    // events: $YiChaMeiTu.navViewEvents,
    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }
});
var ContentView = BaseView.extend({
    el: $('#view_content'),
    template: window.JST.content,
    initialize: function () {
        this.render();
    },
    events: {
        'touchend #music_switch': 'musicSwitch',
        'touchend .wechat': 'focusWechat',
        // 'touchend .content-white dt': 'boxSwitch',
        'touchend video': 'videoSwitch',
        'touchstart .content-albums': 'startFlip',
        'touchend .content-albums': 'endFlip'
    },
    render: function () {
        var view = this;
        var next = function () {
            view.nextAlbum();
        };
        this.$el.html(this.template(this.model.attributes));
        this.$('.content-albums').html(window.JST.albums(this.model.attributes));
        this.$('.content-date').html(window.JST.contentDate(this.model.attributes));
        this.renderFooter();
        this.player = new AudioPlayer({
            musics: this.model.attributes.musics,
            auto: true
        });
        this.albumsTimeout = setInterval(next, 5000);
        // this.player.switch();
        this.initScroll();
        return this;
    },
    musicSwitch: function (e) {
        if (!this.player) {
            return this;
        }
        var $this = $(e.currentTarget);
        if (this.player.switch()) {
            $this.addClass('on');
        } else {
            $this.removeClass('on');
        }
        return this;
    },
    videoSwitch: function (e) {
        var video = e.currentTarget;
        alert(video.paused);
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
        return this;
    },
    boxSwitch: function (e) {
        if ($(e.target).is('a')) {
            return this;
        }
        var $dl = $(e.currentTarget).parent('dl.content-white');
        var className = 'close';
        if ($dl.hasClass(className)) {
            $dl.removeClass('close');
        } else {
            $dl.addClass('close');
        }
        this.initScroll();
        return this;
    },
    startFlip: function (e) {
        var view = this;
        var touch = e.originalEvent || e;
        var startX = touch.changedTouches[0].pageX;
        var $this = $(e.currentTarget);
        $this.bind('touchmove', function (e) {
            e.originalEvent = e.originalEvent || e;
            // e.preventDefault();

            touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

            if (touch.pageX - startX > 30) {
                $this.off('touchmove');
                view.prevAlbum();
            } else if (touch.pageX - startX < -30) {
                $this.off('touchmove');
                view.nextAlbum();
            }
        });
        return true;
    },
    endFlip: function (e) {
        $(e.currentTarget).off('touchmove');
    },
    prevAlbum: function () {
        var $box = $('.albums-box');
        var $index = $('.albums-index');
        var $lastAlbum = $box.find('li').last();
        var $firstDot = $index.find('li').first();
        $box.prepend($lastAlbum);
        $index.append($firstDot);
    },
    nextAlbum: function () {
        var $box = $('.albums-box');
        var $index = $('.albums-index');
        var $firstAlbums = $box.find('li').first();
        var $lastDot = $index.find('li').last();
        $box.append($firstAlbums);
        $index.prepend($lastDot);
    },
    refreshMessages: function () {

    }
});
var MessagesView = BaseView.extend({
    el: $('#view_messages'),
    template: window.JST.messages,
    initialize: function () {
        this.render();
    },
    events: {
        'touchend .wechat': 'focusWechat'
    },
    render: function () {
        this.weddingId = this.model.get('id');
        this.refreshMessages();

        return this;
    },
    refreshMessages: function () {
        var url = 'temp_data/messages.json';//'temp_data/messages.json?callback=?'
        var view = this;
        $.getJSON(url, {id: this.weddingId}, function (messages) {
            view.$el.html(view.template(messages));
            view.renderFooter();

            view.initScroll();
            // view.ScrollerMain = new iScroll('view_messages',{
            //   hScroll: false,
            //   vScroll: true,
            //   hScrollbar: false,
            //   vScrollbar: false,
            //   onBeforeScrollMove: function (e) { e.preventDefault(); },
            //   onScrollEnd: function(){
            //     // var thisScroller = this;
            //     // if (this.y === this.maxScrollY || this.scrollerH < this.wrapperH) {
            //     //   waterFallView.Waterfall.scrollLoad();
            //     // }
            //   }
            // });
        });
        return this;
    }
});
var MassageFormView = Backbone.View.extend({
    el: $('#view_leave_msg'),
    template: window.JST.leaveMsg,
    initialize: function () {
        this.render();
    },
    maxLength: 120,
    events: {
        'touchend #send': 'leaveMessage'
    },
    render: function () {
        var view = this;
        var polling;
        this.$el.html(this.template(this.model.attributes));

        polling = function () {
            view.validateContent();
        }

        this.timeout = setInterval(polling, 300);

        return this;
    },
    leaveMessage: function () {
        var contentLength = $.trim($('#msg').val()).length;
        var id = this.model.get('id');
        if (contentLength === 0 || contentLength > 120) {
            return false;
        }


        Backbone.history.navigate('#content/' + id, {trigger: true});
    },
    validateContent: function () {
        var max = this.maxLength;
        var stateWord = '最多可输入120个字符';
        var resultBox = this.$('.validate');
        var contentLength = $.trim($('#msg').val()).length;
        resultBox.removeClass('error');
        if (contentLength === 0) {
            stateWord = '请输入您的寄语...';
            resultBox.addClass('error');
        } else if (contentLength > max) {
            stateWord = '最多120个字符，您已超出了'
                + (contentLength - max).toString()
                + '个字符！';
            resultBox.addClass('error');
        } else {
            stateWord = '还可以输入'
                + (max - contentLength).toString()
                + '个字符。';
        }
        resultBox.html(stateWord);
        return true;
    },
    clear: function () {
        $('#msg_form').get(0).reset();
    }
});
var PhotosView = Backbone.View.extend({
    el: $('#view_photos'),
    template: window.JST.photos,
    dataUrl: function () {
        var compiled = _.template('temp_data/photos<%=id%>.json');
        return compiled(this.model.attributes);
    },
    initialize: function () {
        this.render();
    },
    events: {
        'touchstart .photos-list': 'startFlip',
        'touchend .photos-list': 'endFlip',
        'touchend .photos-nav a': 'doFlip'
    },
    startFlip: function (e) {
        var view = this;
        var touch = e.originalEvent || e;
        var startX = touch.changedTouches[0].pageX;
        var $this = $(e.currentTarget);
        $this.bind('touchmove', function (e) {
            e.originalEvent = e.originalEvent || e;
            e.preventDefault();

            touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

            if (touch.pageX - startX > 30) {
                $this.off('touchmove');
                Backbone.history.navigate(view.getPrevUrl(), {trigger: true});
            } else if (touch.pageX - startX < -30) {
                $this.off('touchmove');
                Backbone.history.navigate(view.getNextUrl(), {trigger: true});
            }
        });
        return true;
    },
    endFlip: function (e) {
        $(e.currentTarget).off('touchmove');
        this.showNav();
    },
    doFlip: function (e) {
        var $this = $(e.currentTarget);
        Backbone.history.navigate($this.attr('to'), {trigger: true});
    },
    getNextUrl: function () {
        var $navItems = this.$('.photos-nav li');
        var itemCount = $navItems.length;
        var currentIndex = (this.model.get('currentIndex') + 1) % itemCount;
        return '#photos/' + this.model.get('id') + '/' + currentIndex;
    },
    getPrevUrl: function () {
        var $navItems = this.$('.photos-nav li');
        var itemCount = $navItems.length;
        var currentIndex = (this.model.get('currentIndex') + itemCount - 1) % itemCount;
        return '#photos/' + this.model.get('id') + '/' + currentIndex;
    },
    setPage: function () {
        var $currentPage = this.$('.currentpage');
        var $navItems = this.$('.photos-nav li');
        var itemCount = $navItems.length;
        var currentIndex = this.model.get('currentIndex') % itemCount;
        var currentItem = $navItems.get(currentIndex);
        $currentPage.html('第' + (currentIndex + 1) + '张');
        $navItems.removeClass('current');
        $(currentItem).addClass('current');
        this.scrollerNav.scrollToElementCenter(currentItem, 300, {left: 30});
        return this;
    },
    prev: function () {
        var $box = $('.photos-list');
        var $lastPhoto = $box.find('li').last();
        $box.prepend($lastPhoto);
    },
    next: function () {
        var $box = $('.photos-list');
        var $firstPhoto = $box.find('li').first();
        $box.append($firstPhoto);
    },
    gotoPhoto: function (options) {
        var view = this;
        var $navItems = this.$('.photos-nav li');
        var itemCount = $navItems.length;
        var sameId = options.id === this.model.get('id');
        var sameIndex = options.currentIndex === this.model.get('currentIndex');
        var steps = (options.currentIndex - this.model.get('currentIndex')) % itemCount;
        var absSteps = Math.abs(steps);
        var stepFunction;
        this.model.set(options);
        if (!sameId) {
            this.render();
            return this;
        }
        if (sameIndex) {
            return this;
        }
        if ((itemCount - absSteps) < absSteps) {
            steps = ((absSteps / steps) * -1) * (itemCount - absSteps);
            absSteps = Math.abs(steps);
        }
        stepFunction = steps > 0 ? this.next : this.prev;
        _(Math.abs(absSteps)).times(function (n) {
            stepFunction();
        });

        this.setPage();
    },
    showNav: function () {
        if (this.navTimeout) {
            clearTimeout(this.navTimeout);
        }
        var view = this;
        var hidden;
        this.$el.removeClass('hidden');
        hidden = function () {
            view.$el.addClass('hidden');
        }
        this.navTimeout = setTimeout(hidden, 3000);
    },
    render: function () {
        var view = this;
        $.getJSON(this.dataUrl(), function (photos) {
            photos.currentIndex = view.model.get('currentIndex');
            view.$el.html(view.template(photos));
            view.showNav();
            view.scrollerNav = new iScroll('photos_nav', {
                hScroll: true,
                vScroll: false,
                hScrollbar: false,
                vScrollbar: false,
                onBeforeScrollMove: function (e) {
                    e.preventDefault();
                },
                onScrollEnd: function () {
                }
            });

        });

        return this;
    }
});

$(function () {
    $Wedding = {};
    var appRouter = Backbone.Router.extend({

        routes: {
            'cover/:id': 'cover',
            'content/:id': 'content',
            'photos/:id/:index': 'photos',
            'msgs/:id': 'messages',
            'msg/:id': 'msg'
        },

        getData: function () {
            if (!('mainData' in $Wedding)) {
                $Wedding.mainData = new MainData(pageData);
                $('title').html(pageData.title);
            }
        },

        cover: function (id) {
            if (!('cavorView' in $Wedding)) {
                this.getData();
                $Wedding.cavorView = new CoverView({model: $Wedding.mainData});
            }
            showView('cover');
        },

        content: function (id) {
            if (!('contentView' in $Wedding)) {
                this.getData();
                $Wedding.contentView = new ContentView({model: $Wedding.mainData});
            } else {
                $Wedding.contentView.refreshMessages();
            }
            showView('content');
            $Wedding.contentView.initScroll();
        },

        messages: function (id) {
            if (!('msgsView' in $Wedding)) {
                this.getData();
                $Wedding.msgsView = new MessagesView({model: $Wedding.mainData});
            } else {
                $Wedding.msgsView.refreshMessages();
            }
            showView('messages');
            $Wedding.msgsView.initScroll();
        },

        msg: function (id) {
            if (!('msgFormView' in $Wedding)) {
                this.getData();
                $Wedding.msgFormView = new MassageFormView({model: $Wedding.mainData});
            } else {
                $Wedding.msgFormView.clear();
            }
            showView('leave_msg');
        },

        photos: function (id, index) {
            var photosData, currentId;
            index = parseInt(index) || 0;
            if ('photosView' in $Wedding) {
                $Wedding.photosView.gotoPhoto({'id': id, 'currentIndex': index});
            } else {
                photosData = new PhotosData({'id': id, 'currentIndex': index});
                $Wedding.photosView = new PhotosView({model: photosData});
            }
            showView('photos');
        }

    });
    $Wedding.routes = new appRouter();
    Backbone.history.start();

    $('.watch-hint').on('touchend', function () {
        $(this).removeClass('show');
    });
});