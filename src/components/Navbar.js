"use client";
import React, { useState } from 'react';
import { cityCoordinates } from '../app/cityCoordinates'; // ✅ make sure path is correct

const Navbar = ({ selectedCity, setSelectedCity, forecastType, setForecastType, setUserCoords }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredCities = Object.keys(cityCoordinates).filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setUserCoords(cityCoordinates[city]);
    setSearchTerm('');
  };

  return (
    <nav style={styles.navbar}>
      <h1>🌦️ Weather Application - Powered by Meteo</h1>
      <div style={styles.controls}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
          {searchTerm && (
            <ul style={styles.dropdown}>
              {filteredCities.map((city) => (
                <li
                  key={city}
                  style={styles.dropdownItem}
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        <select value={forecastType} onChange={(e) => setForecastType(e.target.value)} style={styles.select}>
          <option value="1">1-Day</option>
          <option value="5">5-Day</option>
        </select>

        <button
          onClick={() => {
            navigator.geolocation.getCurrentPosition((pos) => {
              setSelectedCity(null);
              setUserCoords({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
              });
            });
          }}
          style={styles.button}
        >
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
    position: 'relative',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    position: 'relative',
  },
  searchContainer: {
    position: 'relative',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '180px',
    color: '#000',
    backgroundColor: '#fff',
  },
  dropdown: {
    position: 'absolute',
    top: '110%',
    left: 0,
    width: '100%',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    maxHeight: '200px',
    overflowY: 'auto',
    zIndex: 10,
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  dropdownItem: {
    padding: '0.5rem',
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
    color: '#000',
  },
  select: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '4px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Navbar;