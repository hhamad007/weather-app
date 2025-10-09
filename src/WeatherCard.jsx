"use client";

import React from 'react';

const WeatherCard = ({ data, location }) => {
  const date = data.dt_txt || new Date().toISOString();
  const icon = data.weather[0].icon;
  const description = data.weather[0].description;
  const temp = data.main.temp;
  const temp_max = data.main.temp_max;
  const temp_min = data.main.temp_min;
  const wind = data.wind.speed;

  return (
    <div className="forecast-card">
      <h3>{location}</h3>
      <p>{new Date(date).toLocaleDateString()}</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
      <p>{description}</p>
      <p>🌡️ {Math.round(temp)}°C (Max: {Math.round(temp_max)}°C / Min: {Math.round(temp_min)}°C)</p>
      <p>💨 Wind: {wind} m/s</p>
    </div>
  );
};

export default WeatherCard;