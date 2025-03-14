const API_KEY = "32941e425c3f65dcc976e55e58271378";

const weatherDataEl = document.getElementById("weather-data");

async function getWeather() {
  const location = document.getElementById("location").value;
  if (!location) {
    alert("Please enter a location");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();

    if (data.cod === 200) {
      weatherDataEl.innerHTML = `
                        <h2>${data.name}, ${data.sys.country}</h2>
                        <p>🌡️ Temperature: ${data.main.temp}°C</p>
                        <p>🌤️ Conditions: ${data.weather[0].description}</p>
                        <p>💧 Humidity: ${data.main.humidity}%</p>
                        <p>🌬️ Wind: ${data.wind.speed} m/s</p>
                    `;
    } else {
      alert("Location not found");
    }
  } catch (error) {
    alert("Error fetching weather data");
  }
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();
    weatherDataEl.innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>🌡️ Temperature: ${data.main.temp}°C</p>
                    <p>🌤️ Conditions: ${data.weather[0].description}</p>
                `;
  });
}
