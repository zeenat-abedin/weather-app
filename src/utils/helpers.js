import apiKeys from '../data/apiKeys';

export const getWeather = async (lat, lon) => {
  try {
    const response = await fetch(`${apiKeys.base}/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`);

    // if (!response.ok) {
    //   throw new Error(`HTTP error status: ${response.status}`);
    // }

    const data = await response.json();

    if (data.cod === "404") {
      throw new Error("City not found");
    }

    return {
      lat,
      lon,
      city: data.name,
      temperatureC: Math.round(data?.main?.temp),
      temperatureF: Math.round(data?.main?.temp * 1.8 + 32),
      humidity: data?.main?.humidity,
      description: data?.weather[0]?.main,
      country: data?.sys?.country,
      icon: determineIcon(data?.weather[0]?.main),
    };
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    throw error;
  }
};

const determineIcon = (description) => {
  switch (description) {
    case "Haze":
      return "CLEAR_DAY";
    case "Clouds":
      return "CLOUDY";
    case "Rain":
      return "RAIN";
    case "Snow":
      return "SNOW";
    case "Dust":
      return "WIND";
    case "Drizzle":
      return "SLEET";
    case "Fog":
    case "Smoke":
      return "FOG";
    case "Tornado":
      return "WIND";
    default:
      return "CLEAR_DAY";
  }
};