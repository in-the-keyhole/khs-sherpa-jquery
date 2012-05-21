(function($){
	
	$.sherpa = {
		defaults: {url:'sherpa', dataType:'json', endpoint:null, method:null, token:null, user:null},
		authenticate: function(user, password, callback) {
			
			$.sherpa.call({method:'authenticate', params: {userid:user, password:password}}, function(data) {
				$.sherpa.defaults.token = data.token;
				$.sherpa.defaults.user = data.userid;
				if(jQuery.isFunction(callback)) {
					  callback(data);
				}
			});
		},
		sessions: function(callback) {
			$.sherpa.call({method:'sessions'}, callback);
		},
		deactivateUser: function(user, callback) {
			$sherpa.call({method:deactivateUser, params: {userid:user}}, callback);
		},
		call: function(args, callback) {
			var options = $.extend({}, $.sherpa.defaults, args);
			var params = $.extend({},{endpoint: options.endpoint, action: options.method}, options.params);
			$.ajax({
				  url: options.url,
				  dataType: options.dataType,
				  data: params,
				  headers: (options.token === undefined || options.token === null) ? {}:{token:options.token, user:options.user},
				  success: function(data) {
					  if(jQuery.isFunction(callback)) {
						  callback(data);
					  }
				  }
			});
		}
	};
	
})(jQuery);
