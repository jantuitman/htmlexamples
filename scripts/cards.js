

function CardSet1()
{


}

CardSet1.prototype.numberOfCards=100

CardSet1.prototype.render=function (canvas,index,color1,color2) {
		var params= {
			canvas: canvas,
			color1: color1,
			color2: color2,
			ctx: canvas.getContext("2d"),
			w : canvas.width,
			h : canvas.height
		}
		var f = this["render_"+index]
		if (f) {
		    // a canvas always begins in the background color.
		    params.ctx.fillStyle = color2
		    params.ctx.fillRect(0,0,params.w,params.h);
		    params.ctx.fillStyle = color1
			f(params);
			return true;
		}
		else {
			return false;
		}
}


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



