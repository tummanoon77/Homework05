// This is my API key.
var APIKey = "5c6b46b9217ee429857f2913e070ee3d";
//var array
var allCities = [];
function getForcastInfo(cityName) {
  event.preventDefault();
  //this is our url
  var currentURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIKey;
    var fiveQueryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    APIKey;
  $.ajax({
    url: currentURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
   
    //var

    var city = response.name;
    var tempK = response.main.temp;
    var wind = response.wind;
    var humidity = response.main.humidity;
    var windSpeed = wind.speed;
    var windDeg = wind.deg;
    var tempF = (parseFloat(tempK) - 273.15) * 1.8 + 32;
    $("div.city").text(city);
    $("div.wind").text(
      "wind speed : " + windSpeed + "at" + windDeg + " degrees"
    );
    $("div.humidity").text("Humidity : " + humidity);
    $("div.temp").text("Temperature : " + tempF + " °F");
  });
}


// specify the target of the click that should be there later on
$("#buttons-here").on("click", "button", function () {
  var cityName = $(this).text();
  getForcastInfo(cityName);
  console.log($(this));
});

function renderButtons() {
  $("#buttons-here").empty();
  // write a function that loops thouth that array and generates a button for each city

  for (var i = 0; i < allCities.length; i++) {
    var btn = $("<button>");
    btn.text(allCities[i]);
    $("#buttons-here").append(btn);
    btn.attr("class", "cityAsButton");
  }
}

$("#find-city").on("click", function (event) {
  event.preventDefault();
  //here we grab the text from the input box
  var cityName = $("#city-input").val();
  // add the cityname name to array of all city name
  allCities.push(cityName);
  renderButtons();
  getForcastInfo(cityName);
  //this is our url
  var currentURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIKey;
  var fiveQueryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    APIKey;
  $.ajax({
    url: currentURL,
    method: "GET",
  }).then(function (response) {
    var uviURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
    $.ajax({
        url: uviURL,
        method: "GET"
    }).then(function (response) {
        $("#UV").text("UV : " + response.value);
       
    });
   
$.ajax({
    url: fiveQueryURL,
    method: "GET"
}).then(function (response) {
    renderFiveDay(response);
});

   
  });
  

  function getForecastForEachDay(listofForecasts) {
    event.preventDefault();  
    var fiveQueryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    APIKey;
   
    var currentDate = "";
    var forecastArray = [];
    for (var i = 0; i < listofForecasts.length; i++) {
      // we want to capture one weather object for each day in the list. Once we've captured that
      // object,we can ignore all other objects for the same day
      var dateOfListItem = ListOfForecasts[i].dt_text.split(" ")[0];
      if (dateOfListItem !== currentDate) {
        //we need to extract just the date part and ignore the time
        currentDate = dateOfListItem.split("")[0];
        // Push this weather object to the forecasts array
        if (forecastArray.length < 5) {
          forecastArray.push(listofForecasts[i]);

          $.ajax({
            url: fiveQueryURL,
            method: "GET",
          }).then(function (response) {
            console.log(fiveQueryURL);
          });    
        }
      }
    }
    return forecastArray;
    console.log(forecastArray);
  }
});

function renderFiveDay() {
  var fiveDayArr = getForecastForEachDay(ListOfForecasts);
  $("#fiveDay").text("");
  for (var i = 0; i < fiveDayArr.length; i++) {
    var dateEl = $("<h5>");
    dateEl.text("Date: " + fiveDayArr[i].dt_txt.split(" ")[0]);

    var divEl = $("div.card");
    var tempEl = $("div.temp1");
    var tempK = response.main.temp;
    var tempF = (parseFloat(tempK) - 273.15) * 1.8 + 32;
    tempEl.text("Temp: " + tempF);

    var humidityEl = $("div.humidity1");
    humidityEl.text("Humidity: " + fiveDayArr[i].main.humidity);

    divEl.append(dateEl).append(tempEl).append(humidityEl);

    $("#fiveDay").append(divEl);
  }
}



