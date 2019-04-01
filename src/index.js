import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import { appReducer } from "./reducers";
import { filmsReducer } from "./Components/Films/reducers";
import { authReducer } from "./Components/Auth/reducers";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const logger = createLogger();
const rootReducer = combineReducers({
  appReducer,
  filmsReducer,
  authReducer
});
let store = "";

store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
