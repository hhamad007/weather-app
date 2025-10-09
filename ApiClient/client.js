"use client";

import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export class ApiClient {
  async responseStatusCheck(response) {
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response;
  }

  // Get current weather by coordinates
  async getCurrentWeatherByCoords(lat, lon) {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          latitude: lat,
          longitude: lon,
          current_weather: true,
        },
      });

      await this.responseStatusCheck(response);
      return response.data.current_weather;
    } catch (error) {
      console.error("Error fetching current weather by coordinates:", error);
      throw new Error("Failed to fetch current weather");
    }
  }

  // Get 5-day forecast by coordinates
  async getFiveDayForecastByCoords(lat, lon) {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          latitude: lat,
          longitude: lon,
          daily: "temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max",
          timezone: "auto",
        },
      });

      await this.responseStatusCheck(response);

      // Build a 5-day array
      const dailyData = response.data.daily;
      const forecast = dailyData.time.map((date, index) => ({
        date,
        temperature_max: dailyData.temperature_2m_max[index],
        temperature_min: dailyData.temperature_2m_min[index],
        weathercode: dailyData.weathercode[index],
        windspeed: dailyData.windspeed_10m_max[index],
      }));

      return forecast.slice(0, 5); // Return only 5 days
    } catch (error) {
      console.error("Error fetching 5-day forecast by coords:", error);
      throw new Error("Failed to fetch 5-day forecast");
    }
  }
}

export default ApiClient;
