import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('change', onChange);
let select;

select = new SlimSelect({
  select: '.breed-select',

  settings: {
    placeholderText: 'Loading breeds...',
  },
});

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

function onChange(e) {
  fetchCatByBreed(e.target.value)
    .then(response => {
      if (response && response.length > 0) {
        const catData = response[0];
        const catInfo = document.querySelector('.cat-info');

        const catTemplate = `
            <div class="cat-card">
              <img src="${catData.url}" alt="Cat">
              <h2>Name: ${catData.name}</h2>
              <p>Breed: ${catData.breed}</p>
              <p>Age: ${catData.age}</p>
            </div>
          `;

        catInfo.innerHTML = catTemplate;
      } else {
        const catInfo = document.querySelector('.cat-info');
        catInfo.innerHTML = 'No cat data available.';
      }
    })
    .catch(err => {
      console.error('Error fetching cat data:', err);
    });
}
