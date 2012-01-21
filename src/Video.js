(function() {

	window.Video = function(params) {
		var me = this,
			paper,
			paperDiv,
			video,
			videoDiv;
	
		videoDiv = $('<div id="video">');
		paperDiv = $('<div>');

		_([videoDiv, paperDiv]).each(function(div) {
			div.css({
				width: params.width,
				heigh: params.height,
			});
			$('body').append(div);
		});
		paperDiv.css('margin-top', -20 - params.height);
		
		paper = Raphael(paperDiv.get(0), params.width, params.height);
		video = Popcorn.youtube("#video", params.url);

		me.loadData = function(data) {
			_(data.items).each(function(item) {
				me.addItem(item);				
			});
		};

		me.addItem = function(item) {
			var image,
				contour,
				style = {
					stroke: "#FFFFFF",
					fill: "#FFFF00",
					opacity: 0.1,
					"stroke-width": 2,
					cursor: "pointer"
				},
				path;
			
			_(item.contour).each(function(point, index) {
				if (index === 0) {
					path = 'M' + point[0] + ',' + point[1];
				}else{
					path += 'L' + point[0] + ',' + point[1];
				}
			});
		
			video.code({	
				start: item.start,
				end: item.end,
				onStart: function() {
					var img = item.image,
						imgpos;
					contour = paper.path(path);
					contour.attr(style);
					contour.mouseover(function() {
						contour.attr('opacity', 0.8);
					});
					contour.click(function() {
						window.location = 'http://www.zara.es';
					});

					if (img) {
						imgpos = img.position;
						image = paper.image(img.url, imgpos[0], imgpos[1], 
							img.width, img.height);
					}
				},
				onEnd: function() {
					contour.remove();
					image && image.remove();
				}
			});
		};

		me.play = function() {
			video.play();
		};
	}
})();
