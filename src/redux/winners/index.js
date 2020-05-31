import { takeEvery, put, call } from 'redux-saga/effects';
import { fetchAllWinners, setWinners } from '../../api/winners';

const WiNNERS_LOADING = 'winners/WiNNERS_LOADING';
const SETTINGS_LOAD_FAILED = 'winners/SETTINGS_LOAD_FAILED';
const SET_WINNERS = 'winners/SET_WINNERS';
const GET_WINNERS_DATA = 'winners/GET_WINNERS_DATA';
const SUCCESS_LOAD_WINNERS = 'winners/SUCCESS_LOAD_WINNERS';

const initialState = {
  loading: false,
  data: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case WiNNERS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SETTINGS_LOAD_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case SUCCESS_LOAD_WINNERS: {
      return {
        ...state,
        loading: false,
        data: action.data
      };
    }
    default:
      return state;
  }
}

// <<<ACTIONS>>>
export const setWinnersData = data => ({ type: SET_WINNERS, data });
export const getWinners = () => ({ type: GET_WINNERS_DATA });

//<<<WORKERS>>>
function* getData() {
  yield put({ type: WiNNERS_LOADING })
  try {
    const response = yield call(fetchAllWinners);
    if (response.status === 200) {
      yield put({ type: SUCCESS_LOAD_WINNERS, data: response.data })
    } 
  } catch (error) {
    yield put({ type: SETTINGS_LOAD_FAILED })
    console.log(error)
  }
};

function* setData({ data }) {
  yield put({ type: WiNNERS_LOADING })
  try {
    const response = yield call(setWinners, data);
    if (response.status === 200) {
      yield put({ type: GET_WINNERS_DATA })
    } 
  } catch (error) {
    yield put({ type: SETTINGS_LOAD_FAILED })
    console.log(error)
  }
};

//<<<WATCHERS>>>
export function* watchWinners() {
  yield takeEvery(GET_WINNERS_DATA, getData);
  yield takeEvery(SET_WINNERS, setData);
}