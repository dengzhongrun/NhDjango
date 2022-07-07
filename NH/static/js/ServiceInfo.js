/**
 * add by zqg 20160509
 * @param options
 * @returns
 * 
 * 客户端调用服务的核心js类，要去前段所有调用服务的场景都使用该类
 * API描述：
 * 属性配置options 可选，非必须，可配置项目如下
 * url						请求的控制器controller地址，一般情况下都不用配置，使用默认的remote/service/process就可以完成95%以上的服务调用
 * serviceAddress		    请求的服务地址，必须
 * serviceType				服务类型，restful，soap，http；目前系统支持这三种类型的服务
 * httpMethod				http或者restful的请求方法 get，post，put，delete；默认post
 * soapInterface			soap服务需要调用的接口方法，如果是soap类型的服务，则必须
 * paramDataFormat			请求参数的数据格式，xml，json，txt；目前系统支持的三种格式，默认xml；前端发送的都是json，到后端进行解析转换
 * serviceSource			服务的源，与我们公司的服务平台接入一致的是ESB,DS,其他都是第三方服务，表示不是我们开发的服务调用
 * params					请求参数，前端传入json，后端自动解析
 * cDataPath				需要将子节点用CDATA包裹的路径
 * xml_json					xml嵌套的json对象
 * 
 * 方法
 * 对应的属性都有对应的get、set方法进行设置值或者获取值，比如对应的url有getUrl，setUrl(url),除了params没有setParams方法;
 * 
 * 添加请求参数或者设置请求参数的方法是，addParams();接收key，value，或者一个json对象，比如：
 * addParams('name', '张三');
 * addParams('age', 19);
 * 
 * addParams({
 * 	   sex : '男',
 * 	   clazz : 'c1001'
 * });
 * 
 * 发起调用服务的方法，核心，此方法继承了$.ajax();所以回调函数的配置参照jquery的ajax；返回的数据格式必定是json
 * callService({
 * 
 * 		success : function(){},
 * 		error : function(){}
 * });
 * 
 */
var ServiceInfo = function(options){
	
	var this_ = this;
	var params = {};
//	var __OPENSSL_PRIVATE_KEY__ = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7keKCPpVuplz6T5NDMRNAbpo8Pwwy3IuILTunsN/0vAvTi+JiXpGZHuxsraZFlDfwV3ocgov1gZh7UAkhURzmnbxXdLDiXsC9uAUHTZqYOzpQFn4ksX24MEoTEfBq9dDRutq1uFwuv48eIFOUb9v61qGGfKEjbE2LPjIjSuS5gQIDAQAB";
	var __OPENSSL_PRIVATE_KEY__ = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC89hvzkO2bUJ/QBdwjw+1YEcRRVdGL/3FvDxZ6OYZyMmFJFJRmhMukLA7KSHMqtnn6PY/1qcG/yjk48K4EHa5UjkXfMiszOdM3UBnEXv3+iOKrm7lWibrY+XuLalvOID3LbZ4fVeSlLRphRc3s3r77v4hP0otnpOE8AbNlxUyr1QIDAQAB";
	if(options){
		
		if(options.url){
			
			this.url = options.url;
		}
		
		if(options.serviceAddress){
			
			this.serviceAddress = options.serviceAddress;
		}
		
		if(options.serviceType){
			
			this.serviceType = options.serviceType;
		}
		
		/**
		 * 如果是HTTP或者restful的请求，指明调用资源的方式，默认是POST
		 */
		if(options.httpMethod){
			
			this.httpMethod = options.httpMethod;
		}
		
		/**
		 * 如果是soap,指明调用的接口名称
		 */
		if(options.soapInterface){
			
			this.soapInterface = options.soapInterface;
		}
		
		/**
		 * 请求服务的参数的数据格式，可以是普通文本，xml，json
		 */
		if(options.paramDataFormat){
			
			this.paramDataFormat = options.paramDataFormat;
		}
		
		/**
		 * 服务的类型，ESB,数据中心DS，第三方,TD
		 */
		if(options.serviceSource){
			
			this.serviceSource = options.serviceSource;
		}
		
		if(options.params && typeof(options.params) === 'object'){
			
			$.extend(params, options.params);
		}
		
		if(options.cDataPath){
			
			this.cDataPath = options.cDataPath;
		}
		
		if(options.namespace){
			
			this.namespace = options.namespace;
		}
		
		if(options.xml_json){
			
			this.xml_json = options.xml_json;
		}
		
		if(options.businessServiceName) {
			
			this.businessServiceName = options.businessServiceName;
		}
	}
	
	/**
	 * 设置业务系统服务方法，用于做权限判定，例如用户状态检查
	 * 因为原先process() 方法设计加了注解：@NocheckLogin，某些业务是必须要做用户状态检查的。
	 */
	this.setBusinessServiceName = function(businessServiceName) {
		
		this.businessServiceName = businessServiceName;
	}
	
	this.getBusinessServiceName = function() {
	
		return this.businessServiceName;
	}
	
	/**
	 * 设置访问自己的controller，可以为空，默认访问remote/service
	 */
	this.setUrl = function(url){
		
		this_.url = url;
	}
	
	this.getUrl = function(){
		
		return this_.url;
	}
	
	/**
	 * 设置访问的服务地址
	 */
	this.setServiceAddress = function(serviceAddress){
		
		this_.serviceAddress = serviceAddress;
	}
	
	this.getServiceAddress = function(){
		
		return this_.serviceAddress;
	}
	
	/**
	 * 设置访问的服务类型
	 */
	this.setServiceType = function(serviceType){
		
		this_.serviceType = serviceType;
	}
	
	this.getServiceType = function(){
		
		return this_.serviceType;
	}
	
	/**
	 * 设置http或者restful调用方式
	 */
	this.setHttpMethod = function(httpMethod){
		
		this_.httpMethod = httpMethod;
	}
	
	this.getHttpMethod = function(){
		
		return this_.httpMethod;
	}
	
	/**
	 * 设置soap调用的接口名称
	 */
	this.setSoapInterface = function(soapInterface){
		
		this_.soapInterface = soapInterface;
	}
	
	this.getSoapInterface = function(){
		
		return this_.soapInterface;
	}
	
	/**
	 * 设置访问的服务的参数的数据格式
	 */
	this.setParamDataFormat = function(paramDataFormat){
		
		this_.paramDataFormat = paramDataFormat;
	}
	
	this.getParamDataFormat = function(){
		
		return this_.paramDataFormat;
	}
	
	/**
	 * 设置访问的服务的源，每种源，加的前缀都不一样
	 * 比如如下设置
	 * ESB:
	 * http://localhost:8080/
	 * 
	 * DS:
	 * http://localhost:9990/
	 * 
	 * TD
	 * 第三方的源，不加任何修饰，直接访问，如果需要权限的相关信息，则自己实现一个controller来进行设置
	 * 一般情况下，可以通过请求服务的地址来进行判断是不是第三方的服务
	 * 如果整个系统的设计服务都比较分散，没有统一的主机，则可以全部都设置为TD
	 */
	this.setServiceSource = function(serviceSource){
		
		this_.serviceSource = serviceSource;
	}
	
	this.getServiceSource = function(){
		
		return this_.serviceSource;
	}
	
	this.setCDataPath = function(cDataPath){
		
		this_.cDataPath = cDataPath;
	}
	
	this.getCDataPath = function(){
		
		return this_.cDataPath;
	}
	
	this.setNamespace = function(namespace){
		
		this_.namespace = namespace;
	}
	
	this.getNamespace = function(){
		
		return this_.namespace;
	}
	
	this.setXml_json = function(xml_json){
	
		this_.xml_json = xml_json;
	}
	
	this.getXml_json = function(){
	
		return this_.xml_json;
	}
	
	/**
	 * 添加请求参数，如果key传入的是一个json，则表示批量添加
	 */
	this.addParams = function(key, value){
		
		if(!key){
			
			return;
		}
		
		//添加一个参数
		if(typeof(key) === 'string'){
			
			params[key] = value;
			return;
		}
		
		//合并key这个json到第一个参数
		$.extend(params, key);
	}
	
	/**
	 * 获得请求参数，被统一封装到一个serviceInfo的json对象
	 */
	this.getParams = function(){
		
    var retStr = $.toJSON({
			
			serviceAddress : this_.getServiceAddress(),//必须有的地址
			serviceType : this_.getServiceType() || 'restful',//默认请求的是restful的服务
			serviceSource : this_.getServiceSource() || 'ds',//请求源默认是数据中心
			paramDataFormat	: this_.getParamDataFormat() || 'xml',//请求格式默认xml,
			httpMethod : this_.getHttpMethod() || 'POST',//如果是http或者restful，指明调用的方式
			soapInterface : this_.getSoapInterface(),//如果是soap服务，必须指定
			params : params,
			cDataPath : this_.getCDataPath() || [],//
			namespace : this_.getNamespace() || "",//命名空间
			xml_json:this_.getXml_json() || "",//在xml中嵌套json
			businessServiceName: this_.getBusinessServiceName() || ""
		});
		var strLen = retStr.length;
		var paramArr = [];
		var a = Math.ceil(strLen / 100);
		var crypt = new JSEncrypt();
		crypt.setPrivateKey(__OPENSSL_PRIVATE_KEY__);
		for (var k = 0; k < a; k ++) {
		
			paramArr[k] = crypt.encrypt(retStr.substr(k * 100, 100));
		}
		return {
			
			serviceInfo : paramArr.toString()
		}
	}
	
	/**
	 * 验证请求的合法性
	 */
	var validateMessage = null;//验证消息
	var validateData = function(){
		
		if(!this_.serviceAddress){
			
			validateMessage = "请求的服务地址不能为空";
			return false;
		}
		
		//如果是soap服务
		if(this_.getServiceType() == 'soap'){
			
			if(!this_.getSoapInterface()){
				
				validateMessage = "你调用的soap服务，调用接口不能为空";
				return false;
			}
		}
		
		validateMessage = null;
		return true;
	}
	
	/**
	 * 开始调用远程服务
	 */
	this.callService = function(options){
		
		if(!validateData()){
			
			alert(validateMessage);
			return;
		}
		
		$.ajax($.extend({
			
			url : this_.url || '/remote/service/process',//如果设置过了url，则使用用户自己的调用地址，否则使用默认访问远程服务
			method : 'post',
			type : 'json',
		
			data : this_.getParams()
		}, options));
		
	}
	/**
	 * 开始调用远程服务---非异步
	 */
	this.callService_ = function(options){
		
		if(!validateData()){
			
			alert(validateMessage);
			return;
		}
		
		$.ajax($.extend({
			
			url : this_.url || 'remote/service/process',//如果设置过了url，则使用用户自己的调用地址，否则使用默认访问远程服务
			method : 'post',
			type : 'json',
			async:false,//取消异步请求
			data : this_.getParams()
		}, options));
		
	}
}