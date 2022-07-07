(function($) {

	function getUniqId(){
	
			var r1 = Math.floor((Math.random()*10)*10)+1;
			var r2 = Math.floor((Math.random()*10)*10)+2;
			var r3 = Math.floor((Math.random()*10)*10)+3;
			return 'UNIQ_ID'+new Date().getTime()+'_'+(r1*r2*3);
	}

	var tableid = getUniqId();
	var index_type = 'num';
	var tableMultiSelect = true;
	$.fn.simpleTable = function(options, callBack, controller) { 

		return this.each( function() {
			
			var p = $.extend(true,{}, $.fn.simpleTable.defaults, options);

			var isExistDict = false;
			var dictMapArray = [];
			//判断是否需要进行字典转换
			$.each(p.colModel, function(j, colModel){
				
				if(colModel.dictmap){
					
					isExistDict = true;
					dictMapArray.push(colModel.dictmap);
				}
			});
			
			if(!controller){
	
				if(!isExistDict){
					
					createTable($(this), p, callBack);
				}else{
				
					pfs.comm.load_dict(dictMapArray, $(this), p, function(div, p){createTable(div, p, callBack)});
				}
			}else{
			
				if(!isExistDict){
					
					createTable($(this), p, callBack, controller);
				}else{
				
					pfs.comm.load_dict(dictMapArray, $(this), p, function(div, p){createTable(div, p, callBack, controller);}, controller);
				}
			}
		});
	}
	
	$.fn.simpleTable.defaults = {

		
		//关于掉webservice服务的参数
		url:'',					//请求的控制器controller地址，一般情况下都不用配置，使用默认的remote/service/process就可以完成95%以上的服务调用
	    serviceAddress:'',		//请求的服务地址，必须
	    serviceType:'',			//服务类型，restful，soap，http；目前系统支持这三种类型的服务
	 	httpMethod:'',			//http或者restful的请求方法 get，post，put，delete；默认post
	 	soapInterface:'',		//soap服务需要调用的接口方法，如果是soap类型的服务，则必须
	 	paramDataFormat:'',		//请求参数的数据格式，xml，json，txt；目前系统支持的三种格式，默认xml；前端发送的都是json，到后端进行解析转换
		serviceSource:'',		//服务的源，与我们公司的服务平台接入一致的是ESB,DS,其他都是第三方服务，表示不是我们开发的服务调用
		namespace:'',
	 	params:'',	
	 	xml_json:'',
		cdatapath:'',
		
	 	//关于表格的参数
	 	colNames:'',            //列名称
	 	colModel:'',			//列模型
	 	pageIndex:'',			//分页页码
	 	pageSize:'',			//每页显示数据条目数
	 	
	 	//关于表格的样式
	 	cssclass:'table table-striped table-hover',
	 	
	 	//关于结果数据的节点
	 	rtsnode:''
	}
	
	
	
	//组装表头
	function createHead(div, p){


    	
    	var th =  "<thead ></thead>";
    	var $th = $(th);
		var tr = "<tr></tr>";
		var $tr = $(tr);
		//组装表头
		$.each(p.colNames, function(i, item){
			
			var td = '<th ></th>';
			$td = $(td);
			if(p.colModel[i].index == 'index_cbx'){
				
				index_type = 'cbx';
				var multiSelect = p.colModel[i].MULTISELECT;
				var cbx_all = '<input type="checkbox" name="index_cbx_all" tableId="'+tableid+'" >';
				if(multiSelect == 'false' || multiSelect == false){
					
				}else{
				
					$td.append(cbx_all);
				}
			}
			$td.append(item);
			$tr.append($td);
		});
		$th.append($tr);
		return $th;
	}

	function initCss(){
	
		$(".shor").noUiSlider({
            start: 40,
            connect: "lower",
            range: {
                max: 0,
                min: 1000
            }
        });

        $(".svert").noUiSlider({
            orientation: "vertical",
            start: 40,
            connect: "lower",
            range: {
                max: 0,
                min: 1000
            }
        });
	}
	
	function appendTr(div, p, table, items, callBack){


		$("#rowsPerPage").html(items.length);

		var dataExist = false;
		var tb = '<div style="margin-top: -20px"></div>';
		var $tb = $(tb);

		div.empty().append(table);
		table.append($tb);
		if(items && items != ' ' && (items+'').length > 1){

			table.append(createHead(div, p));

			var show_index_num = 0;
			$.each(items, function(i, item){
			
				dataExist = true;
				var tr = "<ul></ul>";
				var $tr = $(tr);
				$.each(p.colModel, function(j, colModel){
					
					var td = '<li style="float: left!important;"></li>';
					var $td = $(td);
					//自定义宽度
					if(colModel.width){


						$td.css('width', colModel.width);
					}
					//自定义css的style
					if(colModel.cssstyle){

						$td.attr('style', colModel.cssstyle);
					}
					//自定义css的class
					if(colModel.cssclass){

						$td.attr('class', colModel.cssclass);
					}
					var value = item[colModel.index];
					if(colModel.index == 'index_num'){
						
						value = ++show_index_num;
					}else if(colModel.index == 'index_cbx'){
					
						var selectModel = colModel.MULTISELECT;
						if(selectModel == 'false' || selectModel == false){
						
							tableMultiSelect = false;
						}
						var dataInfoId = getUniqId();
						var cbx = '<input type="checkbox" name="index_cbx" dataInfoId="'+dataInfoId+'" value=""><span id="'+dataInfoId+'" style="display:none;">'+JSON.stringify(item)+'</span>';
						value = cbx;
					}

					
					if(value){
						
						var div = '<div></div>';
						var $div = $(div);
						var show_value = '';
						if(colModel.dictmap){

							//字典转换
							show_value = pfs.comm.dict_key2value(colModel.dictmap, value);
						}else if(colModel.dictjson){
							
							show_value = colModel.dictjson[value];
						}else{
							
							show_value = value;
						}

						//指定显示形式
						var viewtype = colModel.viewtype;
						if(viewtype){
						
							//超链接
							if(viewtype.toUpperCase() == 'LINK'){
							
								var link = '<a></a>';
								var $link = $(link);
								var attrs = colModel.attrs;
								if(attrs){
									
									for(var attrname in attrs){
									
										var attr_value = '';
										if(attrname.toUpperCase() != 'ONCLICK' && attrname.toUpperCase() != 'ONCLICKPARAMS'){
											
											var attr_value = item[attrs[attrname]];
											if(!attr_value){
											
												attr_value = attrs[attrname];
											}
										}else if(attrname.toUpperCase() == 'ONCLICK'){
										
											
											attr_value = attrs[attrname];
											var onclickparams = attrs['onclickparams'];
											attr_value += '(';
											if(onclickparams && onclickparams.length > 0){
												
												for(var i = 0, len = onclickparams.length; i < len; i++){
											
													attr_value += '\''+((item[onclickparams[i]]) ? (item[onclickparams[i]]) : onclickparams[i])+'\', ';
												}
											
												attr_value = attr_value.substring(0, attr_value.length - 2);
											}else{
											
												attr_value += '\''+item.ID+'\'';
											}
											attr_value += ')';
										}
										if(attr_value){
											
											$link.attr(attrname, attr_value);
										}
									}
								}
								$link.append(show_value);
								$div.append($link);
							}else{
							
								$div.append(show_value);
							}
							
						}else{
							
							$div.append(show_value);
						}
						$td.append($div);


					}
					$tr.append($td);

				});
				$tb.append($tr);






				
			});


			
		}else{

			$tb.append('<div style="background-color:#F5F5F5;height:100%;font-size: 35px; color: :#F5F5F5; line-height: 200px; text-align: center;"><img src="/xg/subsystem/jbxx/gg/js/img/nodata.png" style="margin-right:50px;">亲！没有查到相关的数据...</div>');
		}

		
		if(index_type == 'cbx'){
		
			//注册全选事件
			$('#'+tableid +' input[type="checkbox"][name="index_cbx_all"]').change(function(){
			
				if($(this).is(':checked')){
					
					if(tableMultiSelect == true){
						
						$('#'+tableid +' tbody tr').css('color', 'green');
						$('#'+tableid +' input[type="checkbox"][name="index_cbx"]').prop('checked', $(this).is(':checked'));
					}
				}else{
				
					$('#'+tableid +' tbody tr').css('color', '');
					$('#'+tableid +' input[type="checkbox"][name="index_cbx"]').prop('checked', $(this).is(':checked'));
				}
			});

			//注册单条记录选中事件
			$('#'+tableid +' input[type="checkbox"][name="index_cbx"]').change(function(){
			
				if($(this).is(':checked')){

					//只能单选
					if(tableMultiSelect == false || tableMultiSelect == 'false'){
					
						$('#'+tableid +' input[type="checkbox"][name="index_cbx"]').prop('checked', false);
						$('#'+tableid +' tbody tr').css('color', '');
					}
					
					$(this).prop('checked', true);
					$(this).closest('tr').css('color', 'green');
				}else{
				
					$(this).closest('tr').css('color', '');
				}
			});

		}


		if(callBack){
		
			callBack(tableid, items);
		}
	};
	
	//组装数据行
	function createTr(div, p, table, callBack){
		
		//设置分页信息
		if(p.pageIndex){

			p.params.pageIndex = p.pageIndex;
		}
		if(p.pageSize){
		
			p.params.pageSize = p.pageSize;
		}
		var s = new ServiceInfo();
		
			s.setUrl(p.url);
			s.setParamDataFormat(p.paramDataFormat);
			s.setServiceAddress(p.serviceAddress);
			s.setServiceSource(p.serviceSource);
			s.setSoapInterface(p.soapInterface);
			s.setServiceType(p.serviceType);
			s.addParams(p.params);
			s.setHttpMethod(p.httpMethod);
			s.setNamespace(p.namespace);
			s.setXml_json(p.xml_json);
			s.setCDataPath(p.cdatapath);
			
			s.callService({
				
				success : function(a,b,c){

					var code = 200;
					if(a.success){
						
						var items = null;
						if(a.data['return']){ // ESB 返回  处理
							
							items = a.data['return'].items;
							code = a.data['return'].code;
						}

						if(!items){//数据中心
						
							items = (a.data.getDataResponse)['return'].Body.items;
							code = (a.data.getDataResponse)['return'].Body.code;
						}

						if(!items){//第三方服务

							items = a;
							var rtsnode = p.rtsnode;
							var rtsnodes = rtsnode.split('.');
							for(var i = 0, len = rtsnodes.length; i < len; i++){
							
								items = items[rtsnodes[i]];
							}
						}
				
						if(code != 200){
					
							div.empty().append('<div style="background-color:#F5F5F5;height:100%;font-size: 35px; color: #C6C6C6; line-height: 200px; text-align: center;"><img src="/xg/subsystem/jbxx/gg/js/img/fwcc.png" style="margin-right:50px;">亲！服务调用异常...</div>');
							return;
						}
						
						appendTr(div, p, table, items, callBack);
					}else{
					
						div.empty().append('<div style="background-color:#F5F5F5;height:100%;font-size: 35px; color: #C6C6C6; line-height: 200px; text-align: center;"><img src="/xg/subsystem/jbxx/gg/js/img/fwcc.png" style="margin-right:50px;">亲！服务调用异常...</div>');
					}
				},
				error : function(){
					
						div.empty().append('<div style="background-color:#F5F5F5;height:100%;font-size: 35px; color: #C6C6C6; line-height: 200px; text-align: center;"><img src="/xg/subsystem/jbxx/gg/js/img/fwcc.png" style="margin-right:50px;">亲！服务调用异常...</div>');
				}
		});
	}
	
	function createTrFromController(div, p, table, callBack, controller){

		if(!p.params.limit){
			
			p.params.limit = 50;
		}
		if(!p.params.page){
			
			p.params.page = 1;
		}
		$.ajax({
		
		     data: p.params,
		     timeout: '180000',
		     url: controller,
		     dataType:'json',
		     success: function(response){
		   
		     	if(response){
					
		     		appendTr(div, p, table, response.data, callBack);
		     	}
		     },
			 error:function(response){
			 
			 //	alert("应用加载失败");
			 }
		});
	}

	function appendLoading(div){


		div.empty().append('<div style="text-align:center;witdh:100%;height:60%;padding-top:100px;color:rgb(239, 169, 90);font-weight:600;"><!--<img src="/xg/subsystem/jbxx/gg/js/img/loading.gif" style="margin-right:20px;">-->正在拼命加载...</div>');
	}

	function createTable(div, p, callBack, controller){

		var table = '<table style="font: 12px/1.5 Tahoma, \'Microsoft YaHei\', arial, \'宋体\';"></table>';
		var $table = $(table);
		$table.attr('id', tableid);
		$table.attr('class',p.cssclass);
		$table.attr('border',p.border);
		
		appendLoading(div);
		if(!controller){
			
			createTr(div, p, $table, callBack);
		}else{
		
			createTrFromController(div, p, $table, callBack, controller);
		}
	}
})(jQuery);

//获取选择行数据
function getSelectTrJsonData(tableId){
	
	var rts = [];
	$('#'+tableId).find('input[type="checkbox"][name="index_cbx"]:checked').each(function(){
	
		var unid = $(this).attr('dataInfoId');
		var trdt = $('#'+unid).html();
		rts.push(trdt);
	});
	return rts;
}

