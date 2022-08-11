//Variable to store the searched city
var city = "London";
//Variables
var searchCity = $("#search-city");
var searchButton = $("#search-button");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidty = $("#humidity");
var currentWindSpeed = $("#wind-speed");
var currentUvindex = $("#uv-index");
var selectedCity = [];

//API key
var APIKey = "60181c8fa5830514e6b036e19e7a5bae";
console.log(APIKey);
// Display the curent and future weather
function displayWeather(event) {
  event.preventDefault();
  if (searchCity.val().trim() !== "") {
    city = searchCity.val().trim();
    currentWeather(city);
  }
}

// Function to call current weather in chosen city
function currentWeather(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&APPID=" +
    APIKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var weathericon = response.weather[0].icon;
    var iconurl =
      "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
    var date = new Date(response.dt * 1000).toLocaleDateString();

    $(currentCity).html(
      response.name + "(" + date + ")" + "<img src=" + iconurl + ">"
    );
    var temp = response.main.temp - 273.15;
    $(currentTemperature).html(temp.toFixed(2) + "°C");
    $(currentHumidty).html(response.main.humidity + "%");
    var ws = response.wind.speed;
    var windsmph = (ws * 2.237).toFixed(1);
    $(currentWindSpeed).html(windsmph + "MPH");
    UVIndex(response.coord.lon, response.coord.lat);
    forecast(response.id);
    if (response.cod == 200) {
      selectedCity = JSON.parse(localStorage.getItem("cityname"));
      console.log(selectedCity);
      if (selectedCity == null) {
        selectedCity = [];
        selectedCity.push(city);
        localStorage.setItem("cityname", JSON.stringify(selectedCity));
        addToList(city);
      } else {
        if (find(city) > 0) {
          selectedCity.push(city);
          localStorage.setItem("cityname", JSON.stringify(selectedCity));
          addToList(city);
        }
      }
    }
  });
}

// function to call future weather in bottom display
function forecast(cityid) {
  var dayover = false;
  var queryforcastURL =
    "https://api.openweathermap.org/data/2.5/forecast?id=" +
    cityid +
    "&appid=" +
    APIKey;
  $.ajax({
    url: queryforcastURL,
    method: "GET",
  }).then(function (response) {
    for (i = 0; i < 5; i++) {
      var date = new Date(
        response.list[(i + 1) * 8 - 1].dt * 1000
      ).toLocaleDateString();
      var iconcode = response.list[(i + 1) * 8 - 1].weather[0].icon;
      var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
      var tempK = response.list[(i + 1) * 8 - 1].main.temp;
      var temp = (tempK - 273.5).toFixed(2);
      var humidity = response.list[(i + 1) * 8 - 1].main.humidity;

      $("#forecastDate" + i).html(date);
      $("#forecastImg" + i).html("<img src=" + iconurl + ">");
      $("#forecastTemp" + i).html(temp + "°C");
      $("#forecastHumidity" + i).html(humidity + "%");
    }
  });
}

// fucntion to call the UV index
function UVIndex(ln, lt) {
  var uvqURL =
    "https://api.openweathermap.org/data/2.5/uvi?appid=" +
    APIKey +
    "&lat=" +
    lt +
    "&lon=" +
    ln;
  $.ajax({
    url: uvqURL,
    method: "GET",
  }).then(function (response) {
    $(currentUvindex).html(response.value);
  });
}

// local storage
function addToList(x) {
  var listEl = $("<li>" + x + "</li>");
  $(listEl).attr("class", "list-group-item");
  $(listEl).attr("data-value", x);
  $(".list-group").append(listEl);
}

function callPastSearch(event) {
  var liEl = event.target;
  if (event.target.matches("li")) {
    city = liEl.textContent.trim();
    currentWeather(city);
  }
}

function loadLastCity() {
  $("ul").empty();
  var selectedCity = JSON.parse(localStorage.getItem("cityname"));
  if (selectedCity !== null) {
    selectedCity = JSON.parse(localStorage.getItem("cityname"));
    for (i = 0; i < selectedCity.length; i++) {
      addToList(selectedCity[i]);
    }
    city = selectedCity[i - 1];
    currentWeather(city);
  }
}

function clearHistory(event) {
  event.preventDefault();
  selectedCity = [];
  localStorage.removeItem("cityname");
  document.location.reload();
}

function find(x) {
  for (var i = 0; i < selectedCity.length; i++) {
    if (x === selectedCity[i]) {
      return -1;
    }
  }
  return 1;
}


// on click, do this
$("#search-button").on("click", displayWeather);
$(document).on("click", callPastSearch);
$(window).on("load", loadLastCity);
$("#clear-history").on("click", clearHistory);
