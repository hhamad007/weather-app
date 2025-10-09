"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { cityCoordinates } from '../app/cityCoordinates';
import { ApiClient } from '../app/client';

const api = new ApiClient();

const LandingPage = () => {
  const [selectedCity, setSelectedCity] = useState('Worksop');
  const [userCoords, setUserCoords] = useState(null);
  const [forecastType, setForecastType] = useState('1');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const coords = userCoords || cityCoordinates[selectedCity];
      if (!coords) return;

      try {
        const data = await api.getCurrentWeatherByCoords(coords.latitude, coords.longitude);
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, [selectedCity, userCoords]);

  return (
    <div>
      <Navbar
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        forecastType={forecastType}
        setForecastType={setForecastType}
        setUserCoords={setUserCoords}
      />
      <section style={styles.hero}>
        <h1>Welcome to WeatherApp</h1>
        <p>Get accurate forecasts for your city, fast.</p>
        <a href="/forecast" style={styles.button}>View Forecast</a>
        {weatherData && (
          <p>
            🌡️ {weatherData.temperature}°C<br />
            💨 Wind: {weatherData.windspeed} m/s
          </p>
        )}
      </section>
    </div>
  );
};

const styles = {
  hero: {
    textAlign: 'center',
    padding: '4rem 2rem',
  },
  button: {
    display: 'inline-block',
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
  },
};

export default LandingPage;