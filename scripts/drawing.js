function Drawing(xsize,ysize,updater) {
	
	this.tiles ={};
	this.xsize = xsize;
	this.ysize = ysize;
	this.updater=updater;
	
	for (var y=0;y<this.ysize;y++) {
			this.tiles[y] = {};	
	}
}

Drawing.prototype.selectTile=function(x,y) {

	if (this.tiles[y] && this.tiles[y][x]) {
			this.updater.update(this.tiles[y][x]);
	}
	else {
			this.updater.update(this.defaultsForTile(x,y));
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
				if (this.tiles[y][x] && this.tiles[y][x].colorIndex == index) {
					this.tiles[y][x].colors = colors;
					this.updater.redraw(x,y,this.tiles[y][x]);
				}
			}
		}
	}
}

Drawing.prototype.writeTile=function(x,y,properties) {
	if (this.tiles[y]==null) this.tiles[y]={};
	if (this.tiles[y][x]==null) this.tiles[y][x]=this.defaultsForTile(x,y);
	
	for (var v in properties) {
		this.tiles[y][x][v]=properties[v];
	}
	this.updater.redraw(x,y,this.tiles[y][x]);
}

