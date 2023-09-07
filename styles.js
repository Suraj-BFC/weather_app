const apikey = "e29e03c6df999e73461b8fbd8a6286d8";

const weatherDataEl = document.getElementById("weatherData");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  if (cityValue) {
    getWeatherData(cityValue);
  } else {
    window.alert("Enter a city name!");
  }
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    console.log(data);
    const temperature = Math.round(data.main.temp);
    const descp = data.weather[0].description;
    const icon = data.weather[0].icon;

    const detailsArray = [
      `Feels Like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}`,
      `Wind speed: ${data.wind.speed}`,
    ];

    weatherDataEl.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather Icon" >`;

    weatherDataEl.querySelector("#tempDtl").textContent = `${temperature}°C`;
    weatherDataEl.querySelector("#idtempDtlAll").textContent = descp;
    weatherDataEl.querySelector("#feelsLike").textContent =
      detailsArray[0] + "°C";

    weatherDataEl.querySelector("#humidity").textContent =
      detailsArray[1] + "%";

    weatherDataEl.querySelector("#windSpeed").textContent =
      detailsArray[2] + "/ms";
  } catch (error) {
    window.alert(
      "The data did not load properly. Check the value entered or refresh the page and try again"
    );
  }
}
