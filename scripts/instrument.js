
/**

	simple sinus sound.

**/

function Instrument(context) {
	this.osc = [];
	this.context = context;  
}


Instrument.prototype.playNote=function(start,end,freq) {
	var o = this.context.createOscillator();
  o.type = o.SINE;
  o.frequency.setValueAtTime(freq,start)
  o.connect(this.context.destination);
  console.log("note on at "+start+" off at "+end);
	o.noteOn(start)
	o.noteOff(end); // 1 second.
	//this.osc.push(o);
}





