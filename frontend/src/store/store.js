import listings from './listing'
import {configureStore, combineReducers} from "@reduxjs/toolkit";
import auth from "./auth"
import currentUser from "./currentUser.js";

const reducers = {listings:listings, auth:auth, currentUser}
const reducer = combineReducers(reducers)

import inbox from "./inbox.js";

const reducer = combineReducers({listings:listings, auth:auth, inbox:inbox})

export const store = configureStore({reducer})