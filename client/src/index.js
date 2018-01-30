import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import {
  BrowserRouter,
} from 'react-router-dom';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader';
import reducers from './reducers/index';
import App from './app';

import { createBrowserHistory } from 'history';

const logger = createLogger();
const store = createStore(
    reducers,
    applyMiddleware(thunk, promise, logger)
);
const history = syncHistoryWithStore(createBrowserHistory(), store);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store} history = {history}>
        <BrowserRouter >
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('reactbody'),
  );
};

render(App);