import api from './config';

function plotPrediction(weather, token) {
  return fetch(`${api.URL}/plot-prediction`, {
    method: 'POST',
    headers: api.getHeaders(token),
    body: JSON.stringify({
      weather
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export default {
  plotPrediction,
}

