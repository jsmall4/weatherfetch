const inputEl = document.getElementById("cityInput");
const searchEl = document.getElementById("search-button");
const clearEl = document.getElementById("clear-history");
const nameEl = document.getElementById("cityName");
const weatherEl = document.getElementById("weather");
const currentTempEl = document.getElementById("temperature");
const currentHumidityEl = document.getElementById("humidity");
const currentWindSpeedEl = document.getElementById("wind-speed");
const currentUVIndexEl = document.getElementById("uv-index");
const historyEl = document.getElementById("history");

let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
let searchedCity = "";
let cityName = "London";

// OpenWeather API Key:
const APIkey = "60181c8fa5830514e6b036e19e7a5bae";

// called when user searches for city - get weather for city searched

const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;

fetch(url).then((response) => {
  console.log(response);
  if (response.ok)
    return response
      .json()
      .then((weather) => {
        console.log(weather.main.temp);
      })
      .then(function (data) {
        currentTempEl.textContent = "Temperature: " + "";
      });
});

// __________________________________________________________________________
// Tutor notes:
// -----------------
// const APIkey = "60181c8fa5830514e6b036e19e7a5bae";
// const city = "New York";
// const url =
//   "https://api.openweathermap.org/data/2.5/weather?q=" +
//   city +
//   "&appid=" +
//   APIkey;

// const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;

// fetch(url2).then((response) => {
//   console.log(response);
//   if (response.ok)
//     return response.json().then((weather) => {
//       console.log(weather);
//       console.log(weather.coord.lon);
//       console.log(weather.weather[0].icon);
//       getWeather(weather.coord.lat, weather.coord.lon);
//     });
// });

// function getWeather(lat, lon) {
//   const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`;
//   console.log(url);
//   fetch(url).then((response) => {
//     if (response.ok)
//       return response.json().then((weather) => {
//         console.log(weather);
//         console.log(weather.daily[0].dt);
//         const shortcut = weather.daily[0];
//         console.log(shortcut.dt);
//       });
//   });
// }
