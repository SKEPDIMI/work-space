import { createStore } from 'redux';
import reducer from './reducers';

// The initial state here was a string, but at some point,
// it was converted to an object(?). Whatever the response
// from the API is. This will be problematic because
// Whenever you deal with the global state of the app
// (i.e. store) you have to do paranoid
// checks to check that it is either "pending", "undefined",
// or an object. This might be tolerable,
// but it's not extensible. So when you want to add more
// information other than the user, you have to
// backpedal from using this to an object like:
// initialState = { currentUser: {}, spaces: [], loading: false }

let initialState = { currentUser: null };

const store = createStore(reducer, initialState);

export default store;
