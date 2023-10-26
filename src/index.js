import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
let select;

select = new SlimSelect({
  select: '.breed-select',
  placeholder: 'Loading breeds...',
});

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
      loader.style display = 'none';
      error.style.display = 'block';
      console.error('Error fetching breeds:', err);
    });
};

const fetchCatInfo = breedId => {
  loader.style.display = 'block';
  catInfo.innerHTML = '';
  error.style.display = 'none';

  fetchCatByBreed(breedId)
    .then(catData => {
      const catImage = document.createElement('img');
      catImage.src = catData.url;

      const catName = document.createElement('p');
      catName.textContent = `Breed: ${catData.breeds[0].name}`;

      const catDescription = document.createElement('p');
      catDescription.textContent = `Description: ${catData.breeds[0].description}`;

      const catTemperament = document.createElement('p');
      catTemperament.textContent = `Temperament: ${catData.breeds[0].temperament}`;

      catInfo.appendChild(catImage);
      catInfo.appendChild(catName);
      catInfo.appendChild(catDescription);
      catInfo.appendChild(catTemperament);

      loader.style.display = 'none';
    })
    .catch(err => {
      loader.style.display = 'none';
      error.style.display = 'block';
      console.error('Error fetching cat info:', err);
    });
};

breedSelect.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  fetchCatInfo(selectedBreedId);
});

populateBreeds();