let canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let backButton = document.querySelector('.back-btn')

// Create basket
let basketX = canvas.width / 2;
let basketY = canvas.height - 60;
let basketImage = new Image();
basketImage.src = './img/basket.png';

//create scoreBoard
let scoreX= (canvas.width - 110);
let scoreY= 20;
let scoreImg= new Image();
scoreImg.src= './img/scoreBoard.png'
let scoreTextX=(canvas.width - 50)
let scoreTextY= 50

// Create fruits
let fruitX = Math.random() * (canvas.width - 50);
let fruitY = 0;
let fruit2X = Math.random() * (canvas.width-50);
let fruit2Y = 0;
let fruit3X = Math.random() * (canvas.width-50);
let fruit3Y = 0;

// Create obstacles
let obstacleX = Math.random() * (canvas.width-50);
let obstacleY = 0;
let obstacle2X = Math.random() * (canvas.width-50);
let obstacle2Y = 0;


// Create variables
let score = 0;
let startTime = Date.now();
let coins=100;

// Create event listener
document.addEventListener('touchstart', backButton);
document.addEventListener('touchend', backButton);
document.addEventListener('touchstart', moveBasket);
document.addEventListener('touchend', moveBasket);
document.addEventListener('touchmove', moveBasket);

backButton.addEventListener('click',()=>{
  window.close();
})

// Move basket
function moveBasket(e) {
    let touchX = e.clientX || e.changedTouches[0].clientX;
    if (touchX < canvas.width / 2 && basketX > 0) {
        basketX -= 10;
    }
    else if (touchX > canvas.width / 2 && basketX < canvas.width - 100) {
        basketX += 10;
    }
}
    // Create background
let backgroundImage = new Image();
backgroundImage.src = './img/back.png';

// Draw on canvas
function draw() {
    let ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw background
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    //draw back button
    // ctx.drawImage(backBtnImg,backBtnX,backBtnY,20,20);

    //draw score Board button
    ctx.drawImage(scoreImg,scoreX,scoreY,100,45);
    ctx.font='20px Broadway'
    ctx.fillText(score,scoreTextX,scoreTextY)
    
    // Draw fruits
    let fruitXimg = new Image();
    fruitXimg.src = './img/fruit.png';
    let fruit2Ximg = new Image();
    fruit2Ximg.src = './img/fruit2.png';
    let fruit3Ximg = new Image();
    fruit3Ximg.src = './img/fruit3.png';
    ctx.drawImage(fruitXimg, fruitX, fruitY, 50, 50);
    ctx.drawImage(fruit2Ximg, fruit2X, fruit2Y, 50, 50);
    ctx.drawImage(fruit3Ximg, fruit3X, fruit3Y, 50, 50);
    
    // Draw obstacles
    let obstacle1Image = new Image();
    obstacle1Image.src = './img/obstacle1.png';
    let obstacle2Image = new Image();
    obstacle2Image.src = './img/obstacle2.png';
    ctx.drawImage(obstacle1Image, obstacleX, obstacleY, 40, 40);
    ctx.drawImage(obstacle2Image, obstacle2X, obstacle2Y, 40, 40);
    
    // Draw basket
    ctx.drawImage(basketImage, basketX, basketY, 120, 50);
    
    // Move fruits
    let speed = 4 + (score * 0.04);
    let speed2 = 5 + (score * 0.04);
    let speed3 = 4 + (score * 0.04);
    fruitY += speed;
    fruit2Y += speed2;
    fruit3Y += speed3;

    // Move obstacles
    obstacleY += 2.5 + (score * 0.04);
    obstacle2Y += 3 + (score * 0.04);

    // Check if fruit is caught
    if (fruitX > basketX && fruitX < basketX + 130 && fruitY > basketY && fruitY < basketY + 230) {
        score += 2;
        fruitX = Math.random() * canvas.width;
        fruitY = 0;
    }
    if (fruit2X > basketX && fruit2X < basketX + 130 && fruit2Y > basketY && fruit2Y < basketY+ 230) {
        score += 3;
        fruit2X = Math.random() * canvas.width;
        fruit2Y = 0;
    }
    if (fruit3X > basketX && fruit3X < basketX + 130 && fruit3Y > basketY && fruit3Y < basketY+ 230) {
        score += 4;
        fruit3X = Math.random() * canvas.width;
        fruit3Y = 0;
    }

    // Check if obstacle is caught
    if (obstacleX > basketX && obstacleX < basketX + 130 && obstacleY > basketY && obstacleY < basketY + 230) {
        score--;
        obstacleX = Math.random() * canvas.width;
        obstacleY = 0;
    }
    if (obstacle2X > basketX && obstacle2X < basketX + 130 && obstacle2Y > basketY && obstacle2Y < basketY + 230) {
        score-=2;
        obstacle2X = Math.random() * canvas.width;
        obstacle2Y = 0;
    }

    // Check if fruit is out of bounds
    if (fruitY > canvas.height) {
        fruitX = Math.random() * canvas.width;
        fruitY = 0;
    }
    if (fruit2Y > canvas.height) {
        fruit2X = Math.random() * canvas.width;
        fruit2Y = 0;
    }
    if (fruit3Y > canvas.height) {
        fruit3X = Math.random() * canvas.width;
        fruit3Y = 0;
    }

    // Check if obstacle is out of bounds
    if (obstacleY > canvas.height) {
        obstacleX = Math.random() * canvas.width;
        obstacleY = 0;
    }
    if (obstacle2Y > canvas.height) {
        obstacle2X = Math.random() * canvas.width;
        obstacle2Y = 0;
    }

    // Check if time is 10 sec
    let currentTime = Date.now();
    let elapsedTime = currentTime - startTime;
    if (elapsedTime >= 10000) {
        let endCard = document.createElement('div');
        endCard.innerHTML=`
        <div class="notifContainer">
            <div class="notifWin">
            <h2>Congratulations !!</h2>
            <br />
            <br />
            <div class="scoreNotifContainer">
                <img src="./img/coinsSymbol.png" alt="" class="notifCoin" />
                <p>${score}.</p>
            </div>
            <br />
            <br />
            <div class="notifBtn">
                <button class="close-btn">
                <img src="./img/home.png" alt="" />
                </button>
                <button class="reset-btn">
                <img src="./img/restart.png" alt="" />
                </button>
            </div>
            </div>
        </div>`;
        document.body.appendChild(endCard);
        const closeButton = document.querySelector('.close-btn');
        const resetButton = document.querySelector('.reset-btn');
        closeButton.addEventListener('click', function() {
            window.parent.postMessage(coins, '*');
            window.close();
        });
        resetButton.addEventListener('click', function() {
            document.body.removeChild(endCard);
            score=0;
            startTime = Date.now();
            draw();
        });
        return;
    }

    // Call draw function
    requestAnimationFrame(draw);
}
// Call draw function
draw();