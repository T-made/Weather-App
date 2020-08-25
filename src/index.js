//Display the city name when user uses search engine
function searchForCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-engine");
  let h1 = document.querySelector("h1");
  if (searchCity.value) {
    h1.innerHTML = `${searchCity.value}`;
  } else {
    h1.innerHTML = null;
    alert("Enter a valid city");
  }
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", searchForCity);

//Display current date and time
//Ex: Thursday 4:30 AM / PM
function updateMin(currentMinutes) {
  if (currentMinutes <= 10) {
    return "0" + currentMinutes;
  } else {
    return currentMinutes;
  }
}

function updateTime(currentHours) {
  if (currentHours >= 12) {
    return "PM";
  } else {
    return "AM";
  }
}
let now = new Date();
let hour = [
  12,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
];
let time = updateTime(now.getHours());
let min = updateMin(now.getMinutes());
let hours = hour[now.getHours()];
//let minutes = now.getMinutes();

let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = daysOfWeek[now.getDay()];

let p = document.querySelector("#current-time");
p.innerHTML = `${day} ${hours}:${min} ${time}`;

//Change the current city using API
function currentWeather(response) {
  let max = Math.round(response.data.main.temp_max);
  let min = Math.round(response.data.main.temp_min);

  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#min-max").innerHTML = `${max}°| ${min}°`;
  document.querySelector("#info").innerHTML =
    response.data.weather[0].description;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
  console.log(forecast);
  forecastElement.innerHTML = `<div class="forecast-day col-4 col-sm-2 col-md" >
    Mon
                <br />
                8/15
                <br />
    <i class="fas fa-cloud-sun"></i>
    <br />
               <strong>${Math.round(
                 forecast.main.temp_max
               )}°</strong>${Math.round(forecast.main.temp_min)}°
              </div>
              </div>
              `;
}
function searchCity(city) {
  let units = "imperial";
  let apiKey = "804ddac989d26c1ff5ab45393677677e";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(currentWeather);

  //API call for the forecast
  apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(displayForecast);
}

function submission(event) {
  event.preventDefault();
  let city = document.querySelector("#search-engine");
  searchCity(city.value);
}
let search = document.querySelector(".search-button");
search.addEventListener("click", submission);

//find location
function updateCurrentLocation(position) {
  let units = "imperial";
  let apiKey = "804ddac989d26c1ff5ab45393677677e";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(currentWeather);
}
function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(updateCurrentLocation);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", findCurrentLocation);

searchCity("Kansas City");

//Switch between Celsius and Fahrenheit
function changeToCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let CTemp = Math.round((currentTemp.innerHTML - 32) * (5 / 9));
  currentTemp.innerHTML = CTemp;
}

function changeToFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let FTemp = Math.round(currentTemp.innerHTML * (9 / 5) + 32);
  currentTemp.innerHTML = FTemp;
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", changeToCelsius);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", changeToFahrenheit);

function updateTimeOfDay() {
  let today = new Date();
  let currentTime = today.getHours();

  if (currentTime < 12) {
    document.querySelector("#timeOfDay-text").innerHTML = "GOOD MORNING";
  } else if (currentTime >= 12 && currentTime < 16) {
    document.querySelector("#timeOfDay-text").innerHTML = "GOOD AFTERNOON";
  } else {
    document.querySelector("#timeOfDay-text").innerHTML = "GOOD EVENING";
  }
}
updateTimeOfDay();
