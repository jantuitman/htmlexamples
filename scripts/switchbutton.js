function SwitchButton(el) {
	this.el=el;
	el.data("checked",false);
  var self=this;
  
	el.click(function(e) {
		var value = ! el.data("checked");
		el.data("checked",value);
		self.update();
		if (self.callback) self.callback(e,value);
	});
}

SwitchButton.prototype.update=function () {
		var value = this.el.data("checked");
		this.el.data("checked",value);		
		var name = this.el.attr("src").replace(/\d\.png$/,value ? "1.png" : "0.png")
		this.el.attr("src",name);
}

SwitchButton.prototype.val=function () {
  if (arguments.length > 0 ) {
  	this.el.data("checked",arguments[0]);
  	this.update();
  }
	return this.el.data("checked");
}

SwitchButton.prototype.change=function(callback) {
	this.callback=callback;
}



