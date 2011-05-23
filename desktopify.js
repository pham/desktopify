
n($) {
$.fn.desktopify = function($o) {
	_o = $.extend({
		icon:
			'data:image/gif;base64,' +
			'R0lGODlhAQABAID/AMDAwAAAACH5BAEA' +
			'AAAALAAAAAABAAEAAAICRAEAOw%3D%3D',
		title: '',
		remove: true,
		timeout: 15000
	},$o);

	var _notify = function($icon, $title, $body) {
		if (!$body) {
			return false;
		}

		var _popup = window
			.webkitNotifications
			.createNotification($icon || _o.icon, $title || _o.title, $body);

		_popup.show();

		if (_o.timeout) {
			setTimeout(function() { _popup.cancel(); }, _o.timeout);
		}
	};

	return this.each(function() {
		_o.support = window.webkitNotifications ? true : false;
		if (!_o.support) {
			if ($.isFunction(_o.unsupported)) {
				_o.unsupported();
			}
			return true;
		}

		var _ob = $(this),
			_check = function() {
				if (window.webkitNotifications.checkPermission() > 0) {
					window
						.webkitNotifications
						.requestPermission(_check);
					return false;
				}

				if (_o.remove) {
					_ob.hide();
				}

				if ($.isFunction(_o.callback)) {
					_o.callback();
				}
			};

		$(this).bind('click notify', function($e, $b, $t, $i) {
			if ($e.type === 'click') {
				_check();
			} else if ($e.type === 'notify') {
				_notify($i, $t, $b);
			}
			return false;
		});

		return true;
	});
};
}(jQuery));
