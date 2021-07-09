'use strict'

$(document).ready(function () {

    const changeBackgroundEl = $('.hero');
    const npsKey = 'h6tXDWnmFLuDQHAPIhnXzQKP5pBX66EKu0vrNdFn';

    const searchInput = $('#searchBar');
    const searchSubmit = $('#input-field');
    
    let parkName;
    let parkCity;
    let weatherCard;

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
        
        parkCity = park.addresses[0].city;
        console.log(parkCity);
        

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
        
        // create another card for weather content;

        weatherCard = document.createElement('div');
        weatherCard.classList.add('.card-content')
        item.append(weatherCard);

        forecast(parkCity);

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

// var cityResultText = $("#cityResult");
// var mainIcon =$("#mainIcon");
// var rowCards = $("#rowCards");
// var dayForecast = $("#row5day");
// var cardDisplay = $("#cardDisplay");
// var buttonList = $("#buttonsList");
var forecastDate = {};
var forecastIcon = {};
var forecastTemp = {};
var forecastWind = {};
var forecastHum = {};
var today = moment().format('MM' + "/" + 'DD' + '/' + 'YYYY');
var APIKey = "&units=imperial&APPID=fb3dd2a5acdd03a900a040c7940d4846";
var url =  "https://api.openweathermap.org/data/2.5/weather?q=";
var citiesArray = JSON.parse(localStorage.getItem("Saved City")) || [];

// $(document).ready(function (){
//     var userInput = citiesArray[citiesArray.length - 1];
//     // currentWeather(userInput);
//     // forecast(userInput);
//     lastSearch ();
// });

// output current weather

function currentWeather(userInput) {
    mainIcon.empty();
    var queryURL = url + userInput + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var cityInfo = response.name;
        var lat = response.coord.lat;
        var lon = response.coord.lon;
       
        cityResultText.text(cityInfo+".");
        })
    }

function forecast (userInput) {
    console.log(userInput);
    // dayForecast.empty();
    // rowCards.empty();
    var fore5 = $("<h3>").attr("class", "forecast").text(""); 
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&units=imperial&APPID=fb3dd2a5acdd03a900a040c7940d4846`;
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        for (var i = 0; i < response.list.length; i += 8){

            
            forecastDate[i] = response.list[i].dt_txt;
            forecastIcon[i] = response.list[i].weather[0].icon;
            forecastTemp[i] = response.list[i].main.temp; 
            forecastWind[i] = response.list[i].wind.speed;
            forecastHum[i] = response.list[i].main.humidity;  
            console.log(forecastHum[i]);

            // var newCol2 = $("<div>").attr("class", "max-width: 12rem;");
            // rowCards.append(newCol2);

            var newDivCard = $("<div>").attr("class", "card text-white bg-primary");
            newDivCard.attr("style", "max-width: 12rem;")
            weatherCard.append(newDivCard);

            var newCardBody = $("<div>").attr("class", "card-body");            
            newDivCard.append(newCardBody);

            var newH5 = $("<h5>").attr("class", "card-title").text(moment(forecastDate[i]).format("MMM Do"));
            newCardBody.append(newH5);
            
            var newImg = $("<img>").attr("class", "card-img-top").attr("src", "https://openweathermap.org/img/wn/" + forecastIcon[i] + "@2x.png");
            newCardBody.append(newImg);
            
            var newPTemp = $("<p>").attr("class", "card-text").text("Temp: " + Math.floor(forecastTemp[i]) + "ºF");
            newCardBody.append(newPTemp);
            
            var newPWind = $("<p>").attr("class", "card-text").text("Wind: " + forecastWind[i] + " MPH");
            newCardBody.append(newPWind);
            
            var newPHum = $("<p>").attr("class", "card-text").text("Hum: " + forecastHum[i] + "%");
            newCardBody.append(newPHum);
                
            // dayForecast.append(fore5);
            };
            })
        }
// function storeData (userInput) {
//     var userInput = $("#searchInput").val().trim().toLowerCase();
//     var containsCity = false;
//     if (citiesArray != null) {
// 		$(citiesArray).each(function(x) {
// 			if (citiesArray[x] === userInput) {
// 				containsCity = true;
// 			}
// 		});
// 	}
// 	if (containsCity === false) {
//         citiesArray.push(userInput);
// 	}
// 	localStorage.setItem("Saved City", JSON.stringify(citiesArray));
// }
// function lastSearch () {
//     buttonList.empty()
//     for (var i = 0; i < citiesArray.length; i ++) {
//         var newButton = $("<button>").attr("type", "button").attr("class","savedBtn btn btn-secondary btn-lg btn-block");
//         newButton.attr("data-name", citiesArray[i])
//         newButton.text(citiesArray[i]);
//         buttonList.prepend(newButton);
//     }
//     $(".savedBtn").on("click", function(event){
//         event.preventDefault();
//         var userInput = $(this).data("name");
//         currentWeather(userInput);
//         forecast(userInput);
//     })
// }
// $(".btn").on("click", function (event){
//     event.preventDefault();
//     if ($("#searchInput").val() === "") {
//     alert("Please type a userInput to know the current weather");
//     } else
//     var userInput = $("#searchInput").val().trim().toLowerCase();
//     currentWeather(userInput);
//     forecast(userInput);
//     storeData();
//     lastSearch();
//     $("#searchInput").val("");
// })

});