/* eslint-disable no-console */
import {createStore, applyMiddleware, combineReducers} from 'redux';
// import AuthReducer from 'src/browser/reducers/AuthReducer';
import thunk from 'redux-thunk';
import authentication from 'src/browser/actions/Authentication';

export const loadState = itemName => {
  try {
    const serialized = localStorage.getItem(itemName);
    if (serialized === null) {
      return {};
    }
    return {[itemName]: JSON.parse(serialized)};
  } catch (err) {
    return {};
  }
};
export const saveState = (itemName, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(itemName, serializedState);
  } catch (err) {
    return undefined;
  }
};
export const removeState = itemName => {
  localStorage.removeItem(itemName);
};

const store = createStore(
  combineReducers({
    user: authentication,
  }),
  applyMiddleware(thunk),
);

export const state = store.getState();

export const {user} = state;

export default store;
