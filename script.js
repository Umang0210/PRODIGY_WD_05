const apiKey = "bd5e378503939ddaee76f12ad7a97608"; // Replace with your actual weather API key
const searchButton = document.getElementById('search-button');
const userInput = document.getElementById('user-location');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');

function getWeatherData(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;  // Metric units for Celsius
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        cityName.textContent = data.name;
        temperature.textContent = `Temperature: ${data.main.temp} °C`;
        description.textContent = `Description: ${data.weather[0].description}`;
        weatherInfo.style.display = "block";
      } else {
        alert("Location not found. Please try again.");
      }
    })
    .catch(error => console.error(error));
}

searchButton.addEventListener('click', () => {
  const userLocation = userInput.value;
  if (userLocation) {
    getWeatherData(userLocation);
  } else {
    alert("Please enter a location.");
  }
});

// Optional: Get user location using geolocation API
navigator.geolocation.getCurrentPosition(position => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWeatherData(`${lat},${lon}`);  // Use comma-separated coordinates for geolocation
}, () => {
  console.log("Geolocation failed.");
});
