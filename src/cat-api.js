import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_NhSrRxtwZj7uypmgbjo4Tmh4DCoEpAzSYngICE3X5fge2sZZWwQja8SMmW7HlaJe';

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
    .get(
      'live_NhSrRxtwZj7uypmgbjo4Tmh4DCoEpAzSYngICE3X5fge2sZZWwQja8SMmW7HlaJe'
    )
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export { fetchBreeds, fetchCatByBreed };
