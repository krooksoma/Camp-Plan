'use strict'

const changeBackgroundEl = document.querySelector('#hero')
const imgs = ['assets/img/Alaska.jpg', 'assets/img/GrandCanyon.jpg', 
'assets/img/nPark.jpg', 'assets/img/Rockies.jpg', 'assets/img/Yosemite.jpg'];

changeBackgroundEl.style.backgroundImage = `url(${imgs[0]})`;


let i = 1;




let internalTimer = setInterval(()=>{
    
    if(i < 5){
        changeBackgroundEl.style.backgroundImage = `url(${imgs[i]})`;
        console.log(imgs[i]);
        changeBackgroundEl.style.animationName = 'animate';
        changeBackgroundEl.style.animationDuration = '3s';
   
    i++;
    }else{
        i = 0;
    }


}, 7000);


