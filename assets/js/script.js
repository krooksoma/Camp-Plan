$(document).ready(function () 
{

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
    function fetchParkData(event){
        event.preventDefault();
        console.log('inside of Array'); //test line


        fetch(`https://developer.nps.gov/api/v1/parks?q=stateCode=FL,GA,CA,IL&limit=25&api_key=${npsKey}`)
            .then(function (response){
            console.log(response); //test line
            return response.json();
            }
            )
            .then(function (data){
                               
                console.log("City:", data.data[10].addresses[0].city); //test line
                console.log("Park:", data.data[10].name);//test line
                console.log("State:",data.data[10].addresses[0].stateCode);//test line
                const searchInput = data.data[10].name;

            console.log("new:",searchInput);
                data.data.forEach(displayData);
            })
            
            // look for cities
         //for (var i = 0; i < data.data.length; i += 25)
    };
    // search for specific park part
    searchInput.submit(fetchParkData);
    searchSubmit.submit(fetchParkData);



    // display data acquired from API
    function displayData(park) {
        // console.log(park.name);

        parkName = park.name;

        let parkList = $('#park-list');
        // create div for the column and attach to the main div container
        let item = document.createElement('div');
        item.classList.add('col', 'card', 'custom-card');
        parkList.append(item);

        // div to add the card to
        let cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        item.append(cardContent);

        // create card for each park and attach to park list div
        let itemCard = document.createElement('div');
        itemCard.classList.add('card-title');
        itemCard.textContent = parkName;
        cardContent.append(itemCard);

        // card-action div
        let cardAction = document.createElement('div');
        cardAction.classList.add('card-action');
        cardContent.append(cardAction);

        //create button for each city and attach it to the park name
        let infoBtn = document.createElement('button');
        infoBtn.classList.add('show-modal', 'custom-button');
        infoBtn.textContent = 'More Info';
        cardContent.append(infoBtn);

        // getting activities for each park

        $.getJSON(`https://developer.nps.gov/api/v1/parks?q=${parkName}&api_key=${npsKey}`, function (data) {
            
            let activities = data.data[0].activities;
            // console.log(activities);
            // creating a div and adding a list to it with each activity
            let listActivities = document.createElement('div');
            listActivities.classList.add('custom-modal', 'hidden');
            // gets activitites from APi and add to the div
            cardContent.append(listActivities);

            for (let i = 0; i < activities.length; i++) {
                let parkActivities = activities[i].name;    
                
                let newActivity = document.createElement('li');
                newActivity.textContent = parkActivities;
                listActivities.append(newActivity);
                
            }
            
        })
       
    }

    $(document).on("click", ".show-modal", function(e){
        console.log('click, click, clicking ®️Dan');
        e.target.nextSibling.classList.toggle('hidden');
        
    })



});


