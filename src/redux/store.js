import { createStore } from 'redux';
import reducer from './reducers';

let initialState = undefined;

const store = createStore(reducer, initialState);

export default store;