import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/authReducer";
import UIReducer from "./reducers/UIReducer";
import dataReducer from "./reducers/dataReducer";
import userReducer from "./reducers/userReducer";

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const middleware = [thunk];

const reducers = combineReducers({
  authenticated: authReducer,
  UI: UIReducer,
  oglas: dataReducer,
  user: userReducer,
});

const persistedState = loadFromLocalStorage();
const store = createStore(
  reducers,
  persistedState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
