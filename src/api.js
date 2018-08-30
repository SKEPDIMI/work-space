import { create } from 'apisauce'
import config from './config';

// define the api
const api = create({
  baseURL: config.apiURL,
  headers: {
    'Cache-Control': 'no-cache',
    'Accept': 'application/json'
  },
  timeout: 10000
});

api.addResponseTransform(response => {
  if (!response.data) {
    response.data = {
      message: null
    }
  }
})

export default api;