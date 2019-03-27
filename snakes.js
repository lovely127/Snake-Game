// snake game
//game loop - init , draw , update,
function init()
{
 //console.log("Init");
 canvas = document.getElementById('mycanvas'); 
 pen = canvas.getContext('2d');
 W = canvas.width;
 H = canvas.height;
game_over = false;
food = getRandomFood();
score = 5;

 snake = {
   init_length:5,
   color:"yellow",
   cells:[],     //array of objects
   direction:"right",

   createSnake:function()
   {
   	for(var i=this.init_length-1;i>=0;i--)
   	{
      this.cells.push({x:i,y:0});
   	}
   },
   drawSnake:function(){
   	for(var i =0;i<this.cells.length;i++){
   		pen.fillStyle = this.color;
   		pen.lineWidth =5;
   		pen.strokeStyle = "black";//for border of snake
   		pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
   		pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
   		
   	}
   },
   updateSnake:function(){
   	var headX = this.cells[0].x;
   	var headY = this.cells[0].y;

   	//Assuming snake is moving in right direction
   	//insertion at head
   	nextHeadX = headX +1;
   	//this.cells.pop();
   	//this.cells.unshift({x:nextHeadX,y:headY});
    if(headX==food.x && headY==food.y){
    	food = getRandomFood();
    	score++;
    }
    else{
    	this.cells.pop();//pop last cell if food is eaten
    }




   
   if(this.direction =="right"){
   	nextX = headX +1;
   	nextY = headY;
   }
   else if(this.direction=="left"){
   	nextX = headX-1;
   	nextY = headY;
   }
   else if(this.direction =="down"){
   	nextX = headX;
   	nextY = headY +1;
   }
   else{
   	nextX = headX;
   	nextY = headY -1;
   }
 //insert the new cell at head or front
 this.cells.unshift({x:nextX,y:nextY});

 //find out the last cordinate(boundries)
  var last_x = Math.round(W/10);
  var last_y = Math.round(H/10); 
  if(this.cells[0].y<0 || this.cells[0].x<0||
  	this.cells[0].x>last_x||this.cells[0].y>last_y){
  	alert("Gameover");
    game_over = true;
  }


   }
 };
snake.createSnake();
//Add eventlisteners to our game means snake hmare according move kre
//listen for keyboard events

function keypressed(e){
	console.log("you pressed a key");
	console.log(e);

	if(e.key=="ArrowRight"){
		snake.direction = "right";
	}
	else if(e.key=="ArrowLeft"){
		snake.direction = "left";
	}
	else if(e.key=="ArrowDown"){
		snake.direction = "down";
	}
	else{
		snake.direction = "up";
	}
}

document.addEventListener('keydown',keypressed);

}



function draw()
{
pen.clearRect(0,0,W,H);
 //console.log("draw");
 snake.drawSnake();

 //draw the food
 
 pen.fillStyle = food.color;

 pen.fillRect(food.x*10,food.y*10,10,10);
 pen.fillStyle = "white";
 pen.font = "14px Roboto";
 pen.fillText("Score : "+score,10,10);
}



function update()
{
 console.log("update");
 snake.updateSnake();
}



//draw or update ko baar baar call krna padega
function gameloop()
{
	//init();
	draw();
    update();
    if(game_over==true){
    	clearInterval(f);
    }
}

function getRandomFood(){
	var foodX = Math.round(Math.random()*(W-10)/10);
	var foodY = Math.round(Math.random()*(H-10)/10);

   foodColors = ["red","green","aqua","coral","orchid"];
   var i = Math.round(Math.random()*foodColors.length);

   var food ={

   	x:foodX,
   	y:foodY,
   	color:foodColors[i],
   };

   return food;
}

init();
//gameloop();
//call gameloop after t time
var f = setInterval(gameloop,100);