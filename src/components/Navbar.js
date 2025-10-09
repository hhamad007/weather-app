// src/components/Navbar.jsx
"use client";

import React from 'react';
import { cityCoordinates } from '../app/cityCoordinates';

const Navbar = ({ selectedCity, setSelectedCity, forecastType, setForecastType, setUserCoords }) => {
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setUserCoords(cityCoordinates[city]); // update coordinates for forecast
  };

  return (
    <nav style={styles.navbar}>
      <h1>🌦️ WeatherApp</h1>
      <div style={styles.controls}>
        <select value={selectedCity} onChange={handleCityChange}>
          {Object.keys(cityCoordinates).map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select value={forecastType} onChange={(e) => setForecastType(e.target.value)}>
          <option value="1">1-Day</option>
          <option value="5">5-Day</option>
        </select>

        <button onClick={() => {
          navigator.geolocation.getCurrentPosition((pos) => {
            setSelectedCity(null);
            setUserCoords({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
          });
        }}>
          📍 Use My Location
        </button>
      </div>
    </nav>
  );
};


const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    padding: '1rem 2rem',
    color: 'white',
  },
  controls: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
};

export default Navbar;