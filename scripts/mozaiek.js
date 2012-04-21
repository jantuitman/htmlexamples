(function () {

 var gCanvas;
 var backbuffer;
 var blink = 0;
 var cursorX = 0;
 var cursorY= 0;
 var mainCardset;


function blit(forceCursor) {
	var ctx = gCanvas.getContext("2d");
	ctx.drawImage(backbuffer,0,0)
	blink =  1 - blink;
	if (blink || forceCursor ) {
		ctx.fillStyle='rgba(255,255,255,0.75)'
		ctx.fillRect(cursorX*80,cursorY*80,80,80);
		// next time we want the cursor to hang around if the forceCursor = true.
		if (forceCursor) blink = 0;	
	}	
}

function setTile(tileId,x,y) {
	var ctx = backbuffer.getContext("2d");
	ctx.drawImage(mainCardset.tiles[tileId].get(0),x*80,y*80);
	blit();
}


function setupList() {
	mainCardset = new CardSet1();
	mainCardset.tiles={};
	
	for (var i=0; i<mainCardset.numberOfCards;i++) {
		var c=document.createElement("canvas");
		c.width = 80
		c.height = 80
		if (! mainCardset.render(c,i,'rgb(255,0,0)','rgb(0,255,0)')) break;
		var dataUrl =  c.toDataURL("image/png");
		var img = document.createElement('img');
		img.src = dataUrl;
		
		var o = $(img).data( { setId: 1, tileId: i });
		mainCardset.tiles[i]=o;
		$("#tilelist").append(o);
		
	}
	
	$(document).on("click","#tilelist img",function (e) {
		var img = $(e.target)
		setTile(img.data('tileId'),cursorX,cursorY);
	});
}


function setupCanvas() {
	backbuffer = document.createElement("canvas")
	backbuffer.width= 480;
	backbuffer.height = 480;
	
    gCanvas = document.getElementById("mainCanvas");
    
    var ctx =backbuffer.getContext("2d");
    ctx.fillStyle="rgb(128,128,128)"
    ctx.fillRect(0,0,backbuffer.width,backbuffer.height);
    
    blit(); 
}


function setupCursor() {
	window.setInterval(function () {
		blit(); 
	},500);
	
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
	setupList()
	setupCanvas()
	setupCursor();
});


})()