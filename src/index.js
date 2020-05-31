import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

import App from './App';

//styles
import 'index.css';
import "antd/dist/antd.css";

import configureStore from './redux/configureStore';
export const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();