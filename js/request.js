$(document).ready(function(){
	$('#tvshow').submit(function(event){
		event.preventDefault();

		getOutput();
	});
});

function getOutput() {

	var input = $('#query').val();
	if (input === ""){
		return false;
	}

	var clean = sanitizeString(input);

    $.ajax({
    	type: "GET",
    	url:'http://brandonguerra.net/request.php',
    	data: { show: clean },
    	success: function (response) {
    		var show_data = getRuntime(response);
    		displayInfo(show_data);
    	},
    	error: function (response) {
    		//invalidInput();
    	}
    });
    return false;
}

function sanitizeString(str){
	str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
}

function getRuntime(show) {

	var json = JSON.parse(show);
	var title = json["title"];
	var runtime = json["runtime"];
	var num_episodes = json["aired_episodes"];
	var binge_time = parseFloat
		(Math.round(((num_episodes * runtime) / 1440) * 100) / 100).toFixed(2);
	var banner = json["images"]["fanart"]["full"];
	var show_data = [title, binge_time, banner];
	return show_data;
}

function displayInfo(show_data) {
	$('#binge-info').empty();
	$('.display-results > div > div > h3').attr('id', 'binge-info');
	$('.tv-poster').attr('src', show_data[2]);
	$('#binge-info').append(
		"It would take you " + show_data[1] + " days to binge watch " + show_data[0]);
	$('.left-antenna').removeClass('hidden');
	$('.right-antenna').removeClass('hidden');
	$('.tv-poster').css('border-style', 'solid');
}

function invalidInput() {
	$('#query').val('');
	$('#query').attr('placeholder', 'Invalid Title');
	$('#query').css('border', '1px solid #DC2E35');
	$('#query').css('transition', 'border 0.5s');
	shakeItOff('#query');
}

function shakeItOff(element) {
	$(element).animate({
		marginLeft: '-10px'
	}, 100);
	$(element).animate({
		marginLeft: '10px'
	}, 100);
	$(element).animate({
		marginLeft: '-10px'
	}, 100);
	$(element).animate({
		marginLeft: '0px'
	}, 100);
}