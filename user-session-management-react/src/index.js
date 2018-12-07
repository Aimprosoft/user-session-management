import App from 'src/browser/container/App';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import store from 'src/browser/stores/LocalStorage';
import {Provider} from 'react-redux';

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
