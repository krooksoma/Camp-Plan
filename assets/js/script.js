'use strict'

const changeBackgroundEl = document.querySelector('body')

function changeBackground (){


    let imgs = ["https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg","./assets/img/Alaska.jpg",
     "./assets/img/GrandCanyon.jpg", "./assets/img/nPark", './assets/img/Rockies.jpg', './assets/img/Yosemite.jpg'];

    let internalTimer = setInterval(()=>{

        for(let i = 0; i < imgs.length;i++){
            changeBackgroundEl.style.backgroundImage = imgs[i];
            console.log('working here as well');
        }
        console.log("looping")

    }, 5000);

    

}

changeBackground();