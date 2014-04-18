
;(function($, window, undefined){
	var defaults = {
		user: 'simonlidesign',
		numOfTweets: 5,
		duration: 5000,
		showProfileImg: false,
		direction: 'vertical',

		// For Bootstrap ScrollSpy
		navbar: '#main-nav',
	};

	function Twitter(elem, options){
		this.elem = elem;
		this.$elem = $(elem);
		this.options = $.extend({}, defaults, options);
		this.url = 'php/twitter.php';
		this.$tweets = $('<ul/>');
		this.iconOffset = $('#slider').next().find('.icon').eq(0).height()/2 + 25; // 11 is width of box-shadow

		this.init();
	}

	Twitter.prototype.init = function(){
		this.$elem.text('Loading tweets...');
		this.fetch();
	};

	Twitter.prototype.fetch = function(){
		// Fetch the twitter feeds through AJAX
		var self = this;

		$.ajax({
			url: this.url,
			type: 'POST',
			dataType: 'xml',
			data: {user: this.options.user},
		})
		.done(function(results) {
			// Reorganize tweets after fetching 
			$(results).find('status').each(function(index){
				if (index == self.options.numOfTweets) return false;

				var $this = $(this),
					t = self.addLinks($this.find('text').text()),
					li = $('<li/>').prepend($('<p/>').html(t));

				if (self.options.showProfileImg === true){
					var	i = $this.find('user profile_image_url').text(),
						n = $this.find('user name').text(),
						h = 'https://twitter.com/' + $this.find('user screen_name').text(),
						img = $('<img/>', {src: i, alt: n, title: n}),
						a = $('<a/>',{href: h, target: '_blank'}).prepend(img);

					li.prepend(a);
				}

				li.appendTo(self.$tweets);
			});

			self.display();
			self.resize();
			$(window).on('resize', function(){
				self.resize();
			});

			// Activate Bootstrap ScrollSpy
			$('body').scrollspy({
				target: self.options.navbar,
				offset: $(self.options.navbar).find('.navbar-header').innerHeight() + self.iconOffset + 1
			});
		})
		.fail(function() {
			// Hide twitter feed if fetching fails
			console.log("Cannot load tweets");
			self.$elem.hide();
		});
	};

	Twitter.prototype.display = function () {
		// Display tweets one by one
		var self = this;

		self.$elem.html(this.$tweets);
		setInterval(function(){self.scroll();}, self.options.duration);
	};

	Twitter.prototype.scroll = function(){
		// Scroll the tweets
		var ul = this.$elem.find('ul'),
			li = ul.find('li'),
			top = ul.position().top,
			incr = li.innerHeight(),
			height = incr * li.length,
			newTop = top - incr;

		newTop = newTop + height <= 0? 0: newTop;

		ul.animate({
			top: newTop
		});
	};

	Twitter.prototype.addLinks = function (text) {
		// Add links to the tweets
		var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/,
			atRegex = /^@\w+/,
			hashRegex = /^#\w+/,
			puncIdx,
			words = text.split(' '),
			u;

		words = $.map(words, function(w){
			if (w.indexOf('#') === 0){
				u = w.match(hashRegex);
				puncIdx = w.search(hashRegex) + u[0].length;

				return '<a href="https://twitter.com/search?q=%23'+u[0].substr(1)+'&src=hash" target="_blank">'+ w.substring(0, puncIdx) +'</a>' + w.substr(puncIdx);
			} else if (w.indexOf('@') === 0){
				u = w.match(atRegex);
				puncIdx = w.search(atRegex) + u[0].length;

				return '<a href="https://twitter.com/'+ u[0].substr(1) +'" target="_blank">'+ w.substring(0, puncIdx) +'</a>' + w.substr(puncIdx);
			} else{
				return w.replace(urlRegex, function(url){
					return '<a href="'+ url +'" target="_blank">'+ url +'</a>';
				});
			}
		});

		return words.join(' ');
	};

	Twitter.prototype.resize = function () {
		// Resize each tweet so that they are of the same height
		var li = this.$elem.find('li').css('height', ''),
			maxHeight = Math.max.apply(null, $.map(li, function(n){ return $(n).height(); }));

		li.each(function(){
			var $this = $(this);

			$this.css({
				'padding-top': (maxHeight - $this.height())/2,
				'padding-bottom': (maxHeight - $this.height())/2
			});
		});
		this.$elem.css('height', maxHeight);
	};

	$.fn['twitter'] = function(options){
		return this.each(function(){
			if (!$.data(this,'plugin_twitter')){
				$.data(this,'plugin_twitter', new Twitter(this,options));
			}
		});
	};

})(jQuery, window);