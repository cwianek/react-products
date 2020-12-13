const WEATHER_API_KEY = '05222a3a0ffed4d65a5a01ac85a1deab';

let weather = null;

const weatherTimestamptToDate = (weather) => {
  let timestamp = weather.dt;
  let time = new Date(timestamp * 1000);
  weather.dt = time;
  return weather;
}

const fetchHistoricWeather = async ({ lat, lon, units }) => {
  let now = new Date();
  let dt = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0))
  dt = dt.getTime() / 1000
  dt = dt.toFixed(0);
  return fetch(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&units=${units}&dt=${dt}&appid=${WEATHER_API_KEY}`, {
    method: 'GET',
  }).then((response) => response.json())
}

const fetchCurrentWeather = async ({ lat, lon, exclude, units }) => {
  return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&units=${units}&appid=${WEATHER_API_KEY}`, {
    method: 'GET',
  }).then((response) => response.json());
}

const getWeather = async () => {
  if(weather !== null){
    return weather;
  }
  
  let weathers = await fetchWeatherInfo();
  weathers = weathers.map((w) => {
    const picked = (({ dt, clouds, humidity, pressure, temp, wind_speed }) => ({ dt, clouds, humidity, pressure, temp, wind_speed }))(w);
    return picked;
  })
  weather = weathers[0];
  return weather;
  //this.setState({ weather: weathers[0], weathers: weathers })
}

const fetchWeatherInfo = async () => {
  const requestData = {
    lat: 52.4064,
    lon: 16.9252,
    exclude: 'minutely,daily',
    units: 'metric'
  }

  const hoursForPrediction = [12];
  let now = new Date();
  const hour = now.getHours();
  const day = now.getDate();

  let mode = 'today';
  if (hour > 18) {
    mode = 'tommorow';
  }

  const weathers = await fetchCurrentWeather(requestData);
  let result = weathers.hourly
    .map(weatherTimestamptToDate)
    .filter((weather) => {
      let time = weather.dt;
      if (mode === 'today') {
        if (time.getDate() === day && hoursForPrediction.includes(time.getHours())) {
          return true;
        }
      } else { //TODO: to gówno nie zadziała
        if (time.getDate() === day + 1 && hoursForPrediction.includes(time.getHours())) {
          return true;
        }
      }
    })


  const missing = hoursForPrediction.length - result.length;
  if (missing > 0) {
    const hoursToAdd = hoursForPrediction.slice(0, missing);
    const historicWeather = await fetchHistoricWeather(requestData);

    let historicResult = historicWeather.hourly
      .map(weatherTimestamptToDate)
      .filter((weather) => {
        if (hoursToAdd.includes(weather.dt.getHours())) {
          return true;
        }
      })

    result = historicResult.concat(result);
  }

  return result;
}

export default getWeather;