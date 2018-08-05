import { create } from 'apisauce'
import config from './config';

// define the api
const api = create({
  baseURL: config.apiURL + '/api'
});

api.addResponseTransform(response => {
  if (!response.data) {
    response.data = {
      message: null
    }
  }
})

export default api;