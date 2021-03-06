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

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  return `${hours}:${min}`;
}

//Change the current city using API
function currentWeather(response) {
  let max = Math.round(response.data.main.temp_max);
  let min = Math.round(response.data.main.temp_min);
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  //let currentCity = document.querySelector("#current-location");
  fahrenheitTemperature = response.data.main.temp;

  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#min-max").innerHTML = `${max}°| ${min}°`;
  document.querySelector("#info").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  //currentCity.innerHTML = response.data.name;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="forecast-day col-2" >
                <p>
                ${formatHours(forecast.dt * 1000)} 
                </p>
    <img
    src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
    id="forecast-icon"
    />
    <div class="forecast-temperature">
               <strong>${Math.round(
                 forecast.main.temp_max
               )}°|</strong>${Math.round(forecast.main.temp_min)}°
    </div>
    </div>
              `;
  }
}

function searchCity(city) {
  let units = "imperial";
  let apiKey = "804ddac989d26c1ff5ab45393677677e";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(currentWeather);

  axios.get(apiURL).then(currentWeather);
  //API call for the forecast
  apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(displayForecast);
}

//find location
function updateCurrentLocation(position) {
  let units = "imperial";
  let apiKey = "804ddac989d26c1ff5ab45393677677e";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(currentWeather);

  apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(displayForecast);
}
function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(updateCurrentLocation);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", findCurrentLocation);

function submission(event) {
  event.preventDefault();
  let city = document.querySelector("#search-engine");
  searchCity(city.value);
  city.value = "";
}
let search = document.querySelector(".search-button");
search.addEventListener("click", submission);

//Switch between Celsius and Fahrenheit
function changeToCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let CTemp = Math.round((fahrenheitTemperature - 32) * (5 / 9));
  currentTemp.innerHTML = CTemp;
}

function changeToFahrenheit(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let currentTemp = document.querySelector("#current-temp");
  let FTemp = Math.round(fahrenheitTemperature);
  currentTemp.innerHTML = FTemp;
}

let fahrenheitTemperature = null;

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
searchCity("Kansas City");
