import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./user/userReducer";
import locationReducer from './location/locationReducer';
import cameraReducer from "./camera/cameraReducer";

const rootReducer = combineReducers({ userReducer, locationReducer, cameraReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));