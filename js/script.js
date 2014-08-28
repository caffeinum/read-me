function say( para ) {
	console.log( para );
	var speech = new Audio();

	speech.src = getURL( para.text, para.lang );
	speech.autoplay = true;

	speech.addEventListener('pause', para.finish, false);
	speech.addEventListener('play', para.start, false);
	
}

var queue = function () {
	var q = []; var played;
	var interval = setInterval( function () {
		if ( ! played ) {
			if ( played = q.shift() )
				say( played );
		}
	}, 100);
	
	return function ( para, start, finish ) {
		q.push( {
			text: $(para).text(),
			lang: $(para).attr('lang') || "en",
			start: function () {
				start.call( $(para) );
			},
			finish: function () {
				played = null;
				finish.call( $(para) );
			}
		} );
		
		return para;
	}
}();

function getURL( text, lang ) {
	lang = lang || "en";
	var url = "http://translate.google.com/translate_tts?tl="+lang+"&q=" + encodeURIComponent(text);
	console.log( url ); return url;
}

$(function () {
	if ( ! "Audio" in window) return "Oh.";

	$("main p").each(function () {
		queue( this, function () {
			this.css('color', 'red');
		}, function () {
			this.css('color', 'gray');
		});
	});
});
