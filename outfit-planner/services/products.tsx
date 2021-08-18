import api from './config';

function fetchProducts(token) {
  return fetch(`${api.URL}/products`, {
    method: 'GET',
    headers: api.getHeaders(token),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

function addProduct(product, token) {
  return fetch(`${api.URL}/product`, {
    method: 'POST',
    headers: api.getHeaders(token),
    body: JSON.stringify({
      product: product,
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

function removeProduct(id, token){
  return fetch(`${api.URL}/product`, {
    method: 'DELETE',
    headers: api.getHeaders(token),
    body: JSON.stringify({
      id: id,
    })
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

function getImageContent(id, token) {
  return fetch(`${api.URL}/image`, {
    method: 'POST',
    headers: api.getHeaders(token),
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
  fetchProducts,
  getImageContent
}

