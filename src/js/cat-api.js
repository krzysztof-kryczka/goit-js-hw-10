import axios from 'axios';

const AUTH_TOKEN = 'live_av59dyFJMFB4kPyWbQ7wtxUtY8B3KXY1HCkaYlLt3vIGMr51p1qtop2WRDg2xaPY';
axios.defaults.headers.common['x-api-key'] = AUTH_TOKEN;

const API_BASE_URL = 'https://api.thecatapi.com/v1';

//Function to fetch the list of cat breeds
const fetchBreeds = async () => {
  try {
    await axios.get(`${API_BASE_URL}/breeds`).then(response => {
      console.log(response.data);
    });
  } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.log(error.response);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error);
          }
  }
};

//export name function
export { fetchBreeds };