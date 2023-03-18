import listings from './listing'
import {configureStore, combineReducers} from "@reduxjs/toolkit";
import auth from "./auth"
import currentUser from "./currentUser.js";
import categories from "./categories.js";
import inbox from "./inbox.js";
import message, {setIndividualMessage} from "./message.js";
import claim from "./claim.js";


const reducer = combineReducers({listings:listings, auth:auth, inbox:inbox, categories:categories, currentUser:currentUser, messages:message, claims:claim})
export const store = configureStore({reducer})