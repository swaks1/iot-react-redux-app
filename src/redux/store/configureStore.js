import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers"; //defaults to index.js
import reduxImmutableInvariant from "redux-immutable-state-invariant"; //used for warings when mutating state dont use this in production they say... lot of object copying
import thunk from "redux-thunk";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    storeEnhancers(
      //storeEnchancers is just for using redux dev tools in chrome
      applyMiddleware(thunk, reduxImmutableInvariant())
    )
  );
}
