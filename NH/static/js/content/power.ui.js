/**
 * 此文件的头部注释
 */

/*global jQuery: false */

(function ($) {
    'use strict';

    pe.ui = {};
    var $home = window.top.pe.home;
    var frameHistory = function (frameName) {
        this.frameName = frameName;
        this.records = [];
    };

    frameHistory.prototype = {
        frameName: '',
        add: function (url) {
            this.records.push(url);
        },
        back: function () {
            this.records.pop();
            var src = this.records.pop();
            window.top.$('iframe[data-historian=' + this.frameName + ']').prop('src', src);
        }
    };

    var history = function () {
        var ele;
        if (window.top.pe.ui.history) {
            ele = window.top.pe.ui.history;
        } else {
            window.top.pe.ui.history = ele = {};
        }

        this.records = ele;
    };

    history.prototype = {
        records: null,
        frame: function (name) {
            if (name in this.records) {
                return this.records[name];
            } else {
                var fh = new frameHistory(name);
                this.records[name] = fh;

                return fh;
            }
        }
    };

    pe.ui.historian = function () {
        return new history();
    };

    function bindNewTabLink() {
        $('body')
            .on('click',
                'a',
                function (e) {
                    var $this = $(this),
                        url = $this.prop('href');
                    if (url && ($this.is("[data-tabs-target='_blank']") || e.ctrlKey)) {
                        $home.tabs.addTab(url);
                        return false;
                    }

                    return true;
                });

    }

    $(function () {
        $(".btn.disabled")
            .click(function () {
                return false;
            });
        $('.history-back')
            .each(function (i, n) {
                var frame = $home.currentFrame(),
                    self = $(this);
                if (pe.ui.historian().frame(frame.attr('data-historian')).records.length < 1) {
                    self.addClass('disabled');
                    self.on('click', function (e) { return false; });
                } else {
                    self.on('click',
                        function (e) {
                            var $home = window.top.pe.home,
                                frame = $home.currentFrame();
                            pe.ui.historian().frame(frame.attr('data-historian')).back();

                            return false;
                        });
                }

            });

        bindNewTabLink();
    });

    $('.unselect').on('selectstart', function (e) { return false; }).attr('unselectable', 'on');

    $.each($('a[data-confirm]'),
        function () {
            var $this = $(this);
            var placement = 'bottom';
            if ($this.data('placement')) {
                placement = $this.data('placement');
            }
            var message = $this.attr('data-confirm');
            $this.confirmation({
                placement: placement,
                title: message,
                btnOkLabel: '确定',
                btnCancelLabel: '取消',
                popout: false,
                onConfirm: function (event, element) {
                    var href = $(element).attr('href');
                    if (href) {
                        window.location.href = href;
                    } else {
                        var confirm = $this.data("onConfirm");
                        if (confirm) {
                            confirm();
                        }
                    }

                }
            });
        });
}(jQuery));