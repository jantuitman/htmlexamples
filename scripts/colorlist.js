function ColorList(el) {

  this.el=el;
  this.selectedIndex=0;
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
	var button =  $('<span style="display:inline-block;width:60px;height:30px;margin-left:5px;background:'+c+'" >&nbsp</span>');
	button.click(function () {
		alert('button clicked');
	
	});
	return button;
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