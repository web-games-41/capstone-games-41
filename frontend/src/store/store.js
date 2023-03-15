import listings from './listing'
import {configureStore, combineReducers} from "@reduxjs/toolkit";
import auth from "./auth"
import inbox from "./inbox.js";

const reducer = combineReducers({listings:listings, auth:auth, inbox:inbox})

export const store = configureStore({reducer})