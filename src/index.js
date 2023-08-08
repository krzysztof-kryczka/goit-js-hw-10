import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const obj = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  description: document.querySelector('.cat-info'),
};

const arrayBreedsId = [];

//Fill in the selection list with cat names
fetchBreeds()
  .then(response => {
    response?.forEach(element => {
      console.log(element);
      arrayBreedsId.push({ value: element.id, text: element.name });
    });

    new SlimSelect({
      select: '.breed-select',
      data: [
        {
          label: 'Beuatiful Cats',
          options: [...arrayBreedsId],
        },
      ],
    });
  })
  .catch(onFetchError);

//Error handling
function onFetchError(error) {
  console.error('Error fetching data: ', error);
}

const onSelectBreed = e => {

  const selected = e.target.selectedOptions[0];
  console.log(
    `${e.currentTarget.selectedIndex}, ${selected.text}, ${selected.value}`
  );

  fetchCatByBreed(selected.value)
    .then(response => {
      console.log(response);

      obj.description.innerHTML = `
      <div>
        <img src="${response[0].url}" alt="${response[0].breeds[0].name}" width="400"/>
      </div>
      <div>
        <h1>${response[0].breeds[0].name}</h1>
        <p>${response[0].breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${response[0].breeds[0].temperament}</p>
      </div>`;

    })
    .catch(onFetchError);
};

obj.breedSelect.addEventListener('change', onSelectBreed);
