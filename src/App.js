
import './App.css';
import { useState } from "react";
import Search from './components/search';
import { weatherApi , apiKey } from './Api';
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/Forecast";

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${weatherApi}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    const forecastFetch = fetch(
      `${weatherApi}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );  

    Promise.all([currentWeatherFetch, forecastFetch]).then(async (response) => {

        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch(console.log);
    
  }

  return (
    <div className="container">
      <h1>Mohamed</h1>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
