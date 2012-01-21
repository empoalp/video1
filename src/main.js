$(document).ready(function() {

	var video = new Video({
		url: 'http://www.youtube.com/watch?v=w41kbzxXyOk',
		width: 400,
		height: 300
	});

	$.getJSON('items.json', function(data) {
		video.loadData(data);
		video.play();	
	});
});

