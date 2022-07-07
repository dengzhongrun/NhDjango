/**
 * 
 * add by zqg 20160510
 * 扩展jquery的部分功能，动态加载js，css
*/
//第二次取相同资源的时候，取浏览器缓存
(function($){
	
	/**
	 * 都是异步加载，加载成功后调用回调funSuccess，传回三个参数
	 */
	$.imports = function(url, funSuccess, funFailure){
		
		var options = {
			
			dataType : "script",
			cache : true,
			url : url,
			success : funSuccess,
			error  : funFailure || function(){//默认的失败处理
				
				alert('资源[' + url + ']加载失败。');
			}
		};

		return $.ajax(options);
	};
})(jQuery);