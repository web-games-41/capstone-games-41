import listings from './listing'
import {configureStore, combineReducers} from "@reduxjs/toolkit";

const reducer = combineReducers({listings:listings})

export const store = configureStore({reducer})