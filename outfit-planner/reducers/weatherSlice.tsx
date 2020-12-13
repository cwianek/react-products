import getWeather from '../services/weather';

const initialState = {}

const WEATHER_FETCHED = 'weather/weatherFetched';

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case WEATHER_FETCHED:
      return action.payload
    default:
      return state
  }
}

export async function fetchWeather(dispatch, getState) {
  const response = await getWeather();
  dispatch({ type: WEATHER_FETCHED, payload: response })
}