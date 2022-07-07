var leo = leo || {};

var basepath = basepath || '';

var path = path || '';

var _wfCommon = _wfCommon || {
	
	/**
	 * 根据流程KEY启动流程
	 * @param procKey 流程的key
	 * @param bizId 业务数据ID
	 * @param successFunc_need_show 请求成功的并需要显示表单页面的回调函数
	 * @param successFunc_no_need_show 请求成功但不需要显示表单页面的回调函数
	 * @param errorFunc 请求失败的回调函数
	 * @param isFormPathDetail 是否在流程环节填写的表单地址上拼接详细信息
	 */
	startProcessByKey : function(procKey, bizId, successFunc_need_show, successFunc_no_need_show, errorFunc, isFormPathDetail){
		
		var data = {};
		if(bizId){
			
			data.bizId = bizId;
		}
		
		if(typeof(isFormPathDetail) != "undefined" || isFormPathDetail != null){
			
			data.isFormPathDetail = isFormPathDetail;
		}
		
		$.ajax({
			
			url : basepath + '/wf/process/startProcessByKey/' + procKey + '?random=' + Math.random(),
			type : "POST",
			dataType : 'json',
			data : data,
			success : function(request, status){
				 
				if(request.needShow){
					
					if(successFunc_need_show){
						
						successFunc_need_show(request, status);
					}else{
						
						leo.redirectPage("spring:" + request.formPath);
					}
				}else{
					
					if(successFunc_no_need_show){
						
						successFunc_no_need_show(request, status);
					}else{
						
						leo.alert(leo.INFO, request.msg, function(){});
					}
				}
			},
			error : function(request, status){
			 
				if(errorFunc){
					
					errorFunc(request, status);
				}else{
					
					leo.alert(leo.ERROR, '服务器内部错误');
				}
			}
		});
	},

	/**
	 * 认领任务
	 * @param TASK_ID_ 任务ID
	 * @param successFunc 请求成功的回调函数
	 * @param errorFunc 请求失败的回调函数
	 */
	claimTask4Me : function(TASK_ID_, successFunc, errorFunc){
		
		$.ajax({
			
			url : basepath + '/wf/process/claimTask4Me' + '?random=' + Math.random(),
			data : {
				
				taskId : TASK_ID_
			},
			type : "POST",
			dataType : 'json',
			success : function(request, status){
				 
				if(successFunc){
					
					successFunc(request, status);
				}else{
					
					leo.alert(leo.INFO, request.msg, function(){
						
						$("#fun_grid_id").jqGrid().trigger("reloadGrid");
					});
				}
			},
			error : function(request, status){
			 
				if(errorFunc){
					
					errorFunc(request, status);
				}else{
					
					leo.alert(leo.ERROR, '服务器内部错误');
				}
			}
		});
	},
	
	/**
	 * 执行活动
	 * @param TASK_ID_ 任务ID
	 * @param bizId	业务数据ID
	 * @param PROC_INST_ID_ 流程实例ID
	 * @param successFunc_need_show 请求成功的并需要显示表单页面的回调函数
	 * @param successFunc_no_need_show 请求成功但不需要显示表单页面的回调函数
	 * @param errorFunc 请求失败的回调函数
	 * @param isFormPathDetail 是否在流程环节填写的表单地址上拼接详细信息
	 */
	doTask : function(TASK_ID_, bizId, PROC_INST_ID_, successFunc_need_show, successFunc_no_need_show, errorFunc, isFormPathDetail){
		
		var data = {};
		if(bizId){
			
			data.bizId = bizId;
		}
		
		if(PROC_INST_ID_){
			
			data.PROC_INST_ID_ = PROC_INST_ID_;
		}
		
		if(typeof(isFormPathDetail) != "undefined" || isFormPathDetail != null){
			
			data.isFormPathDetail = isFormPathDetail;
		}
		
		$.ajax({
			
			url : basepath + '/wf/process/doTask/' + TASK_ID_ + '?random=' + Math.random(),
			type : "POST",
			dataType : 'json',
			data : data,
			success : function(request, status){
				 
				if(request.needShow){
					
					if(successFunc_need_show){
						
						successFunc_need_show(request, status);
					}else{
						
						leo.redirectPage("spring:" + request.formPath);
					}
				}else{
					
					if(successFunc_no_need_show){
						
						successFunc_no_need_show(request, status);
					}else{
						
						leo.alert(leo.INFO, request.msg, function(){
							
							$("#fun_grid_id").jqGrid().trigger("reloadGrid");
						});
					}
				}
			},
			error : function(request, status){
			 
				if(errorFunc){
					
					errorFunc(request, status);
				}else{
					
					leo.alert(leo.ERROR, '服务器内部错误');
				}
			}
		});
	}
};
