
import { useState, useEffect } from "react";
import Clock from "react-live-clock";
import ReactAnimatedWeather from "react-animated-weather";

import loader from "../images/WeatherIcons.gif";
import { getWeather } from "../utils/helpers";
import Forecast from "./Forecast";

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

function Weather() {
  const [state, setState] = useState({
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState(prevState => ({
           ...prevState,
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }));
          getWeather(position.coords.latitude, position.coords.longitude).then(data => {
              setState({
                lat: data.lat,
                lon: data.lon,
                city: data.city,
                temperatureC: data.temperatureC,
                temperatureF: data.temperatureF,
                humidity: data.humidity,
                description: data.description,
                country: data.country,
                icon: data.icon,
              });
            }).catch(err => {
              console.error("Error fetching weather data:", err);
              setState({...state, errorMessage: err.message });
            });
        },
        (err) => {
          console.error("Geolocation error:", err);
          alert("You have disabled location service. Allow 'This APP' to access your location.");
          getWeather(28.67, 77.22); // Fallback coordinates
        }
      );
    } else {
      alert("Geolocation not available");
    }

    const timerID = setInterval(() => getWeather(state.lat, state.lon), 600000);

    return () => clearInterval(timerID);
  }, []);

  if (!state.temperatureC) {
    return (
      <>
        <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} alt="Loading..." />
        <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>Detecting your location</h3>
        <h3 style={{ color: "white", marginTop: "10px" }}>Your current location will be displayed on the App & used for calculating Real time weather.</h3>
      </>
    );
  }

  return (
    <>
      <div className="city">
        <div className="title">
          <h2>{state.city}</h2>
          <h3>{state.country}</h3>
        </div>
        <div className="mb-icon">
          <ReactAnimatedWeather
            icon={state.icon}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
          <p>{state.description}</p>
        </div>
        <div className="date-time">
          <div className="dmy">
            <div id="txt"></div>
            <div className="current-time">
              <Clock format="HH:mm:ss" interval={1000} ticking={true} />
            </div>
            <div className="current-date">{dateBuilder(new Date())}</div>
          </div>
          <div className="temperature">
            <p>
              {state.temperatureC}°<span>C</span>
            </p>
          </div>
        </div>
      </div>
      <Forecast icon={state.icon} weather={state.description} /> 
    </>
  );
}

export default Weather;
