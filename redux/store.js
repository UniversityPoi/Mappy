import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./user/userReducer";
import locationReducer from './location/locationReducer';

const rootReducer = combineReducers({ userReducer, locationReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));