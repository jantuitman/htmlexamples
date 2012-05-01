function LayerList(el,drawing,updater) {

	//this.selectedIndex=0;
	this.el = el;
	this.drawing = drawing;
	this.updater = updater;
	this.blendModes='source-over,destination-over,source-in,destination-in,source-out,destination-out,source-atop,destination-atop,lighter,xor,copy'.split(/,/)
	
	this.update();
  
  var self= this;
  $('body').on('click','#layerlist li',function (evt) {
  	
  	if ($(evt.target).hasClass('addButton')) {
			self.addRow();  	
  	}
  	else {
			var index=$(evt.target).data('index');
			if (index != null) {
				self.drawing.activeLayer=index;
				self.update();
			}
  	}
  	self.changeSelection();
  });
  // todo: use updater?
  $('body').on('change','#layerlist li select',function (evt) {
  		var li=$(evt.target.parentElement);
  		var index = li.data('index');
  		drawing.setBlendMode(index,$(evt.target).val());
  		blit();
  });
	
}

LayerList.prototype.addRow=function () {
		this.drawing.addLayer();
		this.update();
}

LayerList.prototype.changeSelection=function () {
		this.updater.update(this.drawing.activeLayer);
}


LayerList.prototype.update=function() {
		this.el.html('');
		console.log(this.drawing);
		for (var i=0;i<this.drawing.layers.length;i++) {
		
			var s='<li class="layer">'+this.drawing.layers[i].name
			
			s=s + '<select> '
			for (var j=0;j<this.blendModes.length;j++) {
			 console.log("bm",this.blendModes[j],this.drawing.layers[i].blend)
				var selected = (this.blendModes[j]==this.drawing.layers[i].blend )? "selected" :""
				s=s+'<option value='+this.blendModes[j]+' '+selected+' > '+this.blendModes[j]+'</option>'
			}
			s=s+'</li>';
			var li=$(s);
			if (i==this.drawing.activeLayer) li.addClass("selected");
			li.data({index : i});
			this.el.append(li);
		}
		this.el.append($('<li><input type="button" class="addButton" value="+" /></li>'))
}