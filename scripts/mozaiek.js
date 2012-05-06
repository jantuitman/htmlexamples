
 var gCanvas;
 var gDrawing={};
 var backbuffer;
 var blink = 0;
 var cursorX = 0;
 var cursorY= 0;
 var tileManager;
 var colorList;
 var layerList;
 
 var flip_h;
 var flip_v;
 var vlip_c;


function blit(hideCursor) {
	var ctx = gCanvas.getContext("2d");
	ctx.drawImage(backbuffer,0,0)
	blink =  1;
	if (hideCursor ) return;
	ctx.fillStyle='rgba(255,255,255,0.75)'
	ctx.fillRect(cursorX*80,cursorY*80,80,80);
}



function setupControls() {
  // object that keeps track of the cards.
	tileManager = new CardManager({
			update: function () {
				updateTileList();
			}
	});
	
	// key h hides cursor
	$(document).keypress(function (e) {
			if (e.which == 104) {
						blit(true);		
			}
	});
	
	// click on a tile in the tilelist adds a new tile to the drawing.
	$(document).on("click","#tilelist img",function (e) {
		var img = $(e.target)
		gDrawing.writeTile(cursorX,cursorY,{
				flipX: flip_h.val(),
				flipY: flip_v.val(),
				flipColor: flip_c.val(),
				activeSet: tileManager.activeSet,
				tileId: img.data('tileId'),
				colorIndex: colorList.selectedIndex, 
				colors: colorList.getSelectedColors()
		});
		blit();
	});
	
	flip_h=new SwitchButton($("#flip_h"));
	flip_h.change(function (e,value) {
			gDrawing.writeTile(cursorX,cursorY,{ flipX: value }); 	
			blit();
			updateTileList();
	});
	flip_v=new SwitchButton($("#flip_v"));
	flip_v.change(function (e,value) {
			gDrawing.writeTile(cursorX,cursorY,{ flipY: value }); 	
			blit();
			updateTileList();
	});
	flip_c=new SwitchButton($("#flip_c"));
	flip_c.change(function (e,value) {
			gDrawing.writeTile(cursorX,cursorY,{ flipColor: value }); 	
			blit();
			updateTileList();
	});
	
	// color list
	colorList = new ColorList($('#colorlist'), {
		update: function () {
					//setTile(null,null,cursorX,cursorY);
					gDrawing.writeTile(cursorX,cursorY, {
						colorIndex: colorList.selectedIndex, 
						colors: colorList.getSelectedColors()
					});		
					updateTileList();
					blit();
		},
		
		updateColors: function (index,colors) {
					gDrawing.changeColorIndex(index,colors);					
					updateTileList();
					blit();
		}
	});
	layerList = new LayerList($("#layerlist"),gDrawing, {
		update: function (index) {
			gDrawing.setLayer(index);
		},
		updateBlendMode: function (index,blendMode) {
			gDrawing.setBlendMode(index,blendMode);
  		blit();
		}
	});

	updateTileList();
}


// renders the tilelist.
function updateTileList() {
	var cc = colorList.getSelectedColors();
	var flipX=flip_h.val();
	var flipY=flip_v.val();
	var flipC=flip_c.val();
	
	$("#tilelist").html('');
	$("#tilelist").append(tileManager.setSelector());
	$("#tilelist").append($('<br/>'));
	
	for (var i=0; i<tileManager.getSet().numberOfCards;i++) {
		var c=document.createElement("canvas");
		c.width = 80
		c.height = 80
		
		if (! tileManager.render(c,tileManager.getSet(),i,cc.color1,cc.color2,flipX,flipY,flipC)) break;
		var dataUrl =  c.toDataURL("image/png");
		var img = document.createElement('img');
		img.src = dataUrl;
		var o = $(img).data( { setId: 1, tileId: i });
		//mainCardset.tiles[i]=o;
		$("#tilelist").append(o);
	}

}



function setupCanvas() {
	backbuffer = document.createElement("canvas")
	backbuffer.width= 480;
	backbuffer.height = 480;
	
	// update: called whenever the selected tile changes, to update the controls.
	// redraw: called whenever a tile needs redrawing.
	gDrawing=new Drawing(6,6,{
		
		update: function (tile)   {
		  console.log("updating controls with tile",tile);
			flip_h.val(tile.flipX);
			flip_v.val(tile.flipY);
			flip_c.val(tile.flipColor);
			if (tile.colorIndex!=null) colorList.selectedIndex=tile.colorIndex;
			colorList.update();
			layerList.update();
			if (tile.activeSet != null) tileManager.activeSet = tile.activeSet;
			updateTileList();
		},
		
	  redraw: function(x,y,tilelayers,layers) {
	    
	    // first render all layers into one canvas.
	    var cvs = document.createElement("canvas");
	    cvs.width =80;
	    cvs.height = 80;
	    var ctx = cvs.getContext("2d");
			//ctx.fillStyle="rgb(128,128,128)"
			//ctx.fillRect(0,0,cvs.width,cvs.height);
			for (var i=0;i<layers.length;i++) {
				ctx.globalCompositeOperation=layers[i].blend;
				tile = tilelayers[i];
				if (tile != null && tile.tileId != null) {
					
					ctx.drawImage(tileManager.produceTile(tile.activeSet,tile.tileId,tile.colors,80,80,tile.flipX,tile.flipY,tile.flipColor),0,0);
				
				}
			}
			// blit this canvas in the backbuffer. 
			var ctx2=backbuffer.getContext("2d");
			ctx2.fillStyle="rgb(128,128,128)"
			ctx2.fillRect(x*80,y*80,cvs.width,cvs.height);
			ctx2.drawImage(cvs,x*80,y*80);
	  }
	});
	
	// start with grey background.
	gCanvas = document.getElementById("mainCanvas");
	var ctx =backbuffer.getContext("2d");
	ctx.fillStyle="rgb(128,128,128)"
	ctx.fillRect(0,0,backbuffer.width,backbuffer.height);
	blit(); 
}


function setupCursor() {
  /*
	window.setInterval(function () {
		blit(); 
	},500);
	*/
	blit();
	// reposition cursor when clicked on main canvas.
	$("#mainCanvas").click(function (e) {
		var x = e.clientX - gCanvas.offsetLeft;
    	var y = e.clientY - gCanvas.offsetTop;
    	cursorX = Math.floor(x/80);
    	cursorY = Math.floor(y/80); 		
    	gDrawing.selectTile(cursorX,cursorY);
    	blit();
	});
}



$(document).ready(function () {

	
	console.log("go for it");
	setupCanvas();
	setupControls()
	setupCursor();
});


