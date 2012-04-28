(function () {

 var gCanvas;
 var gDrawing={};
 var backbuffer;
 var blink = 0;
 var cursorX = 0;
 var cursorY= 0;
 var tileManager;
 var colorList;


function blit(forceCursor) {
	var ctx = gCanvas.getContext("2d");
	ctx.drawImage(backbuffer,0,0)
	blink =  1;
	if (blink || forceCursor ) {
		ctx.fillStyle='rgba(255,255,255,0.75)'
		ctx.fillRect(cursorX*80,cursorY*80,80,80);
		// next time we want the cursor to hang around if the forceCursor = true.
		if (forceCursor) blink = 0;	
	}	
}

function setTile(activeSet,tileId,x,y) {
	var ctx = backbuffer.getContext("2d");
	var colors = colorList.getSelectedColors();
	if (tileId==null) {
			if (gDrawing[y][x]) {
				tileId=gDrawing[y][x].tileId;
				activeSet=gDrawing[y][x].activeSet;
			}
	}
	if (tileId !=null) ctx.drawImage(tileManager.produceTile(activeSet,tileId,colors,80,80),x*80,y*80);
	gDrawing[y][x] = {
	  activeSet: activeSet,
		tileId: tileId,
		colors: colors
	}
	blit();
}


function setupControls() {
	tileManager = new CardManager({
			update: function () {
				updateTileList();
			}
	});
	//mainCardset.tiles={};
	//tileManager.activeSet=0;
	
	$(document).on("click","#tilelist img",function (e) {
		var img = $(e.target)
		setTile(tileManager.activeSet,img.data('tileId'),cursorX,cursorY);
	});
	
	
	// color list
	colorList = new ColorList($('#colorlist'), {
		update: function () {
					setTile(null,null,cursorX,cursorY);		
					updateTileList();
		}
	});
	updateTileList();
}

function updateTileList() {

	// tilelist
	var cc = colorList.getSelectedColors();
	$("#tilelist").html('');
	$("#tilelist").append(tileManager.setSelector());
	$("#tilelist").append($('<br/>'));
	
	for (var i=0; i<tileManager.getSet().numberOfCards;i++) {
		var c=document.createElement("canvas");
		c.width = 80
		c.height = 80
		if (! tileManager.render(c,tileManager.getSet(),i,cc.color1,cc.color2)) break;
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
	
	gDrawing={};
	for (var y=0;y<6;y++) {
		gDrawing[y]={};
	}
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
	$("#mainCanvas").click(function (e) {
		var x = e.clientX - gCanvas.offsetLeft;
    	var y = e.clientY - gCanvas.offsetTop;
    	cursorX = Math.floor(x/80);
    	cursorY = Math.floor(y/80); 		
    	blit(true);
	});
}



$(document).ready(function () {
	
	console.log("go for it");
	setupControls()
	setupCanvas();
	setupCursor();
});


})()