import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {thunk} from "redux-thunk";
import { LoginReducer } from "../reducers/LoginReducers";

const reducer = combineReducers({
    Loginstore: LoginReducer
});

const initialState = {};
const middleWare = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;