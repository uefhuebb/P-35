var ball;
function preload(){
    bg=loadImage('bg1.png')
    ballImg=loadImage('bg2.png')
}
function setup(){
    database=firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.addImage(ballImg);
    ball.scale=0.5;
    var ballPosition=database.ref('ball/position');
    ballPosition.on('value',readPosition,showError);//on means reading from the database whenever the position changes
}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
function readPosition(data){
    pos=data.val();
    
    ball.x=pos.x;
    ball.y=pos.y;
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x' : pos.x + x,
        'y' : pos.y + y
    })
    
}
function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function showError(){
    text('error');
}
