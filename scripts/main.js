$(document).ready(function () {
	var context = new webkitAudioContext();
	var instrument1 = new Instrument(context);
	var score = new Score(context);
	score.instruments["1"] = instrument1
	score.addNote("c",5,0.25);
	score.addNote("d",5,0.25);
	score.addNote("e",5,0.25);
	score.addNote("c",5,0.25);
	score.addNote("c",5,0.25);
	score.addNote("d",5,0.25);
	score.addNote("e",5,0.25);
	score.addNote("c",5,0.25);
	score.addNote("e",5,0.25);
	score.addNote("f",5,0.25);
	score.addNote("g",5,0.5);
	score.addNote("e",5,0.25);
	score.addNote("f",5,0.25);
	score.addNote("g",5,0.5);
	score.addNote("g",5,1/8);
	score.addNote("a",5,1/8);
	score.addNote("g",5,1/8);
	score.addNote("f",5,1/8);
	score.addNote("e",5,1/4);
	score.addNote("c",5,1/4);
	score.addNote("g",5,1/8);
	score.addNote("a",5,1/8);
	score.addNote("g",5,1/8);
	score.addNote("f",5,1/8);
	score.addNote("e",5,1/4);
	score.addNote("c",5,1/4);

	score.addNote("c",5,1/4);
	score.addNote("g",4,1/4);
	score.addNote("c",5,1/2);

	score.addNote("c",5,1/4);
	score.addNote("g",4,1/4);
	score.addNote("c",5,1/2);
	
	score.addRest();

	
	score.play();
	
	
});