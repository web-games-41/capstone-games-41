import { createSlice } from "@reduxjs/toolkit";
import { fetchAuth } from "./auth.js";
import { httpConfig } from "../ui/shared/utils/http-config.js";

const  currentUserSlice = createSlice({
     name: "currentUser",
     initialState: null,
     reducers: {
                    setCurrentUser: (currentUser, action) => {
                        return action.payload
                    }
                }
 })

 export const {setCurrentUser} = currentUserSlice.actions

 export default currentUserSlice.reducer

 export const fetchCurrentUser = () => async (dispatch, getState) => {
    await dispatch(fetchAuth())
     const {auth} = getState()
     if(auth !== null) {
         const {data} = await httpConfig.get(`/apis/profile/${auth.profileId}`)
         dispatch(setCurrentUser(data))
     }
 }