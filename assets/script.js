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
