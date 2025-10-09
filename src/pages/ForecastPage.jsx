"use client";

import React, { useState, useEffect } from 'react';
import { ApiClient } from '../services/client';
import Navbar from '../components/Navbar';
import WeatherCard from '../components/WeatherCard';
import Background from '../components/Background';

const api = new ApiClient();

const ForecastPage = () => {
  const [selectedCity, setSelectedCity] = useState('Worksop');
  const [forecastType, setForecastType] = useState('5');
  const [userCoords, setUserCoords] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [background, setBackground] = useState('default');

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        let data;
        if (userCoords) {
          data = await api.getCurrentWeatherByCoords(userCoords.lat, userCoords.lon);
          setForecast([data]);
          setBackground(data.weather[0].main);
        } else if (forecastType === '1') {
          data = await api.getCurrentWeatherByCity(selectedCity);
          setForecast([data]);
          setBackground(data.weather[0].main);
        } else {
          data = await api.getFiveDayForecastByCity(selectedCity);
          setForecast(data);
          setBackground(data[0].weather[0].main);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchForecast();
  }, [selectedCity, forecastType, userCoords]);

  return (
    <Background condition={background}>
      <Navbar
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        forecastType={forecastType}
        setForecastType={setForecastType}
        setUserCoords={setUserCoords}
      />
      <div className="forecast-container">
        {forecast.map((entry, index) => (
          <WeatherCard key={index} data={entry} location={selectedCity || 'Your Location'} />
        ))}
      </div>
    </Background>
  );
};

export default ForecastPage;