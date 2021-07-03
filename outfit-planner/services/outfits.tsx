import api from './config';

function fetchOutfitsByWeather(weather, token) {
  return fetch(`${api.URL}/outfits-by-weather`, {
    method: 'POST',
    headers: {
      ...api.headers,
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      weather
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

function addOutfit(outfit) {
  return fetch(`${api.URL}/outfit`, {
    method: 'POST',
    headers: api.headers,
    body: JSON.stringify({
      outfit: outfit,
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

function removeOutfit(id) {
  return fetch(`${api.URL}/outfit`, {
    method: 'DELETE',
    headers: api.headers,
    body: JSON.stringify({
      id: id,
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export default {
  fetchOutfitsByWeather,
  addOutfit,
  removeOutfit
}

