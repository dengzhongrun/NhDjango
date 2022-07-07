var loadPersonData = function (url) {
    pfs.comm.redirectPage(url, {}, '_blank');
}

var loadSchoolNews = function (limit, type) {

    $.ajax({
        data: {

            limit: limit,
            page: 1,
            type: type,
            orgcode: '0000'
        },
        url: path + '/webmagic/getLatestInfo',
        dataType: 'json',
        success: function (response) {

            var datas = response.data;
            if (datas && datas.length > 0) {
                for (var i = 0, len = datas.length; i < len; i++) {

                    var data = datas[i];
                    var bt = data.TITLE;
                    var len1 = bt.length;
                    if (len1 > 20) {

                        bt = bt.substring(0, 20);
                        bt += "......";
                    }

                    if (type == '1') {
                        bt = "<strong>校园新闻|</strong>" + bt;
                    } else if (type == '9') {
                        bt = "<strong>媒体扬大|</strong>" + bt;
                    } else if (type == '10') {
                        bt = "<strong>学术活动|</strong>" + bt;
                    } else if (type == '12') {
                        bt = "<strong>学校要闻|</strong>" + bt;
                    } else {
                        bt = "<strong>信息公告|</strong>" + bt;
                    }

                    var div_content = '<li>' +
                        '<span>' +
                        '<a target="_blank" href="' + data.URL + '">' +
                        bt +
                        '</a>' +
                        '</span><span class="pull-right gray">' +
                        data.TIME +
                        '</span>' +
                        '</li>';
                    $('#content7_detail').prepend(div_content);
                }

            }

        },
        error: function (response) {

        }
    });

}

var loadDeptNews = function () {

    $.ajax({
        data: {

            limit: 8,
            page: 1,
            type: '2',
            orgcode: pfs.comm.org.ID
        },
        url: path + '/webmagic/getLatestInfo',
        dataType: 'json',
        success: function (response) {

            var datas = response.data;
            var deptUrl = '';
            if (datas && datas.length > 0) {

                $('#part2').empty();
                for (var i = 0, len = datas.length; i < len; i++) {

                    var data = datas[i];
                    var bt = data.TITLE;
                    var len1 = bt.length;
                    if (len1 > 25) {

                        bt = bt.substring(0, 25);
                        bt += "......";
                    }

                    var url = data.URL
                    deptUrl = url.substring(0, url.indexOf(".cn")) + '.cn';

                    var div_content = '<div class="new_list">'
                        + '<div class="col-lg-10 col-md-10 col-sm-10 col-xs-10 no-padding-left">'
                        + '<a target="_blank" href="' + data.URL + '">' + bt + '</a>'
                        + '</div>'
                        + '<div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 no-padding-left text-center">'
                        + data.TIME
                        + '</div>'
                        + '</div>';

                    $('#part2').append(div_content);
                }

                var more_div = '<div>' + '<a href="' + deptUrl + '" target="_blank" class="more">更多...</a>' + '</div>';
                $('#part2').append(more_div);
            }
        },
        error: function (response) {

        }
    });

}


var getMyAffairsCount = function () {
    $.ajax({
        data: {},
        type: 'POST',
        url: path + '/hallIndex/getMyAffairsCount',
        dataType: 'json',
        success: function (response) {

            if (response.success) {
                $('#myAffairsCount').empty();
                $('#myAffairsCount').text(response.myAffairsCount);
                if (response.myAffairsCount == '0') {
                    $('#myAffairsCount').hide();
                }
//	    	var icon_src = path + '/resources/style/pc/images/index/icon_item.png';
//			var myAffairs_str = '<img src="' + icon_src + '" alt="">';
//
//			if(response.myAffairsCount=="0"){
//
//			}else{
//				myAffairs_str += '<span class="count">'+response.myAffairsCount+'</span>';
//			}
//			$('#myAffairsCount').append(myAffairs_str);

            }
        }
    });
}


var getMyOACount = function () {//跨域请求？


    /*  $.ajax({
          type: "get",
          url: "http://oa.cqie.edu.cn/sys/notify/sys_notify_todo/sysNotifyTodo.do?method=sumTodoCount",
          dataType: "jsonp",
          success: function(response) {


              $('#myOACount').empty();
              $("#response").val(JSON.stringify(response)); }
      });*/

    /* $.ajax({
         url : path+'/newHallIndex/getMyOACount',
         type : "get",
         dataType : "json",
         success : function (response) {


             if(response.success){
                 $('#myOACount').empty();
                 $('#myOACount').text(response.myAffairsCount);

             }

         },error:function (response) {
             alert("查询错误");
         }
     })*/


}

var getMyApplyCount = function () {
    $.ajax({
        data: {},
        type: 'POST',
        url: path + '/hallIndex/getMyApplyCount',
        dataType: 'json',
        success: function (response) {

            if (response.success) {
                $('#myApplyCount').empty();
                $('#myApplyCount').text(response.myApplyCount);
                if (response.myApplyCount == '0') {
                    $('#myApplyCount').hide();
                }
            }
        },

    });
}

var getMyOACount = function () {


    $.ajax({
        data: {},
        type: 'GET',
        url: '/newHallIndex/queryNum',
        dataType: 'json',
        success: function (response) {


            $('#myOACount').empty();
            $('#myOACount').text(response);
            if (response == '0') {
                $('#myOACount').hide();
            }

        },

    });
}

var getMyQQEmailCount = function () {
    $.ajax({
        data: {},
        type: 'POST',
        url: path + '/ssoQQEmail/getMyQQEmailCount',
        dataType: 'json',
        success: function (response) {

            if (response.success) {
                $('#myQQEmailCount').empty();
                var myEmailCount_str = response.myQQEmailCount
                $('#myQQEmailCount').append(myEmailCount_str);
                if (myEmailCount_str == '0') {
                    $('#myQQEmailCount').hide();
                }
            } else {
                $('#myQQEmailCount').empty();
                $('#myQQEmailCount').append('0');
                $('#myQQEmailCount').hide();
            }
        }
    });
}

var loadP = function () {
    pfs.comm.redirectPage(pfs.comm.uaaapBasePath + "cas/login?service=" + encodeURI(pfs.comm.uaaapBasePath + "mng/acp/zhzx/viewMainPage"), {}, '_blank');
}

// 欢迎信息
var helloInfo = function () {


    $("#personIcon").attr("src", pfs.comm.uaaapBasePath + "mng/" + pfs.comm.photo + "&checkLogin=false");

    var myDate = new Date();
    var hour = myDate.getHours();
    var a_p_m = '晚上好';
    if (hour < 11) {

        a_p_m = '上午好';
    } else if (11 <= hour && hour < 13) {

        a_p_m = '中午好';
    } else if (13 <= hour && hour < 18) {

        a_p_m = '下午好';
    }
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var week = '';
    switch (myDate.getDay()) {

        case 1:
            week = "星期一";
            break;
        case 2:
            week = "星期二";
            break;
        case 3:
            week = "星期三";
            break;
        case 4:
            week = "星期四";
            break;
        case 5:
            week = "星期五";
            break;
        case 6:
            week = "星期六";
            break;
        default:
            week = "星期日";
    }

    $("#week_p").text(week);
    $("#date_p").text(year + "-" + month + "-" + day);

    $("#a_p_m").html("  " + a_p_m);


    //$("#login_name").html(pfs.comm.user.NAME);
    var cw = '';
    if (($.inArray('jzg', pfs.comm.groupList) > -1)) {


        cw = '老师';
    } else if (($.inArray('bks', pfs.comm.groupList) > -1)
        || ($.inArray('yjs', pfs.comm.groupList) > -1) || ($.inArray('bss', pfs.comm.groupList) > -1)) {

        cw = '同学';
    }
    $("#login_id").html(pfs.comm.user.NAME + "&nbsp;&nbsp;<span style='font-size:12px;font-weight: 100;'>" + cw + "</span><br/><p style='margin-top:5px;font-size:12px;font-weight: 100;'>" + a_p_m + "!&nbsp;&nbsp;</p>");
    $("#cw").html("  " + cw + " ");
    var today = new Date();
    var firstDay = new Date(today.getFullYear(), 0, 1);
    var dayOfWeek = firstDay.getDay();
    var spendDay = 1;
    if (dayOfWeek != 0) {
        spendDay = 7 - dayOfWeek + 1;
    }
    firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);
    var d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000);
    var result = Math.ceil(d / 7);
    result = result + 1;

    var personData = '<p>本年度第<span class="week_no">' + result + '</span>周</p>';

    $('#personData').empty().append(personData);

}
var getOaNEWS = function () {

}


//加载新闻信息
// var getNewsInfo = function(div_id, type, orgcode,more){
var getNewsInfo = function () {
    $.ajax({
        data: {

            // limit : 8,
            // page : 1,
            type: "1",
            // orgcode : orgcode
        },
        url: path + '/GetNewsController/upload',
        // url : path+'/webmagic/getLatestInfo',
        dataType: 'json',
        success: function (response) {

            var datas = response.data;
            if (datas && datas.length > 0) {

                $('#' + div_id).empty();

                var ulStart = '<ul>';
                var ulEnd = '</ul>';
                var li = '';
                for (var i = 0, len = datas.length; i < len; i++) {

                    var data = datas[i];
                    var bt = data.TITLE;
                    var len1 = bt.length;
                    if (len1 > 55) {

                        bt = bt.substring(0, 55);
                        bt += "......";
                    }
                    var liTmp = '<li>'
                        + '<span>'
                        + '<a target = "_blank" href ="' + data.URL + '">' + bt + '</a>'
                        + '</span>'
                        + '<span class="pull-right gray">' + data.TIME + '</span>'
                        + '</li>'

                    li += liTmp;
                }

                var div_content = ulStart + li + ulEnd;

                $('#' + div_id).append(div_content);

                /*var more_div = '<a href="'+more+'" target="_blank" class="more">查看更多...</a>'*/

                //$('#' + div_id).append(more_div);
            }
        },
        error: function (response) {

        }
    });

}


var busCurrentPage = 1;
var NewAppCurrentPage = 1;
var setPageNum = function (add, type) {
    var currentPage = 1;

    if (type == 'busCurrentPage') {

        currentPage = busCurrentPage + add;
        if (currentPage <= 0) {
            currentPage = 1;
        }
        busCurrentPage = currentPage;
        pfs.comm.queryApp(
            {
                limit: 15,
                page: busCurrentPage,
                TYPE: 5,
                STATUS: 1,
                USERGROUP: '' + pfs.comm.groupList,
                USERORG: pfs.comm.org ? pfs.comm.org.ID + '' : '',
                ORDERBY: "RANK",
                FWFS: '2'
            }, function (datas) {
                loadBussinessSystem("BussinessSystem", datas, busCurrentPage, 'busCurrentPage');
            });


    } else {

        currentPage = NewAppCurrentPage + add;
        if (currentPage <= 0) {
            currentPage = 1;
        }
        NewAppCurrentPage = currentPage;

        pfs.comm.queryApp(
            {
                limit: 6,
                STATUS: 1,
                page: NewAppCurrentPage,
                TYPE: 2,
                USERGROUP: '' + pfs.comm.groupList,
                USERORG: pfs.comm.org ? pfs.comm.org.ID + '' : '',
                ORDERBY: "zxyy",
                FWFS: '2'
            }, function (datas) {
                loadNewApps("newApps", datas, NewAppCurrentPage, 'NewAppCurrentPage');
            });
    }
}

var showAppDetail = function (appid) {

    APPID = appid;
    pfs.comm.redirectPage("hallIndex/showAppDetail", {'appid': appid});

}

var loadPage = function (url) {
    var openWindow = window.open('javascript:window.name;', '<script>location.replace("' + url + '")<\/script>');
}

//加载业务系统导航;最新发布
var loadBussinessSystem = function (divid, datas, currPage, type) {

    var innerHtml = ""
    var data = datas.data;
    if (data) {

        var totalPage = datas.totalPage;
        $("#" + divid).empty();
        $.each(data, function (i, item) {
            var icon = path + '/resources/style/pc/images/index/sjztx.png';
            if (item.ICONS) {
                icon = path + 'webFileRoot' + item.ICONS;
            }

            /*var innerHtmlTmp = /!*'<span onclick = "loadPage(\''+ item.URL+ '\')">'*!/
                '<span>'
                +'<a style="color:#000;text-decoration: none;" href="'+item.URL+'" rel="noreferrer" target = "_blank">'
                +'<img src="'+icon+'" alt="">'
                +'<p class="pxx">'+item.NAME+'</p>'
                + '</a>'
                +'</span>';*/


            var innerHtmlTmp = /*'<span onclick = "loadPage(\''+ item.URL+ '\')">'*/
                '<span>'
                + '<a style="color:#000;text-decoration: none;height: 80px;" href="' + item.URL + '" rel="noreferrer" target = "_blank">'
                /*+'<img src="'+icon+'" alt="">'*/
                + '<div style="background-image:url(' + icon + ');" class="loadbackIcon"></div>'
                + '<p class="pxx" style="margin-top: 5px;">' + item.NAME + '</p>'
                + '</a>'
                + '</span>';


            innerHtml += innerHtmlTmp;
        });

        var pageLeft = '';
        var pageRight = '';

        // if(currPage==1&&currPage==totalPage){
        //     pageLeft =  '<a>'
        //         +'<img id="img-left" src="'+path+'resources/style/pc/images/index/right_new_dark.png" class="go_more_hot right_new" width="10px" alt="">'
        //         +'</a>';
        //
        //     pageRight = '<a>'
        //         +'<img id="img-right" src="'+path+'resources/style/pc/images/index/left_new_dark.png" class="go_more_hot" width="10px" alt="">'
        //         +'</a>';
        //
        // }else if(currPage==1&&currPage<totalPage){
        //     pageLeft =  '<a href="javascript:void(0)" onclick = "setPageNum(1,\''+type+'\')">'
        //         +'<img id="img-left" src="'+path+'resources/style/pc/images/index/right_new.png" class="go_more_hot right_new" width="10px" alt="">'
        //         +'</a>';
        //
        //     pageRight = '<a >'
        //         +'<img id="img-right" src="'+path+'resources/style/pc/images/index/left_new_dark.png" class="go_more_hot" width="10px" alt="">'
        //         +'</a>';
        //
        // }else if(currPage>=2&&currPage==totalPage){
        //     pageLeft =  '<a >'
        //         +'<img id="img-left" src="'+path+'resources/style/pc/images/index/right_new_dark.png" class="go_more_hot right_new" width="10px" alt="">'
        //         +'</a>';
        //
        //     pageRight = '<a href="javascript:void(0)" onclick = "setPageNum(-1,\''+type+'\')">'
        //         +'<img id="img-right" src="'+path+'resources/style/pc/images/index/left_new.png" class="go_more_hot" width="10px" alt="">'
        //         +'</a>';
        //
        // }else if(currPage>=2&&currPage<totalPage){
        //     pageLeft =  '<a href="javascript:void(0)" onclick = "setPageNum(1,\''+type+'\')">'
        //         +'<img id="img-left" src="'+path+'resources/style/pc/images/index/right_new.png" class="go_more_hot right_new" width="10px" alt="">'
        //         +'</a>';
        //
        //     pageRight = '<a href="javascript:void(0)" onclick = "setPageNum(-1,\''+type+'\')">'
        //         +'<img id="img-right" src="'+path+'resources/style/pc/images/index/left_new.png" class="go_more_hot" width="10px" alt="">'
        //         +'</a>';
        //
        // }


        innerHtml += pageLeft + pageRight;

        $("#" + divid).append(innerHtml);
    }

}


//加载最新发布
var loadNewApps = function (divid, datas, currPage, type) {

    var innerHtml = ""
    var data = datas.data;
    if (data) {

        var totalPage = datas.totalPage;
        $("#" + divid).empty();
        $.each(data, function (i, item) {
            if (i > 10) {
                return false;
            }
            var icon = path + '/resources/style/pc/images/index/sjztx.png';
            if (item.ICONS) {
                icon = path + 'webFileRoot' + item.ICONS;
            }
            ///<img src="'+icon+'" alt="">
            var innerHtmlTmp = '<span onclick = "showAppDetail(\'' + item.ID + '\')">'
                + '<div style="background-image:url(' + icon + ');" class="loadbackIcon"></div>'
                + '<p>' + item.NAME + '</p>'
                + '</span>';

            innerHtml += innerHtmlTmp;
        });
        $("#" + divid).append(innerHtml);
    }

}

var loadUrl = function (url) {
    window.open(url);
}
//20200508感觉这里有问题 比如 $("#glkzt").append(innerHtml)也不是根据isright这个字段进行判断获取的，导致管理控制端 ：一站式服务大厅，身份认证中心，数据总线只能同时出现，还有ISRIGHT在循环外进行判断就只能根据最后一条数据赋值
/*var loadGlkzt = function(datas){

    var innerHtml = '';
    var ISRIGHT = 0;
    if(datas){
        $("#glkzt").empty();

        $.each(datas,function(i, item) {


            ISRIGHT = item.ISRIGHT;
            var icon = path  + 'resources/style/pc/images/index/yzsfwht.png';
            if(item.ICONS){
                icon = path + 'webFileRoot' + item.ICONS;
            }
            var p =(item.NAME.length>8)? '<p>'+item.NAME+'</p>':'<p style="margin-top: 12px !important;">'+item.NAME+'</p>';

            var innerHtmlTmp = '<span>'+
                '<a style="color:#000;text-decoration: none;" href="'+ item.URL+'" rel="noreferrer" target="_blank">'+
                '<div style="background-image:url('+icon+');" class="loadbackIcon"></div>'+
                '<p class="pxx">'+item.NAME+'</p></a>'+
                '</span>';

            innerHtml += innerHtmlTmp;

        });
        $("#glkzt").append(innerHtml);

        if(ISRIGHT>0){
            $("#glkztparent").removeClass("hide");
        }
    }
}*/

var loadGlkzt = function (datas) {

    var innerHtml = '';
    var ISRIGHT = 0;
    if (datas) {
        $("#glkzt").empty();

        $.each(datas, function (i, item) {


            ISRIGHT = item.ISRIGHT;
            if (ISRIGHT > 0) {
                var icon = path + 'resources/style/pc/images/index/yzsfwht.png';
                if (item.ICONS) {
                    icon = path + 'webFileRoot' + item.ICONS;
                }
                var p = (item.NAME.length > 8) ? '<p>' + item.NAME + '</p>' : '<p style="margin-top: 12px !important;">' + item.NAME + '</p>';

                var innerHtmlTmp = '<span>' +
                    '<a style="color:#000;text-decoration: none;" href="' + item.URL + '" rel="noreferrer" target="_blank">' +
                    '<div style="background-image:url(' + icon + ');" class="loadbackIcon"></div>' +
                    '<p class="pxx">' + item.NAME + '</p></a>' +
                    '</span>';

                innerHtml += innerHtmlTmp;

                $("#glkztparent").removeClass("hide");
            }
        });
        $("#glkzt").append(innerHtml);


    }
}

var loadTools = function (type) {
    var data = {ISTOOL: type};
    pfs.comm.redirectPage('hallIndex/viewAllApps?appType=myApp', data, '_blank')
}

var loadMyApp = function (datas, divid, type) {

    var innerHtml = '';
    if (datas) {
        $("#" + divid).empty();

        $.each(datas, function (i, item) {


            if (i > 10) {
                return false;
            }
            var icon = path + '/portal/apps/homepage/img/icon/bddt.png';
            if (item.ICONS) {
                icon = path + 'webFileRoot' + item.ICONS;
            }
            ///<img src="'+icon+'" alt="">

            var innerHtmlTmp = '<span onclick = "pfs.comm.openAppByAuthority(\'' + item.ID + '\',\'' + item.ISLOGIN + '\')">'
                /*
                                +'<a style="color:#000;text-decoration: none;height: 80px;" href="'+item.URL+'" rel="noreferrer" target = "_blank">'
                */

                + '<div style=" float:left;background-image:url(' + icon + ');" class="loadbackIcon">' +
                '</div>'
                + '<div style="float:right">'
                + '<p>' + item.NAME + '</p>'
                + '<div class="scstar" data="' + item.SCORE + '" id = "star' + i + '"></div>'
                + '</div>'
                + '</span>';

            innerHtml += innerHtmlTmp;
        });

        /*  $.each(datas,function(i, item) {


              var icon = path  + '/portal/apps/homepage/img/icon/bddt.png';
              if(item.ICONS){
                  icon = path + 'webFileRoot' + item.ICONS;
              }

              var p =(item.NAME.length>8)? '<p>'+item.NAME+'</p>':'<p style="margin-top: 12px !important;">'+item.NAME+'</p>';

              var innerHtmlTmp = '<div class="control_content" onclick = "showAppDetail(\''+ item.ID+ '\')">'
                  +'<div class="col-sm-4 no-padding-left no-padding-right">'
                  +'<img src="'+icon+'" class="imginer" alt="">'
                  +'</div>'
                  +'<div class="col-sm-8">'
                  +p
                  +'<div>'
                  +'<span onclick = "showAppDetail(\''+ item.ID+ '\')">'
                 /!* +'<img src="'+path+'resources/style/pc/images/index/xq.png" alt=""> 详情'*!/
                  +'</span>'
                  /!*+'<span>'
                  +'<img src="'+path+'resources/style/pc/images/index/user.png" alt=""> '+ item.USED_NUM
                  +'</span>'*!/
                  +'</div>'
                  +'</div>'
                  +'</div>';

              innerHtml += innerHtmlTmp;

          });*/
        $("#" + divid).append(innerHtml);
        star();
    }


    /* var moreDiv = '<div class="control_content text-center" style="padding-left: 0 !important; padding-top: 12px !important;" onclick="loadTools(\''+type+'\')">'
         +'<img src="'+path+'resources/style/pc/images/index/add.png" alt="">';
     +'</div>';
     $("#"+divid).append(moreDiv);*/
}
var star = function () {
    //多加一个div 避免下面循环最后一个未设置样式
    $("#newApps").append("<div class='scstar'></div>");
    $(".scstar").each(function (i) {
        layui.use('rate', function () {

            var rate = layui.rate;
            //渲染
            var el = "#star" + i;
            var ins1 = rate.render({
                elem: el  //绑定元素
                , text: true
                , readonly: true
                , half: true
                , length: 5
                , value: $("#star" + i).attr("data")
                , setText: function (value) {
                    this.span.html("<span style='color:#ff8e46;margin: 0 !important;width: 40px !important;height: 25px !important;border: 0;margin-right:0px'>" + $("#star" + i).attr("data") +
                        "<p style='color:#b2a6a6;margin-top:0px !important;display:inline'>分</p></span>");
                    $("span.layui-inline").attr("style", "width:0 !important;height:25px !important;border:0 !important;float: right;color: #cacdd1;text-align:right;margin:0;padding:0");
                }
            });
        });
    })
}

var pageshow = function () {

    $("#bs").val("yes");


    $("#notice_news_list1").simpleTable({

        params: {

            limit: 8,
            page: 1,
            //type:type
        },


        //关于表格的参数
        colNames: [/*'ID','序号',*/'名称', '发布时间'],
        colModel: [
            /*{'index':'ID', 'width':'11%','id':'ID'},*/
            /*{'index':'index_num', 'width':'15%'},*/
            {
                'index': 'docSubject',
                'name': 'docSubject',
                'width': '77%',
                'viewtype': 'link',
                'attrs': {'href': "url", 'id': 'docSubject', 'title': 'url', 'target': '_blank'}
            },
            {'index': 'docPublishTime', 'width': '20%'}


        ],
        pageIndex: '',
        pageSize: '',


    }, '', '/newHallIndex/querys/xxfw');


    $("#notice_news_list2").simpleTable({

        params: {

            limit: 8,
            page: 1,
            //type:type
        },


        //关于表格的参数
        colNames: [/*'ID','序号',*/'名称', '发布时间'],
        colModel: [
            /*{'index':'ID', 'width':'11%','id':'ID'},*/
            /*{'index':'index_num', 'width':'15%'},*/
            {
                'index': 'docSubject',
                'name': 'docSubject',
                'width': '77%',
                'viewtype': 'link',
                'attrs': {'href': "url", 'id': 'docSubject', 'title': 'url', 'target': '_blank'}
            },
            {'index': 'docPublishTime', 'width': '20%'}


        ],
        pageIndex: '',
        pageSize: '',


    }, '', '/newHallIndex/querys/xxtz');

    $("#notice_news_list3").simpleTable({

        params: {

            limit: 8,
            page: 1,
            //type:type
        },


        //关于表格的参数
        colNames: [/*'ID','序号',*/'名称', '发布时间'],
        colModel: [
            /*{'index':'ID', 'width':'11%','id':'ID'},*/
            /*{'index':'index_num', 'width':'15%'},*/
            {
                'index': 'docSubject',
                'name': 'docSubject',
                'width': '77%',
                'viewtype': 'link',
                'attrs': {'href': "url", 'id': 'docSubject', 'title': 'url', 'target': '_blank'}
            },
            {'index': 'docPublishTime', 'width': '20%'}


        ],
        pageIndex: '',
        pageSize: '',


    }, '', '/newHallIndex/querys/xxgg');


}
var initRmtj = function () {
    $.ajax({
        data: {limit: 10, page: 1},
        url: path + '/hallIndex/getRmtj',
        dataType: 'json',
        success: function (response) {
            $("#rmtj").empty();
            if (response && response.length > 0) {
                var len = response.length;
                if (len > 5) {
                    len = 5;
                }
                var li = "";
                for (var i = 0; i < len; i++) {
                    li += '<li style="cursor:pointer;" onclick="showAppDetail(\'' + response[i].ID + '\')">' +
                        '<span>' + response[i].NAME + '</span>' +
                        '</li>';
                }
                $("#rmtj").append(li);
                $("#floatTools").removeClass("hide");
            }
        },
        error: function (response) {
            $("#floatTools").addClass("hide");
        }
    });

}

var closeShow = function () {

    $.ajax({
        data: {},
        url: path + '/hallIndex/saveNotShow',
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                $(".container-table").addClass("hide");
            }
        },
        error: function (response) {

        }
    });
}


var initTel = function () {
    $.ajax({
        data: {},
        url: path + '/hallIndex/getUserTel',
        dataType: 'json',
        success: function (response) {
            if (response.success) {

                if (response.isShow) {
                    if (response.empty) {

                        var node = '根据您的信息，我们还未采集到您的电话号码。如果您忘记密码，我们将使用它来帮助您重置密码，请及时完善！';
                        $("#telnumber").append(node);

                        var tgt = response.tgt;

                        var a = '<a class="update a-btn" target="_blank" href="' + pfs.comm.uaaapProperties.uaaapBasePath + 'mng/acp/completeInfo/mobile/view?service=' + encodeURIComponent(pfs.comm.basePath) + '&CTgtId=' + tgt + '">立即更新</a>';

                        $("#updateTel").append(a);


                    } else {
                        var node = '您的号码是' + response.tel + '。如果您忘记密码，我们将使用它们来帮助您重置密码';
                        $("#telnumber").append(node);

                        var tgt = response.tgt;
                        var a = '<a class="update a-btn" target="_blank" href="' + pfs.comm.uaaapProperties.uaaapBasePath + 'mng/acp/completeInfo/mobile/view?service=' + encodeURIComponent(pfs.comm.basePath) + '&CTgtId=' + tgt + '">立即更新</a>' +
                            '<a class="update a-btn grenab"  href="javascript:void(0);" onclick="closeShow()">不再提示</a>';
                        $("#updateTel").append(a);

                    }
                    $(".container-table").removeClass("hide");
                }

            }
        },
        error: function (response) {

        }
    });
}

var moreUrl = "http://newsoa.yzu.edu.cn/exclusive.portal?.lm=oa-xntz-fb-yk";
var moreNews = function () {
    pfs.comm.redirectPage(moreUrl, {}, '_blank');
}

// var myData = {
//     "j_username": "123456",
//     "j_password": "111111",
// };
// $.ajax({
//     type: "GET",
//     url: "http://oa.cqie.edu.cn/sys/common/dataxml.jsp?s_bean=kmImissiveSendMainPortlet&fdCategoryId=15d160469de518322a78a41411699b8f&rowsize=8&scope=no&showNum=true&showSignature=true&s_ajax=true",
//     data: JSON.stringify(myData),
//     contentType: "application/json;charset=UTF-8"
// });
//因js调serviceInfo接口报错，暂时这样等查明原因再做改进
var showData = function (i) {
    if (i == "1") {
        $("#teacherData").show();
        $("#xsdata").hide();
        $("#keyandata").hide();
        $("#zhiweidata").hide();

        var chart = Highcharts.chart('container', {
            credits: {
                enabled: false
            },
            chart: {
                spacing: [40, 0, 40, 0]
            },
            title: {
                floating: false,
                text: ''
            },
            legend: {
                y: 0,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0,
                itemStyle: {
                    lineHeight: '14px'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    point: {
                        events: {}
                    },
                }
            },
            series: [{
                type: 'pie',
                innerSize: '60%',
                name: '',
                data: [
                    {name: '助教', y: 4.8},
                    {name: '副教授', y: 17.5},
                    {name: '软件设计师', y: 2.1},
                    {name: '高级工程师', y: 5.8},
                    {name: '讲师', y: 42.8},
                    {name: '教授', y: 7.3},
                    {name: '工程师', y: 11.0},
                    {name: '信息系统项目管理师', y: 5.0},
                    {name: '经济师', y: 3.6}

                ]
            }]
        });
    } else if (i == "2") {
        $("#teacherData").hide();
        $("#xsdata").show();
        $("#keyandata").hide();
        $("#zhiweidata").hide();
        var chart = Highcharts.chart('container', {
            credits: {
                enabled: false
            },
            chart: {
                spacing: [40, 0, 40, 0]
            },
            title: {
                floating: false,
                text: ''
            },
            legend: {
                y: 0,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0,
                itemStyle: {
                    lineHeight: '14px'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    point: {
                        events: {}
                    },
                }
            },
            series: [{
                type: 'pie',
                innerSize: '60%',
                name: '',
                data: [
                    {name: '计算机与物联网学院', y: 13.2},
                    {name: '管理学院', y: 22.3},
                    {name: '土木工程学院', y: 15.1},
                    {name: '电子信息学院', y: 9.0},
                    {name: '大数据与人工智能学院', y: 2.6},
                    {name: '数字艺术学院', y: 18.8},
                    {name: '软件学院', y: 18.9}
                ]
            }]
        });
    } else if (i == "3") {
        $("#teacherData").hide();
        $("#xsdata").hide();
        $("#zhiweidata").show();
        $("#keyandata").hide();
        var chart = Highcharts.chart('container', {
            credits: {
                enabled: false
            },
            chart: {
                spacing: [40, 0, 40, 0]
            },
            title: {
                floating: false,
                text: ''
            },
            legend: {
                y: 0,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0,
                itemStyle: {
                    lineHeight: '14px'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    point: {
                        events: {}
                    },
                }
            },
            series: [{
                type: 'pie',
                innerSize: '60%',
                name: '',
                data: [
                    {name: '经济专业', y: 5.2},
                    {name: '图群专业（图书资料）', y: 0.8},
                    {name: '新闻专业（编辑）', y: 0.2},
                    {name: '自然科学研究', y: 0.2},
                    {name: '高等学校教师', y: 66.9},
                    {name: '会计专业', y: 1.9},
                    {name: '工程技术', y: 24.2},
                    {name: '工商管理', y: 0.2},
                    {name: '环境艺术设计专业', y: 0.2},
                    // ['论文成果',    37.3]
                ]
            }]
        });
    } else if (i == "4") {
        $("#teacherData").hide();
        $("#xsdata").hide();
        $("#zhiweidata").hide();
        $("#keyandata").show();
        var chart = Highcharts.chart('container', {
            credits: {
                enabled: false
            },
            chart: {
                spacing: [40, 0, 40, 0]
            },
            title: {
                floating: false,
                text: ''
            },
            legend: {
                y: 0,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0,
                itemStyle: {
                    lineHeight: '14px'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    point: {
                        events: {}
                    },
                }
            },
            series: [{
                type: 'pie',
                innerSize: '60%',
                name: '',
                data: [
                    {name: '论文', y: 52},
                    {name: '著作', y: 10.5},
                    {name: '纵横科研项目', y: 6.2},
                    {name: '科研成果获奖', y: 10.6},
                    {name: '产权成果', y: 10.3},
                    {name: '专利成果', y: 10.3},

                ]
            }]
        });
    } else {
        $("#teacherData").hide();
        $("#xsdata").hide();
        $("#keyandata").hide();
        var chart = Highcharts.chart('container', {
            credits: {
                enabled: false
            },
            chart: {
                spacing: [40, 0, 40, 0]
            },
            title: {
                floating: false,
                text: ''
            },
            legend: {
                y: 0,
                padding: 0,
                itemMarginTop: 0,
                itemMarginBottom: 0,
                itemStyle: {
                    lineHeight: '14px'
                }
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                    point: {
                        events: {}
                    },
                }
            },
            series: [{
                type: 'pie',
                innerSize: '60%',
                name: '',
                data: [
                    {name: '暂未获取到数据', y: 100},
                    ['暂未获取到数据', 100]
                ]
            }]
        });
    }
}

//加载新闻信息
var getNewsInfo1 = function (div_id, type, orgcode, more) {
    $.ajax({
        data: {

            limit: 8,
            page: 1,
            type: type,
            orgcode: orgcode
        },
        url: path + '/webmagic/getLatestInfo',
        dataType: 'json',
        success: function (response) {

            var datas = response.data;
            if (datas && datas.length > 0) {

                $('#' + div_id).empty();

                var ulStart = '<ul>';
                var ulEnd = '</ul>';
                var li = '';
                for (var i = 0, len = datas.length; i < len; i++) {

                    var data = datas[i];
                    var bt = data.TITLE;
                    var len1 = bt.length;
                    if (len1 > 55) {

                        bt = bt.substring(0, 55);
                        bt += "......";
                    }
                    var liTmp = '<li>'
                        + '<span>'
                        + '<a target = "_blank" href ="' + data.URL + '">' + bt + '</a>'
                        + '</span>'
                        + '<span class="pull-right gray">' + data.TIME + '</span>'
                        + '</li>'

                    li += liTmp;
                }

                var div_content = ulStart + li + ulEnd;

                $('#' + div_id).append(div_content);

                /*var more_div = '<a href="'+more+'" target="_blank" class="more">查看更多...</a>'*/

                //$('#' + div_id).append(more_div);
            }
        },
        error: function (response) {

        }
    });

}

var rendererSzgk_XYLD = function (a) {
    if (a) {
        var obj_ = {};
        for (var i = 0; i < a.length; i++) {
            if (a[i].yxdm == orgdn) {
                obj_ = a[i];
            }
        }

        var str = '';
        str += '<p><label>全校教职工总人数：' + obj_.tj1 + '人</label></p>';
        str += '<p><label>正常在岗 (正常)：' + obj_.tj2 + '人</label></p>';
        str += '<p><label>试用期：' + obj_.tj3 + '人</label></p>';
        str += '<p><label>离职：' + obj_.tj4 + '人</label></p>';
        str += '<p><label>退休：' + obj_.tj5 + '人</label></p>';
        str += '<p><label>男：' + obj_.tj6 + '人</label></p>';
        str += '<p><label>女：' + obj_.tj7 + '人</label></p>';
        $("#teacherData").empty();
        $("#teacherData").append(str);

        var pieData = [

            ["正常在岗 (正常)", parseInt(obj_.tj3)],
            ["试用期", parseInt(obj_.tj4)],
            ["离职", parseInt(obj_.tj4)],
            ["退休", parseInt(obj_.tj4)],
        ];
        jzgPie(pieData);
    }
};
var jzgPie = function (a) {

    $('#container').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            height: 200,
            width: 275
        },
        title: {
            text: '<font style="font-size: 14px;">师资概况比例</font>'
        },
        tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: '教师比例（％）',
            data: a
        }]
    });
}
var getSZData = function (viewName, callBack, parameter) {

    var s = new ServiceInfo();
    s.setParamDataFormat('json');
    s.setServiceAddress("dc/soap/00001_00011_01_01_20200615174703");
    s.setServiceSource('ds2');
    s.setSoapInterface("getData");
    s.setServiceType("soap");
    s.setCDataPath(["arg0"]);
    // s.addParams({arg0: {Body: {tablename: viewName}}});
    s.callService({

        success: function (a, b, c) {
            console.log("A:" + JSON.stringify(a));
            if (a.success) {
                // var total = a.data.execResponse['return'].Body.total;
                // var data = a.data.execResponse['return'].Body.items;
                console.log("111111:" + JSON.stringify(a.data));
                // console.log("retV:"+data);
                var retV = a.data.getDataResponse.return.Body.items;

                if (callBack) {
                    if (parameter == null) {
                        callBack(retV);
                    } else {
                        callBack(retV, parameter);
                    }

                }
            }
        }
    });
};

var stuBar = function (a) {

    if (a) {

        var Y_arr = [];
        var X_arr = []; //X轴

        var zx = {}; //在校
        var xx = {}; //休学

        var tempzx = [];
        var tempxx = [];

        var ns = 0;//男生人数
        var ls = 0;//女生人数

        var zxtj = 0;
        var xxtj = 0;

        if ($.inArray("XLD", userGroupDnArr) != -1) { //校领导

            for (var i = 0; i < a.length; i++) {

                X_arr.push(a[i].xymc.substring(0, 4));

                zxtj += parseInt(a[i].zx);
                xxtj += parseInt(a[i].xx);

                ns = parseInt(a[i].ns);
                ls = parseInt(a[i].ls);

                tempzx.push(parseInt(a[i].zx));

                tempxx.push(parseInt(a[i].xx));

            }

            var zj = zxtj + xxtj;
            var str = (xxtj / zj) * 100;//计算休学率


            str = '全校在籍' + zj + '人，在校' + zxtj + '人，休学' + xxtj + '人，在校男生' + ns + '人、女生' + ls + '人，休学率 ' + str.toFixed(2) + '%';


            zx.name = '在校';
            xx.name = '休学';


            zx.data = tempzx;
            xx.data = tempxx;

            zx.color = '#9FC93B';

            Y_arr.push(xx);
            Y_arr.push(zx);
            //console.log(Y_arr);


        } else {

            for (var i = 0; i < a.length; i++) {

                if (a[i].xydm == orgdn) {//判断机构院系

                    X_arr.push(a[i].zymc.substring(0, 4));

                    zxtj += parseInt(a[i].zx);
                    xxtj += parseInt(a[i].xx);

                    ns += parseInt(a[i].ns);
                    ls += parseInt(a[i].ls);

                    tempzx.push(parseInt(a[i].zx));

                    tempxx.push(parseInt(a[i].xx));


                }

// <<<<<<< .mine
//
// =======

            }
            var zj = zxtj + xxtj;
            var str = (xxtj / zj) * 100;//计算休学率


// >>>>>>> .r16821
// <<<<<<< .mine
            $('#xld_div_').highcharts({
                chart: {
                    type: 'column',
                    // type: 'bar',
                    height: 245,
                    width: $("#xld_div_").width()
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: nameArr
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '（人数）'
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        pointPadding: 0.2,
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || '#000000',
                            style: {
                                textShadow: '0 0 3px #FFFFFF'
                            }
                        }
                    }
                },
                series: [{
                    name: '人数',
                    data: itemArr
                }]
            });
// =======
            str = '全院在籍' + zj + '人，在校' + zxtj + '人，休学' + xxtj + '人，在校男生' + ns + '人、女生' + ls + '人，休学率 ' + str.toFixed(2) + '%';

            zx.name = '在校';
            xx.name = '休学';


            zx.data = tempzx;
            xx.data = tempxx;

            zx.color = '#9FC93B';

            Y_arr.push(xx);
            Y_arr.push(zx);

        }

        xsGKCol(Y_arr, X_arr, str);

// >>>>>>> .r16821
    }
};

var showData1 = function (type) {

    if (type) {

        switch (type) {

            case 1: {
                var str = '';
                str += '<div class="col-md-6 col-sm-6 col-xs-6" id="teacherData">';
                str += '</div>                                                ';
                str += '<div class="col-md-6 col-sm-6 col-xs-6" style="margin-top: -18px;">\n' +
                    '                                <div id="container" style="min-width:100px;height:200px"></div>\n' +
                    '                            </div> ';
                $("#SJSHOWDIV").empty();
                $("#SJSHOWDIV").append(str);
                $("#teacherData").html("<p style='background-color:#FFFFFF;height:200px;font-size: 25px; color: #F9E597; line-height: 200px; text-align: center;'>努力统计中...</p>");
                getSZData('dctdb.V_JG_JZGSZGKZS', rendererSzgk_XYLD, null);
                $("#container").show();
                break;
            }
            case 2: {

                $("#xld_div_").empty();
                $("#xld_div_").html("<p style='background-color:#FFFFFF;height:200px;font-size: 25px; color: #F9E597; line-height: 200px; text-align: center;'>努力统计中...</p>");
                getSZData("dctdb.v_grzx_xsgk_new_yx", stuBar, null);
                break;
            }
            case 4: {


                $("#xld_div_").empty();

                //获取学费概况数据
                if ($.inArray("XLD", userGroupDnArr) != -1) { //校领导
                    //获取学生概况数据 -- 校领导
                    $("#xld_div_").html("<p style='background-color:#FFFFFF;height:200px;font-size: 25px; color: #F9E597; line-height: 200px; text-align: center;'>努力统计中...</p>");
                    getSZData('data_cw.v_xsjftj', rendererXfgk, null);
                } else { //院系领导
                    //获取学生概况数据 -- 学院领导
                    $("#xld_div_").html("<p style='background-color:#FFFFFF;height:200px;font-size: 25px; color: #F9E597; line-height: 200px; text-align: center;'>努力统计中...</p>");
                    getSZData('data_cw.v_xsjftj_yx', rendererXfgk, null);
                }

                break;
            }
            default: {

                $("#xld_div_").empty();
                $("#xld_div_").append("<p style='background-color:#FFFFFF;height:200px;font-size: 30px; color: #C6C6C6; line-height: 200px; text-align: center;'>暂无数据</p>");
            }
        }
    }
};


function gejbxx() {
    $.ajax({
        url: path + '/GeRenZhongXingJbxx/queryJbxx',
        dataType: 'json',
        type: 'POST',
        success: function (response) {
            $("#login_name").html(response.DWMC);

        },
        error: function (response) {
            console.log(response);
        }
    });
}


$(document).ready(function () {
    $('.statistics_title span').click(function () {
        $(this).addClass('active')
        $(this).siblings().removeClass('active')
    });

    /*if($("#bs").val()==undefined||$("#bs").val()==null||$("#bs").val()==""){
        setInterval(function () {
            pageshow();
        }, 1000);
    }*/


    pageshow();
    if (($.inArray('EJXYLD', pfs.comm.groupList) > -1) || ($.inArray('FGYLD', pfs.comm.groupList) > -1) || ($.inArray('adminGroup', pfs.comm.groupList) > -1)) {

        document.getElementById("SJDIV").style.display = "block"
    }
    if (($.inArray('jzg', pfs.comm.groupList) > -1)) {
        showData(1);
        $("#hdxx").remove();
        $("#swzlxx").remove();
        $("#tzggxx").remove();
        $("#jsxx").show();


    } else if (($.inArray('bks', pfs.comm.groupList) > -1)
        || ($.inArray('yjs', pfs.comm.groupList) > -1) || ($.inArray('bss', pfs.comm.groupList) > -1)) {

        $("#jsxx").remove();
        $("#tzggxx").show();
        $("#hdxx").show();
        $("#swzlxx").show();

    }

    //$('#content7').empty();
    var more_div = '<div>'
        + '<a href="http://www.yzu.edu.cn"  target="_blank" class="more">更多...</a>'
        + '</div>';
    //$('#content7').append(more_div);
    loadSchoolNews(1, '11');
    setTimeout(function () {
        loadSchoolNews(1, '10');
    }, 100);
    setTimeout(function () {
        loadSchoolNews(2, '9');
    }, 200);
    setTimeout(function () {
        loadSchoolNews(2, '1');
    }, 300);
    setTimeout(function () {
        loadSchoolNews(2, '12');
    }, 400);


    loadDeptNews();

    getMyAffairsCount();

    getMyApplyCount();
    getMyOACount();


    helloInfo();

    getMyQQEmailCount();

    getNewsInfo();


    getNewsInfo1("content1", '6', '0000', 'http://oa.cqie.edu.cn/resource/jsp/widget.jsp?portletId=km.imissive.latestsend&renderId=sys.ui.classic.default&sourceOpt=%7B%22scope%22%3A%22no%22%2C%22rowsize%22%3A%228%22%2C%22cateid%22%3A%2215d160469de518322a78a41411699b8f%22%2C%22showNum%22%3A%22true%22%2C%22showSignature%22%3A%22true%22%7D&renderOpt=%7B%22firstRowScroll%22%3A%22%22%2C%22highlight%22%3A%22%22%2C%22showCreator%22%3A%22true%22%2C%22showCreated%22%3A%22true%22%2C%22showCate%22%3A%22true%22%2C%22cateSize%22%3A%220%22%2C%22newDay%22%3A%220%22%2C%22target%22%3A%22_blank%22%7D');//校内通知
    getNewsInfo1("content2", '8', '0000', 'http://oa.yzu.edu.cn/index.portal?.ym=p47923_p241_p245');//领导讲话
    getNewsInfo1("content3", '4', '0000', 'http://newsoa.yzu.edu.cn/exclusive.portal?.lm=oa-dwfw-yk');//党委发文
    getNewsInfo1("content4", '3', '0000', 'http://newsoa.yzu.edu.cn/exclusive.portal?.lm=oa-xzfw-yk');//行政发文
    getNewsInfo1("content5", '5', '0000', 'http://newsoa.yzu.edu.cn/exclusive.portal?.lm=oa-mzaphzfb-yk');//每周安排
    getNewsInfo1("content6", '7', '0000', 'http://newsoa.yzu.edu.cn/exclusive.portal?.lm=oa-xsbg-fb-yk');//学术报告


    getNewsInfo1("content7", '5', '0000', 'http://newsoa.yzu.edu.cn/exclusive.portal?.lm=oa-mzaphzfb-yk');//每周安排
    getNewsInfo1("content8", '2', pfs.comm.org.ID, 'http://newsoa.yzu.edu.cn/exclusive.portal?.lm=oa-xsbg-fb-yk');//学术报告

    pfs.comm.queryApp(
        {
            limit: 150,
            page: 1,
            TYPE: 5,
            STATUS: 1,
            USERGROUP: '' + pfs.comm.groupList,
            USERORG: pfs.comm.org ? pfs.comm.org.ID + '' : '',
            //ORDERBY: "RANK",
            FWFS: '2'
        }, function (datas) {
            loadBussinessSystem("BussinessSystem", datas, 1, 'busCurrentPage');
        });

    /* pfs.comm.queryApp(
         {
             limit : 10,
             STATUS: 1,
             page : 1,
             TYPE : 2,
             SFZSYXS: 1,
             USERGROUP : '' + pfs.comm.groupList,
             USERORG : pfs.comm.org ? pfs.comm.org.ID + '' : '',
             ORDERBY : "app.createtime desc",
                FWFS:'2'
         }, function(datas) {


             loadNewApps("newApps", datas,1,'NewAppCurrentPage');

         });*/


    pfs.comm.queryAllApp({
        USERID: pfs.comm.user.ID,
        TYPE: 1,
        USERGROUP: '' + pfs.comm.groupList,
        USERORG: pfs.comm.org ? pfs.comm.org.ID + '' : '',
        FWFS: '2'
    }, function (datas) {
        loadGlkzt(datas);
    });

    pfs.comm.queryMyApp({

        USERID: pfs.comm.user.ID,
        USERGROUP: '' + pfs.comm.groupList,
        USERORG: pfs.comm.org ? pfs.comm.org.ID + '' : '',
        GWLB: '' + pfs.comm.gwlb,
        ISTOOL: '',
        FWFS: '2'

    }, function (datas) {


        loadMyApp(datas, "newApps", 'myApp');
    });


    initRmtj();

    $("#closeBtn").bind("click", function () {
        $(".container-table").addClass("hide");
    });


    //initTel();

    if ($.ua().isIe && $.ua().ie > 0) {

        $(".rides-cs").css("right", "16px");

    }


    $(".imgtool").hover(function () {
        $(".imgtool").css("cursor", "pointer")
        $(".tooltips").show();
    });
    $(".imgtool").mouseout(function () {
        $(".tooltips").hide();
    });

    gejbxx();

    //暂时隐藏
    $("#SJDIV").remove();
});