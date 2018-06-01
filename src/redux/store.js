import { createStore } from 'redux';
import reducer from './reducers';

let initialState = 'pending';

const store = createStore(reducer, initialState);

export default store;