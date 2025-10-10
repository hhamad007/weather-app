"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { cityCoordinates } from "../app/cityCoordinates";
import ApiClient from "../../ApiClient/client";
import { motion } from "framer-motion";

const api = new ApiClient();

const weatherIcons = {
  0: "☀️",
  1: "🌤️",
  2: "⛅",
  3: "☁️",
  45: "🌫️",
  48: "🌫️",
  51: "🌦️",
  53: "🌦️",
  55: "🌧️",
  61: "🌧️",
  63: "🌧️",
  65: "🌧️",
  71: "❄️",
  73: "❄️",
  75: "❄️",
  80: "🌧️",
  81: "🌧️",
  82: "🌧️",
  95: "⛈️",
  96: "⛈️",
  99: "⛈️",
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
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  // Animation variants for smooth floating effect
  const floatAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-yellow-400 font-sans flex flex-col">
      {/* Navbar */}
      <Navbar
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        setUserCoords={setUserCoords}
      />

      <main className="flex-1 px-4 sm:px-6 md:px-12 py-10 max-w-5xl mx-auto">
        {/* App Header */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-center mb-10 drop-shadow-[0_0_10px_rgba(255,255,0,0.6)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ☀️ Weather Forecast
        </motion.h1>

        {/* Current Weather Card */}
        {weatherData && (
          <motion.div
            className="bg-yellow-400/10 border border-yellow-400/30 backdrop-blur-md rounded-3xl p-8 mb-12 text-center shadow-[0_0_25px_rgba(255,255,0,0.15)] hover:shadow-[0_0_40px_rgba(255,255,0,0.3)] transition-all duration-500"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-3xl font-bold mb-4 tracking-wide text-yellow-300">
              {selectedCity}
            </h2>

            {/* Animated Large Icon */}
            <motion.div
              variants={floatAnimation}
              animate="animate"
              className="text-[9rem] md:text-[11rem] leading-none drop-shadow-[0_0_20px_rgba(255,255,0,0.6)] mb-4"
            >
              {weatherIcons[weatherData.weathercode] || "🌤️"}
            </motion.div>

            <motion.p
              className="text-5xl font-semibold mb-2 animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {weatherData.temperature}°C
            </motion.p>

            <p className="text-lg mt-2 opacity-80">
              💨 {weatherData.windspeed} m/s wind
            </p>
          </motion.div>
        )}

        {/* Forecast Header */}
        <div className="mb-6 flex justify-between items-center border-b border-yellow-400/20 pb-3">
          <h2 className="text-2xl font-semibold text-yellow-300">
            5-Day Forecast
          </h2>
        </div>

        {/* Forecast Row */}
        <motion.div
          className="flex flex-row overflow-x-auto space-x-5 pb-4 scrollbar-thin scrollbar-thumb-yellow-600 scrollbar-track-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {forecastData.map((day, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 flex flex-col items-center p-6 bg-yellow-400/5 border border-yellow-300/20 rounded-2xl shadow-[0_0_15px_rgba(255,255,0,0.05)] hover:shadow-[0_0_25px_rgba(255,255,0,0.3)] hover:scale-105 transition-all duration-300 ease-in-out min-w-[160px]"
              whileHover={{ y: -4 }}
            >
              <p className="font-semibold mb-2 text-yellow-300">
                {formatDate(day.date)}
              </p>

              {/* Animated smaller icon */}
              <motion.div
                variants={floatAnimation}
                animate="animate"
                className="text-[5rem] md:text-[6rem] drop-shadow-[0_0_15px_rgba(255,255,0,0.5)] mb-3 leading-none"
              >
                {weatherIcons[day.weathercode] || "🌤️"}
              </motion.div>

              <div className="text-sm text-yellow-100/90 space-y-1 text-center">
                <p>🌡️ Max: {day.temperature_max}°C</p>
                <p>🌡️ Min: {day.temperature_min}°C</p>
                <p>💨 {day.windspeed} m/s</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm opacity-60 text-yellow-200">
        ⚡ Powered by OpenWeather — Designed by{" "}
        <span className="text-yellow-400">You</span>
      </footer>
    </div>
  );
};

export default LandingPage;
