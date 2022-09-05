let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = days[date.getDay()];
  let formattedDate = `${currentDay}`;
  return formattedDate;
}
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
    "December"
  ];
  let currentYear = time.getFullYear();
  let currentMonth = months[time.getMonth()];
  let currentDate = time.getDate();

  let monthDate = `${currentDate} ${currentMonth} ${currentYear}`;
  return monthDate;
}
function formatedHour(minut) {
  let hour = minut.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = minut.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }

  let nowHour = `${hour}:${min}`;
  return nowHour;
}
let displayDay = document.querySelector("h2.day-today");
displayDay.innerHTML = formatDate(currentTime);
let displayDate = document.querySelector("p.date-today");
displayDate.innerHTML = formatedDay(currentTime);
let displayTime = document.querySelector("p.time-today");
displayTime.innerHTML = formatedHour(currentTime);


function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temper").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
    
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
    getsearchLocation(response.data.coord);
    
   
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#formGroupExampleInput").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function celsiusShow(event) {
  event.preventDefault();
  let temperC=25;
  let tempC = document.querySelector("#temper");
  tempC.innerHTML = temperC;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusShow);

function fahrenheitShow(event) {
  event.preventDefault();
  let temperF=(25*9/5)+32;
    let tempF = document.querySelector("#temper");
  tempF.innerHTML = temperF;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitShow);



let searchForm = document.querySelector("#search");
searchForm.addEventListener("click", handleSubmit);

let currentLocationButton = document.querySelector("#gps");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("London");
