import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
let select;
const populateBreeds = () => {
  fetchBreeds()
    .then(res => {
      const options = res.map(breed => ({
        text: breed.name,
        value: breed.id,
      }));
      select.setData(options);
      breedSelect.classList.remove('is-hidden');
      loader.style.display = 'none';
    })
    .catch(err => {
      loader.style.display = 'none';
      error.style.display = 'block';
      console.error('Error fetching breeds:', err);
    });
};
const fetchCatInfo = breedId => {};
select = new SlimSelect({
  select: '#breedSelect',
  placeholder: 'Loading breeds...',
});
populateBreeds();
