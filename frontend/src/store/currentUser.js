import { createSlice } from "@reduxjs/toolkit";
import { fetchAuth } from "./auth.js";
import { httpConfig } from "../ui/shared/utils/http-config.js";

const  currentUserSlice = createSlice({
     name: "profile",
     initialState: null,
     reducers: {
                    getCurrentUserByProfileId: (profile, action) => {
                        return action.payload
                    }
                }
 })

 export const {getCurrentUserByProfileId} = currentUserSlice.actions

 export default currentUserSlice.reducer

 export const {getCurrentUserByProfileId} = currentUserSlice.actions
 export default currentUserSlice.reducer

 export const fetchCurrentUser = () => async (dispatch, getState) => {
    await dispatch(fetchAuth())
     const {auth} = getState()
     if(auth !== null) {
         const {data} = await httpConfig.get(`/apis/profile/${auth.profileId}`)
         dispatch(getCurrentUserByProfileId(data))
     }
 }