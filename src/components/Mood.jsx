const suggestMood = (weatherData) => {
  let mood = '';
  let activity = '';

  if (weatherData.description === 'Clear') {
    mood = 'Sunny';
    activity = 'Go for a walk or enjoy outdoor activities.';
  } else if (weatherData.description === 'Rain') {
    mood = 'Cloudy';
    activity = 'Stay cozy indoors or consider indoor hobbies.';
  } else if (weatherData.temperatureC > 30) {
    mood = 'Hot';
    activity = 'Find shade and stay hydrated.';
  } else if (weatherData.temperatureC < 0) {
    mood = 'Cold';
    activity = 'Bundle up and keep warm.';
  }
  return { mood, activity };
};

function WeatherMood({ weatherData }) {
  const { mood, activity } = suggestMood(weatherData);

  return (
    <div className="weather-mood">
      <h3>{mood}</h3>
      <p>{activity}</p>
    </div>
  );
}

export default WeatherMood