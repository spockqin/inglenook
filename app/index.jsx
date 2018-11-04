import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store, configureFakeBackend } from './_helpers';
import { App } from './components/App';

// setup fake backend
configureFakeBackend();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
