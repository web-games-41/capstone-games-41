import listings from './listing'
import {configureStore, combineReducers} from "@reduxjs/toolkit";
import auth from "./auth"
import categories from "./categories.js";

const reducer = combineReducers({listings:listings, auth:auth, categories:categories})

export const store = configureStore({reducer})