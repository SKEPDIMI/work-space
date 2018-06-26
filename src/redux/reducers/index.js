import { combineReducers } from "redux";
import userReducer from './userReducer';
import popularSpacesReducer from './popularSpacesReducer';

const reducers = combineReducers({
  user: userReducer,
  popularSpaces: popularSpacesReducer
});

export default reducers;