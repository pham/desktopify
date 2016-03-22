(function($) {
$.fn.desktopify = function($o) {
	var _o = $.extend({
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

		var _popup = new Notification($title || _o.title, {
			body: $body,
			icon: $icon || _o.icon
		});

		if (!_popup) {
			return false;
		}

		if (_o.timeout) {
			// cancel() is not implemented on Firefox
			setTimeout(function() {
				if (_popup.cancel) { _popup.cancel(); }
			}, _o.timeout);
		}
	};

	return this.each(function() {
		_o.support = ('Notification' in window);

		if (!_o.support) {
			if ($.isFunction(_o.unsupported)) {
				_o.unsupported();
			}
			return true;
		}

		var _ob = $(this),
			_check = function() {
				switch (Notification.permission) {
					case 'granted':
						if ($.isFunction(_o.callback)) {
							_o.callback();
						}
						break;

					case 'denied':
						if ($.isFunction(_o.nopermission)) {
							_o.nopermission();
						}
						break;

					default:
						Notification.requestPermission().then(function($res) {
							if ($res === 'granted') {
								_check();
							}
						});
						return false;
				}

				if (_o.remove) {
					_ob.hide();
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
