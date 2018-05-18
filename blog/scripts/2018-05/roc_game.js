var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.strokeStyle="black";

var a = 1 + Math.random()*2

var goodx = [-50];
var badx = [-50];
var gunx = 500;
var ROCx = [0];
var ROCy = [0];
var W = 600;
var H = 520;

var lastGoods = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var lastBads = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var speed = 5;
var gunx = 400;

var goodExplosionTimer = 0;
var badExplosionTimer = 0;
var threshold = 0;
var barrelLength = [30, 30];
var fireworks = [];

// Standard Normal variate using Box-Muller transform from StackOverflow
function randn() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}




var renderCanvas = function(ctx){

	ctx.fillStyle="white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        threshold = (slider.value/100)*(a + 4) + (1-slider.value/100)*(-4);

	for (var i=0; i < goodx.length; i++){

		if (Math.abs(goodx[i] - gunx*canvas.width/W) < speed/2 && randn() + a < threshold){

			// check whether shot down

			goodx.splice(i, 1);
                        lastGoods.push(1);
			lastGoods.splice(0, 1);
			goodExplosionTimer += speed*2;

		}

	}

	

    for (var i=0; i < goodx.length; i++){		

        drawPlane(goodx[i], 50, "green", 1);

		if (goodx[goodx.length-1] > W){

			goodx.pop();

			lastGoods.push(0);

			lastGoods.splice(0, 1);

		}

		goodx[i] += speed;

	}	

	if (goodx[0] >= 0){

		goodx.unshift(-160 + Math.floor(30*Math.random()));

	}

	//console.log(goodx);

	//console.log(lastBads);

	

	/*if (lastGoods[lastGoods.length - 1] > 0){

		drawExplosion(gunx, 50, 1);

	} */




    for (var i=0; i < badx.length; i++){

		

		if (Math.abs(badx[i] - gunx) < speed/2 && randn() < threshold){

			// check whether shot down

			badx.splice(i, 1);

			lastBads.push(1);

			lastBads.splice(0, 1);

			badExplosionTimer += speed*2;

		}

	}

	

    for (var i=0; i < badx.length; i++){

        drawPlane(badx[i], 160, "grey", 1);

		if (badx[badx.length-1] > W){

			badx.pop();

			lastBads.push(0);

			lastBads.splice(0, 1);

		}

		badx[i] += speed;

		if (Math.abs(badx[i] - gunx) < speed/2){

			// check whether shot down

		}

	}

	if (badx[0] >= 0){

		badx.unshift(-160 + Math.floor(10*Math.random()));

	}

	

	if (goodExplosionTimer > 0){

		drawExplosion(gunx, 50, 1);

		goodExplosionTimer -= 1;

		barrelLength[0] = 25;

	}

	

	if (badExplosionTimer > 0){

		drawExplosion(gunx, 160, 1);

		badExplosionTimer -= 1;

		barrelLength[1] = 25;

	}	

	

	if (badExplosionTimer < 1 && goodExplosionTimer < 1){

		barrelLength = [30, 30];

	}

	

	drawGun(gunx, barrelLength);




	drawTable();

	

	drawROCCurve(ctx, ROCx, ROCy, lastGoods, lastBads);

	

	if (fireworks.length > 0){

		for (var i=0; i < fireworks.length; i++){

			drawExplosion(fireworks[i][0], fireworks[i][1], 2.5);

		}

		if (fireworks.length < 500){

		   fireworks.push([Math.floor(Math.random()*W), Math.floor(Math.random()*H)]);	

		}

		ctx.save();

		ctx.font = "100px Arial";

		ctx.fillStyle = "white";

		ctx.fillText("You win!!", 100, 300);

		ctx.stroke();

		ctx.restore();

	}

	

	

}







var drawPlane = function(x, y, colour, scale){




	ctx.fillStyle=colour;

	ctx.strokeStyle=colour;

	//ctx.lineWidth=0;

    ctx.fillRect(x, y-10*scale, 10*scale, 30*scale);

	//ctx.stroke();

	ctx.fillRect(x, y, 60*scale, 10*scale);

	//ctx.stroke();

	//ctx.fillRect(x+30, y-30, 10, 70);

	ctx.beginPath();

	ctx.fillStyle=colour;

	ctx.strokeStyle=colour;

	ctx.moveTo(x+30*scale, y-30*scale);

	//ctx.lineTo(x+40, y);

	//ctx.lineTo(x+40, y+10);

	ctx.lineTo(x+30*scale, y+40*scale);

	ctx.lineTo(x+40*scale, y+40*scale);

	ctx.lineTo(x+50*scale, y+10*scale);

	ctx.lineTo(x+50*scale, y);

	ctx.lineTo(x+40*scale, y-30*scale);

	ctx.stroke();

	ctx.closePath();

	ctx.fill();

	ctx.strokeStyle=colour;

	//console.log(ctx.strokeStyle);

	ctx.stroke();




}




var drawExplosion = function(x, y, scale){

	ctx.fillStyle="red";

	ctx.strokeStyle="red";

    n = 20;

	r = [];

	for (var i=0; i<50; i++){

		var radius=10*scale;

		if (i % 2 == 0){

			radius = Math.floor(Math.random()*50*scale + 10*scale);

		}

		r.push(radius);

	}

	//console.log(r);

	ctx.beginPath();

	ctx.moveTo(x + r[0]*Math.cos(2*Math.PI*0), y + r[0]*Math.sin(2*Math.PI*0));

	for (var i=1; i<n; i++){

		ctx.lineTo(x + r[i]*Math.cos(2*Math.PI*i/n), y + r[i]*Math.sin(2*Math.PI*i/n));

	}

	ctx.closePath();

	ctx.fill();

	//ctx.stroke();

	

	ctx.fillStyle="yellow";

	ctx.strokeStyle="yellow";

	ctx.beginPath();

	ctx.moveTo(x + r[0]*Math.cos(2*Math.PI*0)/5, y + r[0]*Math.sin(2*Math.PI*0)/5);

	for (var i=1; i<n; i++){

		ctx.lineTo(x + r[i]*Math.cos(2*Math.PI*i/n)/5, y + r[i]*Math.sin(2*Math.PI*i/n)/5);

	}

	ctx.closePath();

	ctx.fill();

	//ctx.stroke();

}




var drawGun = function(gunx, barrelLength){

	ctx.fillStyle = "black";

	//ctx.strokeStyle = "black";

	ctx.fillRect(gunx-20, 250, 40, 10);

	ctx.fillRect(gunx - 10, 250, 5, -barrelLength[0]);

	ctx.fillRect(gunx + 5, 250, 5, -barrelLength[1]);

}




var drawROCCurve = function(ctx, ROCx, ROCy, lastGoods, lastBads){

	

	var fpr = 0;

    var	tpr = 0;

	for (var i=0; i < lastGoods.length; i++){

		fpr += lastGoods[i];

		tpr += lastBads[i];

	}

	fpr = fpr/lastBads.length;

	tpr = tpr/lastGoods.length;




	var score = 0;

    for (var i=0; i < lastGoods.length; i++){

		score += (lastGoods[i] == 1 ? 1 : 0);

		score += (lastBads[i] == 0 ? 1 : 0);

	}

	score = score/40;

	

	//score = 10*Math.floor(100*(idealScore/score));

	//document.getElementById("score").innerHTML = score;	




    if (fpr != ROCx[ROCx.length - 1] || tpr != ROCy[ROCy.length - 1]){

	   ROCx.push(fpr);

	   ROCy.push(tpr);

    }

	

	if (tpr > 0.99 && fpr < 0.01){

		fireworks.push([0,0]);

	}

	

	//console.log(ROCx);

	//console.log(ROCy);

	

	ctx.strokeStyle = "black";

	ctx.lineWidth = 2;

	ctx.strokeRect(20-2, 300-2, 200+2, 200+2);

	

	ctx.strokeStyle = "red";

    ctx.beginPath();

	ctx.moveTo(20, 500);

	for (var i = 0; i < ROCx.length; i++){

		ctx.lineTo(ROCx[i]*200 + 20, -ROCy[i]*200 + 500);

	}

	//ctx.closePath();

	ctx.stroke();

	

	ctx.beginPath();

	//ctx.beginPath();;

	ctx.arc(ROCx[ROCx.length - 1]*200 + 20, -ROCy[ROCy.length - 1]*200 + 500, 5, 0, 2*Math.PI, true);

	//ctx.closePath();

	//ctx.arc(200, 300, 30, 0, 2*Math.PI);

	ctx.fillStyle="red";

	ctx.fill();

	ctx.stroke();




	

	ctx.lineWidth = 2;

	

	ctx.fillStyle = "black";

	ctx.font = "25px Arial";

	ctx.fillText("ROC Space", 20, 290);

	

	ctx.font = "10px Arial";

	ctx.fillText("0", 10, 510);

	ctx.fillText("1", 10, 300);

    ctx.fillText("1", 220, 510);

	

	ctx.strokeStyle="black";

	

}




var drawTable = function(){

	ctx.beginPath();

	ctx.strokeStyle = "black";

	ctx.moveTo(400, 500);

	ctx.lineTo(400, 300);

	

	ctx.moveTo(490, 500);

	ctx.lineTo(490, 300);	

	ctx.stroke();

	

	ctx.moveTo(580, 500);

	ctx.lineTo(580, 300);	

	ctx.stroke();

	

	ctx.moveTo(340, 350);

	ctx.lineTo(580, 350);

	ctx.stroke();

	

	ctx.moveTo(340, 425);

	ctx.lineTo(580, 425);

	ctx.stroke();

	

	ctx.moveTo(340, 500);

	ctx.lineTo(580, 500);

	ctx.stroke();

	

	drawPlane(350, 380, "green", 0.5);

	drawPlane(350, 460, "grey", 0.5);

	

	ctx.fillStyle="black";

	ctx.font = "20px Arial";

	ctx.fillText("Safe", 420, 330);

	ctx.fillText("Downed", 500, 330);

	

	var sumLastGoods = 0;

	for (var i =0; i < lastGoods.length; i++){

		sumLastGoods += lastGoods[i];

	}

	

	var sumLastBads = 0;

	for (var i =0; i < lastBads.length; i++){

		sumLastBads += lastBads[i];

	}

	

	ctx.fillText(lastGoods.length - sumLastGoods, 435, 390);

	ctx.fillText(sumLastGoods, 525, 390);

	ctx.fillText(lastBads.length - sumLastBads + "", 435, 465);

	ctx.fillText(sumLastBads + "", 525, 465);




}




var slider = document.getElementById("myRange");

var output = document.getElementById("demo");

//output.innerHTML = slider.value;




setInterval("renderCanvas(ctx)", 20);
