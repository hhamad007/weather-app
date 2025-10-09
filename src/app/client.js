// src/services/client.js
"use client";

import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1';


export class ApiClient {
  async responseStatusCheck(responseObject) {
    if (responseObject.status !== 200 && responseObject.status !== 201) {
      throw new Error(`Request failed with status ${responseObject.status}`);
    }
    return responseObject;
  }

  async getCurrentWeatherByCity(city) {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          units: 'metric',
        },
      });

      await this.responseStatusCheck(response);
      return response.data;
    } catch (error) {
      console.error('Error fetching current weather:', error);
      throw new Error('Failed to fetch current weather');
    }
  }

  async getCurrentWeatherByCoords(lat, lon) {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        latitude: lat,
        longitude: lon,
        current_weather: true,
      },
    });

    await this.responseStatusCheck(response);
    return response.data.current_weather;
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    throw new Error('Failed to fetch weather by location');
  }
}

  async getFiveDayForecastByCity(city) {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          units: 'metric',
        },
      });

      await this.responseStatusCheck(response);

      const seenDates = new Set();
      const dailyForecast = response.data.list.filter((entry) => {
        const date = entry.dt_txt.split(' ')[0];
        if (seenDates.has(date)) return false;
        seenDates.add(date);
        return true;
      });

      return dailyForecast.slice(0, 5);
    } catch (error) {
      console.error('Error fetching 5-day forecast:', error);
      throw new Error('Failed to fetch forecast data');
    }
  }

  async getDetailedForecastByDate(city, targetDate) {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          units: 'metric',
        },
      });

      await this.responseStatusCheck(response);

      const detailedEntries = response.data.list.filter((entry) =>
        entry.dt_txt.startsWith(targetDate)
      );

      return detailedEntries;
    } catch (error) {
      console.error('Error fetching detailed forecast:', error);
      throw new Error('Failed to fetch detailed forecast');
    }
  }
}