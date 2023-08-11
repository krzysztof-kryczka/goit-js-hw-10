import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

export const obj = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  description: document.querySelector('.cat-info'),
};

obj.breedSelect.classList.add('is-hidden');
obj.loader.classList.add('is-hidden');
obj.error.classList.add('is-hidden');
obj.description.classList.add('is-hidden');

const arrayBreedsId = [];

//Fill in the selection list with cat names
fetchBreeds()
  .then(response => {
    response.forEach(element => {
      console.log(element);
      arrayBreedsId.push(
        `<option value="${element.id}">${element.name}</option>`
      );
      console.log(`<option value="${element.id}">${element.name}</option>`);
      return `<option value="${element.id}">${element.name}</option>`;
    });
    console.log(`${arrayBreedsId}`);
    obj.breedSelect.insertAdjacentHTML('beforeend', arrayBreedsId);

    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(onFetchError);

//Error handling
function onFetchError(error) {
  console.error('Error fetching data: ', error);
  Loading.remove();
  Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    position: 'center-center',
    timeout: 5000,
    width: '400px',
    fontSize: '24px',
  });
}

const onSelectBreed = e => {
  Loading.standard('Loading data, please wait...');
  const selected = e.target.selectedOptions[0];
  console.log(
    `${e.currentTarget.selectedIndex}, ${selected.text}, ${selected.value}`
  );

  fetchCatByBreed(selected.value)
    .then(response => {
      obj.description.innerHTML = `
      <div class="group-div">
      <div>
        <img src="${response[0].url}" alt="${response[0].breeds[0].name}" width="400"/>
      </div>
      <div>
        <h1>${response[0].breeds[0].name}</h1>
        <p>${response[0].breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${response[0].breeds[0].temperament}</p>
      </div>
      </div>`;
      Loading.remove();
    })
    .catch(onFetchError);
};

obj.breedSelect.addEventListener('change', onSelectBreed);
