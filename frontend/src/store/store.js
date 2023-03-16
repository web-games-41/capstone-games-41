import listings from './listing'
import {configureStore, combineReducers} from "@reduxjs/toolkit";
import auth from "./auth"
import currentUser from "./currentUser.js";
import categories from "./categories.js";
import inbox from "./inbox.js";

const reducer = combineReducers({listings:listings, auth:auth, inbox:inbox, categories:categories, currentUser:currentUser})
export const store = configureStore({reducer})