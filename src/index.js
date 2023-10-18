// import axios from 'axios';

import SlimSelect from 'slim-select';

axios.defaults.headers.common['x-api-key'] = 'твій ключ';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

let select;

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
      breedSelect.style.display = 'block';
    })
    .catch(err => {
      loader.style.display = 'none';
      error.style.display = 'block';
      console.error('Error fetching breeds:', err);
    });
};

const fetchCatInfo = breedId => {
  loader.style.display = 'block';
  catInfo.style.display = 'none';
  error.style.display = 'none';

  fetchCatByBreed(breedId)
    .then(catData => {
      const cat = catData[0];
      const { name, description, temperament } = cat.breeds[0];

      const catImage = document.createElement('img');
      catImage.src = cat.url;

      const catName = document.createElement('h2');
      catName.textContent = `Name: ${name}`;

      const catDescription = document.createElement('p');
      catDescription.textContent = `Description: ${description}`;

      const catTemperament = document.createElement('p');
      catTemperament.textContent = `Temperament: ${temperament}`;

      catInfo.innerHTML = '';
      catInfo.appendChild(catImage);
      catInfo.appendChild(catName);
      catInfo.appendChild(catDescription);
      catInfo.appendChild(catTemperament);

      loader.style.display = 'none';
      catInfo.style.display = 'block';
    })
    .catch(err => {
      loader.style.display = 'none';
      error.style.display = 'block';
      console.error('Error fetching cat information:', err);
    });
};

select = new SlimSelect({
  select: breedSelect,
  placeholder: 'Loading breeds...',
});

populateBreeds();
