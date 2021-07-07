'use strict'

$(document).ready(function () {

    const changeBackgroundEl = $('.hero');
    const modal = $('modal');
    const closeModalBtn = $('.close-modal'); //create btn on HTML inside modal to close modal
    const overlay = $('.overlay'); //create overlay inside HTML
    const npsKey = 'h6tXDWnmFLuDQHAPIhnXzQKP5pBX66EKu0vrNdFn';
    let searchInput = $('#searchBar');
    const searchSubmit = $('#input-field');
  
    const imgs = ['assets/img/Alaska.jpg', 'assets/img/GrandCanyon.jpg',
        'assets/img/nPark.jpg', 'assets/img/Rockies.jpg', 'assets/img/Yosemite.jpg'];

    changeBackgroundEl.attr('src', `${imgs[0]}`);

    let i = 1;

    // fades out first image
    var timerOut = setTimeout(() => {
        changeBackgroundEl.fadeOut(1000, $);

    }, 7000)

    // call recallTimer every 7 sec


    const recallTimer = () => {
        
        if (i < 5 ) {
            // fades in new image
            changeBackgroundEl.attr('src', `${imgs[i]}`).fadeIn(1000, $);
            i++;
            //  fades out the new image after 6 secs
            var timerOut = setTimeout(() => {
                changeBackgroundEl.fadeOut(1000, $);

            }, 7000)
            // else to resets index value.
        } else{ i = 1 
            changeBackgroundEl.attr('src', `${imgs[0]}`).fadeIn(1000, $);
            var timerOut = setTimeout(() => {
                changeBackgroundEl.fadeOut(1000, $);

            }, 7000)
        };
        
    }

    let internalTimer = setInterval(recallTimer, 8000);

    function closeModal (){
        modal.addClass('hidden');
        overlay.addClass('hidden');
    }

    function revealModal(){
        modal.removeClass('.hidden');
        modal.addClass('modal-open');
    }

    overlay.click(closeModal);
    closeModalBtn.click(closeModal);

    modal.click(revealModal());


    //  put it inside function to call park info
    function fetchParkData(event){
        event.preventDefault();
        let currentSearch = searchInput.val();

      
    fetch(`https://developer.nps.gov/api/v1/parks?q=${currentSearch}&api_key=${npsKey}`)
        .then(function(response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
        })
        
        // search for specific park part
    }


    searchSubmit.submit(fetchParkData);

    function displayData (){


        
    }

});