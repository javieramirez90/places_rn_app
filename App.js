import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/places-reducers';
import { init } from './helpers/db';

init()
.then(() => console.log("Base de datos inicializada de forma correcta"))
.catch(err => console.log('Error al inicializar la base de datos', err))

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator/>
    </Provider>
  );
};