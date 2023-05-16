import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./user/userReducer";

const rootReducer = combineReducers({ userReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));