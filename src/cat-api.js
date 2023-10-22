import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_NhSrRxtwZj7uypmgbjo4Tmh4DCoEpAzSYngICE3X5fge2sZZWwQja8SMmW7HlaJe';

const fetchBreeds = () => {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data);
};

const fetchCatByBreed = breedId => {
  return axios
    .get(
      'live_NhSrRxtwZj7uypmgbjo4Tmh4DCoEpAzSYngICE3X5fge2sZZWwQja8SMmW7HlaJe'
    )
    .then(response => response.data);
};

export { fetchBreeds, fetchCatByBreed };
