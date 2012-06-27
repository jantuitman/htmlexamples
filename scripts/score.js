function Score(context) {
	this.context = context
	this.startTime = 0;
	this.notes = [];
	this.instruments = {};
	this.bpm = 40;
	this.ticksperbeat = 120;
	this.currentPos = 0;
	this.notesToSeconds = 60 / this.bpm / this.ticksperbeat
}


Score.prototype.time=function(t) {
	
	var t2 =  (( this.notesToSeconds * t ) - this.startTime )  + this.context.currentTime ; 
	console.log("time of "+t+" is "+t2);
	return t2;	
}

Score.prototype.freq=function(note) {
	var ff = 0;
	switch (note.noteName) {
		case "c": ff = 261.63; break;
		case "c#": ff = 277.18; break;
		case "d": ff = 293.66; break;
		case "d#": ff = 311.13; break;
		case "e": ff = 329.63; break;
		case "f": ff = 349.23; break;
		case "f#": ff = 369.99; break;
		case "g": ff = 392.00; break;
		case "g#": ff = 415.30; break;
		case "a": ff = 440; break;
		case "a#": ff= 466.16 ; break;
		case "b": ff = 493.88; break;
	}
	if (note.octave < 4) {
		for (var j=4;j> note.octave;j--) ff=ff/2;
	}
	else if (note.octave > 4) {
		for (var j=4;j<note.octave;j++) ff=ff*2;
	}
	return ff;	
}


Score.prototype.play=function() {
	this.startTime = this.context.currentTime ;
	for (var i=0;i<this.notes.length ; i++) {
			var instr = this.instruments[this.notes[i].instrument];
			var start = this.time(this.notes[i].time)
			var freq = this.freq(this.notes[i]);
			instr.playNote(start,start + this.time(this.notes[i].duration),freq)		
	}
}

Score.prototype.addNote = function (noteName,octave,duration) {
	var n = { instrument: "1", duration: 120*duration, time : this.currentPos, noteName: noteName, octave: octave  }
	this.currentPos = this.currentPos + n.duration;
  this.notes.push(n);
}

Score.prototype.addRest = function (f) {
	this.currentPos = this.currentPos + 30;
}