import listings from './listing'
import {configureStore, combineReducers} from "@reduxjs/toolkit";
import auth from "./auth"
import currentUser from "./currentUser.js";

const reducers = {listings:listings, auth:auth, currentUser}
const reducer = combineReducers(reducers)

export const store = configureStore({reducer})