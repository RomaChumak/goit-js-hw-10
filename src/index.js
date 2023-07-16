import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';

const selectors = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info')
}


selectors.select.addEventListener('change', handlerChange);

function handlerChange() {
    const selectId = selectors.select.value;
    showLoader();
    fetchCatByBreed(selectId)
        .then(cat => {
            displayCatInfo(cat);
            hideLoader();
        })
        .catch(error => {
            console.error(error);
            selectors.catInfo.innerHTML = '';
            showError();
            hideLoader();
        });
}
function showLoader() {
    selectors.loader.style.display = 'block';
    hideError();
}

function hideLoader() {
    selectors.loader.style.display = 'none';
}

function showError() {
      Notiflix.Notify.failure(selectors.error.textContent);
}

function hideError() {
  selectors.error.style.display = 'none';
}

function populateBreedSelect(data) {
    const optionsCats = data.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
     
    selectors.select.insertAdjacentHTML('beforeend', optionsCats);

  hideLoader();
}

function displayCatInfo(cat) {
    selectors.catInfo.innerHTML = `<img src="${cat.url}" alt="Cat Image">
    <h2>${cat.breeds[0].name}</h2>
    <p>${cat.breeds[0].description}</p>
    <h3>Temperament: ${cat.breeds[0].temperament}</h3>`;

}
    showLoader();
    fetchBreeds()
        .then(data => {
           populateBreedSelect(data);
    new SlimSelect({
      select: '.breed-select',
    });
        })
        .catch(error => {
    console.error(error);
    showError();
    hideLoader();
  });
