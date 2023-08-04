import { fetchBreeds } from './js/cat-api';
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
