(function($){
	
	$.sherpa = {
		defaults: {url:'sherpa', dataType:'json', endpoint:null, method:null, token:null, user:null, async:true, before:undefined, fail:undefined, always:undefined},
		authenticate: function(user, password, callback) {
			$.sherpa.call({method:'authenticate', params: {userid:user, password:password}}, function(data) {
				$.sherpa.defaults.token = data.token;
				$.sherpa.defaults.user = data.userid;
				if(jQuery.isFunction(callback)) {
					  callback(data);
				}
			});
		},
		token: {
			validate: function(callback) {
				// get token info from server
			},
			refresh: function(callback) {
				// get new token from server
			},
			invalidate: function(callback) {
				// logout or invalidate token
			}
		},
		commands: {
			endpoints: function(callback) {
				$.sherpa.call({endpoint:'Sherpa', method:'endpoints'}, callback);
			},
			describe: function(endpoint, callback) {
				$.sherpa.call({endpoint:'Sherpa', method:describe, params:{value:endpoint}}, callback);
			}
		},
		call: function(args, callback) {
			var options = $.extend({}, $.sherpa.defaults, args);
			var params = $.extend({},{endpoint: options.endpoint, action: options.method}, options.params);
			
			var doneFunc = undefined;
			
			var beforeFunc = $.sherpa.defaults.before;
			var alwaysFunc = $.sherpa.defaults.always;
			var failFunc = $.sherpa.defaults.fail;
			
			if(jQuery.isFunction(callback)) {
				doneFunc = callback;
			} else {
				if(callback != undefined) {
					if(jQuery.isFunction(callback.done)) {
						doneFunc = callback.done;
					}
					
					if(jQuery.isFunction(callback.before)) {
						beforeFunc = callback.before;
					}
					
					if(jQuery.isFunction(callback.always)) {
						alwaysFunc = callback.always;
					}
					
					if(jQuery.isFunction(callback.fail)) {
						failFunc = callback.fail;
					}
				}
			}
			
			$.ajax({
				  url: options.url,
				  dataType: options.dataType,
				  data: params,
				  async: options.async,
				  headers: (options.token === undefined || options.token === null) ? {}:{token:options.token, userid:options.user},
				  beforeSend: function(jqXHR, settings) {
					  if(jQuery.isFunction(beforeFunc)) {
						  beforeFunc(jqXHR, settings);
					  }
				  },
			}).done(function(data) {
				if(jQuery.isFunction(doneFunc)) {
					doneFunc(data);
				}
			}).always(function(data) {
				if(jQuery.isFunction(alwaysFunc)) {
					alwaysFunc(data);
				}	
			}).fail(function(data) {
				if(jQuery.isFunction(failFunc)) {
					failFunc(data);
				}
			});
		}
	};
	
})(jQuery);
