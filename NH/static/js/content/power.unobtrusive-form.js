/// <reference path='../../lib/jquery.fileupload.js'/>

(function ($) {
    $(function () {
        var $controls = $('[data-ui-type]'),
            editors;
        var $body = $("body");
        //去除文本框的拼写检查
        $('input[type="text"], textarea').attr('spellcheck', 'false');

        //设置是否允许用户激活输入中文，韩文，日文等的输入法（IME）状态
        //IE、FireFox浏览器支持该ime-mode属性，Chrome、Opera、Safari浏览器不支持。
        $('input[data-ui-ime="inactive"]').css('ime-mode', 'inactive');

        filterControls('datepicker')
            .each(function () {
                var $this = $(this),
                    setting = $.extend({
                        language: 'zh-CN',
                        autoclose: true,
                        format: 'yyyy-mm-dd',
                        minView: 2
                    },
                        $this.data());
                if ($this.attr('disabled') !== 'disabled') {
                    $this.datetimepicker(setting);
                }
                $this.on('disable.power',
                    function () {
                        $this.datetimepicker('remove');
                    });
                $this.on('enable.power',
                    function () {
                        $this.datetimepicker(setting);
                    });
            });

        filterControls('uploader')
            .each(function () {
                var $this = $(this),
                    uploadpathreplacesymbol = $this.data('uploadpathreplacesymbol'),
                    uploadpath = $this.data('uploadpath');
                $this.on('disable.power',
                    function () {
                        $("#upload_overlay").css("display", "block");
                        $this.find("input[type=hidden]").attr("disabled", "disabled");
                    });

                $this.on('enable.power',
                    function () {
                        $("#upload_overlay").css("display", "none");
                        $this.find("input[type=hidden]").removeAttr("disabled");

                    });

                var qrcodeButton = $this.find(".qrcode-button");
                var token;

                if (!qrcodeButton) {
                    return;
                }

                var $qrcodeContainerData = $this.find("#qrcode-container").data();

                function getKeyValue(url, name) {
                    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
                    var data = new dictionary();
                    for (var i = 0; i < paraString.length; i++) {
                        data.put(paraString[i].split("=")[0], paraString[i].split("=")[1]);
                    }
                    return data.get(name);
                }

                function dictionary() {
                    this.data = new Array();
                    this.put = function (key, value) {
                        this.data[key] = value;
                    };
                    this.get = function (key) {
                        return this.data[key];
                    };
                    this.remove = function (key) {
                        this.data[key] = null;
                    };
                    this.isEmpty = function () {
                        return this.data.length == 0;
                    };
                    this.size = function () {
                        return this.data.length;
                    };
                }

                function mobileUploadSuccessResult(mobileUploadResult) {
                    var relativePath = mobileUploadResult.RelativePath.replace(uploadpathreplacesymbol, uploadpath);
                    new pe.ui.message('上传成功！', 'success');
                    $this.find(".photolist").removeClass("hidden");
                    $this.find(".upload-placeholder").css("position", "absolute");
                    $this.find(".upload-placeholder").css("top", "-15000px");
                    $($this.find(".photolist li img")[0]).attr("src", relativePath);
                    $($this.find(".photolist input")[0]).val(mobileUploadResult.RelativePath);
                    $this.find("#qrcode-area-img").modal('hide');
                }

                $this.find('#btnQrcode')
                    .on('click',
                        function () {
                            qrcodeButton.click();
                        });

                $body.on('power.mobileFileUploaded',
                    function (event, imageuploadtoken, mobileUploadResult) {
                        if (token === imageuploadtoken && !mobileUploadResult.IsError) {
                            mobileUploadSuccessResult(mobileUploadResult);
                        }
                    });

                qrcodeButton.on('click',
                    function () {
                        var qrcodeContent = $qrcodeContainerData.getqrcodecontent;
                        if (qrcodeContent) {
                            //生成contentUrl。
                            $.ajax({
                                url: qrcodeContent,
                                type: "get",
                                data: {
                                    'uploadProviderKey': $qrcodeContainerData.uploadproviderkey,
                                    'isExtendField': $qrcodeContainerData.isextendfield,
                                    'extendFieldId': $qrcodeContainerData.extendfieldid
                                },
                                success: function (contentUrl) {
                                    if (contentUrl) {
                                        $qrcodeContainerData.qrcodecontent = contentUrl;
                                        $this.find(".qrcode-link").attr('href', contentUrl);
                                        var qrcodeImg = $this.find(".qrcode-img");
                                        $this.find("#qrcode-area-img").modal('show');
                                        qrcodeImg.attr("src",
                                            '/qrcode/qrcode?content=' +
                                            contentUrl +
                                            '&size=200');

                                        token = getKeyValue($qrcodeContainerData.qrcodecontent, "token");
                                    } else {
                                        new pe.ui.message('扫码上传路径生成失败!', 'error');
                                    }
                                }
                            });
                        }

                    });

            });

        filterControls('datetimepicker')
            .each(function () {
                var $this = $(this),
                    setting = $.extend({
                        language: 'zh-CN',
                        autoclose: true,
                        format: 'yyyy-mm-dd hh:ii:ss',
                        minView: 0
                    },
                        $this.data());
                if (setting.settingDaysofweekdisabled) {
                    setting.daysOfWeekDisabled = setting.settingDaysofweekdisabled;
                }
                if ($this.attr('disabled') !== 'disabled') {
                    if (setting.settingDaysofweekdisabled) {
                        $this.datetimepicker(setting).on('changeDate', function (ev) {
                            var weekDay = new Date($this.val()).getDay();
                            for (var i = 0; i < setting.settingDaysofweekdisabled.length; i++) {
                                if (setting.settingDaysofweekdisabled[i] == weekDay) {
                                    alert("抱歉，不能预约您选择的日期。");
                                    $this.val('');
                                }
                            }
                        });
                    } else {
                        $this.datetimepicker(setting);
                    }
                }
                $this.on('disable.power',
                    function () {
                        $this.datetimepicker('remove');
                    });
                $this.on('enable.power',
                    function () {
                        if (setting.settingDaysofweekdisabled) {
                            $this.datetimepicker(setting).on('changeDate', function (ev) {
                                var weekDay = new Date($this.val()).getDay();
                                for (var i = 0; i < setting.settingDaysofweekdisabled.length; i++) {
                                    if (setting.settingDaysofweekdisabled[i] == weekDay) {
                                        alert("抱歉，不能预约您选择的日期。");
                                        $this.val('');
                                    }
                                }
                            });
                        } else {
                            $this.datetimepicker(setting);
                        }
                    });
            });

        filterControls('colorpicker')
            .each(function () {
                var $this = $(this),
                    setting = $.extend({
                    },
                        $this.data());
                if ($this.attr('disabled') !== 'disabled') {
                    $this.find('input').colorpicker(setting);
                } else {
                    $this.find('input').colorpicker('disable');
                }

            });

        filterControls('spinner')
            .each(function () {
                var $this = $(this),
                    setting = $.extend({
                    },
                        $this.data());
                if ($this.attr('disabled') != 'disabled') {
                    $this.find('input').spinner(setting);
                } else {
                    $this.find('input').spinner('disable');
                }

            });

        filterControls('flagsCheckBoxList')
            .each(function () {
                var $this = $(this),
                    $checkboxs = $this.find('input:checkbox'),
                    propertyName = $checkboxs.first().attr('name'),
                    $hidden = $('<input>').attr('type', 'hidden').attr('name', propertyName).appendTo($this);;
                if ($this.hasClass('disabled')) {
                    $this.find('.checkbox').iCheck('disable');
                }
                $checkboxs.each(function (i, n) {
                    $(this).attr('name', '');
                });
                $checkboxs.on('change',
                    function () {
                        setTimeout(createHidden, 200);

                    });

                function createHidden() {
                    var val = 0;
                    $this.find('input[type="checkbox"]:checked')
                        .each(function (i, n) {
                            val += Number($(n).val());
                        });
                    $hidden.val(val);
                }
            });

        filterControls('combobox')
            .each(function () {
                var $this = $(this),
                    setting = $.extend({
                        inputname: $this.attr('data-name')
                    },
                        $this.data());
                $this.find('select').combobox(setting);
                if ($this.attr('disabled') != 'disabled') {
                    $this.find('select').combobox(setting);
                } else {
                    $this.find('select').remove();
                }

            });

        filterControls('radiobuttonlist')
            .each(function () {
                var $this = $(this);
                var $input = $this.find('input[type="radio"]');
                if ($this.attr('disabled') == 'disabled') {
                    $input.attr('disabled', 'disabled');
                }
            });

        filterControls('checkboxlist')
            .each(function () {
                var $this = $(this);
                var $input = $this.find('input[type="checkbox"]');
                if ($this.attr('disabled') == 'disabled') {
                    $input.attr('disabled', 'disabled');
                }
            });

        //#endregion
        editors = filterControls('ueditor');
        if (editors.length > 0) {
            editors.each(function (i, n) {
                if ($(n).attr('disabled') === 'disabled') {
                    return;
                }
                var $this = $(n),
                    pattern = $this.data('ueditor-pattern'),
                    simpleButtons = [
                        'source', '|', 'undo', 'redo', '|',
                        'fontfamily', 'fontsize', 'bold', 'italic', 'underline', 'strikethrough', '|',
                        'forecolor', 'backcolor', 'removeformat', '|',
                        'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify', '|',
                        'indent', 'insertorderedlist', 'insertunorderedlist', 'inserttable', 'lineheight', 'link'
                    ],
                    normalButtons = simpleButtons.concat([
                        '|', 'simpleupload', 'insertimage', 'qrcodeupload', 'wordconvert', 'attachment', 'insertvideo'
                    ]),
                    fullButtons = normalButtons.concat([
                        'fullscreen', 'autoformat', 'autotypeset', 'fontborder',
                        'superscript', 'subscript', 'formatmatch', 'blockquote', 'pasteplain', '|',
                        'selectall', 'cleardoc', '|',
                        'rowspacingtop', 'rowspacingbottom', '|', 'customstyle', 'paragraph', '|', 'directionalityltr',
                        'directionalityrtl', '|',
                        'touppercase', 'tolowercase', '|', 'unlink', 'anchor', '|', 'imagenone', 'imageleft',
                        'imageright', 'imagecenter', '|',
                        'pagebreak', 'template', 'background', '|', 'horizontal', 'date', 'time',
                        'spechars', 'kityformula', 'wordimage', '|',
                        'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow',
                        'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells',
                        'splittorows', 'splittocols', 'charts', '|',
                        'print', 'preview', 'searchreplace', 'drafts', 'help', 'autosave', 'message'
                    ]),
                    config = {
                        //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                        toolbars: [],
                        initialContent: '',
                        readonly: $this.attr('readonly') === 'readonly' ? true : false,
                        autoHeightEnabled: false,
                        initialFrameWidth: '100%',
                        autoFloatEnabled: false,
                        serverUrl: $this.data('fileupload'),
                        elementPathEnabled: false,
                        initialFrameHeight: $this.data("height"),
                        wordCount: false
                    },
                    uploadpath = $this.data('uploadpath'),
                    symbol = $this.data('uploadpathreplacesymbol');

                switch (pattern.toLowerCase()) {
                    case 'simple':
                        config.toolbars = [simpleButtons];
                        break;
                    case 'full':
                        config.toolbars = [fullButtons];
                        config.wordCount = true;
                        break;
                    default:
                        config.toolbars = [normalButtons];
                        break;
                }

                var editorSetting = $.extend({}, config, $this.data()),
                    editor = new UE.getEditor($this.attr('id'), editorSetting);

                editor.options["UploadProviderKey"] = $(this).attr("data-uploadproviderkey");
                editor.options["ExtendFieldId"] = $(this).attr("data-extendFieldId");
                editor.options["IsExtendField"] = $(this).attr("data-isExtendField");
                editor.options["ManagePath"] = $(this).attr("data-managePath");

                editor.ready(function () {
                    var $form = $this.parents('form'),
                        pathRegex = new RegExp('((src|href)\\s*=\\s*(\"|\'))' + uploadpath, 'gi');
                    $this.data('original', editor.getContent());
                    $form.on('reset',
                        function (e) {
                            if (this !== e.target) {
                                return;
                            }
                            editor.setContent($this.data('original'));
                        });
                    $form.on('submit',
                        function () {
                            if (editor.queryCommandState('source') === 1) {
                                editor.execCommand('source');
                            }

                            var value = $this.val();
                            $this.val(value.replace(pathRegex, "$1" + symbol));
                        });
                });
                $this.data('editor', editor);
            });
        }

        //#endregion
        /**
         * 过滤控件
         * @param  {string} type - 对应的控件类型
         * @return {jQuery}
         */
        function filterControls(type) {
            return $controls.filter('[data-ui-type=' + type + ']');
        }
    });
}(jQuery));