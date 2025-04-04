
import React from "react";
import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  if (!data) {
    return null;  
  }
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">city</p>
          <p className="weather-description">Description</p>
        </div>
      </div>

    </div>
  );
};

export default CurrentWeather;
