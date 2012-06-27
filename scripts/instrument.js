
/**

	simple sinus sound.

**/

function Instrument(context) {
	this.osc = [];
	this.context = context;  
}


  // frequency modulation
  var curveLength = 44100 * 5;
	var curve = new Float32Array(curveLength);
	for (var i = 0; i < curveLength; ++i) {
    curve[i] = 20  * Math.sin(2 * Math.PI * 60 * i / curveLength);
  }


Instrument.prototype.playNote=function(start,end,freq) {
	
	freq = freq * 2

	
	var o = this.context.createOscillator();
  o.type = o.SINE;


	var releasemoment = (end - start) - 0.07 ;
  
  var o2 = this.context.createOscillator();
  o2.type = o.SINE;
  o2.frequency.setValueAtTime(freq*1.4142,start);


  
  // envelope for frequency modulator.
  var depth = Math.max((Math.log(freq)/Math.log(2) - 7),0) * 400;
  depth = 300
  var o2gain = this.context.createGainNode();
	
	o2gain.gain.setValueAtTime(0,start + 0);
	if (0.05 < releasemoment) o2gain.gain.linearRampToValueAtTime(depth * 1,start + 0.05);
	if (0.1 < releasemoment) o2gain.gain.linearRampToValueAtTime(depth * 1,start + 0.1);
	o2gain.gain.linearRampToValueAtTime(depth * 1,start + releasemoment);
	o2gain.gain.linearRampToValueAtTime(depth * 0,start + releasemoment + 0.07);
  
  o2.connect(o2gain);
  o2gain.connect(o.detune);
  
  o.frequency.setValueAtTime(1*freq,start)
  
  
  
  //o.detune.setValueCurveAtTime(curve,start,start + 5);
  //o.connect(this.context.destination);
	//this.osc.push(o);
	var releasemoment = (end - start) - 0.07 ;
	console.log("releasemoment ",releasemoment);
	
	
	
	
	// envelope.
	var gain = this.context.createGainNode();
	gain.gain.setValueAtTime(1,start + 0);
	if (0.05 < releasemoment) gain.gain.linearRampToValueAtTime(1,start + 0.05);
	if (0.1 < releasemoment) gain.gain.linearRampToValueAtTime(0.2,start + 0.1);
	gain.gain.linearRampToValueAtTime(0.05,start + releasemoment);
	gain.gain.linearRampToValueAtTime(0,start + releasemoment + 0.07);
	
	
	o.connect(gain);
	gain.connect(this.context.destination);
	
	o.noteOn(start);
	o2.noteOn(start);
	o.noteOff(end); 
	o2.noteOff(end);
	
}





