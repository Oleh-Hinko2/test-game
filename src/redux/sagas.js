import { all, fork } from 'redux-saga/effects';

import { watchSettings } from './settings';
import { watchWinners } from './winners';

export default function* rootSaga() {
  yield all([
    fork(watchSettings),
    fork(watchWinners),
  ]);
}
