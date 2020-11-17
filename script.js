const yourShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const aliensImg = ['img/monster-1.png','img/monster-2.png','img/monster-3.png'];
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
let alienInterval;


function flyShip(event){
    if (event.key === 'ArrowUp'){
        event.preventDefault();
        moveUp();
    }else if(event.key === 'ArrowDown'){
        event.preventDefault();
        moveDown();
    }else if(event.key === ' '){
        event.preventDefault();
        fireLaser();
    }
}
function moveDown(){
    let topPos = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPos >= '510px'){
        return
    }else{
        let position = parseInt(topPos);
        position += 50;
        yourShip.style.top = `${position}px`;
    }
}
function moveUp(){
    let topPos = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPos === '0px'){
        return
    }else{
        let position = parseInt(topPos);
        position -= 50;
        yourShip.style.top = `${position}px`;
    }
}
function fireLaser(){
    let laser = createLaserElement ();
    playArea.appendChild(laser);
    moveLaser(laser);
}
function createLaserElement(){
    let yPos = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let xPos = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let newLaser = document.createElement('img');
    newLaser.src='img/shoot.png';
    newLaser.classList.add('laser');
    newLaser.style.left = `${xPos}px`;
    newLaser.style.top = `${yPos -10}px`;
    return newLaser;
}
function moveLaser(laser){
    let laserInterval = window.setInterval(()=>{
        let xPos = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');
        aliens.forEach((alien)=>{
            if(checkLaserCollidion(laser,alien)){
                alien.src= 'img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
            }
        })
        if(xPos === 340){
            laser.remove();
        }else{
            laser.style.left = `${xPos+8}px`;
        }

        },10);
    
}
function createAliens(){
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random()*aliensImg.length)];
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '370px';
    newAlien.style.top = `${Math.floor(Math.random()*330+30)}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

function moveAlien(alien){
    let moveAlienInterval = setInterval(()=>{
        let xPos  = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
        if(xPos<=50){
            if(Array.from(alien.classList.includes('dead-alien'))){
                alien.remove();    

            }else{
                gameOver();
            }
        }else{
            alien.style.left=`${xPos-4}px`;
        }

    },30);
}
function checkLaserCollidion(laser,alien){
    let laserTop  = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBotton = laserTop - 20;
    let alienTop  = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBotton = alienTop - 30;
    if(laserLeft!=340 && laserLeft+40 >=alienLeft){
        if(laserBotton<=alienTop && laserTop >=alienBotton){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}
startButton.addEventListener('click',(event)=>{
    playGame();
})
function playGame(){
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown',flyShip);
    alienInterval = setInterval(() => {
        createAliens()
    }, 2000);
    
}

function gameOver(){
    window.removeEventListener('keydown',flyShip);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien)=>alien.remove());
    let laser =document.querySelectorAll('.laser');
    laser.forEach((laser)=>laser.remove());
    setTimeout(() => {
     
        alert('Game Over!');
        yourShip.style.top = '250px';
        startButton.style.display = 'block';
        instructionsText.style.display = 'block';

    });
    
}
