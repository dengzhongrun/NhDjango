(function () {
    //function isMobile() {
    //    var mobile = {
    //        Android: function () {
    //            return navigator.userAgent.match(/Android/i) ? true : false;
    //        },
    //        BlackBerry: function () {
    //            return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    //        },
    //        iOS: function () {
    //            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    //        },
    //        Windows: function () {
    //            return navigator.userAgent.match(/IEMobile/i) ? true : false;
    //        },
    //        any: function () {
    //            return (this.Android() || this.BlackBerry() || this.iOS() || this.Windows());
    //        }
    //    };
    //    return mobile.any();
    //}

    //function createVideo(swfPath, src, width, height) {
    //    return '<object type="application/x-shockwave-flash" name="powerPlayback" data="' +
    //        swfPath +
    //        '" width="' +
    //        width +
    //        '" height="' +
    //        height +
    //        '" id="powerPlayback" style="visibility: visible;">' +
    //        '<param name="allowFullScreen" value="true">' +
    //        '<param name="wmode" value="opaque">' +
    //        '<param name="flashvars" value="src=' +
    //        src +
    //        '&amp;autoPlay=false&amp;title=2013&amp;breakPoint=0&amp;preroll=&amp;prerollSite=&amp;bannerImageUrl=&amp;bannerUrl=&amp;scaleMode=letterBox&amp;controlBarAutoHide=false&amp;streamType=liveOrRecorded&amp;javascriptCallbackFunction=onJavaScriptBridgeCreated">' +
    //        '</object>';
    //}

    //function createWmvVideo(src, width, height) {
    //    return '<object classid="clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6" id="WindowsMediaPlayer" ' +
    //        'width="' +
    //        width +
    //        '" ' +
    //        'height="' +
    //        height +
    //        '">' +
    //        '<param name="URL" value="' +
    //        src +
    //        '">' +
    //        '</object>';
    //}

    //function createIeTooltip(width, height) {
    //    return '<div style="width:' +
    //        width +
    //        'px; height:' +
    //        height +
    //        'px; background-color:#000;">' +
    //        '<p style="width: ' +
    //        width +
    //        'px;height: ' +
    //        height +
    //        'px;line-height:' +
    //        height +
    //        'px; color:#fff; text-align:center;">请使用IE浏览器查看该视频</p></div>';
    //}

    //function isIe() {
    //    //判断是否是IE浏览器。
    //    return !!window.ActiveXObject || 'ActiveXObject' in window;
    //}

    //function isWmv(src) {
    //    //判断是否是 .wmv
    //    return src.toLocaleLowerCase().indexOf('.wmv') > 0;
    //}

    //function isAudio(src) {
    //    var srcs = src.split('.');
    //    var name = srcs[srcs.length - 1].toLowerCase();
    //    return name === 'wav' || name === 'mp3'
    //}

    //function isSwf(src) {
    //    //判断是否是 .swf
    //    return src.indexOf('.swf') > 0;
    //}

    //$(function () {
    //    var videoSites = [
    //        'player.youku.com', 'i7.imgs.letv.com', 'static.youku.com', 'share.vrs.sohu.com', 'player.ku6.com',
    //        'player.pps.tv', 'static.video.qq.com', 'share.vrs.sohu.com', 'qzonestyle.gtimg.cn'
    //    ];

    //    function embedUrl(url) {
    //        if (!isSwf(url)) {
    //            return false;
    //        }

    //        var uri = url.replace(/\w+:\/\//gi, ''),
    //            result = false;

    //        $.each(videoSites,
    //            function (i, n) {
    //                if (uri.startsWith(n)) {
    //                    result = true;
    //                    return false;
    //                }
    //            });

    //        return result;
    //    }

    //    if (!isMobile()) {
    //        //视频播放功能JS。
    //        $("video.edui-upload-video")
    //            .each(function () {
    //                var $this = $(this),
    //                    width = $this.attr('width'),
    //                    height = $this.attr('height'),
    //                    src = $this.prop('src'),
    //                    swfPath = "/Content/_Common/Base/swf/PowerPlayback.swf",
    //                    video = '';
    //                if (isIe() && isWmv(src)) {
    //                    video = createWmvVideo(src, width, height);
    //                } else if (!isIe() && isWmv(src)) {
    //                    video = createIeTooltip(width, height);
    //                } else {
    //                    video = createVideo(swfPath, src, width, height);
    //                }

    //                if (embedUrl(src)) {
    //                    $this.replaceWith(
    //                        $(
    //                            "<embed allowScriptAccess='always' allowFullScreen='true' mode='transparent' type='application/x-shockwave-flash'></embed>")
    //                            .attr('width', width)
    //                            .attr('height', height).attr('src', src));
    //                } else {
    //                    $this.replaceWith($(video));
    //                }
    //            });

    //        $("embed")
    //            .each(function () {
    //                var $this = $(this),
    //                    width = $this.attr('width'),
    //                    height = $this.attr('height'),
    //                    src = $this.prop('src'),
    //                    swfPath = "/Content/_Common/Base/swf/PowerPlayback.swf",
    //                    video = '';

    //                if (isAudio(src)) {
    //                    return;
    //                }
    //                if (isIe() && isWmv(src)) {
    //                    video = createWmvVideo(src, width, height);
    //                } else if (!isIe() && isWmv(src)) {
    //                    video = createIeTooltip(width, height);
    //                } else {
    //                    video = createVideo(swfPath, src, width, height);
    //                }

    //                if (!isSwf(src)) {
    //                    $this.replaceWith($(video));
    //                }
    //            }
    //            );
    //    } else {
    //        $("video.edui-upload-video").show();
    //    }
    //});

    //$(function () {
    //    var powerplaybacks = $("div[data-power-ui='powerplayback']");
    //    if (powerplaybacks.length > 0) {
    //        $.getScript('/Content/_Common/Assets/Scripts/swfobject.js')
    //            .done(function () {
    //                powerplaybacks.each(function () {
    //                    var src = $(this).attr('data-url');
    //                    var title = $(this).attr('data-title');
    //                    var height = $(this).attr('data-height');
    //                    var width = $(this).attr('data-width');
    //                    var autoPlay = $(this).attr('data-autoPlay');
    //                    var random = parseInt(Math.random() * (99999 - 10000 + 1) + 10000);
    //                    var id = 'PowerPlay' + random;
    //                    $(this).attr('id', id);
    //                    var parameters =
    //                        {
    //                            src: src,
    //                            autoPlay: autoPlay,
    //                            title: title,
    //                            controlBarAutoHide: "false",
    //                            scaleMode: "liveOrRecorded"
    //                        };
    //                    swfobject.embedSWF("/Content/_Common/Base/swf/PowerPlayback.swf",
    //                        id,
    //                        width,
    //                        height,
    //                        "10.1.0",
    //                        {},
    //                        parameters,
    //                        { allowFullScreen: "true", wmode: "opaque" },
    //                        { name: "powerPlayback" }
    //                    );
    //                });
    //            });
    //    }
    //});

    /**
* 刷新__RequestVerificationToken。
*/
    function refreshCsrf() {
        $.ajax({
            url: '/Ajax/AjaxPartial',
            type: 'post',
            async: false,
            data: {
                partialViewName: "表单防伪标记"
            },
            success: function (response) {
                var $ajaxcsrf = $("#ajaxcsrf");
                if (!$ajaxcsrf.length > 0) {
                    var div = "<div id='ajaxcsrf'></div>";
                    $(document.body).append(div);
                }
                $("#ajaxcsrf").html(response.html);
                var csrfprvvalue = $('#ajaxcsrf input[name="__RequestVerificationToken"]').val();
                $('input[name="__RequestVerificationToken"]')
                    .not($('form:not(.forcerefreshcsrf) input[name="__RequestVerificationToken"]'))
                    .each(function () {
                        var $this = $(this);
                        $this.val(csrfprvvalue);
                    });
            }
        });
    }

    refreshCsrf();

    $(function () {
        var videoAll = $("body").find('.edui-upload-video');
        var videoDiv = $('[data-ui="video"]');
        var embedAll = $("body").find('embed[class="edui-faked-video"]');
        var videoEdui = $("body").find('.edui-faked-video');
        if (videoAll.length > 0 || videoDiv.length > 0 || embedAll.length > 0 || videoEdui.length > 0) {
            // 加载ckplayer.js文件
            var ckTag = '<script></script>';
            var domCk = $.parseHTML(ckTag);
            $(domCk).attr('src', '/Content/_Common/Assets/ckplayer/ckplayer.js');
            $(domCk).on('load',
                function () {
                }).appendTo($('body'));

            if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8.") {
                // IE8下加载swfobject.js文件
                var swfObjectTag = '<script></script>';
                var domSwfObject = $.parseHTML(swfObjectTag);
                $(domSwfObject).attr('src', '/Content/_Common/Assets/Scripts/swfobject.js');
                $(domSwfObject).on('load',
                    function () {
                    }).appendTo($('body'));
            }

            // 加载视频播放.js文件
            var scriptTag = '<script></script>';
            var dom = $.parseHTML(scriptTag);
            $(dom).attr('src', '/Content/_Common/Base/js/power.videoreversion.js');
            $(dom).on('load',
                function () {
                }).appendTo($('body'));
        }
    });

    //广告。
    $(function () {
        /**
         * 广告漂浮版位。
         */
        function advertisementFloat(floatPositions) {
            //var floatPositions = $("div[data-power-ui='advertisement_float']");
            $.each(floatPositions,
                function () {
                    var floatposition = $(this);
                    var width = floatposition.data().width; //版位宽度
                    var height = floatposition.data().height; //版位高度

                    //计算关闭按钮的位置
                    var close = floatposition.children('.close');
                    switch (floatposition.data().closeButtonPosition) {
                        case 'UpperRight':
                            close.css('left', width - 20);
                            break;
                        case 'LowerRight':
                            close.css('left', width - 20).css('top', height - 20);
                            break;
                        case 'NoShow':
                            close.hide();
                            break;
                    }

                    //定时关闭版位
                    var time = floatposition.data().stopTime;
                    if (time > 0) {
                        setTimeout(function () {
                            floatposition.hide();
                        },
                            time * 1000);
                    }
                });

            return floatPositions;
        }

        var floatPositionsInfo = $("div[data-power-ui='advertisement_float']");
        var floatPositions = advertisementFloat(floatPositionsInfo);
        floatPositions.each(function () {
            var floatPosition = $(this);
            //计算版位的坐标
            var ypos = positionCoordinate($(this));
            //广告随滚动条滚动
            if (floatPosition.data().enableScroll.toLowerCase() === 'true') {
                floatPosition.css('top', $(this).scrollTop() + ypos);
                $(window)
                    .scroll(function () {
                        floatPosition.css('top', $(this).scrollTop() + ypos);
                    });
            }
        });

        //浏览器窗口大小改变时
        window.onresize = function () {
            var floatPositionsInfo = $("div[data-power-ui='advertisement_float']");
            var floatPositions = advertisementFloat(floatPositionsInfo);
            floatPositions.each(function () {
                var floatPosition = $(this);
                //计算版位的坐标
                var ypos = positionCoordinate($(this));
                //广告随滚动条滚动
                if (floatPosition.data().enableScroll.toLowerCase() === 'true') {
                    $(window)
                        .scroll(function () {
                            floatPosition.css('top', $(this).scrollTop() + ypos);
                        });
                }
            });
        };

        //计算版位的坐标
        function positionCoordinate(floatPosition) {
            var xpos = 0;
            var ypos = 0;
            var width = floatPosition.data().width; //版位宽度
            var height = floatPosition.data().height; //版位高度
            var availWidth = document.documentElement.clientWidth; //浏览器窗口可见宽度
            var availHeight = document.documentElement.clientHeight; //浏览器窗口可见高度
            var verticalMargin = floatPosition.data().verticalMargin / 100;
            var horizontalMargin = floatPosition.data().horizontalMargin / 100;
            switch (floatPosition.data().datumMark) {
                case 'UpperLeft':
                    xpos = availWidth * verticalMargin;
                    xpos = xpos === availWidth ? xpos - width : xpos;
                    ypos = availHeight * horizontalMargin;
                    ypos = ypos === availHeight ? ypos - height : ypos;
                    break;
                case 'LowerRight':
                    xpos = (availWidth - width) - (availWidth * verticalMargin);
                    xpos = xpos < 0 ? 0 : xpos;
                    ypos = (availHeight - height) - (availHeight * horizontalMargin);
                    ypos = ypos < 0 ? 0 : ypos;
                    break;
                case 'Middle':
                    var halfWidth = availWidth / 2;
                    var halfheight = availHeight / 2;
                    xpos = halfWidth + (halfWidth * verticalMargin);
                    xpos = xpos === availWidth ? xpos - width : xpos;
                    ypos = halfheight + (halfheight * horizontalMargin);
                    ypos = ypos === height ? ypos - height : ypos;
                    break;
            }
            floatPosition.css('z-index', 99).css('left', xpos);
            return ypos;
        }

        /**
         * 广告固定板块。
         */
        function advertisementSiblings(element, fixed) {
            var $element = $(element),
                index = Number($element.text()) - 1;
            fixed.find('.fixedCount a').removeClass('seld');
            $element.addClass('seld');
            fixed.find('.fixedCount a')[index].className = 'seld';
            fixed.find('.fixedPosition > a')
                .eq(index)
                .fadeIn(300)
                .siblings()
                .fadeOut(300);
        }

        function showAuto(fixedLength, fixedNumLinkList, fixed) {
            var fixedCount = fixed.find('.fixedCount').data().count;
            fixedCount = fixedCount >= (fixedLength - 1) ? 0 : ++fixedCount;
            fixed.find('.fixedCount').data().count = fixedCount;
            advertisementSiblings(fixedNumLinkList.eq(fixedCount), fixed);
        }

        var $fixedList = $("div[data-power-ui='advertisement_fixed']");
        $.each($fixedList,
            function () {
                var fixed = $(this);
                var $fixedNumLinkList = fixed.find('.fixedCount a');
                var fixedLength = $fixedNumLinkList.length;
                $(this).on('click',
                    '.fixedCount a',
                    function () {
                        advertisementSiblings($(this), fixed);
                    });

                var fixedtime = setInterval(function () { showAuto(fixedLength, $fixedNumLinkList, fixed); }, 2000);
                fixed.hover(function () { clearInterval(fixedtime) },
                    function () {
                        fixedtime = setInterval(function () {
                            showAuto(fixedLength, $fixedNumLinkList, fixed);
                        },
                            2000);
                    });
            });

    });

    // Ajax调用分部视图。
    $(function () {
        function getFunction(code, argNames) {
            var fn = window,
                parts = (code || "").split(".");

            while (fn && parts.length) {
                fn = fn[parts.shift()];
            }

            if (typeof (fn) === "function") {
                return fn;
            }

            argNames.push(code);
            return Function.constructor.apply(null, argNames);
        }

        function loadData($data, pageid) {
            var url = $data.ajaxUrl;
            if (pageid) {
                url = url + '?pageid=' + pageid;
            }
            $.ajax({
                url: url,
                type: $data.ajaxMethod,
                cache: !!$data.ajaxCache,
                data: {
                    partialViewName: $data.ajaxPartialViewName,
                    parameters: JSON.stringify($data.ajaxParameter),
                    cacheMinutes: $data.ajaxCacheminutes,
                    moduleName: $data.ajaxAreaname
                },
                beforeSend: function (xhr) {
                    getFunction($data.ajaxBegin, ["xhr"]).apply(null, arguments);
                },
                complete: function () {
                    getFunction($data.ajaxComplete, ["xhr", "status"]).apply(null, arguments);
                },
                success: function (response, status, xhr) {
                    var fn = window,
                        parts = ($data.ajaxSuccess || "").split(".");
                    while (fn && parts.length) {
                        fn = fn[parts.shift()];
                    }
                    if (typeof (fn) === "function") {
                        getFunction($data.ajaxSuccess, ["response", "status", "xhr"]).apply(null, arguments);
                    } else {
                        if (response.page) {
                            $data.ajaxDataCount = response.page.DataCount;
                            $data.ajaxPageIndex = response.page.PageIndex;
                            $data.ajaxPageSize = response.page.PageSize;
                            $data.ajaxPagingUrl = response.page.PagingUrl;
                        }

                        $('[data-ajax-data="' + $data.ajaxId + '"]')
                            .each(function () {
                                $(this).trigger('ajaxControlHandler', [response, $data]);
                            });

                        var mode = ($data.ajaxMode || "").toUpperCase();
                        $($data.ajaxUpdate)
                            .each(function (i, update) {
                                var top;
                                switch (mode) {
                                    case "BEFORE":
                                        top = update.firstChild;
                                        $("<div />")
                                            .html(response.html)
                                            .contents()
                                            .each(function () {
                                                update.insertBefore(this, top);
                                            });
                                        break;
                                    case "AFTER":
                                        $("<div />")
                                            .html(response.html)
                                            .contents()
                                            .each(function () {
                                                update.appendChild(this);
                                            });
                                        break;
                                    case "REPLACE-WITH":
                                        $(update).replaceWith(response.html);
                                        break;
                                    default:
                                        $(update).html(response.html);
                                        break;
                                }
                            });
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                    getFunction($data.ajaxFailure, ["xhr", "status", "error"]).apply(null, arguments);
                }
            });
        }

        // ajaxpartial 初始化
        $('[data-ui-type="ajaxpartial"]')
            .each(function () {
                var $data = $(this).data();
                $data.ajaxLoadData = loadData;
                loadData($data);
            });

        // ajaxbutton 初始化
        function ajaxButtonControlHandler(response, $data) {
            $('[data-ajax-data="' + $data.ajaxId + '"]')
                .each(function () {
                    if (response.page.PageIndex >= response.page.PageCount) {
                        $(this).hide();
                    }
                });
        }

        $('[data-ui-type="ajaxbutton"]')
            .each(function () {
                var $this = $(this);

                function getData(element) {
                    var id = $(element).data().ajaxData;
                    var input = $('#' + id);
                    var $data = input.data();
                    var pageid = 1;
                    if ($data.ajaxPageIndex) {
                        pageid = $data.ajaxPageIndex + 1;
                    }
                    $data.ajaxLoadData($data, pageid);
                }

                $this.on('ajaxControlHandler',
                    function (event, response, $data) {
                        ajaxButtonControlHandler(response, $data);
                    });

                $this.on('click',
                    function () {
                        getData(this);
                    });
            });
    });

    //编辑器内的表格在前台展示时滚动条的显示
    $(function () {
        var $content = $('[data-power-area="content"]');
        var contentwidth = $content.width();
        var tables = $content.find('table');
        if (contentwidth != null && $content.data().powerScrolltable !== false) {

            tables.wrap('<div class="ueditortable"></div>');
            $(".ueditortable").css("width", contentwidth);
            var ueditortables = $(".ueditortable");
            $.each(ueditortables,
                function () {
                    var table = $(this).find("table")[0];
                    if (table.clientWidth > contentwidth && table.clientHeight > contentwidth) {
                        $(this).css("height", contentwidth);
                    }
                });

            $(".ueditortable").hover(function () {
                var tablewidth = $(this).find("table")[0].offsetWidth;
                if (parseInt(tablewidth) > contentwidth && !$(this).hasClass("tablemask")) {
                    $(this)
                        .prepend(
                            '<p class="expandtable"><a id="fullScreen" title="全屏" href="javascript:;"><i class="fa fa-expand"></i></a></p>');
                }
            },
                function () {
                    $(this).find(".expandtable").remove();
                });

            var $this = $(".ueditortable");
            $(".ueditortable").on("click",
                ".expandtable",
                function () {
                    $this = $(this).parent();
                    fullscreenState();
                });

            $("body").on("click",
                ".compresstable",
                function () {
                    $this = $(this).parent();
                    fullscreenState();
                });

            $("body").on("click",
                ".newwindowtable",
                function () {
                    var b = window.open('');
                    var html = $(".newueditortable").find("table").css("text-align", " center")[0].outerHTML;
                    $(b.document.body).html(html + "<style>td { border: solid;}</style>");
                });

            document.onkeydown = function (ev) {
                var oEvent = ev || event;
                if (oEvent.keyCode == 27) {
                    if ($(".newueditortable").length > 0) {
                        fullscreenState();
                    }
                }
            };
        }

        function fullscreenState() {
            if ($("div").hasClass("tablemask")) {
                $(".tablemask").remove();
                $(".newueditortable").remove();
            } else {
                $("body").prepend('<div class="tablemask"></div>');
                $this.find(".expandtable").remove();
                $("body").append(
                    '<div class="newueditortable">' +
                    $this.html() +
                    '</div>');

                tablemargins();
                $(".newueditortable").hover(function () {
                    $(this)
                        .prepend(
                            '<div class="newclass"><p class="newwindowtable"><a href="javascript:;">打开新窗口表单</a></p><p class="compresstable"><a title="退出全屏" href="javascript:;"><i class="fa fa-compress"></i>&nbsp;退出全屏</a></p></div>');
                    $(".newclass").css("left", $(window).width() / 2.4);
                },
                    function () {
                        $(this).find(".newclass").remove();
                    });

                $(window).resize(function () {
                    tablemargins();
                });
            }
        }

        function tablemargins() {
            if ($this.find("table").width() > ($(window).width() / 1.1)) {
                $(".newueditortable").css("width", $(window).width() / 1.1);
            } else {
                $(".newueditortable").css("width", "");
            }

            $(".newueditortable").css("left", ($(window).width() - $(".newueditortable").outerWidth()) / 2);
            $(".newclass").css("left", $(window).width() / 2.4);
            if ($this.find("table").height() > $(window).height() / 1.2) {
                $(".newueditortable").css("height", $(window).height() / 1.2);
            } else {
                $(".newueditortable").css("height", "");
            }
        }
    });

    /**
     * 渲染二维码
     * @param {JQuery} $element 要渲染为二维码的jQuery实体。
     */
    function renderQrcode($element) {
        var content = $element.data('content'),
            size = $element.data('size');
        if (!content) {
            content = window.location.href;
        }
        content = encodeURI(content);
        new QRCode($element.get(0),
            {
                text: content,
                width: size,
                height: size
            });

        //qrcode.makeCode();
    }

    $('[data-powertype="qrcode"]').each(function (i, n) {
        renderQrcode($(n));
    });

    updateContentHits();
    updateNodeHits();
    updateSubjectCategoryHits();

    /**
     * 更新内容的点击数。
     * @returns {}
     */
    function updateContentHits() {
        // 如果请求url中存在VisualizationToken参数，说明当前是可视化编辑，不应该添加点击数。
        if (window.location.href.indexOf('VisualizationToken=') >= 0) {
            $('[data-power-hits-action]').each(function () {
                var $element = $(this);
                var count = $element.data().powerHitsCount;
                $element.text(count);
            });
            return false;
        }

        $('[data-power-hits-action]').each(function () {
            var $element = $(this);
            var mold = $element.data().powerHitsMold,
                id = $element.data().powerHitsId;
            var isShowHit = $element.data().powerHitsOpen;

            $.postPreventCSRF($element.data().powerHitsAction,
                { "mold": mold, "id": id, "isShowHit": isShowHit },
                function (data) {
                    $element.text(data.hits);
                });
        });
    }

    /**
     * 更新信息公开目录点击数。暂时不调用此方法还没写完。
     * */
    function updateSubjectCategoryHits() {
        // 如果请求url中存在VisualizationToken参数，说明当前是可视化编辑，不应该添加点击数。
        if (window.location.href.indexOf('VisualizationToken=') >= 0) {
            return false;
        }

        $('[data-power-subjecthits-action]').each(function () {
            var $element = $(this);
            var subjectId = $element.data().powerSubjecthitsSubjectcategoryid;
            $.postPreventCSRF($element.data().powerSubjecthitsAction, { "subjectId": subjectId }, function () { });
        });
    }

    /**
     * 更新节点的点击数。
     * @param {any} url
     */
    function updateNodeHits() {
        // 如果请求url中存在VisualizationToken参数，说明当前是可视化编辑，不应该添加点击数。
        if (window.location.href.indexOf('VisualizationToken=') >= 0) {
            return false;
        }

        $('[data-power-nodehits-action]').each(function () {
            var $element = $(this);
            var nodeId = $element.data().powerNodehitsNodeid;
            $.postPreventCSRF($element.data().powerNodehitsAction, { "nodeId": nodeId }, function () { });
        });
    }

    //点击外链询问离开
    /**
     * 获取Host
     * @param {string} url 地址。
     */
    function getHost(url) {
        var host = "null";

        if (typeof url == "undefined" || null == url) {
            url = window.location.href;
        }

        //HTMLHyperlinkElementUtils.host 使用API来获取。
        var anchor = document.createElement("a");
        anchor.href = url;
        if (anchor.hostname) {
            return anchor.hostname;
        }

        var regex = /.*\:\/\/([^\/]*).*/;
        var match = url.match(regex);
        if (typeof match != "undefined" && null != match) {
            host = match[1];
        }
        return host;
    }

    /**
     * 点击外链询问离开
     * @param {this对象} _this this对象。
     * @param {string} type 类型"aLink"为a链接，"select"为select下拉。
     */
    function isExcelLink(_this, type) {
        var o = $(_this);
        var href = "";
        var target = "";
        var siteName = $("meta[name ='application-name']").attr("content");
        if (type == "aLink") {
            href = o.attr('href');
            target = o.attr('target');
        } else if (type == "select" && !!$('option:selected', o).attr('value')) {
            href = o.val();
        } else {
            return false;
        }
        var linkHost = getHost(href);

        //设置白名单，excelLinkWhiteList是全局变量，如有需要请写到基础布局页里面。例excelLinkWhiteList = ["www.***.com"]
        if (typeof (excelLinkWhiteList) == "undefined") {
            excelLinkWhiteList = [];
        }
        if (typeof (href) != 'undefined' &&
            linkHost != 'null' &&
            $.inArray(linkHost, excelLinkWhiteList) < 0 &&
            location.hostname.replace("www.", "") != linkHost.replace("www.", "").split(":")[0]) {
            o.removeAttr('href');
            var w = '480px';
            var h = 'auto';
            if (window.screen.width < 768) {
                w = '90%';
                h = 'auto';
            }
            if (typeof layer === 'undefined') {
                $('body').prepend('<script src="/Content/_Common/Base/js/layer/layer.js"></script>');
            }

            //离开站点提示，对应3个值（枚举：开启OnShow；仅政府网站不提示OnlyGovNoShow；关闭NoShow）。
            var LeaveSitePrompts = $.cookie('PowerLeaveSitePrompts');

            //属于开启和提示情况
            if (LeaveSitePrompts == 'OnShow' || (LeaveSitePrompts == 'OnlyGovNoShow' && !IsOnlyGovNoShow(href))) {
                var cf = layer.confirm(
                    '<div style="margin-top:20px; font-size:16px;">您访问的链接即将离开“' + siteName + '”门户网站，</br>是否继续？</div>',
                    {
                        btn: ['继续访问', '放弃'],
                        title: false,
                        shade: 0.7,
                        area: [w, h],
                        shadeClose: true,
                        end: function () {
                            if (type == "aLink") {
                                o.attr('href', href);
                            }
                        }
                    },
                    function () {
                        if (type == "aLink") {
                            o.attr('href', href);
                        }
                        layer.close(cf);
                        window.open(href, target);
                    },
                    function () {
                        if (type == "aLink") {
                            o.attr('href', href);
                        }
                        layer.close(cf);
                    });
            } else if (LeaveSitePrompts == 'OnlyGovNoShow' && IsOnlyGovNoShow(href)) {
                if (type == "aLink") {
                    o.attr('href', href);
                } else {
                    window.open(href, target);
                }
            } else if (LeaveSitePrompts == 'NoShow') {
                if (type == "aLink") {
                    o.attr('href', href);
                } else {
                    window.open(href, target);
                }
            }
        } else if (type == "select") {
            window.open(href, target);
        }
    }

    //判断链接是不是包含gov.cn
    function IsOnlyGovNoShow(url) {
        if (url.indexOf('gov.cn') > -1) {
            return true;
        } else {
            return false;
        }

    }

    $(document).on('click',
        'a:not("[data-power-noExcelLinks] a,[data-power-noExcelLink]")',
        function () {
            isExcelLink(this, "aLink");
        });
    $(document).on('change',
        '[data-power-select-ExcelLink]',
        function () {
            isExcelLink(this, "select");
        });

    $(function () {
        // 替换成分钟数如果为60分钟则为 60 * 60 *1000 。
        var expire = new Date();
        expire.setTime(expire.getTime() + (15 * 60 * 1000));

        // 判断外链提示Cookie是否存在，不存在就去获取，默认时间15分钟。
        if ($.cookie("PowerLeaveSitePrompts") == null) {
            $.ajax({
                url: "/Settings/LeaveSitePrompts/GetLeaveSitePrompts",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    $.cookie('PowerLeaveSitePrompts',
                        data.PowerLeaveSitePrompts,
                        {
                            path: '/', // cookie的作用域。  
                            expires: expire
                        });
                }
            });
        }
    });

    $(function () {
        if ($("[data-uitype ='pdf']").length > 0) {
            //动态加载pdf.js
            var pdfscript = '<script></script>';
            var dompdf = $.parseHTML(pdfscript);
            $(dompdf).attr('src', '/Content/_Common/Assets/Scripts/pdf.js');
            $(dompdf).on('load',
                function () {
                }).appendTo($('body'));
        }

        //遍历所有pdf类型标签
        $("[data-uitype ='pdf']")
            .each(function () {
                var url = $(this).attr("data-powerurl"); //获取当前pdf文件路径
                var ran = Math.floor(Math.random() * 100); //生成随机数
                $(this).removeAttr("src");
                $(this)[0].insertAdjacentHTML("afterEnd",
                    "<div class='pdf-content'><canvas id='the-canvas" +
                    ran +
                    "'></canvas></div><div class='pdf-page'><button id='prev" +
                    ran +
                    "'>上一页</button><span class='page-num'>页码: " +
                    "<span id='page_num" +
                    ran +
                    "'></span><em>/</em><span id='page_count" +
                    ran +
                    "'></span></span><button id='next" +
                    ran +
                    "'>下一页</button>" +
                    "<a class='pdf-download' href='javascript:void(0);' pdf-href=" +
                    url +
                    "  style='text-decoration: none'>下载文件</a></div>");

                if (url != null) {
                    var version = 10.0;
                    var ua = navigator.userAgent.toLowerCase();
                    var isiE = ua.indexOf("msie") > -1;
                    var safariVersion;

                    if (isiE) {
                        safariVersion = ua.match(/msie ([\d.]+)/)[1];
                        if (safariVersion <= version) {
                            if (confirm("当前IE浏览器版本过低，无法直接查看PDF请点击链接，下载文件到本地查看。")) {
                                window.location.href = url;
                            }
                        };
                    }

                    pdfjsLib.GlobalWorkerOptions.workerSrc = '/Content/_Common/Assets/Scripts/pdf.worker.js'; //加载js
                    var pdfDoc = null,
                        pageNum = 1,
                        pageRendering = false,
                        pageNumPending = null,
                        canvas = document.getElementById('the-canvas' + ran),
                        ctx = canvas.getContext('2d');

                    function renderPage(num) {
                        pageRendering = true;
                        var scale = 1;
                        pdfDoc.getPage(num).then(function (page) {
                            var viewport = page.getViewport(scale);
                            var widthOld = viewport.width;
                            canvas.width = $("[data-power-area='content']").width();
                            scale = canvas.width / viewport.width;
                            viewport = page.getViewport(scale);
                            canvas.height = viewport.height;

                            if (widthOld > $(window).width() && canvas.width > $(window).width()) {
                                scale = 1;
                                viewport = page.getViewport(scale);
                                canvas.width = $(window).width();
                                canvas.height = viewport.height;
                                scale = canvas.width / viewport.width;
                                viewport = page.getViewport(scale);
                            }

                            var renderContext = {
                                canvasContext: ctx,
                                viewport: viewport
                            };
                            var renderTask = page.render(renderContext);
                            renderTask.promise.then(function () {
                                pageRendering = false;
                                if (pageNumPending !== null) {
                                    renderPage(pageNumPending);
                                    pageNumPending = null;
                                }
                            });
                        });
                        document.getElementById('page_num' + ran).textContent = num;
                    }

                    function queueRenderPage(num) {
                        if (pageRendering) {
                            pageNumPending = num;
                        } else {
                            renderPage(num);
                        }
                    }

                    function onPrevPage() {
                        if (pageNum <= 1) {
                            return;
                        }
                        pageNum--;
                        queueRenderPage(pageNum);
                    }

                    document.getElementById('prev' + ran).addEventListener('click', onPrevPage);

                    function onNextPage() {
                        if (pageNum >= pdfDoc.numPages) {
                            return;
                        }
                        pageNum++;
                        queueRenderPage(pageNum);
                    }

                    document.getElementById('next' + ran).addEventListener('click', onNextPage);
                    pdfjsLib.getDocument({
                        url: url,
                        rangeChunkSize: 65536 * 10000,
                        disableAutoFetch: 0,
                        cMapUrl: 'https://unpkg.com/pdfjs-dist@2.0.943/cmaps/',
                        cMapPacked: true
                    }).then(
                        function (pdfDoc_) {
                            pdfDoc = pdfDoc_;
                            document.getElementById('page_count' + ran).textContent = pdfDoc.numPages;
                            renderPage(pageNum);
                        });
                }
            });

        $('.pdf-page .pdf-download').on('click', function () {
            var getFileName = function (url) {
                var pos = url.lastIndexOf("\/");
                var pos2 = url.lastIndexOf(".");
                if (pos2 <= -1) {
                    pos2 = url.length;
                }
                strFileName = url.substring(pos + 1, pos2);
                return strFileName;
            }

            var url = $(this).attr("pdf-href");
            // IE浏览器
            if ((window.ActiveXObject) || (navigator.userAgent.indexOf("Trident") > -1)) {
                var xhr = new XMLHttpRequest();
                xhr.open('get', url, true);
                xhr.responseType = "blob"; // 返回类型blob
                xhr.onload = function () {
                    // 请求完成
                    if (this.status === 200) {
                        // 返回200
                        var blob = this.response;
                        window.navigator.msSaveBlob(blob, getFileName(url) + '.pdf');
                    }
                }
                // 发送请求
                xhr.send();
            } else {
                var downloadElement = document.createElement('a');
                downloadElement.href = url;
                downloadElement.download = getFileName(url) + '.pdf'; //下载后文件名
                document.body.appendChild(downloadElement);
                downloadElement.click(); //点击下载
                document.body.removeChild(downloadElement); //下载完成移除元素
            }
        });
    });

    /**
    * 设置智能标签跳转点击事件。
    */
    $(function () {
        $(".smart-tags a").on("click",
            function () {
                var url = $(this).data("searchurl");
                window.location.href = url;
            });
    });

    /**
    * 添加表单action添加字段submit。
    */
    $(function () {
        $("form").each(function () {
            var url = $(this).attr("action");
            if (url && getUrlParam(url, "submit") == null) {
                $(this).attr("action", changeUrlParam(url, 'submit', 'true'));
            }
        });

        function changeUrlParam(url, arg, value) {
            var pattern = arg + '=([^&]*)';
            var replaceText = arg + '=' + value;
            if (url.match(pattern)) {
                var tmp = '/(' + arg + '=)([^&]*)/gi';
                tmp = url.replace(eval(tmp), replaceText);
                return tmp;
            } else {
                if (url.match('[\?]')) {
                    return url + '&' + replaceText;
                } else {
                    return url + '?' + replaceText;
                }
            }
        }

        function getUrlParam(url, name) {
            var reg = new RegExp('(^|&)' + name + "=([^&]*)(&|$)");
            var results = url.match(reg);
            if (!results) {
                return null;
            }
            if (!results[1]) {
                return '';
            }
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }
    });

}());