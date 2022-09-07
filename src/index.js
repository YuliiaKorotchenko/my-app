let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"  ];
  let currentDay = days[date.getDay()];
  let formattedDate = `${currentDay}`;
  return formattedDate;}
function formatedDay(time) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"  ];
  let currentYear = time.getFullYear();
  let currentMonth = months[time.getMonth()];
  let currentDate = time.getDate();
  let monthDate = `${currentDate} ${currentMonth} ${currentYear}`;
  return monthDate;}
function formatedHour(minut) {
  let hour = minut.getHours();
  if (hour < 10) {
    hour = `0${hour}`;  }
  let min = minut.getMinutes();
  if (min < 10) {
    min = `0${min}`;  }
  let nowHour = `${hour}:${min}`;
  return nowHour;}
let displayDay = document.querySelector("h2.day-today");
displayDay.innerHTML = formatDate(currentTime);
let displayDate = document.querySelector("p.date-today");
displayDate.innerHTML = formatedDay(currentTime);
let displayTime = document.querySelector("p.time-today");
displayTime.innerHTML = formatedHour(currentTime);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temper").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  tempC = response.data.main.temp;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);   
       getForecast(response.data.coord);  }
function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#formGroupExampleInput").value;
  searchCity(city);}
function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);}
function fahrenheitShow(event) {
  event.preventDefault();  
  let tempElement = document.querySelector("#temper");
  let temperF=(tempC*9/5)+32;
  tempElement.innerHTML = Math.round(temperF);}
function celsiusShow(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temper");
    tempElement.innerHTML = Math.round(tempC);}
let tempC=null;
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusShow);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitShow);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
let searchForm = document.querySelector("#search");
searchForm.addEventListener("click", handleSubmit);


let currentLocationButton = document.querySelector("#gps");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("London");
