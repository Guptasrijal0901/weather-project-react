import React, { useState } from 'react';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    const API_KEY = 'ca4473ef9e684b9cb590d0d990792317';
    const API_URL = `http://api.weatherbit.io/v2.0/current`;

    try {
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (error) {
      setError('Weather data not available');
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeatherData(city);
      setCity('');
    }
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Simple Weather App</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px 15px', fontSize: '16px', marginLeft: '10px' }}>
          Search
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weather && (
        <div style={{ marginTop: '20px' }}>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
