function Drawing(xsize,ysize,updater) {
	
	this.tiles ={};
	this.xsize = xsize;
	this.ysize = ysize;
	this.xpos=0;
	this.ypos=0;
	this.updater=updater;
	this.activeLayer=0;
	this.layers=[{ name:'layer 1', blend: 'source-over'}];
	
	for (var y=0;y<this.ysize;y++) {
			this.tiles[y] = {};	
	}
}

Drawing.prototype.selectTile=function(x,y) {

	this.xpos=x;
	this.ypos=y;
	this.updateTileInfo();
}

Drawing.prototype.updateTileInfo=function () {

	if (this.tiles[this.ypos] && this.tiles[this.ypos][this.xpos] && this.tiles[this.ypos][this.xpos][this.activeLayer]) {
			this.updater.update(this.tiles[this.ypos][this.xpos][this.activeLayer]);
	}
	else {
			this.updater.update(this.defaultsForTile(this.xpos,this.ypos));
	}
}


Drawing.prototype.defaultsForTile=function(x,y) {

	return {
		flipX: false,
		flipY: false, 
		colorIndex: null,
		colors : null, // when set, contains the actual colors. can be used to verify the colorIndex.
		activeSet: null, // unset, so that the interface stays on the current selected tileset.
		tileId: null // never used anyway, since it is a effectively a write-only attribute of the drawing. 
	}

}

Drawing.prototype.changeColorIndex=function(index,colors) {
	for (var y=0; y< this.ysize ; y++) {
		if (this.tiles[y]) {
			for (var x=0; x < this.xsize ; x++ ) {
					var redraw=false;
					for (var i=0;i<this.layers.length;i++) {
						if (this.tiles[y][x] && this.tiles[y][x][i] && this.tiles[y][x][i].colorIndex == index) {
							this.tiles[y][x].colors = colors;
							redraw=true;
						}
					}
					if (redraw) this.updater.redraw(x,y,this.tiles[y][x],this.layers);
			}
		}
	}
}

Drawing.prototype.writeTile=function(x,y,properties) {
	if (this.tiles[y]==null) this.tiles[y]={};
	if (this.tiles[y][x]==null) this.tiles[y][x]=[];
	if (this.tiles[y][x][this.activeLayer]==null) this.tiles[y][x][this.activeLayer] = this.defaultsForTile(x,y);
	
	for (var v in properties) {
		this.tiles[y][x][this.activeLayer][v]=properties[v];
	}
	this.updater.redraw(x,y,this.tiles[y][x],this.layers);
}

Drawing.prototype.addLayer=function() {
  var name='layer '+(this.layers.length+1)
	this.layers.push({ name: name, blend: 'source-over' });
	this.activeLayer=this.layers.length - 1;
	this.updateTileInfo();
}

Drawing.prototype.setBlendMode=function(index,value) {
  console.log("setting "+index+" to "+value);
	this.layers[index].blend=value;
	// full redraw.
	for (var y=0; y< this.ysize ; y++) {
		if (this.tiles[y]) {
			for (var x=0; x < this.xsize ; x++ ) {	
				if (this.tiles[y][x]) {
					this.updater.redraw(x,y,this.tiles[y][x],this.layers);
				}
			}
		}
	}
}

