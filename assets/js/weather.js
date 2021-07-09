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

$(document).ready(function (){
    var userInput = citiesArray[citiesArray.length - 1];
    // currentWeather(userInput);
    // forecast(userInput);
    lastSearch ();
});

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
    dayForecast.empty();
    rowCards.empty();
    var fore5 = $("<h3>").attr("class", "forecast").text(""); 
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&units=imperial&APPID=fb3dd2a5acdd03a900a040c7940d4846`;
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(response){
        for (var i = 0; i < response.list.length; i += 8){
            
            forecastDate[i] = response.list[i].dt_txt;
            forecastIcon[i] = response.list[i].weather[0].icon;
            forecastTemp[i] = response.list[i].main.temp; 
            forecastWind[i] = response.list[i].wind.speed;
            forecastHum[i] = response.list[i].main.humidity;  

            // var newCol2 = $("<div>").attr("class", "max-width: 12rem;");
            // rowCards.append(newCol2);

            // var newDivCard = $("<div>").attr("class", "card text-white bg-primary");
            // newDivCard.attr("style", "max-width: 12rem;")
            // newCol2.append(newDivCard);

            // var newCardBody = $("<div>").attr("class", "card-body");
            // newDivCard.append(newCardBody);

            var newH5 = $("<h5>").attr("class", "card-title").text(moment(forecastDate[i]).format("MMM Do"));
            weatherCard.append(newH5);

            var newImg = $("<img>").attr("class", "card-img-top").attr("src", "https://openweathermap.org/img/wn/" + forecastIcon[i] + "@2x.png");
            weatherCard.append(newImg);

            var newPTemp = $("<p>").attr("class", "card-text").text("Temp: " + Math.floor(forecastTemp[i]) + "ºF");
            weatherCard.append(newPTemp);

            var newPWind = $("<p>").attr("class", "card-text").text("Wind: " + forecastWind[i] + " MPH");
            weatherCard.append(newPWind);

            var newPHum = $("<p>").attr("class", "card-text").text("Hum: " + forecastHum[i] + "%");
            weatherCard.append(newPHum);

            dayForecast.append(fore5);
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