let apiURL = process.env.NODE_ENV === 'production' ?
'https://workspace-api.herokuapp.com':'http://localhost:5000';

export default {
  apiURL : apiURL
}

