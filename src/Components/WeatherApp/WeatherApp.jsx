import React, { useState } from "react";
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';

const WeatherApp = () => {
    const api_key = "48383847220d7caf5b2360edd10c38cf";
    const [weather, setWeather] = useState({
        icon: cloud_icon,
        temperature: "24°C",
        location: "Location",
        humidity: "80%",
        windSpeed: "5.13 km/h"
    });
    const [searchQuery, setSearchQuery] = useState("");

    const search = async () => {
        if (!searchQuery) {
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=metric&appid=${api_key}`;
        try {
            const response = await fetch(url);
            const data = await response.json();

            const weatherIcon = data.weather[0].icon;
            let icon;

            switch (weatherIcon) {
                case "01d":
                case "01n":
                    icon = clear_icon;
                    break;
                case "02d":
                case "02n":
                    icon = cloud_icon;
                    break;
                case "03d":
                case "03n":
                case "04d":
                case "04n":
                    icon = drizzle_icon;
                    break;
                case "09d":
                case "09n":
                case "10d":
                case "10n":
                    icon = rain_icon;
                    break;
                case "13d":
                case "13n":
                    icon = snow_icon;
                    break;
                default:
                    icon = clear_icon;
            }

            setWeather({
                icon,
                temperature: `${Math.floor(data.main.temp)}°C`,
                location: data.name,
                humidity: `${data.main.humidity}%`,
                windSpeed: `${Math.floor(data.wind.speed)} km/h`
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    return (
        <div className="container">
            <div className="top-bar">
                <input
                    type="text"
                    placeholder="Search"
                    className="search-bar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="Search" />
                </div>
            </div>
            <div className="weather-img">
                <img src={weather.icon} alt="Weather Icon" />
            </div>
            <div className="weather-temp">{weather.temperature}</div>
            <div className="weather-location">{weather.location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="Humidity Icon" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{weather.humidity}</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="Wind Icon" className="icon" />
                    <div className="data">
                        <div className="windspeed">{weather.windSpeed}</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;

