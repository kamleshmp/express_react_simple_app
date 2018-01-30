import { combineReducers } from 'redux';
import contact from './contact';
import message from './message';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  contact,
  message,
  routing: routerReducer
});

export default rootReducer;
