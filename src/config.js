let apiURL = process.env.NODE_ENV === 'production' ?
'https://workspace-api.herokuapp.com/api':'http://localhost:5000/api';

export default {
  apiURL : apiURL
}
