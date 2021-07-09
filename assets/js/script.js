'use strict'

$(document).ready(function () {

    const changeBackgroundEl = $('.hero');
    const modal = $('.modal');

    const closeModalBtn = $('.close-modal'); //create btn on HTML inside modal to close modal
    const btnOpenModal = $('.show-modal');
    const overlay = $('.overlay'); //create overlay inside HTML
    const npsKey = 'h6tXDWnmFLuDQHAPIhnXzQKP5pBX66EKu0vrNdFn';

    const searchInput = $('#searchBar');
    const searchSubmit = $('#input-field');
    const parkList = $('#park-list');
    let activitiesHere = $('#display-more-info')
    let parkName;

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

        if (i < 5) {
            // fades in new image
            changeBackgroundEl.attr('src', `${imgs[i]}`).fadeIn(1000, $);
            i++;
            //  fades out the new image after 6 secs
            var timerOut = setTimeout(() => {
                changeBackgroundEl.fadeOut(1000, $);

            }, 7000)
            // else to resets index value.
        } else {
            i = 1
            changeBackgroundEl.attr('src', `${imgs[0]}`).fadeIn(1000, $);
            var timerOut = setTimeout(() => {
                changeBackgroundEl.fadeOut(1000, $);

            }, 7000)
        };

    }

    let internalTimer = setInterval(recallTimer, 8000);


    //  put it inside function to call park info
    function fetchParkData(event) {
        event.preventDefault();
        let currentSearch = searchInput.val();


        fetch(`https://developer.nps.gov/api/v1/parks?q=${currentSearch}&api_key=${npsKey}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                // calling each park name
                data.data.forEach(displayData)

            })
        // search for specific park part
    }


    searchSubmit.submit(fetchParkData);


    // display data acquired from API
    function displayData(park) {
        // console.log(park.name);

        parkName = park.name;

        let parkList = $('#park-list');
        // create div for the column and attach to the main div container
        let item = document.createElement('div');
        item.classList.add('col');
        parkList.append(item);

        // create card for each park and attach to park list div
        let itemCard = document.createElement('div');
        itemCard.classList.add('card-panel');
        itemCard.textContent = parkName;
        item.append(itemCard);

        //create button for each city and attach it to the park name
        let infoBtn = document.createElement('button');
        infoBtn.classList.add('show-modal');
        infoBtn.textContent = 'More Info';
        item.append(infoBtn);

        // getting activities for each park

        $.getJSON(`https://developer.nps.gov/api/v1/parks?q=${parkName}&api_key=${npsKey}`, function (data) {
            
            let activities = data.data[0].activities;
            // console.log(activities);
            // creating a div and adding a list to it with each activity
            let listActivities = document.createElement('div');
            listActivities.classList.add('hidden');
            // gets activitites from APi and add to the div
            activitiesHere.append(listActivities);

            for (let i = 0; i < activities.length; i++) {
                let parkActivities = activities[i].name;
                
                
                let newActivity = document.createElement('li');
                newActivity.textContent = parkActivities;
                listActivities.append(newActivity);
                item.append(listActivities);
            }
            
        })
        // console.log(infoBtn.value)
    }

    $(document).on("click", ".show-modal", function(e){
        console.log('click, click, clicking ®️Dan');
        e.target.nextSibling.classList.toggle('hidden');
    })



});