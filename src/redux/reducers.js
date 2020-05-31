import { combineReducers } from 'redux';

import settings from './settings';
import winners from './winners';

const rootReducer = combineReducers({
  settings,
  winners,
});

export default rootReducer;