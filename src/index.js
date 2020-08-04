//Diplay the city name when user uses search engine
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
//Ex: Thursday 4:30
let now = new Date();

let hours = now.getHours();
let minutes = now.getMinutes();

let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = daysOfWeek[now.getDay()];

let p = document.querySelector("#current-time");
p.innerHTML = `${day} ${hours}:${minutes}`;

//Switch between Celsius and Fahrenheit
function changeToCelsius(event) {
  event.preventDefault();
  let link = document.querySelector("#current-temp");
  link.innerHTML = "25°";
}
function changeToFahrenheit(event) {
  let link1 = document.querySelector("#current-temp");
  link1.innerHTML = "77°";
}
let changeTempC = document.querySelector("#celsius-link");
changeTempC.addEventListener("click", changeToCelsius);

let changeTempF = document.querySelector("#fahrenheit-link");
changeTempF.addEventListener("click", changeToFahrenheit);
