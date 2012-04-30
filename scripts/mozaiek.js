
 var gCanvas;
 var gDrawing={};
 var backbuffer;
 var blink = 0;
 var cursorX = 0;
 var cursorY= 0;
 var tileManager;
 var colorList;


function blit(hideCursor) {
	var ctx = gCanvas.getContext("2d");
	ctx.drawImage(backbuffer,0,0)
	blink =  1;
	if (hideCursor ) return;
	ctx.fillStyle='rgba(255,255,255,0.75)'
	ctx.fillRect(cursorX*80,cursorY*80,80,80);
}

/** setTile can be called in 2 instances:
    when the tile needs redrawing because a different color was selected.
    when a tile is picked.
    
    current implementation: tileID == null: different color selected,
    fetch all attributes from model except color. tileId != null: different tile Selected.
    take all input from function parameters (is gui controls).
    
    
    target implementation: whenever the selection changes update all controls with value of the tile.
    whenever any control (or tile) is clicked, always use all values from the control.
    that way, it is not neccesary to track what the user has changed an what not.
    
    problem: colorlist = do we need to update all tiles when something in the colorlist changes?
    
    
     
 */
function setTile(activeSet,tileId,x,y,flipX,flipY) {
	return; // dead code
	
  console.log("FLIP "+flipX+" "+flipY);
	var ctx = backbuffer.getContext("2d");
	var colors = colorList.getSelectedColors();
	if (tileId==null) {
			if (gDrawing[y][x]) {
				tileId=gDrawing[y][x].tileId;
				activeSet=gDrawing[y][x].activeSet;
				flipX=gDrawing[y][x].flipX;
				flipY=gDrawing[y][x].flipY;
			}
	}
	if (tileId !=null) ctx.drawImage(tileManager.produceTile(activeSet,tileId,colors,80,80,flipX,flipY),x*80,y*80);
	gDrawing[y][x] = {
	  activeSet: activeSet,
		tileId: tileId,
		colors: colors,
		flipX : flipX,
		flipY : flipY
	}
	blit();
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
				flipX: ($("#flip_h").attr('checked') != null),
				flipY: ($("#flip_v").attr('checked') != null),
				activeSet: tileManager.activeSet,
				tileId: img.data('tileId'),
				colorIndex: colorList.selectedIndex, 
				colors: colorList.getSelectedColors()
		});
		blit();
	});
	
	$("#flip_h").change(function (e) {
			gDrawing.writeTile(cursorX,cursorY,{ flipX: ($("#flip_h").attr("checked") != null) }); 	
			blit();
			updateTileList();
	});
	$("#flip_v").change(function (e) {
			gDrawing.writeTile(cursorX,cursorY,{ flipY: ($("#flip_v").attr("checked") != null) }); 	
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
	updateTileList();
}


// renders the tilelist.
function updateTileList() {
	var cc = colorList.getSelectedColors();
	var flipX=($("#flip_h").attr("checked") != null);
	var flipY=($("#flip_v").attr("checked") != null );
	
	$("#tilelist").html('');
	$("#tilelist").append(tileManager.setSelector());
	$("#tilelist").append($('<br/>'));
	
	for (var i=0; i<tileManager.getSet().numberOfCards;i++) {
		var c=document.createElement("canvas");
		c.width = 80
		c.height = 80
		if (! tileManager.render(c,tileManager.getSet(),i,cc.color1,cc.color2,flipX,flipY)) break;
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
			$("#flip_h").attr("checked",tile.flipX);
			$("#flip_v").attr("checked",tile.flipY);
			if (tile.colorIndex!=null) colorList.selectedIndex=tile.colorIndex;
			colorList.update();
			if (tile.activeSet != null) tileManager.activeSet = tile.activeSet;
			updateTileList();
		},
		
	  redraw: function(x,y,tile) {
			var ctx = backbuffer.getContext("2d");
			if (tile.tileId !=null)  {
				ctx.drawImage(tileManager.produceTile(tile.activeSet,tile.tileId,tile.colors,80,80,tile.flipX,tile.flipY),x*80,y*80);
	  	}
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
	setupControls()
	setupCanvas();
	setupCursor();
});


