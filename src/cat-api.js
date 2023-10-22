// cat-api.js
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'твій ключ';

const fetchBreeds = () => {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export { fetchBreeds, fetchCatByBreed };
