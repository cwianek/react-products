// const URL = 'https://outfitplannerapp.herokuapp.com/';
const URL = 'http://192.168.18.15:2006';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

function getHeaders(token){
  return {
    ...headers,
    'Authorization': 'Bearer ' + token
  }
}

export default {
  URL,
  headers,
  getHeaders
}