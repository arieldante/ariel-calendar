import { createStore } from "redux";
import taskApp from "./reducer";

function configureStore( state = {} ) {
  return createStore(taskApp, state);
}

export default configureStore;