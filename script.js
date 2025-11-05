// Replace with your OpenWeatherMap API key
const API_KEY = '40f7f903f323363d58b37ce61cb3e624';


// DOM
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const geoBtn = document.getElementById('geoloc');
const unitToggle = document.getElementById('unit-toggle');


const cityName = document.getElementById('city-name');
const desc = document.getElementById('description');
const tempVal = document.getElementById('temp-value');
const tempUnit = document.getElementById('temp-unit');
const feels = document.getElementById('feels');
const hum = document.getElementById('hum');
const wind = document.getElementById('wind');
const iconImg = document.getElementById('weather-icon');
const card = document.getElementById('weather-card');


let currentUnit = unitToggle.value; // 'metric' or 'imperial'


function setUnitUI(){
tempUnit.textContent = currentUnit === 'metric' ? '°C' : '°F';
}
setUnitUI();


async function fetchWeatherByCity(city){
try{
const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${currentUnit}&appid=${API_KEY}`;
const res = await fetch(url);
if(!res.ok) throw new Error('City not found');
const data = await res.json();
renderWeather(data);
}catch(err){
showError(err.message);
}
}


async function fetchWeatherByCoords(lat, lon){
try{
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${currentUnit}&appid=${API_KEY}`;
const res = await fetch(url);
if(!res.ok) throw new Error('Unable to fetch weather for location');
const data = await res.json();
renderWeather(data);
}catch(err){
showError(err.message);
}
}


function renderWeather(data){
const {name, weather, main, wind: w} = data;
const [w0] = weather;
cityName.textContent = `${name}, ${data.sys && data.sys.country ? data.sys.country : ''}`;
desc.textContent = capitalize(w0.description);
tempVal.textContent = Math.round(main.temp);
feels.textContent = Math.round(main.feels_like) + (currentUnit === 'metric' ? '°C' : '°F');
hum.textContent = main.humidity;
});