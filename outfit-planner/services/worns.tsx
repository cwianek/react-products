import api from './config';

function addWorn(worn){
  return fetch(`${api.URL}/worns`, {
    method: 'POST',
    headers: api.headers,
    body: JSON.stringify({
      worn: worn,
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

function removeWorn(worn){
  return fetch(`${api.URL}/worns`, {
    method: 'DELETE',
    headers: api.headers,
    body: JSON.stringify({
      outfitId: worn.outfitId,
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export default{
  addWorn,
  removeWorn
}