function ColorList(el,updater) {

  this.el=el;
  this.selectedIndex=0;
  this.updater = updater;
  this.arr= [
  	{ color1: 'rgb(255,0,0)', color2: 'rgb(0,255,0)' }, 
  	{ color1: 'rgb(0,255,0)', color2: 'rgb(255,0,0)' } 
  ]
  this.update();
  
  var self= this;
  $('body').on('click','#colorlist li',function (evt) {
  	
  	if ($(evt.target).hasClass('addButton')) {
			self.addRow();  	
  	}
  	else {
			var index=$(evt.target).data('index');
			if (index != null) {
				self.selectedIndex=index;
				self.update();
			}
  	}
  	self.changeSelection();
  });
}

ColorList.prototype.getSelectedColors=function () {
	return this.arr[this.selectedIndex];
}

ColorList.prototype.addRow=function () {
	this.arr.push({ color1: 'rgb(255,0,0)', color2: 'rgb(0,255,0)' } )
	this.selectedIndex=this.arr.length - 1;
	this.update();
}

ColorList.prototype.deleteRow=function (index) {

}

ColorList.prototype.selectRow=function (index) {
	this.selectedIndex= index;
}

ColorList.prototype.colorButton=function(index,propertyName) {
	var c = this.arr[index][propertyName];
	var self=this;
	var btn = new ColorButton(c,{
		update: function (c) {
			self.arr[index][propertyName]=c;
			self.updater.updateColors(index,self.arr[index]);
		}
	});
	return btn.render();
	
	//var button =  $('<span style="display:inline-block;width:60px;height:30px;margin-left:5px;background:'+c+'" >&nbsp</span>');
	//return button;
}

ColorList.prototype.update=function () {
   this.el.html('');
   for (var i=0;i<this.arr.length;i++) {
    var li = $('<li/>').append(this.colorButton(i,'color1')).append(this.colorButton(i,'color2')).data( { index : i });
    if (i==this.selectedIndex) li.attr('class','selected')
   	this.el.append(li);
   }
   this.el.append($('<li><input type="button" value="+" class="addButton" /></li>'));
}

ColorList.prototype.changeSelection=function () {
	 this.updater.update(this.selectedIndex);	
}


ColorButton=function (color,updater) {
  this.color = color;
  this.updater = updater;
  this.r = 0;
  this.g = 0;
  this.b = 0;
  this.a = 0;
  if (m = color.match(/rgb\((\d+),(\d+),(\d+)\)/)) {
  	this.r = parseInt(m[1],10);
  	this.g = parseInt(m[2],10);
  	this.b = parseInt(m[3],10);
  	this.a = 255;
  }
  else if  (m = color.match(/rgba\((\d+),(\d+),(\d+),([0-9\.]+)\)/)) {
  	this.r = parseInt(m[1],10);
  	this.g = parseInt(m[2],10);
  	this.b = parseInt(m[3],10);
  	this.a = parseFloat(m[4],10);
  }
  else {
  	alert("color not matched : "+color);
  }
}

ColorButton.prototype.toRGBA=function() {
	return 'rgba('+[this.r,this.g,this.b,this.a].join(",")+")";

}

ColorButton.prototype.render = function () {
	var self=this;
	this.button= $('<span style="display:inline-block;width:60px;height:30px;margin-left:5px;background:'+self.toRGBA()+'" >&nbsp</span>');
	this.button.click(function () {
		self.toggleDialog();
	});
	return this.button;
}

ColorButton.prototype.update=function () {
	$('.swatch',this.dialog).css('background',this.toRGBA());
	this.button.css('background',this.toRGBA());
}

ColorButton.prototype.toggleDialog=function () {
	var self=this;
	if (this.dialog) {
		this.dialog.remove();
		this.dialog = null;
	}
	else {
	  this.prevR=this.r
	  this.prevG=this.g
	  this.prevB=this.b
	  this.prevA=this.a
		var div=$('<div class="dialog colordialog">' 
		   + '<p><span class="swatch" style="display:inline-block;border:1px solid black;width:60px;height:30px;margin-left:5px;background:'+self.toRGBA()+'" >&nbsp</span></p>' 
		   + '<p><input class="red slider" type="range" min="0" max="255" value="'+self.r+'" /></p>'
		   + '<p><input class="green slider" type="range" min="0" max="255" value="'+self.g+'" /></p>'
		   + '<p><input class="blue slider" type="range" min="0" max="255" value="'+self.b+'" /></p>'
		   + '<p><input class="alpha slider" type="range" min="0" max="255" value="'+(self.a*255)+'" /></p>'
			 + '<p><input type="button" class="closebutton" value="OK" /><input type="button" class="cancelbutton" value="Cancel" /></p>' 
		+ '</div>');
		self.dialog = div
		div.on('change','.slider',function (e) {
		  console.log("changing...");
			var el = $(e.target);
			if (el.hasClass('red')) self.r=el.val();
			if (el.hasClass('green')) self.g=el.val();
			if (el.hasClass('blue')) self.b=el.val();
			if (el.hasClass('alpha')) self.a=(el.val()/255); // alpha = 0...1
			self.update();		
		});
		div.on('click','.cancelbutton',function (e) {
				self.r = self.prevR
				self.g = self.prevG
				self.b = self.prevB
				self.a = self.prevA
				self.update();
				self.toggleDialog();
		});	
		div.on('click','.closebutton',function (e) {
				self.toggleDialog();
				self.updater.update(self.toRGBA());
		});	
		$('body').append(div);
	}
}