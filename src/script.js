/// date and time
let now = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let number = now.getDate();


let h3 = document.querySelector("h3");
h3.innerHTML = `${day} ${number}`;

let minutes = now.getMinutes();
if (minutes<10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();

let h2 = document.querySelector("h2");
h2.innerHTML = `${hours}:${minutes}`;

///city search
function cityInput (event){
  event.preventDefault();

let cityHeading = document.querySelector("#cityText").value;

let apiKey = "c2016b2ed087ee4f9a30ab9ed51cf5fb";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityHeading}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showCityTemp);
}

///change of details
function showCityTemp(response) {

///temperature
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);

///country
  let country = response.data.sys.country;
  let name = response.data.name;
  document.querySelector("h1").innerHTML = `${name},${country}`; 

///humidity
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

///weather description
  document.querySelector("#weather").innerHTML = response.data.weather[0].description;

///wind  
  document.querySelector("#wind").innerHTML= Math.round(response.data.wind.speed);

///image
let icon = response.data.weather[0].main;
document.querySelector("#icon")
}

let searchButton = document.querySelector("form")
searchButton.addEventListener("submit", cityInput);

///geolocation 
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

let apiKey = "c2016b2ed087ee4f9a30ab9ed51cf5fb";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showCityTemp);
}

function currentLocation (){
navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", currentLocation);



