import api from './config';

function fetchProducts(token) {
  return fetch(`${api.URL}/products`, {
    method: 'GET',
    headers: {
      ...api.headers,
      'Authorization': 'Bearer ' + token
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

function addProduct(product) {
  return fetch(`${api.URL}/product`, {
    method: 'POST',
    headers: api.headers,
    body: JSON.stringify({
      product: product,
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

function removeProduct(id){
  return fetch(`${api.URL}/product`, {
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
  addProduct,
  removeProduct,
  fetchProducts
}

