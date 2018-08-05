import { combineReducers } from "redux";
import userReducer from './userReducer';
import popularSpacesReducer from './popularSpacesReducer';
import errorMessagesReducer from './errorMessagesReducer';

const reducers = combineReducers({
  errorMessages: errorMessagesReducer,
  user: userReducer,
  popularSpaces: popularSpacesReducer
});

export default reducers;