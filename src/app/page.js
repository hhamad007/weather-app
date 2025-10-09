"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { cityCoordinates } from "../app/cityCoordinates";
import ApiClient from "../../ApiClient/client";

const api = new ApiClient();

const weatherIcons = {
  0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
  45: "🌫️", 48: "🌫️",
  51: "🌦️", 53: "🌦️", 55: "🌧️",
  61: "🌧️", 63: "🌧️", 65: "🌧️",
  71: "❄️", 73: "❄️", 75: "❄️",
  80: "🌧️", 81: "🌧️", 82: "🌧️",
  95: "⛈️", 96: "⛈️", 99: "⛈️",
};

const LandingPage = () => {
  const [selectedCity, setSelectedCity] = useState("Worksop");
  const [userCoords, setUserCoords] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const coords = userCoords || cityCoordinates[selectedCity];
      if (!coords) return;

      try {
        const current = await api.getCurrentWeatherByCoords(
          coords.latitude,
          coords.longitude
        );
        setWeatherData(current);

        const forecast = await api.getFiveDayForecastByCoords(
          coords.latitude,
          coords.longitude
        );
        setForecastData(forecast);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, [selectedCity, userCoords]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="min-h-screen bg-black text-yellow-500">
      <Navbar
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        setUserCoords={setUserCoords}
      />

      <section className="section">
        <h1 className="text-5xl font-bold mb-4">WeatherApp</h1>
        <p className="text-lg mb-6">Fast and accurate forecasts for your city</p>

        {weatherData && (
          <div className="card mb-8 p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">{selectedCity}</h2>
            <p className="text-3xl mb-2">
              {weatherIcons[weatherData.weathercode] || "🌤️"}{" "}
              {weatherData.temperature}°C
            </p>
            <p>💨 Wind: {weatherData.windspeed} m/s</p>
          </div>
        )}

        <h2 className="text-3xl font-bold mb-4">5-Day Forecast</h2>
        <div className="flex flex-row overflow-x-auto space-x-4 pb-4">
          {forecastData.map((day, index) => (
            <div
              key={index}
              className="card flex-shrink-0 flex flex-col items-center p-4 bg-yellow-100/10 hover:bg-yellow-100/20 transition rounded-lg min-w-[150px]"
            >
              <p className="font-bold mb-2">{formatDate(day.date)}</p>
              <p className="text-3xl mb-2">
                {weatherIcons[day.weathercode] || "🌤️"}
              </p>
              <p>Max: {day.temperature}°C</p>
              <p>Wind: {day.windspeed} m/s</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
