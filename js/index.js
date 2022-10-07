let inputDir = { x: 0, y: 0 };
let speed = 4;
let lastPaintTime = 0;
let score=0;
let snakePos = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };

function main(ctime) {
    window.requestAnimationFrame(main);    //kind of recursion without any glitch
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    // console.log(ctime);
}

function isCollide(arr){
    for(let i =1; i<snakePos.length; i++){
        if(arr[i].x === arr[0].x && arr[i].y === arr[0].y){
            return true;
        }
    }
        if(arr[0].x >= 18 || arr[0].x <= 0 || arr[0].y >= 18 || arr[0].y <=0)
        {return true;}
}

function gameEngine() {
    if (isCollide(snakePos)) {
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press Any key to play again.");
        snakePos= [{x: 13, y: 15}];
        score=0;
    }
    
    if(snakePos[0].y===food.y&&snakePos[0].x===food.x)
    {
        score +=1;
        scoreBox.innerHTML= "Score :" + score;
        snakePos.unshift({x:snakePos[0].x+inputDir.x, y: snakePos[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }

    for(let i=snakePos.length - 2; i>=0; i--){
        snakePos[i+1]={...snakePos[i]};
    }

    snakePos[0].x += inputDir.x;
    snakePos[0].y += inputDir.y;
    

    //Display Snake
    board.innerHTML = "";
    snakePos.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //Display Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUP")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
})