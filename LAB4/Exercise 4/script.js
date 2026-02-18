
const api_key = "35787394b0cb88e8baf98ddb39ec5ec9"; //API key
const search = document.getElementById('search');
const city = document.getElementById('city');
const loader = document.getElementById('loader');
const weatherDisplay = document.getElementById('weatherDisplay');
const error = document.getElementById('error');

//caching
let lastCity = null;

search.addEventListener('click', function() {
    const cityName = city.value.trim();
    
    if (!cityName) return;

    if (lastCity && lastCity.name.toLowerCase() === cityName.toLowerCase()) {
        console.log("Loading from cache...");
        displayWeather(lastCity);
        return;
    }

    fetchWeather(cityName);
});

function fetchWeather(city) {
    //spinner
    loader.style.display = "block";
    weatherDisplay.style.display = "none";
    error.textContent = "";

    const xhttp = new XMLHttpRequest();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    xhttp.open('GET', url, true);

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4) {
            loader.style.display = "none";

            if (xhttp.status === 200) {
                const data = JSON.parse(xhttp.responseText);
                lastCity = data; //cache
                displayWeather(data);
            } else if (xhttp.status === 404) {
                error.textContent = "City not found. Please try again.";
            } else {
                error.textContent = "Network error or invalid API key.";
            }
        }
    };

    xhttp.onerror = function() {
        loader.style.display = "none";
        error.textContent = "Request failed. Check your connection.";
    };

    xhttp.send();
}

function displayWeather(data) {
    weatherDisplay.style.display = "block";
    
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('condition').textContent = data.weather[0].description;
}