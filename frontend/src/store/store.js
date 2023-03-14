import listings from './listing'
import {configureStore, combineReducers} from "@reduxjs/toolkit";
import auth from "./auth"

const reducer = combineReducers({listings:listings, auth:auth})

export const store = configureStore({reducer})