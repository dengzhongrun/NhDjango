var second = 0;
window.setInterval(function () {
    second++;
}, 1000);

var browser = checkBrowser();
var logged = false;

(function () {
    // analytics(null, null, null, null);
    addClickEvent();
})();


window.onunload = function () {
    if (!logged) {
        analytics(null, null, null, null);
    }
};

window.onbeforeunload = function () {
    if (browser == 'FF') {
        if (!logged) {
            analytics(null, null, null, null);
        }
    }
};


function analytics(url, title, referer, clickEvent) {
    var params = {};
    //Document对象数据
    if (document) {
        // params.domain = document.domain || '';
        params.url = document.URL || '';
        params.title = document.title || '';
        params.referer = document.referrer || '';
        params.sourceCookie = document.cookie || '';
        var reg = /_hdud=.*?;|_hdud=.*?$/;
        params.sourceCookie = params.sourceCookie.match(reg) || '';
        if (params.sourceCookie != '') {
            params.sourceCookie += ";";
        }
    }
    //Window对象数据
    if (window && window.screen) {
        params.sh = window.screen.height || 0;
        params.sw = window.screen.width || 0;
        params.cd = window.screen.colorDepth || 0;
    }
    //navigator对象数据
    if (navigator) {
        params.lang = navigator.language || '';
        params.ua = navigator.userAgent || '';
    }
    //解析_maq配置
    if (window._maq) {
        for (var i in _maq) {
            switch (_maq[i][0]) {
                case '_setAccount':
                    params.sitecode = _maq[i][1];
                    break;
                case 'search':
                    params.search = _maq[i][1];
                    break;
                case 'searchWord':
                    params.searchWord = _maq[i][1];
                    break;
                default:
                    break;
            }
        }
    }
    if (url != null) {
        params.url = url;
    }
    if (title != null) {
        params.title = title;
    }
    if (referer != null) {
        params.referer = referer;
    }
    if (clickEvent != null) {
        params.clickEvent = clickEvent;
    }

    params.second = second;

    //拼接参数串
    var args = '';
    for (var i in params) {
        if (args != '') {
            args += '&';
        }
        args += i + '=' + encodeURIComponent(params[i]);
    }

    //通过Image对象请求后端脚本
    var img = new Image(1, 1);
    img.src = 'http://fx.tj.beijing.gov.cn/1.gif?' + args;
}


function addClickEvent() {
    var aList = document.getElementsByTagName("a");
    for (var i = 0; i < aList.length; i++) {
        var a = aList[i];
        addEvent(a, 'click', (function (url, title, referer) {
            return function () {
                if (!logged) {
                    analytics(null, null, null, null);
                    logged = true;
                }
                analytics(url, title, referer, 1);
            }
        })(a.href, a.innerHTML.trim(), document.URL));
    }
}


function addEvent(target, type, handler) {
    if (target.addEventListener) {
        target.addEventListener(type, handler, false);
    } else {
        target.attachEvent('on' + type, handler)
    }
}

function checkBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1
        && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1
        && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1
        && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return "IE7";
        } else if (fIEVersion == 8) {
            return "IE8";
        } else if (fIEVersion == 9) {
            return "IE9";
        } else if (fIEVersion == 10) {
            return "IE10";
        } else if (fIEVersion == 11) {
            return "IE11";
        } else {
            return "0";
        }//IE版本过低
        return "IE";
    }
    if (isOpera) {
        return "Opera";
    }
    if (isEdge) {
        return "Edge";
    }
    if (isFF) {
        return "FF";
    }
    if (isSafari) {
        return "Safari";
    }
    if (isChrome) {
        return "Chrome";
    }

}

