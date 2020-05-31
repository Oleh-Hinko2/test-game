import { takeEvery, put, call } from 'redux-saga/effects';
import { getGameSettings } from '../../api/gameSettings';

const SETTINGS_LOADING = 'settings/SETTINGS_LOADING';
const SETTINGS_LOAD_FAILED = 'settings/SETTINGS_LOAD_FAILED';
const SET_SETTINGS = 'setting/SET_SETTINGS';
const GET_SETTINGS = 'settings/GET_SETTINGS';
const SUCCESS_LOAD_SETTINGS = 'settings/SUCCESS_LOAD_SETTINGS';
const TOGGLE_STATUS_GAME = 'settings/TOGGLE_STATUS_GAME';
const SET_STATUS_AGAIN = 'settings/SET_STATUS_AGAIN';

const initialState = {
  loading: false,
  userName: '',
  allSettings: [],
  currentSettings: {
    field: null
  },
  startGame: false,
  buttonStatus: "play"
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SETTINGS_LOADING: {
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
    case SET_SETTINGS: {
      return {
        ...state,
        userName: action.name,
        currentSettings: action.data
      };
    }
    case SUCCESS_LOAD_SETTINGS: {
      return {
        ...state,
        allSettings: action.data
      };
    }
    case SET_STATUS_AGAIN: {
      return {
        ...state,
        buttonStatus: 'playAgain',
        currentSettings: {
          ...state.currentSettings,
          delay: null
        },
      }
    }
    case TOGGLE_STATUS_GAME: {
      return {
        ...state,
        startGame: !state.startGame
      }
    }
    default:
      return state;
  }
}

// <<<ACTIONS>>>
export const setSettings = (data, name) => ({ type: SET_SETTINGS, data, name});
export const getSettings = () => ({ type: GET_SETTINGS });
export const toggleStatusGame = () => ({ type: TOGGLE_STATUS_GAME });
export const setStatusAgainBtns = () => ({ type: SET_STATUS_AGAIN });

//<<<WORKERS>>>
function* getData() {
  yield put({ type: SETTINGS_LOADING })
  try {
    const response = yield call(getGameSettings);
    if (response.status === 200) {
      yield put({ type: SUCCESS_LOAD_SETTINGS, data: response.data });
    } 
  } catch (error) {
    yield put({ type: SETTINGS_LOAD_FAILED })
    console.log(error)
  }
};

//<<<WATCHERS>>>
export function* watchSettings() {
  yield takeEvery(GET_SETTINGS, getData);
}