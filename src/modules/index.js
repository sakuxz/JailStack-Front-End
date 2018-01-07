import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import counter from './counter';
import user from './user';
import network from './network';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  counter,
  user,
  network,
});
