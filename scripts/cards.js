

function CardManager(updater)
{
  this.activeSet=0;
  this.sets = [new CardSet1(),new CardSet2()]
  this.updater = updater;
}

CardManager.prototype.getSet=function () {
	return this.sets[this.activeSet];
}

CardManager.prototype.setSelector=function () {
	var self = this;
	var s = '<select>'
	for (var i=0;i<this.sets.length ; i++) {
		s+='<option value="'+i+'" '+(this.activeSet==i?'selected':'')+' >'+this.sets[i].name+'</option>';
	}	
	s+='</select>'
	var selector=$(s).change(function (e) {
			self.activeSet=$(e.target).val();
			self.updater.update(self.activeSet);
	});
	return selector;
}

CardManager.prototype.produceTile = function (setId,tileId,colors,width,height) {
		
	var activeSet=this.sets[setId];
	var canvas = document.createElement('canvas');
	canvas.width  = width;
	canvas.height = height;
	this.render(canvas,activeSet,tileId,colors.color1,colors.color2)
	return canvas;
}

CardManager.prototype.render=function (canvas,activeSet,index,color1,color2) {
		var params= {
			canvas: canvas,
			color1: color1,
			color2: color2,
			ctx: canvas.getContext("2d"),
			w : canvas.width,
			h : canvas.height
		}
		var f = activeSet["render_"+index]
		if (f) {
		    // a canvas always begins in the background color.
		    params.ctx.fillStyle = color2
		    params.ctx.fillRect(0,0,params.w,params.h);
		    params.ctx.fillStyle = color1
		    params.ctx.strokeStyle = color1
			f(params);
			return true;
		}
		else {
			return false;
		}
}


/* cardset1 */

function CardSet1()
{


}

CardSet1.prototype.name="basic blocks"
CardSet1.prototype.numberOfCards=100

CardSet1.prototype.render_0=function (o) {
}



CardSet1.prototype.render_1=function (o) {
	with (o) {
		//arc(x, y, radius, startAngle, endAngle, anticlockwise)
		ctx.beginPath()
		ctx.moveTo(0,0.5*h)
		// arcTo(x1,y1,x2,y2,radius)
		ctx.arcTo(0.5*w,0.5*h , 0.5*w,h , 0.5*h)
		ctx.lineTo(0,h)
		ctx.lineTo(0,0.5*h)
		ctx.fill()
	}
}

CardSet1.prototype.render_2=function (o) {
	with (o) {
		//arc(x, y, radius, startAngle, endAngle, anticlockwise)
		ctx.beginPath()
		ctx.moveTo(0,0.5*h)
		// arcTo(x1,y1,x2,y2,radius)
		//ctx.lineTo(0.5*w, 0.5*h)
		ctx.lineTo(0.5*w,h)
		ctx.lineTo(0,h)
		ctx.lineTo(0,0.5*h)
		ctx.fill()
	}
}

CardSet1.prototype.render_3=function (o) {
	with (o) {
		//arc(x, y, radius, startAngle, endAngle, anticlockwise)
		ctx.beginPath()
		ctx.moveTo(0,0.5*h)
		// arcTo(x1,y1,x2,y2,radius)
		ctx.lineTo(0.5*w, 0.5*h)
		ctx.lineTo(0.5*w,h)
		ctx.lineTo(0,h)
		ctx.lineTo(0,0.5*h)
		ctx.fill()
	}
}

CardSet1.prototype.render_4=function (o) {
	with (o) {
		//arc(x, y, radius, startAngle, endAngle, anticlockwise)
		ctx.beginPath()
		ctx.moveTo(0,0.5*h)
		// arcTo(x1,y1,x2,y2,radius)
		ctx.arcTo(0.5*w,0.5*h , 0.5*w,h , 0.5*h)
		ctx.lineTo(0,h)
		ctx.lineTo(0,0.5*h)
		ctx.fill()
		
		ctx.beginPath()
		ctx.moveTo(1*h,0.5*h)
		ctx.arcTo(0.5*w,0.5*h , 0.5*w,0 , 0.5*h)
		ctx.lineTo(w,0)
		ctx.lineTo(w,0.5*h)
		ctx.fill()
	}
}

CardSet1.prototype.render_5=function (o) {
	with (o) {
		//arc(x, y, radius, startAngle, endAngle, anticlockwise)
		ctx.beginPath()
		ctx.moveTo(0,0.5*h)
		// arcTo(x1,y1,x2,y2,radius)
		ctx.arcTo(0.5*w,0.5*h , 0.5*w,h , 0.5*h)
		ctx.lineTo(0,h)
		ctx.lineTo(0,0.5*h)
		ctx.fill()
		
		ctx.beginPath()
		ctx.moveTo(1*h,0.5*h)
		ctx.lineTo(0.5*w,0)
		ctx.lineTo(w,0)
		ctx.lineTo(w,0.5*h)
		ctx.fill()
	}
}

CardSet1.prototype.render_6=function (o) {
	with (o) {
		//arc(x, y, radius, startAngle, endAngle, anticlockwise)
		ctx.beginPath()
		ctx.moveTo(0,0.5*h)
		// arcTo(x1,y1,x2,y2,radius)
		ctx.arcTo(0.5*w,0.5*h , 0.5*w,h , 0.5*h)
		ctx.lineTo(0,h)
		ctx.lineTo(0,0.5*h)
		ctx.fill()
		
		ctx.beginPath()
		ctx.moveTo(1*h,0.5*h)
		ctx.lineTo(0.5*w,0.5*h)
		ctx.lineTo(0.5*w,0)
		ctx.lineTo(w,0)
		ctx.lineTo(w,0.5*h)
		ctx.fill()
	}
}


CardSet1.prototype.render_7=function (o) {
	with (o) {

		ctx.beginPath()
		ctx.moveTo(0,0.5*h)
		// arcTo(x1,y1,x2,y2,radius)
		//ctx.lineTo(0.5*w, 0.5*h)
		ctx.lineTo(0.5*w,h)
		ctx.lineTo(0,h)
		ctx.lineTo(0,0.5*h)
		ctx.fill()

		
		ctx.beginPath()
		ctx.moveTo(1*h,0.5*h)
		ctx.arcTo(0.5*w,0.5*h , 0.5*w,0 , 0.5*h)
		ctx.lineTo(w,0)
		ctx.lineTo(w,0.5*h)
		ctx.fill()
	}
}

CardSet1.prototype.render_8=function (o) {
	with (o) {

		ctx.beginPath()
		ctx.moveTo(0,0.5*h)
		// arcTo(x1,y1,x2,y2,radius)
		//ctx.lineTo(0.5*w, 0.5*h)
		ctx.lineTo(0.5*w,h)
		ctx.lineTo(0,h)
		ctx.lineTo(0,0.5*h)
		ctx.fill()
		
		ctx.beginPath()
		ctx.moveTo(1*h,0.5*h)
		ctx.lineTo(0.5*w,0)
		ctx.lineTo(w,0)
		ctx.lineTo(w,0.5*h)
		ctx.fill()
	}
}

CardSet1.prototype.render_9=function (o) {
	with (o) {

		ctx.beginPath()
		ctx.moveTo(0,0.5*h)
		// arcTo(x1,y1,x2,y2,radius)
		//ctx.lineTo(0.5*w, 0.5*h)
		ctx.lineTo(0.5*w,h)
		ctx.lineTo(0,h)
		ctx.lineTo(0,0.5*h)
		ctx.fill()
		
		ctx.beginPath()
		ctx.moveTo(1*h,0.5*h)
		ctx.lineTo(0.5*w,0.5*h)
		ctx.lineTo(0.5*w,0)
		ctx.lineTo(w,0)
		ctx.lineTo(w,0.5*h)
		ctx.fill()
	}
}

CardSet1.prototype.render_10=function (o) {
	with (o) {

		ctx.beginPath()
		ctx.moveTo(0,0.5*h)
		// arcTo(x1,y1,x2,y2,radius)
		ctx.lineTo(0.5*w, 0.5*h)
		ctx.lineTo(0.5*w,h)
		ctx.lineTo(0,h)
		ctx.lineTo(0,0.5*h)
		ctx.fill()

		
		ctx.beginPath()
		ctx.moveTo(1*h,0.5*h)
		ctx.arcTo(0.5*w,0.5*h , 0.5*w,0 , 0.5*h)
		ctx.lineTo(w,0)
		ctx.lineTo(w,0.5*h)
		ctx.fill()
	}
}

CardSet1.prototype.render_11=function (o) {
	with (o) {

		ctx.beginPath()
		ctx.moveTo(0,0.5*h)
		// arcTo(x1,y1,x2,y2,radius)
		ctx.lineTo(0.5*w, 0.5*h)
		ctx.lineTo(0.5*w,h)
		ctx.lineTo(0,h)
		ctx.lineTo(0,0.5*h)
		ctx.fill()
		
		ctx.beginPath()
		ctx.moveTo(1*h,0.5*h)
		ctx.lineTo(0.5*w,0)
		ctx.lineTo(w,0)
		ctx.lineTo(w,0.5*h)
		ctx.fill()
	}
}

CardSet1.prototype.render_12=function (o) {
	with (o) {

		ctx.beginPath()
		ctx.moveTo(0,0.5*h)
		// arcTo(x1,y1,x2,y2,radius)
		ctx.lineTo(0.5*w, 0.5*h)
		ctx.lineTo(0.5*w,h)
		ctx.lineTo(0,h)
		ctx.lineTo(0,0.5*h)
		ctx.fill()
		
		ctx.beginPath()
		ctx.moveTo(1*h,0.5*h)
		ctx.lineTo(0.5*w,0.5*h)
		ctx.lineTo(0.5*w,0)
		ctx.lineTo(w,0)
		ctx.lineTo(w,0.5*h)
		ctx.fill()
	}
}

CardSet1.prototype.render_13=function (o) {
	with (o) {

		ctx.beginPath()
		ctx.moveTo(0,0)
		ctx.lineTo(0.5*w, 0)
		ctx.lineTo(0.5*w,h)
		ctx.lineTo(0,h)
		ctx.lineTo(0,0)
		ctx.fill()
		
	}
}

CardSet1.prototype.render_14=function (o) {
	with (o) {

		ctx.beginPath()
		ctx.moveTo(0,0.5*h)
		ctx.lineTo(w, 0.5*h)
		ctx.lineTo(w,h)
		ctx.lineTo(0,h)
		ctx.lineTo(0,0.5*h)
		ctx.fill()
		
	}
}


/* cardset1 */

function CardSet2()
{


}

CardSet2.prototype.name="lines and waves"
CardSet2.prototype.numberOfCards=100

CardSet2.prototype.render_0=function (o) {
}

CardSet2.prototype.render_1=function (o) {
	with(o) {
	  for (var i=0;i<h;i+=10) {
	      ctx.fillRect(0,i,w,5);	
		}
	}
}

CardSet2.prototype.render_2=function (o) {
	with(o) {
	  for (var i=0;i<w;i+=10) {
	      ctx.fillRect(i,0,5,h);	
		}
	}
}

CardSet2.prototype.render_3=function (o) {
	with(o) {
	  for (var i=0;i<h;i+=10) {
	      ctx.lineWidth=5
	      ctx.beginPath()
				ctx.moveTo(0,i+2.5);      
	      ctx.bezierCurveTo(w/4,i+7.5, 3*w/4,i+7.5 , w,i+2.5);	
	      ctx.stroke();
	      ctx.lineWidth=1;
		}
	}
}

CardSet2.prototype.render_4=function (o) {
	with(o) {
	  for (var i=0;i<w;i+=10) {
	      ctx.lineWidth=5
	      ctx.beginPath()
				ctx.moveTo(i+2.5,0);      
	      ctx.bezierCurveTo(i+7.5, h/4,  i+7.5, 3*h/4,  i+2.5,h);	
	      ctx.stroke();
	      ctx.lineWidth=1;
		}
	}
}

CardSet2.prototype.render_5=function (o) {
	with(o) {
	  for (var i=0;i<h;i+=10) {
	      ctx.lineWidth=5
	      ctx.beginPath()
				ctx.moveTo(0,i+2.5);      
	      ctx.bezierCurveTo(w/8,i+7.5, 3*w/8,i+7.5 , 0.5 * w,i+2.5);	
	      ctx.bezierCurveTo(5*w/8,i+7.5, 7*w/8,i+7.5 , w,i+2.5);	
	      ctx.stroke();
	      ctx.lineWidth=1;
		}
	}
}

CardSet2.prototype.render_6=function (o) {
	with(o) {
	  for (var i=0;i<w;i+=10) {
	      ctx.lineWidth=5
	      ctx.beginPath()
				ctx.moveTo(i+2.5,0);      
	      ctx.bezierCurveTo(i+7.5, h/8,  i+7.5, 3*h/8,  i+2.5,0.5 *h);	
	      ctx.bezierCurveTo(i+7.5, 5*h/8,  i+7.5, 7*h/8,  i+2.5,h);	
	      ctx.stroke();
	      ctx.lineWidth=1;
		}
	}
}