console.log("hello world");

const APIkey = "60181c8fa5830514e6b036e19e7a5bae";
const city = "New York";
const url =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  APIkey;

const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;

fetch(url2).then((response) => {
  console.log(response);
  if (response.ok)
    return response.json().then((weather) => {
      console.log(weather);
      console.log(weather.coord.lon);
      console.log(weather.weather[0].icon);
      getWeather(weather.coord.lat, weather.coord.lon);
    });
});

function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`;
  console.log(url);
  fetch(url).then((response) => {
    if (response.ok)
      return response.json().then((weather) => {
        console.log(weather);
        console.log(weather.daily[0].dt);
        const shortcut = weather.daily[0];
        console.log(shortcut.dt);
      });
  });
}
