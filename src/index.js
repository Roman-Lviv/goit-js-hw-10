import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

let select;

const populateBreeds = () => {
  fetchBreeds()
    .then(breeds => {
      const options = breeds.map(breed => ({
        text: breed.name,
        value: breed.id,
      }));
      select.setData(options);
      select.set('placeholder', 'Select a breed');
      select.set('searchable', true);
      select.set('searchPlaceholder', 'Search for a breed');
      select.set('onChange', info => fetchCatInfo(info.value));
      loader.style.display = 'none';
      breedSelect.style display = 'block';
    })
    .catch(err => {
      loader.style.display = 'none';
      error.style.display = 'block';
      console.error('Error fetching breeds:', err);
    });
};

const fetchCatInfo = breedId => {
  
};

select = new SlimSelect({
  select: breedSelect,
  placeholder: 'Loading breeds...',
});

populateBreeds();