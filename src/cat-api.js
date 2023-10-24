import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_NhSrRxtwZj7uypmgbjo4Tmh4DCoEpAzSYngICE3X5fge2sZZWwQja8SMmW7HlaJe';

const BASE_URL = 'https://api.thecatapi.com/v1';
const fetchBreeds = () => {
  return axios.get('${BASE_URL}/breeds').then(response => response.data);
};

const fetchCatByBreed = breedId => {
  return axios.get('${BASE_URL}/Image/search/').then(response => response.data);
};

export { fetchBreeds, fetchCatByBreed };
