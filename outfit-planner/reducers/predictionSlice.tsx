import outfitsService from '../services/outfits'

const initialState = []

const PREDICTION_FETCHED = 'prediction/predictionFetched';

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case PREDICTION_FETCHED:
      return action.payload
    default:
      return state
  }
}



export const fetchPrediction = (weather) => {
  return async function fetchPrediction(dispatch, getState) {
    var user = getState().session.user.token;
    const predictions = await outfitsService.fetchOutfitsByWeather(weather, user)
    dispatch({ type: PREDICTION_FETCHED, payload: predictions })
  }
}