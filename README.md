# desktopify

Easily create and display notifications using Notification API Standard.

Creates the object and binds 2 events: 

## click

Ask for permission and sets up.

## notify (title, body, [icon])

Shows the notification.

# Usage

	$('<button\/>')
		.text('Start')
		.attr('id','desktopify')
    	.appendTo('body')
    	.desktopify({
        	callback: function() {
            	$('<form>' +
                	'<input name="title" placeHolder="Title"\/><br\/>' +
                	'<textarea name="body" placeHolder="Body"\/><br\/>' +
                	'<input name="btn" type="button" value="Notify"\>' +
            	'<\/form>')
                .appendTo('body')
                .find('input[name="btn"]')
                .click(function(){
                    $('#desktopify').trigger('notify', [
                        $('[name="body"]').val(),
                        $('[name="title"]').val()
                    ]);
                    return false;
                });
        	},
        	unsupported: function() {
            	$('#destopify').remove();
        	}
    	});


# Reference

Test it out at https://jsfiddle.net/aquaron/L3c3s6c6/

See http://j.mp/k7JHyF for demo and detailed information.

